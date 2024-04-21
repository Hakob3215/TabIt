import React from 'react';
import './styles/PersonList.css';

const PersonList = ({users}) => {
  const totalAmountOwed = users.reduce((total, user) => total + user.amountOwed, 0);
  const handleRequest = (username, amountOwed) => {
    const encodedUsername = encodeURIComponent(username);
    const encodedAmountOwed = encodeURIComponent(amountOwed);
    const venmoUrl = `https://venmo.com/${encodedUsername}?txn=charge&note=${'TabIt Payment Request'}&amount=${amountOwed}`
    
    window.open(venmoUrl, '_blank');
  };
  return (
      <div className="person-list">
        {users.map((user, index) => (
          <div className="person" key={index}>
            <div className="person-details">
              <label className="person-name">{user.username}</label>
              <label className="person-total">${user.amountOwed}</label>
              <button className={user.venmoCreds ? "request-button":"hidden-button"} onClick={()=> handleRequest(user.venmoCreds, user.amountOwed)}>
                Request
                </button>
            </div>
          </div>
        
        ))}
        <div className='total'>
            <label>Total: ${totalAmountOwed} </label>
        </div>
      </div>
    );
  };
  
  export default PersonList;