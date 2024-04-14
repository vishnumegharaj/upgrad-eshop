import "./common.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignUpForm() {

    const navigate = useNavigate();

    const [firstName, setFirstname] = useState();
    const [lastName, setLastname] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [role, setRole] = useState("");


    async function onFormSubmit(e) {
        console.log(role);
        e.preventDefault();

        try {
            const userResponse = await fetch('http://localhost:3001/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    role,
                    contactNumber,
                    
                })
            });

            if (!userResponse.ok) {
                throw new Error('sigup failed: ' + userResponse.statusText);
            }

            const authResponse = await fetch('http://localhost:3001/api/v1/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })

            if (!authResponse.ok) {
                throw new Error('Authentication failed: ' + authResponse.statusText);
            }
            const accessToken = authResponse.headers.get('x-auth-token');
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                console.log("Access Token stored in localStorage:", localStorage.getItem('accessToken'));
            } else {
                console.log('Access token not found in the response.');
            }

            const data = await authResponse.json();
            console.log(data);
            // Redirect or perform other actions
            navigate("/products");

        }
        catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="totalsize">
            <div className="centerTheForm signUpForm">
                <h1>Register</h1>
                <hr style={{ width: '80%', height: '1px' }} />
                <form className="form" action="" onSubmit={onFormSubmit}>

                    <label htmlFor="name" className="text">First Name:</label>
                    <input type="text" className="inputField" placeholder="Enter your firstname" onChange={(e) => setFirstname(e.target.value)} required />

                    <label htmlFor="name" className="text">Last Name:</label>
                    <input type="text" className="inputField" placeholder="Enter your lastname" onChange={(e) => setLastname(e.target.value)} required />


                    <label htmlFor="email" className="text">Email:</label>
                    <input type="email" className="inputField" id="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="password" className="text">Password:</label>
                    <input type="password" className="inputField" id="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} required />

                    <label htmlFor="password" className="text"> Confirm Password:</label>
                    <input type="password" className="inputField" id="password" placeholder=" Confirm Password" required />

                    <label htmlFor="number" className="text">Contact Number: </label>
                    <input type="text" className="inputField" placeholder="Enter your Contact Number" onChange={(e) => setContactNumber(e.target.value)} required />

                    <label htmlFor="role" className="text">Role: </label>
                    <select id="role" className="inputField" onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select role</option>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>

                    <button className="btn"  >Sign Up</button>
                    <br /> <br />

                </form>

            </div>
            ``
        </div>
    )
}
