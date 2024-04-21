import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ProfilePage.css';
        
const ProfilePage = () => {
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState({});
    const [editing, setEditing] = useState(false);
    const [venmoUser, setVenmoUser] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            // if not signed in, redirect to sign in page
            navigate('/login');
        }
    });

    useEffect(() => {
        // fetch current user data
        const user = localStorage.getItem('user');
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
                        // set user data
                        setUserObj(data);
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
    }, []);

    function handleEditVenmo() {
        if (editing) {
            // save venmo username
            fetch(process.env.REACT_APP_SERVER_URL + '/api/user/update-venmo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userObj.username,
                    venmoCreds: venmoUser,
                }),
            }).then((response) => {
                switch(response.status) {
                    case 200:
                        // Success
                        setUserObj({...userObj, venmoCreds: venmoUser});
                        setEditing(false);
                        break;
                    default:
                        console.log('An error occurred');
                }
            }).catch((error) => {
                console.log(error)
            });
        } else {
            setEditing(true);
        }
    }

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
        if (!userFriends.includes(user)) {
            setUserFriends(prevUsers => [...prevUsers, user]);
    
            // add friend to the database of both the user and the friend they added
            const currentUser = localStorage.getItem('user');
            fetch(process.env.REACT_APP_SERVER_URL + '/api/user/addFriend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: currentUser,
                    friend: user,
                }),
            }).then((response) => {
                switch(response.status) {
                    case 200:
                        console.log('Friend added successfully');
                        break;
                    default:
                        // error
                        console.log('An error occurred while adding friend');
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    };
    






    const venmoInput = <input type="text" value={venmoUser || ''} onChange={(e) => setVenmoUser(e.target.value)}/>;
    const venmoDisplay = userObj.venmoCreds ? <p>Venmo: {userObj.venmoCreds}</p> : <p>Venmo: Not Set</p>;

    return (
        <div>
            <div className='profilePage'>
                <h1 className='profileTitle'> Your Profile </h1>
                {/* <button className='editButton' img src='../../components/editPen.svg '></button> */}
            {userObj.pfp ? <img src={userObj.pfp} alt='missing' className='profilePicture'/> : <img src='https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' alt='missing' className='profilePicture'/>}
            <h3>{userObj.firstName} {userObj.lastName}</h3>
            <p>Email: {userObj.email}</p>
            <p>Username: {userObj.username}</p>
            {            
                editing ? venmoInput : venmoDisplay
            }
            <button className='editVenmo' onClick={handleEditVenmo}>{editing ? "Save Venmo Username" : "Edit Venmo Username"}</button>
            </div>
            <div className='search-users'>
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
    </div>

    );
};

export default ProfilePage;
