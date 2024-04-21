import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../components/profileIcon.png';
import './styles/Dashboard.css'; // Import your CSS file

const Receipt = ({ receipt }) => {
    let receiptSum = receipt.total;
    if (receipt.tax !== null) {
        receiptSum += receipt.tax;
    }
    if (receipt.tip !== null) {
        receiptSum += receipt.tip;
    }
    return (
        <div className="receipt">
            <p>{receipt.title}</p>
            <p>{receiptSum}</p>
        </div>
    );
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
    const user = localStorage.getItem('user');
        if (!user) {
            // if not signed in, redirect to sign in page
            navigate('/login');
        }
    });

    useEffect(() => {
        // get receipts from server
        fetch(process.env.REACT_APP_SERVER_URL + '/api/receipts/get-receipts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: localStorage.getItem('user'),
            }),
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setReceipts(data.receipts);
                });
            }
        });
    },[setReceipts]);

    function handleNavigate(dest) {
        localStorage.setItem('newReceipt', 'true');
        navigate(dest);
    }

    return (
        <div className="dashboard">
            <button className="profile-button" onClick={() => handleNavigate('/profile-page')}>
                <img src={profileIcon} alt="Profile Icon" />
            </button>
            <h1 className='dashTitle'>Existing Receipts</h1>
            <button className="add-receipt-button" onClick={() => handleNavigate('/scan-image')}>+</button>
            <div className="receipts">
                {receipts.map((receipt, index) => {return <Receipt key={index} receipt={receipt} />})}
            </div>
          
        </div>
    );
};

export default Dashboard;