import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CartContext } from "../../Context/CartContext";

function CartItem(props) {
  const [cartData, setCartData] = useContext(CartContext);

  const handleDelete = (id) => {
    let itemId = cartData.findIndex((item) => item.id === id);
    cartData.splice(itemId, 1);
    setCartData([...cartData]);
    localStorage.setItem("cart", JSON.stringify([...cartData]));
  };

  const handleIncrement = (id) => {
    let itemId = cartData.findIndex((item) => item.id === id);
    cartData[itemId] = {
      ...cartData[itemId],
      tprice: props.tprice + props.price,
      qty: props.qty + 1,
    };
    setCartData([...cartData]);
    localStorage.setItem("cart", JSON.stringify([...cartData]));
  };
  const handleDecrement = (id) => {
    if (props.qty > 1) {
      let itemId = cartData.findIndex((item) => item.id === id);
      cartData[itemId] = {
        ...cartData[itemId],
        tprice: props.tprice - props.price,
        qty: props.qty - 1,
      };
      setCartData([...cartData]);
      localStorage.setItem("cart", JSON.stringify([...cartData]));
    }
  };

  return (
    <div className="my-2">
      <div>
        <div className="flex w-full border-b py-2 relative">
          <img
            src={props.img}
            alt=""
            className="w-[25%] sm:w-[20%] md:w-[12%] h-full"
          />
          <div className="text-xs mx-2 flex flex-col justify-center">
            <p className="font-bold text-[16px] mb-1 md:text-lg">
              {props.name}
            </p>
            <div>
              <p className="text-xs font-light my-0 leading-3 md:leading-4 text-[8px] md:text-[10px]">
                CRUST: {props.crust}
              </p>
              {props.size && (
                <p className="text-xs font-light my-0 leading-3 md:leading-4 text-[8px] md:text-[10px]">
                  SIZE: {props.size}
                </p>
              )}
              {props.flavor && (
                <p className="text-xs font-light my-0 leading-3 md:leading-4 text-[8px] md:text-[10px]">
                  FLAVOR: {props.flavor}
                </p>
              )}
              {props.drink && (
                <p className="text-xs font-light my-0 leading-3 md:leading-4 text-[8px] md:text-[10px]">
                  DRINK: {props.drink}
                </p>
              )}
              {props.dip && (
                <p className="text-xs font-light my-0 leading-3 md:leading-4 text-[8px] md:text-[10px]">
                  DIP: {props.dip}
                </p>
              )}
              {props.extra && (
                <p className="text-xs font-light my-0 leading-3 md:leading-4 text-[8px] md:text-[10px]">
                  EXTRA TOPPING: {props.extra}
                </p>
              )}
            </div>
          </div>

          <CloseIcon
            className="cursor-pointer absolute text-red-500 right-2 top-2"
            onClick={() => handleDelete(props.id)}
          />
        </div>
        <div className="flex justify-between p-2">
          <div className="border shadow rounded-md">
            <button
              className="px-3 text-sm"
              onClick={() => handleDecrement(props.id)}
            >
              -
            </button>
            <span className="border-x px-3 py-1 text-xs">{props.qty}</span>
            <button
              className="px-3 text-sm"
              onClick={() => handleIncrement(props.id)}
            >
              +
            </button>
          </div>
          <span className="text-sm">Rs {props.tprice}</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
