import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../components/profileIcon.png';
import './styles/Dashboard.css'; // Import your CSS file

const Receipt = ({ receipt }) => {
    return (
        <div className="receipt">
            <p>{receipt.title}</p>
            <p>{receipt.date}</p>
            <p>{receipt.total}</p>
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
        setReceipts([
            {
                title: 'Groceries',
                date: '10/10/2021',
                total: '$50.00'
            },
            {
                title: 'Gas',
                date: '10/11/2021',
                total: '$30.00'
            }
        ]);
    },[setReceipts]);

    function handleNavigate(dest) {
        navigate(dest);
    }

    return (
        <div className="dashboard">
            <button className="profile-button" onClick={() => handleNavigate('/profile-page')}>
                <img src={profileIcon} alt="Profile Icon" />
            </button>
            <div className="receipts">
                {receipts.map((receipt, index) => {return <Receipt key={index} receipt={receipt} />})}
            </div>
            <button className="add-receipt-button" onClick={() => handleNavigate('/scan-image')}>+</button>
        </div>
    );
};

export default Dashboard;