import React from 'react';
import './styles/PersonList.css';

const PersonList = ({users}) => {
    return (
      <div className="person-list">
        {users.map((user, index) => (
          <div className="person" key={index}>
            <div className="person-details">
              <label className="person-name">{user.username}</label>
              <label className="person-total">${user.amountOwed}</label>
              <button className="request-button">Request</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PersonList;