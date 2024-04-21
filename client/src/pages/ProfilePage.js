import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ProfilePage.css';
        
const ProfilePage = () => {
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState({});

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
    return (
        
        <div className='profilePage'>
            <h1 className='profileTitle'> Your Profile </h1>
            {/* <button className='editButton' img src='../../components/editPen.svg '></button> */}
        {userObj.pfp ? <img src={userObj.pfp} alt='Profile Picture' className='profilePicture'/> : <img src='https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' alt='Profile Picture' className='profilePicture'/>}
        <h3>{userObj.firstName} {userObj.lastName}</h3>
        <p>Email: {userObj.email}</p>
        <p>Username: {userObj.username}</p>
        </div>

    );
};

export default ProfilePage;
