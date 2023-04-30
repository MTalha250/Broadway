import React, { useContext, useEffect, useState } from "react";
import Order from "./PageComponents/Order";
import Nav from "./SubComponents/Nav";
import Footer from "./SubComponents/Footer";
import Cart from "./PageComponents/Cart";
import LogIn from "./PageComponents/LogIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./PageComponents/Home";
import Menu from "./PageComponents/Menu";
import Contact from "./PageComponents/Contact";
import SignUp from "./PageComponents/SignUp";
import { Toaster, toast } from "react-hot-toast";
import AddProduct from "./PageComponents/AddProduct";
import axios from "axios";
import { UserContext } from "./Context/UserContext";
import { CartContext } from "./Context/CartContext";
import Checkout from "./PageComponents/Checkout";
import jwt_decode from "jwt-decode";

function App() {
  const [cart, setCart] = useState("translate-y-full");
  const [data, setData] = useState([]);
  const [UsertData, setUserData] = useContext(UserContext);
  const [cartData, setCartData] = useContext(CartContext);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://broadway.onrender.com/product/products"
      );
      setData(response.data);
    }
    getData();
  }, []);

  const openCart = (data) => {
    setCart(data);
  };
  const closeCart = (data) => {
    setCart(data);
  };

  return (
    <div>
      <Router>
        <Nav getCart={openCart} />
        <Cart open={cart} getCart={closeCart} />
        <div className="mt-[65px] md:mt-0">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/order" element={<Order data={data} />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/menu" element={<Menu data={data} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            {UsertData?.email && (
              <Route path="/addProduct" element={<AddProduct />} />
            )}
            {UsertData?.email && cartData.length > 0 && (
              <Route path="/checkout" element={<Checkout />} />
            )}
          </Routes>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
