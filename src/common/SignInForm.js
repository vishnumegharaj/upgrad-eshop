import "./common.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignInForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
        console.log(email);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        console.log("email", email);
        console.log("password", password);

        fetch('http://localhost:3001/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                const accessToken = response.headers.get('x-auth-token');
                console.log(accessToken);

                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                    console.log("Access Token stored in localStorage:", localStorage.getItem('accessToken')); // Log the stored access token

                } else {
                    console.log('Access token not found in the response.');
                }

                return response.json();
            })
            .then((data) => {
                console.log("Response data:", data);

               
                    // Redirect or perform other actions
                    navigate("/products");

              
            })
            .catch(error => {
                console.error('Login failed:', error.message); // Log any errors
                if (error.message === 'Unauthorized') {
                    setError('Unauthorized access. Please check your credentials.');
                } else {
                    setError('Login failed. Please check your credentials and try again.');
                }
            });

    }

    return (
        <div className="container">
            <div className="centerTheForm SigninForm">
                <h1>Welcome Back!</h1>
                <hr style={{ width: '80%', height: '1px' }} />
                <form className="form" action="" onSubmit={onFormSubmit}>

                    <label htmlFor="email" className="text">Email</label>
                    <input type="email" className="inputField" id="email" onChange={handleEmailChange} placeholder="Enter your Email" required />

                    <label htmlFor="password" className="text">Password</label>
                    <input type="password" className="inputField" id="password" onChange={handlePasswordChange} placeholder="Enter your Password" required />

                    <button className="btn">Sign In</button>

                </form>

            </div>
        </div>
    )
}