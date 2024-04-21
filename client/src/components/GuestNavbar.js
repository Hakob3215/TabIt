import React from "react";
import { Link } from "react-router-dom";
import './styles/GuestNavbar.css';

const GuestNavbar = () => {
    return (
        <div className="Navbar">
            <h1>TabIt!</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            </nav>
        </div>
    );
    };

export default GuestNavbar;