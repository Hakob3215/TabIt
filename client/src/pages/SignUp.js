import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SignUp.css';
const SignUp = () => {
const [error, setError] = useState(null);
const [passVisible, setPassVisible] = useState(false);
const [confirmVisible, setConfirmVisible] = useState(false);

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

function togglePasswordVisibility() {
    setPassVisible(!passVisible);
}
function toggleConfirmVisibility() {
    setConfirmVisible(!confirmVisible);
}
const navigate = useNavigate();
function handleSubmit(e) {
    e.preventDefault();
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
                <input type="text" name="firstName" className='field' onChange={e => setFirstName(e.target.value)}/>

                <label htmlFor="lastName"> Last Name: </label>
                <input type="text" name="lastName" className='field' onChange={e => setLastName(e.target.value)}/>

                <label htmlFor="email"> Email: </label>
                <input type="email" name="email" className='field' onChange={e => setEmail(e.target.value)}/>

                <label htmlFor="username"> Username: </label>
                <input type="text" name="username" className='field' onChange={e => setUsername(e.target.value)}/>

                <label htmlFor="password"> Password: </label> 
                <input type={passVisible ? "text":"password"} name="password" className='field' onChange={e => setPassword(e.target.value)}/>
                <button type="button" className = "visibility" onClick={togglePasswordVisibility}></button>

                <label htmlFor="confirmPassword"> Confirm Password: </label> 
                <input type={confirmVisible ? "text":"password"} name="password" className='field' onChange={e => setConfirmPassword(e.target.value)}/>
                <button type="button" className = "conVisibility" onClick={toggleConfirmVisibility}></button>

            </div>
            {error && <p className='error'>{error}</p>}
            <button type="submit" className='signButton'> Sign Up </button>
        </form>
    </div>

    );
};

export default SignUp;