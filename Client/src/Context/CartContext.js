import { createContext, useEffect, useState } from "react";

const CartContext = createContext([]);

const CartState = (props) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let existingData = localStorage.getItem("cart");
    if (existingData) setCartData(JSON.parse(existingData));
  }, []);

  return (
    <CartContext.Provider value={[cartData, setCartData]}>
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartState };
