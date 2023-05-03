import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";

const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(20).required("Please Enter Your Name"),
  email: Yup.string().email().required("Plaese Enter Your Email"),
  password: Yup.string().min(6).required("Please Enter Your Password"),
  Cpassword: Yup.string()
    .required("Please Confirm Your Password")
    .oneOf([Yup.ref("password"), null], "Passwords Must Match"),
  address: Yup.string().required("Please Enter Your Address"),
  no: Yup.number().required("Please Enter Your Phone Number"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  Cpassword: "",
  address: "",
  no: "",
};

function SignUp() {
  const [password, setPassword] = useState(true);
  const [Cpassword, setCpassword] = useState(true);
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        const resData = await axios.post(
          "https://broadway.onrender.com/user/signup",
          values
        );
        toast(resData.data.message);

        if (resData.data.alert) {
          navigate("/login");
        }
      },
    });
  return (
    <div className="w-full flex justify-center bg-gray-200">
      <div className="my-10 bg-white w-full sm:w-2/3 md:w-1/2 lg:w-5/12 py-5 px-8">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="name" className="mt-5">
            Name
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? (
            <p className="text-xs text-red-600">{errors.name}</p>
          ) : null}
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
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </span>
          </div>
          {errors.password && touched.password ? (
            <p className="text-xs text-red-600">{errors.password}</p>
          ) : null}
          <label htmlFor="Cpassword" className="mt-5">
            Confirm Password
          </label>
          <div className="flex rounded bg-gray-300">
            <input
              className="p-2 bg-transparent outline-none w-full"
              type={Cpassword ? "password" : "text"}
              name="Cpassword"
              id="Cpassword"
              value={values.Cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span
              className="p-2 flex cursor-pointer"
              onClick={() => {
                setCpassword((password) => !password);
              }}
            >
              {Cpassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </span>
          </div>
          {errors.Cpassword && touched.Cpassword ? (
            <p className="text-xs text-red-600">{errors.Cpassword}</p>
          ) : null}
          <label htmlFor="no" className="mt-5">
            Phone Number
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="number"
            name="no"
            id="no"
            value={values.no}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.no && touched.no ? (
            <p className="text-xs text-red-600">{errors.no}</p>
          ) : null}
          <label htmlFor="address" className="mt-5">
            Address
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="text"
            name="address"
            id="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.address && touched.address ? (
            <p className="text-xs text-red-600">{errors.address}</p>
          ) : null}
          <button className="my-10 w-1/3 m-auto py-2 bg-yellow-500 rounded-full border-b-4 border-cyan-300">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
