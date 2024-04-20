import React from 'react';
import './styles/SignUp.css';
const SignUp = () => {
    return (
<div className='page'>
    <form className="signUpForm">
       <h1 className='title'> Sign Up </h1>
        <div className='inputs'>
            <label> First Name: </label>
            <input type="text" name="firstName" className='field'/>

            <label> Last Name: </label>
            <input type="text" name="lastName" className='field'/>

            <label> Email: </label>
            <input type="email" name="email" className='field'/>

            <label> Username: </label>
            <input type="text" name="username" className='field'/>

            <label> Password: </label> 
            <input type="password" name="password" className='field'/>

            <label> Confirm Password: </label> 
            <input type="password" name="confirmPassword" className='field'/>
        </div>
        <button type="submit"> Sign Up </button>
    </form>
</div>

    );
};

export default SignUp;