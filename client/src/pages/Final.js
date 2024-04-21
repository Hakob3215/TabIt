import React from 'react';
import './styles/Final.css';
import PersonList from '../components/PersonList';

const Final = () => {

 const names = ['Ryan', 'Hakob', 'Vivek'];
 const prices = [20, 10, 30];

  
    return(
    
    <div>
        <h1 className = 'title'>Final Totals</h1>
        <PersonList names = {names} totals = {prices} />
    </div>
     
    )
};
export default Final;