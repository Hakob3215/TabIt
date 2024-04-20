import React from 'react';
import './styles/Dashboard.css'; // Import your CSS file

const Dashboard = () => {
    return (
        <div className="dashboard">
            <button className="profile-button">Profile</button>
            <div className="receipts">
                <div className="receipt highlight">Latest Receipt</div>
                <div className="receipt">Receipt 1</div>
                <div className="receipt">Receipt 2</div>
                {/* Add more receipts as needed */}
            </div>
            <button className="add-receipt-button">+</button>
        </div>
    );
};

export default Dashboard;