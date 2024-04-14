// AddProduct.js

import React, { useState } from "react";
import "./AddProduct.css";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        description: "",
        imageURL: "",
        manufacturer: "",
        price: 0,
        availableItems: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform submission logic, like sending data to server
        console.log("New Product Data:", newProduct);
        fetch('http://localhost:3001/api/v1/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create new product');
                }
                return response.json();
            })
            .then(data => {
                console.log("New product created successfully", data);
                navigate("/manageproducts");
                // Redirect or do something else
            })
            .catch(error => {
                console.error('Error creating new product:', error);
            });

    };

    return (
        <div className="add-product-container">
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="input-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category" className="input-label">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="input-label">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className="input-field"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="imageURL" className="input-label">Image URL:</label>
                    <input
                        type="text"
                        id="imageURL"
                        name="imageURL"
                        value={newProduct.imageURL}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="manufacturer" className="input-label">Manufacturer:</label>
                    <input
                        type="text"
                        id="manufacturer"
                        name="manufacturer"
                        value={newProduct.manufacturer}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price" className="input-label">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="availableItems" className="input-label">Available Items:</label>
                    <input
                        type="number"
                        id="availableItems"
                        name="availableItems"
                        value={newProduct.availableItems}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>
                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
    );
}
