import React from 'react';
import './styles/SignUp.css';
const SignUp = () => {
    return (
    <div>
    <form className="signUpForm">
    <h1 className='title'> Sign Up </h1>
    <fieldset>
        <legend> First Name: </legend>
        <input type="text" name="firstName"/>
    </fieldset>
    <fieldset>
        <legend> Last Name: </legend>
        <input type="text" name="lastName"/>
    </fieldset>
    <fieldset>
        <legend> Email: </legend>
        <input type="email" name="email"/>
    </fieldset>
    <fieldset>
        <legend> Username: </legend>
        <input type="text" name="username"/>
    </fieldset>
    <fieldset>
        <legend> Password: </legend>
        <input type="password" name="password"/>
    </fieldset>
    <fieldset>
        <legend> Confirm Password: </legend>
        <input type="password" name="confirmPassword"/>
    </fieldset>
    <button type="submit"> Sign Up </button>
</form>
        </div>
    );
};

export default SignUp;