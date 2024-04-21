import React from 'react';
import './styles/PersonList.css';

const PersonList = ({ names, totals }) => {
    return (
      <div className="person-list">
        {names.map((name, index) => (
          <div className="person" key={index}>
            <div className="person-details">
              <label className="person-name">{name}</label>
              <label className="person-total">${totals[index]}</label>
              <button className="request-button">request</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PersonList;