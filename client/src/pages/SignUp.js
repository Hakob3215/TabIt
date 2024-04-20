import React from 'react';
import { useState } from 'react';
import './styles/SignUp.css';
const SignUp = () => {

const [error, setError] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }


}

    return (
    <div className='page'>
        <form className="signUpForm" onSubmit={handleSubmit}>
           <h1 className='title'> Sign Up </h1>
            <div className='inputs'>
                <label htmlFor="firstName"> First Name: </label>
                <input type="text" name="firstName" className='field'/>

                <label htmlFor="lastName"> Last Name: </label>
                <input type="text" name="lastName" className='field'/>

                <label htmlFor="email"> Email: </label>
                <input type="email" name="email" className='field'/>

                <label htmlFor="username"> Username: </label>
                <input type="text" name="username" className='field'/>

                <label htmlFor="password"> Password: </label> 
                <input type="password" name="password" className='field'/>

                <label htmlFor="confirmPassword"> Confirm Password: </label> 
                <input type="password" name="confirmPassword" className='field'/>
            </div>
            <button type="submit"> Sign Up </button>
        </form>
    </div>

    );
};

export default SignUp;