import React from 'react';
import { useState } from 'react';
import './styles/ScanImage.css';

const { GoogleGenerativeAI } = require("@google/generative-ai");
console.log(process.env.REACT_APP_BARD_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_BARD_API_KEY);

const ScanImage = () => {

    const [requestMade, setRequestMade] = useState(false);
    const [response, setResponse] = useState('');
    const [receiptInfo, setReceiptInfo] = useState([]);
    const model = genAI.getGenerativeModel({model: "gemini-pro-vision"});

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
        

    return (
        <div className='scanner'>
        <h1>Scan Image</h1>
        <input id="pickImage" type="file" accept="image/*" capture="camera" onChange={handleImage}/>
        <label htmlFor="pickImage" className='custom-file-upload'>Pick Image</label>
        {requestMade && <p>{response ? '' : "Loading..."}</p>}

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
                { !isNaN(getTotalCost()) ? <h3>Total Cost: ${getTotalCost()}</h3> : <h3>{getTotalCost()}</h3> }
        </div>
        }
        </div>
    );
};

export default ScanImage;