import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";
import { useFormik } from "formik";
import EastIcon from "@mui/icons-material/East";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const checkoutSchema = Yup.object({
  name: Yup.string().required("Plaese Enter Your Name"),
  no: Yup.string().required("Plaese Enter Your Number"),
  address: Yup.string().required("Plaese Enter Your Address"),
});
function Checkout() {
  const [userData, setUserData] = useContext(UserContext);
  const [cartData, setCartData] = useContext(CartContext);
  const navigate = useNavigate();

  const handleTotal = () => {
    let total = 0;
    cartData.map((item) => (total = total + item.tprice));
    return total;
  };

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        name: userData.name,
        no: userData.no,
        address: userData.address,
        instructions: "",
      },
      validationSchema: checkoutSchema,
      onSubmit: async (values, action) => {
        const resData = await axios.post(
          "https://broadway.onrender.com/order/addOrder",
          {
            ...values,
            order: cartData,
            price: handleTotal() + Math.round(handleTotal() * 0.16) + 50,
          }
        );
        toast(resData.data.message);
        navigate("/order");
        setCartData([]);
        localStorage.removeItem("cart");
      },
    });

  return (
    <div className="flex flex-col md:flex-row w-full px-5 lg:px-10">
      <div className="w-full md:w-1/2 lg:w-3/5">
        <h1 className="font-bold my-5 text-3xl text-center">Checkout</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="name" className="text-cyan-600 mb-2">
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-2 outline-none border border-gray-300 rounded font-light text-sm"
            placeholder="Type your name here..."
          />
          {errors.name && touched.name ? (
            <p className="text-xs text-red-600">{errors.email}</p>
          ) : null}
          <label htmlFor="no" className="text-cyan-600 mb-2">
            Phone Number:
          </label>
          <input
            type="number"
            value={values.no}
            onChange={handleChange}
            onBlur={handleBlur}
            id="no"
            name="no"
            className="p-2 outline-none border border-gray-300 rounded font-light text-sm"
            placeholder="Type your phone number here..."
          />
          {errors.no && touched.no ? (
            <p className="text-xs text-red-600">{errors.no}</p>
          ) : null}
          <label htmlFor="address" className="text-cyan-600 mb-2">
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            name="address"
            className="p-2 outline-none border border-gray-300 rounded font-light text-sm"
            placeholder="Type your address here..."
          />
          {errors.address && touched.address ? (
            <p className="text-xs text-red-600">{errors.address}</p>
          ) : null}
          <label htmlFor="instructions" className="text-cyan-600 mb-2">
            Special Instructions:
          </label>
          <input
            type="text"
            id="instructions"
            name="instructions"
            value={values.instructions}
            onChange={handleChange}
            onBlur={handleBlur}
            className="p-2 outline-none border border-gray-300 rounded font-light text-sm"
            placeholder="Type special instructions here..."
          />
          <p className="text-cyan-600 my-2">Payment</p>
          <p className="my-2 border-y py-2">
            <input type="radio" defaultChecked className="mx-2" />
            Cash
          </p>
          <button className="w-full bg-yellow-500 py-2 my-5 border-x-4 border-white rounded-full font-bold">
            Place Your Order &nbsp;
            <EastIcon />
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/5 p-2 md:p-10">
        {cartData.map((c, i) => (
          <div className="border border-black p-3 rounded-lg my-2" key={i}>
            <h1 className="flex justify-between w-full mb-3">
              <span className="font-bold">{c.name}</span>
              <span className="text-sm">
                Rs {c.price} x {c.qty}
              </span>
            </h1>
            <p className="text-xs font-light text-[11px]">CRUST: {c.crust}</p>
            {c.size && (
              <p className="text-xs font-light text-[11px]">SIZE: {c.size}</p>
            )}
            {c.flavor && (
              <p className="text-xs font-light text-[11px]">
                FLAVOR: {c.flavor}
              </p>
            )}
            {c.drink && (
              <p className="text-xs font-light text-[11px]">DRINK: {c.drink}</p>
            )}
            {c.dip && (
              <p className="text-xs font-light text-[11px]">DIP: {c.dip}</p>
            )}
            {c.extra && (
              <p className="text-xs font-light text-[11px]">
                EXTRA TOPPING: {c.extra}
              </p>
            )}
          </div>
        ))}
        <div className="mt-20">
          <div>
            <p className="text-sm font-light flex justify-between px-2 py-1">
              <span>Subtotal:</span>
              <span>Rs {handleTotal()}</span>
            </p>
            <p className="text-sm font-light flex justify-between px-2 py-1">
              <span>GST(16%):</span>
              <span>Rs {Math.round(handleTotal() * 0.16)}</span>
            </p>
            <p className="text-sm font-light flex justify-between px-2 py-1">
              <span>Delivery:</span>
              <span>Rs 50</span>
            </p>
            <p className="text-sm font-bold flex justify-between px-2 py-2">
              <span>Total:</span>
              <span>
                Rs {handleTotal() + Math.round(handleTotal() * 0.16) + 50}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
