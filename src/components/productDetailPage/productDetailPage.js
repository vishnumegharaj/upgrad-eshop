// import { useSelector } from "react-redux";
import "./productDetailPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from "react-router-dom";
import { InsertEmoticon } from "@mui/icons-material";


export default function ProductDetailPage({ updateCart, updatePurchaseCount }) {
    // const productsList = useSelector(state => state.products);
    const [cart, setCart] = useState();
    var [purchaseCount, setPurchaseCount] = useState(1);

    const { productId } = useParams();
    console.log(productId);

    function increaseCount() {
        if(cart.availableItems > purchaseCount) {
            setPurchaseCount(prevCount => prevCount + 1);
        }
        else{
            alert("Only "+ cart.availableItems +" Items available");
        }
       
    }
    function decreaseCount() {
        if (purchaseCount <= 1) {

        }
        else {
            setPurchaseCount(prevCount => prevCount - 1);
        }

    }

    useEffect(() => {
        async function loadCart() {
            try {
                const response = await fetch("http://localhost:3001/api/v1/products/" + productId);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setCart(prevCart => {
                    // Debug: Log previous cart state
                    return result;
                });
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }

        loadCart();
    }, [productId]);

    useEffect(() => {
        // Call the update function from props to update the cart state in parent component
        updateCart(cart);
        // Call the update function from props to update the purchaseCount state in parent component
        updatePurchaseCount(purchaseCount);
    }, [cart, purchaseCount, updateCart, updatePurchaseCount]);


   

    return (
        <div className="center">
        <div className="cart">
            {cart && (
                <>

                    <img className="cart-image" src={cart.imageURL} />
                    <div className="space-inBetween">
                        <div>
                            <h2>{cart.name}</h2>
                            <h3>Price: {cart.price}/-</h3>
                            {cart.manufacturer &&(
                                <p> Manufacturer: {cart.manufacturer}</p>
                            )}
                            
                            <p> Description: {cart.description}</p>
                            <p> Available Items: {cart.availableItems}</p>

                        </div>
                        <div>
                            <p>Quantity:</p>
                            <span className="purchaseCount">
                                <RemoveIcon onClick={decreaseCount} />
                                <span style={{ margin: '0 15px' }}>{purchaseCount}</span>
                                <AddIcon onClick={increaseCount} />
                            </span>
                            <h3>Total: {purchaseCount * cart.price}</h3>
                            <Link to="/createOrder" > <button className="order-btn">Place Order</button> </Link> 
                        </div>

                    </div>
                </>
            )}
        </div>
        </div>


    )
}   