import React, { useContext } from "react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";

const contactSchema = Yup.object({
  name: Yup.string().required("Plaese Enter Your Name"),
  number: Yup.number().required("Plaese Enter Your Number"),
  message: Yup.string().required("Plaese Enter Your Message"),
});

function Contact() {
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        name: "",
        number: "",
        message: "",
      },
      validationSchema: contactSchema,
      onSubmit: async (values, action) => {
        const resData = await axios.post(
          "https://broadway.onrender.com/contact/addMessage",
          values
        );
        toast(resData.data.message);
        action.resetForm();
      },
    });

  return (
    <div className="p-5 md:p-10">
      <h1 className="font-bold text-center text-2xl mb-5">Contact Us</h1>
      <form
        className="flex flex-col p-5 md:p-10 border shadow-md rounded-lg border-gray-300"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-cyan-600 mb-2">
          Your Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="p-2 outline-none border border-gray-300 rounded font-light text-sm"
          placeholder="Type your name here..."
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label htmlFor="number" className="text-cyan-600 mb-2">
          Your Number:
        </label>
        <input
          type="number"
          id="number"
          name="number"
          className="p-2 outline-none border border-gray-300 rounded font-light text-sm"
          placeholder="Type your number here..."
          value={values.number}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label htmlFor="message" className="text-cyan-600 mb-2">
          Your Message:
        </label>
        <input
          type="text"
          id="message"
          name="message"
          className="p-2 outline-none border border-gray-300 rounded font-light text-sm"
          placeholder="Type your message here..."
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button className="w-full bg-yellow-500 py-2 my-5 rounded font-bold">
          Send Your Message
        </button>
      </form>
      <div className="text-sm md:text-base p-5 md:p-10 border shadow-md rounded-lg border-gray-300 my-5">
        <p className="font-bold text-lg">Broadway Pizza Pakistan</p>
        <p className="my-2">
          <b>UAN</b> <span className="text-orange-400">021111339339</span>
        </p>
        <p className="my-2">
          Whatsapp <span className="text-orange-400">+92 3244264800</span>
        </p>
        <p className="my-2">
          For any <b>general query</b> email us at:{" "}
          <span className="text-orange-400">Info@broadwaypizza.com.pk</span>
        </p>
        <p className="my-2">
          For any <b>franchise query</b> email us at:{" "}
          <span className="text-orange-400">
            Franchise@broadwaypizza.com.pk
          </span>
        </p>
        <p className="my-2">
          For any <b>marketing query</b> email us at:{" "}
          <span className="text-orange-400">
            Marketing@broadwaypizza.com.pk
          </span>
        </p>
      </div>
    </div>
  );
}

export default Contact;
