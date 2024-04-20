import React, { useState } from 'react';
import './styles/VerifyItems.css';

const VerifyItems = () => {
    const [items, setItems] = useState([{ name: '', price: '' }]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newItems = [...items];
        newItems[index][name] = value;
        setItems(newItems);
    };

    const handleAddRow = () => {
        setItems([...items, { name: '', price: '' }]);
    };

    const handleRemoveRow = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    return (
        <div className="App">
            <div className="logo">
                <img src="logo.png" alt="Logo" />
            </div>
            <table id="itemTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={item.name}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="price"
                                    value={item.price}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleRemoveRow(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-row-btn" onClick={handleAddRow}>+</button>
            <button className="confirm-btn">Is this All right</button>
        </div>
    );
};

export default VerifyItems;
