import React from 'react';

const SignUp = () => {
    return (
        <div>
            <form className="signUpForm">
                <h1> Sign Up </h1>
                <label> First Name: </label>
                <input type="text" name="firstName" required/>
                <label> Last Name: </label>
                <input type="text" name="lastName" required/>
                <label> Email: </label>
                <input type="email" name="email" required/>
                <label> Username: </label>
                <input type="text" name="username" required/>
                <label> Password: </label>
                <input type="password" name="password" required/>
                <label> Confirm Password: </label>
                <input type="password" name="confirmPassword" required/>
                <button type="submit"> Sign Up </button>
            </form>
        </div>
    );
};

export default SignUp;