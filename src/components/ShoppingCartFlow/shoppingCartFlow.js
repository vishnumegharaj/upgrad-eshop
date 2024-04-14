/* This component will render below All component 
*/
import Productspage from "../products/productspage";
import ProductDetailPage from "../productDetailPage/productDetailPage";
import SignUpForm from "../../common/SignUpForm";
import SignInForm from "../../common/SignInForm";
import NavigationBar from '../navigationbar/navigationBar';
import CreateOrder from "../CreateOrder/CreateOrder";
import ManageProduct from "../ManageProduct/ManageProduct";
import ModifyProduct from "../ModifyProduct/ModifyProduct";
import AddProduct from "../AddProduct/AddProduct";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import productStore from "../product-store/product-store";
import { useSelector } from "react-redux";

export default function ShoppingCartFlow() {
  
    const navigate = useNavigate();
    function navigateToProductDetail(productId) {
        navigate(`/ProductDetail/${productId}`);
        console.log("shopingcart cart", cart);

    }

    const [cart, setCart] = useState(null);
    const [purchaseCount, setPurchaseCount] = useState(1);

    // Function to update cart state
    const updateCart = (newCart) => {
        setCart(newCart);
        console.log("cart",cart);
    };

    // Function to update purchaseCount state
    const updatePurchaseCount = (count) => {
        setPurchaseCount(count);
        console.log("count", count);
    };

    return (
        <div>
            <NavigationBar />
            <Routes>
                <Route exact path='/' element={<SignInForm />} />
                <Route exact path='/signup' element={<SignUpForm />} />
                <Route exact path='/products' element={<Productspage navigateToProductDetail={navigateToProductDetail} />} />
                <Route exact path='/ProductDetail/:productId' element={<ProductDetailPage updateCart={updateCart} updatePurchaseCount={updatePurchaseCount} />} />
                <Route exact path="/createOrder" element={<CreateOrder cart={cart} purchaseCount={purchaseCount} />} />
                <Route exact path="/manageproducts" element = { <ManageProduct/> }  />
                <Route exact path="/modifyproduct/:productId" element = { <ModifyProduct/> }  />
                <Route exact path="/addproduct" element = { <AddProduct/> }  />

            </Routes>

        </div>
    )
}