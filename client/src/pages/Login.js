import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        const userOrEmail = e.target.username.value;
        const password = e.target.password.value;
        fetch(process.env.REACT_APP_SERVER_URL + '/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userOrEmail,
                password,
            }),
        }).then((response) => {
            switch(response.status) {
                case 200:
                    // Success
                    response.text().then((username) => {
                    localStorage.setItem('user', username)
                    });
                    navigate('/dashboard');
                    break;
                case 201:
                    // Username or email not found
                    setError('Username/email and password not found');
                    break;
                default:
                    setError('An error occurred');
            }
        }).catch((error) => {
        });
    }

    return (
        <div className='page'>
            <form className = 'loginForm' onSubmit={handleSubmit}>
            <h3>Login Here</h3>
            <label htmlFor="username">Email or Username</label>
            <input type="text" placeholder="Email or Username" id="username" name='username' />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" name='password'/>
            <p>{error}</p>
            <button type="submit">Log In</button>
            </form>

        </div>
    );
};

export default Login;