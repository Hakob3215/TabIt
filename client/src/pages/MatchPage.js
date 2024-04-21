import React, { useState } from 'react';
import './styles/MatchPage.css';

const MatchPage = () => {
    const [showAddUserWindow, setShowAddUserWindow] = useState(false);
    const [userImages, setUserImages] = useState([
        "https://bootdey.com/img/Content/avatar/avatar6.png",
        "profile2.jpg",
        "profile3.jpg",  
        "https://bootdey.com/img/Content/avatar/avatar6.png",
        "profile2.jpg",
        "profile3.jpg",   
        // Add more profile picture URLs here
    ]);

    const handleAddUser = () => {
        setShowAddUserWindow(true);
    };

    const handleAddUserSubmit = (newUserImage) => {
        setUserImages([...userImages, newUserImage]);
        setShowAddUserWindow(false);
    };

    const handleHover = (index) => {
        // Toggle a CSS class for the clicked profile picture
        // You can handle the click event here as needed
    };
    const handleClick = (index) => {
        // Toggle a CSS class for the clicked profile picture
        // You can handle the click event here as needed
    };
    const [data] = useState([  // Replace with your actual data fetching logic
        { _id: 1, column1: "Value 1", column2: "Value 2", column3: "Value 3", column4: "Value 4" },
        { _id: 2, column1: "Another Value", column2: "More Data", column3: "Sample Content", column4: "Sample 2 Content" },
        // Add more data objects here
    ]);

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
                            onMouseEnter={() => handleHover(true, index)}
                            onMouseLeave={() => handleHover(false, index)}
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
                        {data.map(item => (
                            <tr key={item._id}>
                                <td>{item.column1}</td>
                                <td>{item.column2}</td>
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
