import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./CreateOrder.css";
import { Link, useNavigate } from "react-router-dom";


const steps = ['Product Details', 'Add Address', 'Review Order'];

export default function CreateOrder(cart, purchaseCount) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        city: "",
        landmark: "",
        street: "",
        state: "",
        zipCode: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(formData);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, such as sending data to a backend server
        console.log(formData);
        // Reset the form after submission
        setFormData({
            name: "",
            contactNumber: "",
            city: "",
            landmark: "",
            street: "",
            state: "",
            zipCode: ""
        });
    };


    useEffect(() => {
        async function loadadress() {

        }

    })

    const isStepOptional = (step) => {

    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if (activeStep === 1 && Object.values(formData).some(value => value === "")) {
            // Alert the user to fill in the address details
            alert("Please fill in all address fields before proceeding.");
            return;
        }
        if (activeStep === steps.length - 1) {
            handlePlaceOrder(); // Update 'path-to-your-page' with the actual path
        } else {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const renderproductDetails = () => {
        return (

            <div >
                <div className='detail'>
                    {cart && (
                        <>

                            <img className="image" src={cart.cart.imageURL} />

                            <div>
                                <h2>{cart.cart.name}</h2>

                                <h3>Price: {cart.cart.price}/-</h3>
                                {cart.cart.manufacturer && (
                                    <p> Manufacturer: {cart.cart.manufacturer}</p>
                                )}

                                <p> Description: {cart.cart.description}</p>
                                <p> Quantity: {cart.purchaseCount}</p>
                                <h3>Total: {cart.purchaseCount * cart.cart.price}</h3>

                            </div>



                        </>
                    )}
                </div>
            </div>


        )

    }


    const renderStepContent = () => {

        // STEP-1 showing details of product selected by user 
        if (activeStep === 0) {
            return renderproductDetails();
        }

        // STEP-2 ADDRESS
        if (activeStep === 1) {
            return (
                <form className="address-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="contactNumber">Contact Number:</label>
                        <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="landmark">Landmark:</label>
                        <input
                            type="text"
                            id="landmark"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="street">Street:</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="input-container">
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="zipCode">Zip Code:</label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                        />
                    </div>

                </form>
            );
        }


        // STEP-3 conform order 
        if (activeStep === 2) {
            return (
                <>


                    {renderproductDetails()}
                    <div className='address-details'>
                        <div className="review-item">
                            <p>
                                <span className="label">Name:</span> <span className="value">{formData.name}</span>
                            </p>
                        </div>
                        <div className="review-item">
                            <p>
                                <span className="label">Contact Number:</span> <span className="value">{formData.contactNumber}</span>
                            </p>
                        </div>
                        <div className="review-item">
                            <p>
                                <span className="label">City:</span> <span className="value">{formData.city}</span>
                            </p>
                        </div>
                        <div className="review-item">
                            <p>
                                <span className="label">Landmark:</span> <span className="value">{formData.landmark}</span>
                            </p>
                        </div>
                        <div className="review-item">
                            <p>
                                <span className="label">Street:</span> <span className="value">{formData.street}</span>
                            </p>
                        </div>
                        <div className="review-item">
                            <p>
                                <span className="label">State:</span> <span className="value">{formData.state}</span>
                            </p>
                        </div>
                        <div className="review-item">
                            <p>
                                <span className="label">Zip Code:</span> <span className="value">{formData.zipCode}</span>
                            </p>
                        </div>
                    </div>
                </>
            );
        }
    };

    async function handlePlaceOrder() {
        const id = cart.cart._id.toString();
        const quantity = cart.cart.purchaseCount;
        const { name, contactNumber, city, landmark, street, state, zipCode } = formData;
        const accessToken = localStorage.getItem('accessToken');

        try {
            const addressResponse = await fetch('http://localhost:3001/api/v1/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': accessToken
                },
                body: JSON.stringify(formData)
            });
            if (!addressResponse.ok) {
                console.error('Failed to add address');
                return;
            }



            // Call API to create order
            const orderResponse = await fetch('http://localhost:3001/api/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': accessToken
                },
                body: JSON.stringify({
                    id,
                    quantity,
                    formData
                })
            });
            // const errorData = await orderResponse.json();
            // console.error('Failed to create order:', errorData);
            // if (!orderResponse.ok) {
            //     console.log(id);
            //     const contentType = orderResponse.headers.get('content-type');
            //     if (contentType && contentType.includes('application/json')) {
            //         // Parse JSON error response
            //         const errorData = await orderResponse.json();
            //         console.error('Failed to create order:', errorData);
            //     } else {
            //         // Handle non-JSON response
            //         const errorText = await orderResponse.text();
            //         console.error('Failed to create order. Non-JSON response:', errorText);
            //     }
            //     return;
            // }
            

            // // Redirect to orders page
            navigate("/products");
            alert('Your order is confirmed.');
        }
        catch (error) {
            console.log(error)
            console.log("error")
        }



    }

    async function OrderHandler(event) {
        const { name, contactNumber, city, landmark, street, state, zipCode } = formData;
        const accessToken = localStorage.getItem('accessToken');


        console.log("address completed, ordercalling")

        const id = cart.cart._id.toString();
        const quantity = cart.cart.purchaseCount;
        const selectedAddress = {
            name,
            contactNumber,
            city,
            landmark,
            street,
            state,
            zipCode
        };

        try {
            const rawResponse = await fetch('http://localhost:3001/api/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': accessToken
                },
                body: JSON.stringify({
                    product: id,
                    quantity: quantity,
                    address: selectedAddress
                }),
            });

            // Handle the response from the server
            if (rawResponse.ok) {
                // Successful order place
                alert("Order Confirmed");
                navigate("/Products");
            } else {
                const response = await rawResponse.text();
                // Handle errors from the server
                alert(response);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error adding order:', error);
        }

    }


    return (
        <div className='stepper'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>

            <div className='centre'>
                {renderStepContent()}
            </div>
        </div>
    );
}