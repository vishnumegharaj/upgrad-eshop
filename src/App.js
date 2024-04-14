import './App.css';
import NavigationBar from './components/navigationbar/navigationBar';
import Productspage from './components/products/productspage';
import ShoppingCartFlow from './components/ShoppingCartFlow/shoppingCartFlow';
import ProductDetailPage from './components/productDetailPage/productDetailPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <ShoppingCartFlow/>
      </Router>
    </div>
  );
}

export default App;
