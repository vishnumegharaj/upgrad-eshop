import React, { useEffect, useState } from "react";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'; // Import ToggleButtonGroup
import "./ManageProduct.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from "react-router-dom";

export default function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const navigate = useNavigate();

    // Function to set products in state
    async function loadProducts() {
        const url = "http://localhost:3001/api/v1/products";
        const response = await fetch(url);
        const result = await response.json();
        console.log("result", result);
        setProducts(result);
        console.log("products ", products)
    }
    useEffect(() => {
        loadProducts();
    }, []);

    const handleDeleteClick = (productId) => {
        setDeleteProductId(productId);
    };

    const handleConfirmDelete = async () => {
        // Implement delete functionality
        console.log("Deleting product with ID:", deleteProductId);
       

        fetch(`http://localhost:3001/api/v1/products/${deleteProductId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                return response.json();
            })
            .then(data => {
                console.log("Product deleted successfully", data);
               
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
            loadProducts();

            setDeleteProductId(null);
    };

    const handleCloseDialog = () => {
        setDeleteProductId(null);
    };

    return (
        <div className="cardContainer">
            {products.map(product => (
                <div key={product._id}>
                    <Card className="cardComponentt" sx={{ maxWidth: 345 }}>
                        <CardActionArea>

                            <CardMedia className="product-Image" image={product.imageURL} component="img" sizes="" alt="green iguana" />

                            <CardContent className="cardContent">

                                <Typography className="cardComponent" gutterBottom variant="h5" component="div" style={{ fontFamily: '"El Messiri", sans-serif', fontSize: '1.8rem', fontWeight: 'bold' }}>
                                    {product.name}
                                </Typography>

                                <Typography className="product-Prize" gutterBottom variant="h6" component="div" style={{ fontFamily: '"El Messiri", sans-serif', fontSize: '1.3rem', fontWeight: 'bold' }}>
                                    Price: {product.price}/-
                                </Typography>

                                <Typography className="product-Discription" variant="body2" color="text.secondary" style={{ fontFamily: '"El Messiri", sans-serif' }}>
                                    Description: {product.description}
                                </Typography>

                                <Typography className="product-Discription" variant="body2" color="text.secondary" style={{ fontFamily: '"El Messiri", sans-serif' }}>
                                    Available Items: {product.availableItems}
                                </Typography>

                                <div className="icons-container">
                                    <EditIcon className="edit-icon" onClick={(e) => {
                                        e.preventDefault(); // Prevent default button behavior
                                        e.stopPropagation(); // Stop event propagation
                                        navigate(`/modifyproduct/${product._id}`);// Implement edit functionality
                                    }} />
                                    <DeleteIcon className="delete-icon" onClick={(e) => {
                                        e.preventDefault(); // Prevent default button behavior
                                        e.stopPropagation(); // Stop event propagation
                                        // Implement delete functionality
                                        handleDeleteClick(product._id);
                                    }} />
                                </div>

                            </CardContent>

                        </CardActionArea>
                    </Card>
                </div>
            ))}

            {/* Delete confirmation dialog */}
            {deleteProductId && (
                <Dialog
                    open={true}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleConfirmDelete} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );

}