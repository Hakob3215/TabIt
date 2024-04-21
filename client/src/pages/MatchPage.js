import React, { useState } from 'react';
import './styles/MatchPage.css';

const MatchPage = () => {
    const [showAddUserWindow, setShowAddUserWindow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [userImages, setUserImages] = useState([
        "https://bootdey.com/img/Content/avatar/avatar6.png",
        "profile2.jpg",
        "profile3.jpg",  
        "https://bootdey.com/img/Content/avatar/avatar6.png",
        "profile2.jpg",
        "profile3.jpg",   
        // Add more profile picture URLs here
    ]);

    const [data, setData] = useState([  // Replace with your actual data fetching logic
        { _id: 1, column1: "Value 1", column2: "", column3: "Value 3", column4: "Value 4" },
        { _id: 2, column1: "Another Value", column2: "", column3: "Sample Content", column4: "Sample 2 Content" },
        // Add more data objects here
    ]);

    const handleAddUser = () => {
        setShowAddUserWindow(true);
    };

    const handleAddUserSubmit = (newUserImage) => {
        setUserImages([...userImages, newUserImage]);
        setShowAddUserWindow(false);
    };

    const handleClick = (index) => {
        setSelectedImage(userImages[index]);
    };

    const handleRowClick = (index) => {
        if (selectedImage) {
            const newData = [...data];
            const column2Data = newData[index].column2 || []; // Get existing data or initialize empty array
            let updatedColumn2Data;
            if (column2Data.includes(selectedImage)) {
                // If selectedImage exists, filter it out
                updatedColumn2Data = column2Data.filter(image => image !== selectedImage);
            } else {
                // If selectedImage does not exist, add it
                updatedColumn2Data = [...column2Data, selectedImage];
            }
    
            newData[index].column2 = updatedColumn2Data; // Assign the updated array to column2
            setData(newData);
        }
    };
    
    

    const isValidUrl = (string) => {
        try {
            new URL(string);
        } catch (_) {
            return false;  
        }
        return true;
    };

    return (
        <>
            <div className="user-profile">
                <div className="add-user-container">
                    <button className="add-user-button" onClick={handleAddUser}>+</button>
                </div>
                <div className="profile-scroll-container">
                    {userImages.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Profile ${index + 1}`}
                            className="profile-image"
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
                {showAddUserWindow && <AddUserWindow onSubmit={handleAddUserSubmit} />}
            </div>
            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name of Item</th>
                            <th>Friends</th>
                            <th>Total Price</th>
                            <th>Split Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id} onClick={() => handleRowClick(index)}>
                                <td>{item.column1}</td>
                                <td>
                                    {Array.isArray(item.column2) && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {item.column2.map((url, index) => isValidUrl(url) && (
                                                <img 
                                                    key={index}
                                                    src={url} 
                                                    alt={`Profile ${index}`} 
                                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '5px' }} 
                                                />
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td>{item.column3}</td>
                                <td>{item.column4}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const AddUserWindow = ({ onSubmit }) => {
    const [newUserImage, setNewUserImage] = useState("");

    const handleInputChange = (event) => {
        setNewUserImage(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(newUserImage);
    };

    return (
        <div className="add-user-window">
            <input
                type="text"
                placeholder="Enter user profile image URL"
                value={newUserImage}
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Add User</button>
        </div>
    );
};

export default MatchPage;
