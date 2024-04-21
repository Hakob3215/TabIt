import React from 'react';
import './styles/Final.css';
import PersonList from '../components/PersonList';
import { Link } from "react-router-dom";

const Final = () => {

const user_list = [
    {
        username: "Hakob",
        amountOwed: 50.01
    },
    {
        username: "Ryan",
        venmoCreds: 'ryan-kung-10',
        amountOwed: 80.01
    },
    {
        username: "Vivek",
        amountOwed: 90.01
    },
    {
        username:"Preeti",
        venmoCreds:'Preeti-Karthikeyan',
        amountOwed: 20.01
    },
    {
        username:"George",
        amountOwed: 40.01
    },
    {
        username:"Jaina",
        amountOwed: 50.92
    },
    {
        username:"Saachi",
        amountOwed: 20000.44
    }
];

  
    return(
    
    <div className='fPage'>
            <h1 className = 'title'>Final Totals</h1>
            <div className='people'>
                <PersonList users={user_list} />
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