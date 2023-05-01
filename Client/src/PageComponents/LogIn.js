import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../Context/UserContext";

const loginSchema = Yup.object({
  email: Yup.string().email().required("Plaese Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password"),
});

const initialValues = {
  email: "",
  password: "",
};

function LogIn() {
  const [password, setPassword] = useState(true);
  const [userData, setUserData] = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        const resData = await axios.post(
          "https://broadway.onrender.com/user/login",
          values
        );
        toast(resData.data.message);
        if (resData.data.alert) {
          setUserData(resData.data.userData);
          localStorage.setItem("User", JSON.stringify(resData.data.userData));
          navigate("/order");
        }
      },
    });

  return (
    <div className="w-full flex justify-center bg-gray-200">
      <div className="my-10 bg-white  w-full sm:w-2/3 md:w-1/2 lg:w-5/12 pt-5 px-8">
        <h1 className="text-3xl font-bold text-center">Log In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email" className="mt-5">
            Email
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <p className="text-xs text-red-600">{errors.email}</p>
          ) : null}
          <label htmlFor="password" className="mt-5">
            Password
          </label>
          <div className="flex rounded bg-gray-300">
            <input
              className="p-2 bg-transparent outline-none w-full"
              type={password ? "password" : "text"}
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span
              className="p-2 flex cursor-pointer"
              onClick={() => {
                setPassword((password) => !password);
              }}
            >
              {password ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </span>
          </div>
          {errors.password && touched.password ? (
            <p className="text-xs text-red-600">{errors.password}</p>
          ) : null}
          <button className="my-10 w-1/3 m-auto py-2 bg-yellow-500 rounded-full border-b-4 border-cyan-300">
            Log In
          </button>
        </form>
        <p className="my-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-yellow-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
