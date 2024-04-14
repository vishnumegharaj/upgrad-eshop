import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./ModifyProduct.css";
import { Link, useNavigate } from "react-router-dom";

export default function ModifyProduct() {
    const navigate = useNavigate();

    const [product, setProduct] = useState();
    const { productId } = useParams();
    console.log(productId);

     // Function to handle input field changes and update product state
     const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        
    };

    useEffect(() => {
        console.log(product);
    }, [product]);


    async function loadProduct() {
        const url = "http://localhost:3001/api/v1/products/" + productId;
        const response = await fetch(url);
        const result = await response.json();
        console.log("result", result);
        setProduct(result);
        console.log("products ", product)
    }
    useEffect(() => {
        loadProduct();
    }, []);

    async function handleupdateProduct(e) {
        e.preventDefault(); // Prevent default button behavior
        console.log("prod inside handler", product)
      
    
        fetch(`http://localhost:3001/api/v1/products/${productId}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(product)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            return response.json();
            
        })
        .then(data =>{
            console.log("data",data);
            navigate("/manageproducts");
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <div className="modify-product-container">
            <h1 className="title">Modify Product:</h1>
            <form className="form-container" >
                <div className="input-container">
                    <label htmlFor="name" className="label">Name:</label>
                    <input type="text" id="name" name="name" value={product ? product.name : ''} className="input-field"  onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="category" className="label">Category:</label>
                    <input type="text" id="category" name="category" value={product ? product.category : ''} className="input-field" onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="price" className="label">Price:</label>
                    <input type="number" id="price" name="price" value={product ? product.price : ''} className="input-field" onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="description" className="label">Description:</label>
                    <textarea id="description" name="description" value={product ? product.description : ''} className="input-field" onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="manufacturer" className="label">Manufacturer:</label>
                    <input type="text" id="manufacturer" name="manufacturer" value={product ? product.manufacturer : ''} className="input-field" onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="availableItems" className="label">Available Items:</label>
                    <input type="number" id="availableItems" name="availableItems" value={product ? product.availableItems : ''} className="input-field" onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="imageURL" className="label">Image URL:</label>
                    <input type="text" id="imageURL" name="imageURL" value={product ? product.imageURL : ''} className="input-field" onChange={handleInputChange} />
                </div>
                <button type="submit" className="submit-button" onClick={handleupdateProduct} >Update</button>
            </form>
        </div>
    );
}