import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./navigationBar.css";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';

export default function NavigationBar() {

    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedIn = false;

    function handleLogout() {

        localStorage.removeItem('accessToken');
        // Navigate to the home page
        navigate("/");
    }

    return (
        <div className="header">

            <div className="logo">
                <ShoppingCartIcon style={{ fontSize: '40px', color: 'white' }} />
                <h2>Upgrad Eshop</h2>
            </div>

            {accessToken ? (
                <>
                    {/* Search bar */}
                    <div className="search">
                        <div className="searchIcon">
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                            className="searchInput"
                        />
                    </div>



                    <div className="login">

                        {/* <Button
                            className="login"
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleOutlineIcon />} // Add the icon here
                            onClick={() => navigate("/addproduct")}
                            sx={{
                                backgroundColor: 'crimson', // Apply background-color
                                fontFamily: '"El Messiri", sans-serif' // Apply font-family
                            }}
                        >
                            Add Product
                        </Button> */}

                        <Link to="/products" > <button color="inherit" className="login-btn" >Home</button> </Link>
                        <button color="inherit" className="signup-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </>
            ) : (
                <div className="login">
                    <Link to="/" > <button type="button" className="login-btn">Log in</button> </Link>
                    <Link to="/signup"> <button type="button" className="signup-btn">Sign Up</button> </Link>
                </div>
            )
            }



        </div >
    );
}
