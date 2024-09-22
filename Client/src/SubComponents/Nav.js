import React, { useContext, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";
import { toast } from "react-hot-toast";
import jwt_decode from "jwt-decode";
import SegmentSharpIcon from "@mui/icons-material/SegmentSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ListAltSharpIcon from "@mui/icons-material/ListAltSharp";
import RestaurantMenuSharpIcon from "@mui/icons-material/RestaurantMenuSharp";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";

function Nav(props) {
  const [userData, setUserData] = useContext(UserContext);
  const [cartData, setCartData] = useContext(CartContext);
  const [slider, setSlider] = useState("scale-x-0");

  const handleCart = () => {
    props.getCart("translate-y-0");
  };
  const [login, setLogin] = useState(false);

  const handleLogout = () => {
    if (userData) {
      let decoded = jwt_decode(userData.token);
      if (decoded.exp * 1000 < Date.now()) {
        setUserData("");
        setCartData([]);
        localStorage.removeItem("User");
        localStorage.removeItem("cart");
        toast("Session Time Expired");
      }
    }
  };

  return (
    <div>
      <div className="z-20 bg-white w-full fixed top-0 flex justify-between py-1 sm:py-2 px-3 border-b shadow-2xl shadow-white">
        <div className="flex items-center text-gray-500">
          <button
            className="md:hidden scale-125 mr-2"
            onClick={() => {
              setSlider("scale-x-100");
            }}
          >
            <SegmentSharpIcon />
          </button>

          <Link to="/">
            <div>
              <img
                src="https://www.broadwaypizza.com.pk/assets/broadwayPizzaLogo.png"
                alt=""
                className="w-32"
              />
            </div>
          </Link>
        </div>
        <img
          src="https://www.broadwaypizza.com.pk/assets/header-broadway-image.jpg"
          alt=""
          className="w-[22rem] hidden md:block"
        />
        <div className="self-center flex relative">
          <button
            className="px-3 py-2 bg-yellow-500 sm:mx-2 rounded-full border-b-4 border-cyan-300 scale-75 sm:scale-100 text-sm relative"
            onClick={() => {
              handleCart();
              handleLogout();
            }}
          >
            <ShoppingCartOutlinedIcon />
            <span className="text-xs bg-orange-500 text-white font-semibold  rounded-full absolute -top-1 -right-1 w-5/12 h-5/12 border">
              {cartData?.length}
            </span>
          </button>
          <button className="px-4 py-2 bg-yellow-500 rounded-full scale-75 sm:scale-100  border-b-4 border-cyan-300">
            {!userData ? (
              <PersonOutlineOutlinedIcon
                onClick={() => {
                  setLogin((login) => !login);
                }}
              />
            ) : (
              <span
                className="font-bold text-lg"
                onClick={() => {
                  setLogin((login) => !login);
                }}
              >
                {userData?.name[0]}
              </span>
            )}

            {login && (
              <div className="bg-white absolute bottom-0 right-0 border drop-shadow translate-y-full">
                {!userData ? (
                  <Link
                    to="/login"
                    className="text-sm border-b w-full text-start p-1 block whitespace-nowrap"
                    onClick={() => {
                      setLogin(false);
                    }}
                  >
                    Log In
                  </Link>
                ) : (
                  <span
                    className="text-sm border-b w-full text-start p-1 block whitespace-nowrap"
                    onClick={() => {
                      setUserData("");
                      setCartData([]);
                      localStorage.removeItem("User");
                      localStorage.removeItem("cart");
                      toast("Logged Out Successfully");
                      setLogin(false);
                    }}
                  >
                    Log Out
                  </span>
                )}
                {userData.email === "talhabinay@gmail.com" && (
                  <Link
                    to="/addProduct"
                    className="text-sm p-1 block whitespace-nowrap text-start border-b"
                    onClick={() => {
                      setLogin(false);
                      handleLogout();
                    }}
                  >
                    Add Product
                  </Link>
                )}
                {userData.email === "talhabinay@gmail.com" && (
                  <Link
                    to="/orders"
                    className="text-sm p-1 block whitespace-nowrap text-start border-b"
                    onClick={() => {
                      setLogin(false);
                      handleLogout();
                    }}
                  >
                    Orders
                  </Link>
                )}
                {userData.email === "talhabinay@gmail.com" && (
                  <Link
                    to="/users"
                    className="text-sm p-1 block whitespace-nowrap text-start"
                    onClick={() => {
                      setLogin(false);
                      handleLogout();
                    }}
                  >
                    Users
                  </Link>
                )}
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="hidden md:flex w-full mt-24 border-b flex justify-between items-center px-5">
        <ul className="flex my-2">
          <li className="mx-2.5">
            <Link
              to="/"
              className="no-underline text-black font-light text-sm"
              onClick={handleLogout}
            >
              Home
            </Link>
          </li>
          <li className="mx-2.5">
            <Link
              to="/order"
              className="no-underline text-black font-light text-sm"
              onClick={handleLogout}
            >
              Order Now
            </Link>
          </li>
          <li className="mx-2.5">
            <Link
              to="/menu"
              className="no-underline text-black font-light text-sm"
              onClick={handleLogout}
            >
              Menu
            </Link>
          </li>
          <li className="mx-2.5">
            <Link
              to="/contact"
              className="no-underline text-black font-light text-sm"
              onClick={handleLogout}
            >
              Contact
            </Link>
          </li>
        </ul>
        {userData && (
          <div className="flex items-center">
            <div>
              <p className="my-0 text-sm text-gray-600 text-right">Delivery</p>
              <p className="my-0 text-xs font-semibold">{userData.address}</p>
            </div>
            <div className="bg-yellow-500 p-2 m-2 rounded-full">
              <LocationOnIcon />
            </div>
          </div>
        )}
      </div>
      <div
        className={
          "md:hidden w-2/3 sm:w-1/3 h-screen fixed bg-white z-50 top-0 left-0 transition origin-left duration-300 " +
          slider
        }
      >
        <div className="flex justify-between p-3">
          <img
            src="https://www.broadwaypizza.com.pk/assets/broadwayPizzaLogo.png"
            alt=""
            className="w-1/2"
          />
          <CloseIcon
            onClick={() => {
              setSlider("scale-x-0");
            }}
          />
        </div>
        <ul className="my-2 p-3">
          <li className="m-3 border-b">
            <Link
              to="/"
              className="no-underline text-black font-light text-sm"
              onClick={() => {
                handleLogout();
                setSlider("scale-x-0");
              }}
            >
              <HomeSharpIcon /> Home
            </Link>
          </li>
          <li className="m-3 border-b">
            <Link
              to="/order"
              className="no-underline text-black font-light text-sm"
              onClick={() => {
                handleLogout();
                setSlider("scale-x-0");
              }}
            >
              <ListAltSharpIcon /> Order Now
            </Link>
          </li>
          <li className="m-3 border-b">
            <Link
              to="/menu"
              className="no-underline text-black font-light text-sm"
              onClick={() => {
                handleLogout();
                setSlider("scale-x-0");
              }}
            >
              <RestaurantMenuSharpIcon /> Menu
            </Link>
          </li>
          <li className="m-3">
            <Link
              to="/contact"
              className="no-underline text-black font-light text-sm"
              onClick={() => {
                handleLogout();
                setSlider("scale-x-0");
              }}
            >
              <CallIcon /> Contact
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default Nav;
