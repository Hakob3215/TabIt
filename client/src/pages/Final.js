import React from 'react';
import './styles/Final.css';
import PersonList from '../components/PersonList';

const Final = () => {

 const names = ['Ryan', 'Hakob', 'Vivek', 'George', 'Preeti', 'Jaina', 'Saachi'];
 const prices = [20, 10, 30, 900, 190.29, 93, 500];

  
    return(
    
    <div>
        <h1 className = 'title'>Final Totals</h1>
        <div className='people'>
            <PersonList names = {names} totals = {prices} />
        </div>
    </div>
     
    )
};
export default Final;