import React from 'react';
import { useState, useEffect } from 'react';
import './styles/Final.css';
import PersonList from '../components/PersonList';
import { Link } from "react-router-dom";

const Final = () => {

    const [userList, setUserList] = React.useState([]);

    useEffect(() => {
        // fetch receipt data from server
        const receiptID = localStorage.getItem('receiptID');
        fetch(process.env.REACT_APP_SERVER_URL + '/api/receipts/retrieve-receipt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                receiptID,
            }),
        }).then((response) => {
            switch(response.status) {
                case 200:
                    response.json().then((data) => {
                        // set user data
                        setUserList(data.users);
                    });
                default:
                    // error
                    console.log('An error occurred');
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    
  
    return(
    
    <div className='fPage'>
            <h1 className = 'title'>Final Totals</h1>
            <div className='people'>
                <PersonList users={userList} />
            </div>
            <div>
                <div className='buttons'>
                    <Link to="/match-page">
                        <button className='back-button'>Back</button>
                    </Link>
                    <Link to= "/dashboard">
                        <button className='done-button'>Done</button>
                    </Link>
                    
                </div>
            </div>
    </div>
     
    )
};
export default Final;