import React from 'react';
import './styles/Login.css';

const Login = () => {
    return (
        <div className='page'>
            <form className = 'loginForm'>
            <h3>Login Here</h3>
             <label htmlFor="username">Email or Username</label>
                <input type="text" placeholder="Email or Username" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" />
            <button>Log In</button>
            </form>

        </div>
    );
};

export default Login;