import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ScanImage.css';

const { GoogleGenerativeAI } = require("@google/generative-ai");
console.log(process.env.REACT_APP_BARD_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_BARD_API_KEY);

const ScanImage = () => {

    const navigate = useNavigate();
    const [requestMade, setRequestMade] = useState(false);
    const [response, setResponse] = useState('');
    const [receiptInfo, setReceiptInfo] = useState([]);
    const [tax, setTax] = useState(null);
    const [tip, setTip] = useState(null);
    const [title, setTitle] = useState('');
    const model = genAI.getGenerativeModel({model: "gemini-pro-vision"});

    useEffect(() => {
        const user = localStorage.getItem('user');
        const newReceipt = localStorage.getItem('newReceipt');
            if (!user || newReceipt === null) {
                // if not signed in, redirect to sign in page
                navigate('/login');
            }
        });

    async function handleImage(e) {
        setResponse('');
        const imageFile = e.target.files[0];
        if (!imageFile) return;
        setRequestMade(true);
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = async function () {
            const base64Image = reader.result;
            const image = {
                inlineData: {
                    data: base64Image.split(",")[1],
                    mimeType: imageFile.type,
                },
            };
    
            try {
                const prompt = 'Process this image of a receipt with the following: \n' +
                '1. Extract only the product names and their costs, along with tax and tip. \n' +
                '2. Each item should be formatted as: ITEM//COST. \n' +
                '3. Use "&" to separate each item. \n' +
                '4. Exclude any non-cost related information, and items without a cost. \n' +
                '5. Do not include change. \n' +
                '6. Do not include the totals.';
 
                const promptResult = await model.generateContent([prompt, image]);
                const resultResponse = await promptResult.response;
                const responseText = resultResponse.text();
                setResponse(responseText);
                // parse response to get receipt information, split by "&" and then by "//"
                const receiptInfo = responseText.split("&").map(item => item.split("//"));
                // filter out all items without a cost/float value
                const filteredReceiptInfo = receiptInfo.filter(item => item[1] && !isNaN(parseFloat(item[1])));
                setReceiptInfo(filteredReceiptInfo);
                setResponse('');
                setRequestMade(false);
            } catch (error) {
                console.error(error);
            }
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        e.target.value = null;
    }

    function handleItemChange(index, e) {
        let newReceiptInfo = [...receiptInfo];
        newReceiptInfo[index][0] = e.target.value;
        setReceiptInfo(newReceiptInfo);
    }
    function handleCostChange(index, e) {
        while(isNaN(e.target.value))
            e.target.value = e.target.value.slice(0, -1);
        
        let newReceiptInfo = [...receiptInfo];
        newReceiptInfo[index][1] = e.target.value;
        setReceiptInfo(newReceiptInfo);
    }
    function removeItem(index) {
        let newReceiptInfo = [...receiptInfo];
        newReceiptInfo.splice(index, 1);
        setReceiptInfo(newReceiptInfo);
    }
    function getTotalCost() {
        let total = 0;
        receiptInfo.forEach(item => {
            total += parseFloat(item[1]);
        });
        // round to 2 decimal places
        if (isNaN(total)) return "Please Enter All Costs";
        return total.toFixed(2);
    }
    function addItem() {
        setReceiptInfo([...receiptInfo, ['', '']]);
    }
    function handleTaxChange(e) {
        while(isNaN(e.target.value))
            e.target.value = e.target.value.slice(0, -1);
        const tax = e.target.value;
        if (tax === 0)
            setTax(null);
        else
        setTax(tax);
    }
    function handleTipChange(e) {
        while(isNaN(e.target.value))
            e.target.value = e.target.value.slice(0, -1);
        const tip = e.target.value;
        if (tip === 0)
            setTip(null);
        else
        setTip(tip);
    }

    async function handleReceiptSubmission() {
        // convert receipt into receipt object to easily store in database
        // get user from local storage
        const user = localStorage.getItem('user');
        const items = receiptInfo.map(item => {
            return {
                itemName: item[0],
                itemPrice: parseFloat(item[1]),
                usersPaying: []
            };
        });
        const total = parseFloat(getTotalCost());
        const taxValue = tax;
        const tipValue = tip;
        const receipt = {
            title: title,
            owner: user,
            items: items,
            users: [],
            tax: taxValue,
            tip: tipValue,
            total: total
        }
        // two posibilities:
        // This is a new receipt and we need to create a new receipt in the database
        // This is an existing receipt and we need to update the receipt in the database
        // Check local storage for if this is new
        const isNewReceipt = localStorage.getItem('newReceipt');
        if (isNewReceipt){
            // send a post request to the server to create a new receipt
            fetch(process.env.REACT_APP_SERVER_URL + '/api/receipts/new-receipt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receipt,
                }),
            }).then((response) => {
                switch(response.status) {
                    case 200:
                        // Success
                        localStorage.removeItem('newReceipt');
                        navigate('/match-page');
                        break;
                    default:
                        console.log('An error occurred');
                }
            }).catch((error) => {
            });
        } else {
            // send a post request to the server to update the receipt (latest receipt)
            fetch(process.env.REACT_APP_SERVER_URL + '/api/receipts/update-receipt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receipt,
                }),
            }).then((response) => {
                switch(response.status) {
                    case 200:
                        // Success
                        navigate('/match-page');
                        break;
                    default:
                        console.log('An error occurred');
                }
            }).catch((error) => {
            });
        }
        
        }
    return (
    <div className='scanner'>
        <h1>Scan Image</h1>
        <input id="pickImage" type="file" accept="image/*" capture="camera" onChange={handleImage}/>
        <label htmlFor="pickImage" className='custom-file-upload'>Pick Image</label>
        {requestMade && <p>{response ? '' : "Loading..."}</p>}

       {receiptInfo.length > 0 && <div className='receiptNaming'>
            Name your Receipt:    
            <input placeHolder={'Your Name'} className='nameInput' onChange={(e) => setTitle(e.target.value)}/>
        </div>}
        {receiptInfo.length > 0 &&
        <div className='receiptItems'>
            <h2>Receipt Information</h2>
            <div className='receiptItemsList'>
                {receiptInfo.map((item, index) => {
                    return (
                        <div key={index} className='receiptItem'>
                        <input type="text" value={item[0]} className='item' onChange={(e) => handleItemChange(index, e)} placeholder='Enter item name' />
                        <input type="text" value={item[1]} className='cost' onChange={(e) => handleCostChange(index, e)} placeholder='Enter item cost'/>
                        <button className='removeButton' onClick={() => removeItem(index)}>X</button>
                        </div>
                    );
                })}
            <button className='addButton' onClick={addItem}>+</button>
            </div>
        </div>}
        {
        receiptInfo.length > 0 &&
        <div className='totalCost'>
                { !isNaN(getTotalCost()) ? <>
                <h3>Total Cost: ${getTotalCost()}</h3>
                <input type="text" className="tipInput" placeholder="Leave Blank for No Tax" onChange={(e) => handleTaxChange(e)}/>
                <input type="text" className="taxInput" placeholder="Leave Blank for No Tip" onChange={(e) => handleTipChange(e)}/>
                {/* <input type="text" className="titleInput" placeholder="Enter Receipt Title" onChange={(e) => setTitle(e.target.value)}/> */}
                {title && <button className="submitReceipt" onClick={handleReceiptSubmission}>Process Receipt</button>}
                </> : <h3>{getTotalCost()}</h3> }
        </div>
        }

    </div>
    );
};

export default ScanImage;