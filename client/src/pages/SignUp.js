import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SignUp.css';
const SignUp = () => {
const [error, setError] = useState(null);
const [passVisible, setPassVisible] = useState(false);
const [confirmVisible, setConfirmVisible] = useState(false);

function togglePasswordVisibility() {
    setPassVisible(!passVisible);
}
function toggleConfirmVisibility() {
    setConfirmVisible(!confirmVisible);
}
const navigate = useNavigate();
function handleSubmit(e) {
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
    if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
    }
    fetch(process.env.REACT_APP_SERVER_URL + '/api/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            username,
            password,
        }),
    }).then((response) => {
        // response will be status code
        // 200 -> success, 201 -> username taken, 202 -> email taken
        switch(response.status) {
            case 200:
                setError(null);
                navigate('/login');
                break;
            case 201:             
            case 202:
                setError('Username or Email is taken');
                break;
            default:
                setError('An error occurred');
        }
        
    }).catch((error) => {
    });

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
                <input type={passVisible ? "text":"password"} name="password" className='field'/>
                <button type="button" className = "visibility" onClick={togglePasswordVisibility}>👁️</button>

                <label htmlFor="confirmPassword"> Confirm Password: </label> 
                <input type={confirmVisible ? "text":"password"} name="password" className='field'/>
                <button type="button" className = "conVisibility" onClick={toggleConfirmVisibility}>👁️</button>

            </div>
            {error && <p className='error'>{error}</p>}
            <button type="submit" className='signButton'> Sign Up </button>
        </form>
    </div>

    );
};

export default SignUp;