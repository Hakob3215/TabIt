import React, { useState, useEffect } from 'react';

import './styles/MatchPage.css';
import { Link } from 'react-router-dom';

const MatchPage = () => {
    const [showAddUserWindow, setShowAddUserWindow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // const [userImages, setUserImages] = useState([
    //     "https://bootdey.com/img/Content/avatar/avatar6.png",
    //     "profile2.jpg",
    //     "https://bootdey.com/img/Content/avatar/avatar5.png", 
    //     "https://bootdey.com/img/Content/avatar/avatar7.png",
    //     "profile2.jpg",
    //     "profile3.jpg",   
    //     // Add more profile picture URLs here
    // ]);

    const [data, setData] = useState([  // Replace with your actual data fetching logic
        { _id: 1, column1: "Value 1", column2: "", column3: "32.4", column4: "Value 4" },
        { _id: 2, column1: "Another Value", column2: "", column3: "43.1", column4: "Sample 2 Content" },
        // Add more data objects here
    ]);

    const [currentUsers, setCurrentUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [userFriends, setUserFriends] = useState([]);

    useEffect(() => {
        // fetch all users
        fetch(process.env.REACT_APP_SERVER_URL + '/api/user/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            switch(response.status) {
                case 200:
                    response.json().then((data) => {
                        // set user data
                        setAllUsers(data);
                    });
                    break;
                default:
                    // error
                    console.log('An error occurred');
            }
        }).catch((error) => {
        });
    });

    useEffect(() => {
        // fetch all user's friends
        const user = localStorage.getItem('user');
        fetch(process.env.REACT_APP_SERVER_URL + '/api/user/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
            }),
        }).then((response) => {
            switch(response.status) {
                case 200:
                    response.json().then((data) => {
                        // set friends
                        setUserFriends(data);
                    });
                    break;
                default:
                    // error
                    console.log('An error occurred');
            }
            }).catch((error) => {
                console.log(error);
        });
    });

    useEffect(() => {
        // add user to current users
        const user = localStorage.getItem('user');
        // fetch current user data
        fetch(process.env.REACT_APP_SERVER_URL + '/api/user/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
            }),
        }).then((response) => {
            switch(response.status) {
                case 200:
                    response.json().then((data) => {
                        // insert user into current users
                        setCurrentUsers([...currentUsers, data.username]);
                    });
                    break;
                default:
                    // error
                    console.log('An error occurred');
            }
        }).catch((error) => {
            console.log(error);
        });
    },[]);


    const handleAddUser = () => {
        setShowAddUserWindow(true);
    };

    const handleAddUserSubmit = (newUsers) => {
        // concatentate new users to current users
        setCurrentUsers([...currentUsers, ...newUsers]);
        setShowAddUserWindow(false);
    };

    const handleClick = (index) => {
        setSelectedImage(currentUsers[index]);
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


            const column3Value = parseFloat(newData[index].column3);
            if (!isNaN(column3Value)) {
                if (updatedColumn2Data.length > 0) {
                    newData[index].column4 = (column3Value / updatedColumn2Data.length).toFixed(2);
                } else {
                    newData[index].column4 = column3Value.toFixed(2); // Display column 3 value if division by 0
                }
            } else {
                newData[index].column4 = "Invalid float"; // Replace with your preferred default value
            }

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
                    {currentUsers && currentUsers.map((user, index) => (
                        <img
                            key={index}
                            src={user.pfp}
                            alt={`Profile ${index + 1}`}
                            className="profile-image"
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
                {showAddUserWindow && <AddUserWindow onSubmit={handleAddUserSubmit} />}
                {showAddUserWindow && <AddUserWindow onSubmit={handleAddUserSubmit} onClose={() => setShowAddUserWindow(false)} allUsers={allUsers} userFriends={userFriends}/>}
            </div>
            {showAddUserWindow ? null : (
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
                        {data && data.map((item, index) => (
                            <tr key={item._id} onClick={() => handleRowClick(index)}>
                                <td>{item.column1}</td>
                                <td>
                                    {Array.isArray(item.column2) && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {item && item.column2.map((url, index) => isValidUrl(url) && (
                                                <img 
                                                    key={index}
                                                    src={url} 
                                                    alt={`Profile ${index}`} 
                                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '5px' }}
                                                   // onClick={() => handleClick(index)} 
                                                />
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td>${!isNaN(parseFloat(item.column3)) ? parseFloat(item.column3).toFixed(2) : "Invalid float"}</td>
                                <td>${!isNaN(parseFloat(item.column4)) ? parseFloat(item.column4).toFixed(2) : parseFloat(item.column3).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                <Link to='/final'> 
                    <button className='doneButton'>Next</button>
                </Link>
                <Link to='/scan-image'>
                    <button className='backButton'> Back </button>
                </Link>
            
            </div>
            </div>
          
            )};
            
        </>
    );
};

const AddUserWindow = ({ onSubmit, onClose, allUsers, userFriends }) => {
    const [newUserImage, setNewUserImage] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setNewUserImage(event.target.value);
    };

    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchInput(value); // Always update the search input state
    
        if (!value) {
            setSearchResults([]); // Clear results when input is empty
        } else {
            const results = allUsers.filter(user => user.username.toLowerCase().includes(value.toLowerCase()));
            setSearchResults(results);
        }
    };  

    const handleAddUser = (user) => {
        // add user to selected users UNLESS they are already in the list
        if (!selectedUsers.includes(user)) {
            setSelectedUsers(prevUsers => [...prevUsers, user]);
        }
    };

    const handleRemoveUser = (user) => {
        // remove user from selected users
        setSelectedUsers(prevUsers => prevUsers.filter(prevUser => prevUser != user));
    };

    const handleSubmit = () => {
        onSubmit(selectedUsers);
    };

    const handleAddToSelectedUsers = (friend) => {
        handleAddUser(friend);
    };

    return (
        <div className="add-user-window">
            <div className="top-overall">
                <button className="close-button" onClick={onClose}>X</button>
                <h3>Add Users</h3>
            </div>
                
            <div className="selected-users">
                <h3>Selected Users</h3>
                <ul>
                    {selectedUsers && selectedUsers.map((user, index) => (
                        <li key={index}>
                            {user.username}
                            <button onClick={() => handleRemoveUser(user)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="search-users">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                <ul>
                    {searchResults && searchResults.map((user, index) => (
                        <li key={index}>
                            {user.username}
                            <button onClick={() => handleAddUser(user)}>Add</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="user-friends">
                <h3>Friends:</h3>
                <ul>
                    {userFriends && userFriends.map((friend, index) => (
                        <li key={index} className="friend-item">
                            <span>{friend.username}</span>
                            <button onClick={() => handleAddToSelectedUsers(friend)}>Add</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="submit-class">
                <button className="submit-button" onClick={handleSubmit}>Add Selected Users</button>
            </div>
        </div>
    
    );
};

export default MatchPage;
