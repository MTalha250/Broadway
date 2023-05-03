import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function AddProduct() {
  const [img, setImg] = useState();
  const [data, setData] = useState({
    img: "",
    name: "",
    price: "",
    prePrice: "",
    sale: "",
    no: "",
    description: "",
    ingredients: "",
    category: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", data.img);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("prePrice", data.prePrice);
    formData.append("sale", data.sale);
    formData.append("no", data.no);
    formData.append("description", data.description);
    formData.append("ingredients", data.ingredients);
    formData.append("category", data.category);

    const resData = await axios.post(
      "https://broadway.onrender.com/product/addProduct",
      formData
    );
    toast(resData.data.message);
    setData((prev) => {
      return {
        ...prev,
        img: "",
        ingredients: "",
        name: "",
      };
    });
    setImg("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: files[0],
      };
    });

    const imgData = new FileReader();
    imgData.readAsDataURL(files[0]);
    imgData.addEventListener("load", () => {
      setImg(imgData.result);
    });
  };

  return (
    <div className="w-full flex justify-center bg-gray-200">
      <div className="my-10 bg-white w-full sm:w-2/3 md:w-1/2 lg:w-5/12 py-5 px-8">
        <h1 className="text-3xl font-bold text-center">Add Product</h1>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="img" className="mt-3">
            Image
          </label>
          <div className="h-52">
            {!data.img ? (
              <input
                className="bg-gray-300 p-2 rounded outline-none w-full h-full"
                type="file"
                name="img"
                accept="image/*"
                id="img"
                value={data.img}
                onChange={handleImage}
              />
            ) : (
              <img src={img} className="w-full h-full object-contain" />
            )}
          </div>

          <label htmlFor="name" className="mt-3">
            Name
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="text"
            name="name"
            id="name"
            value={data.name}
            onChange={handleChange}
          />
          <label htmlFor="price" className="mt-3">
            Sale Price
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="number"
            name="price"
            id="price"
            value={data.price}
            onChange={handleChange}
          />
          <label htmlFor="prePrice" className="mt-3">
            Official Price
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="number"
            name="prePrice"
            id="prePrice"
            value={data.prePrice}
            onChange={handleChange}
          />
          <label htmlFor="sale" className="mt-3">
            Sale
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="number"
            name="sale"
            id="sale"
            value={data.sale}
            onChange={handleChange}
          />
          <label htmlFor="no" className="mt-3">
            For Persons
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="number"
            name="no"
            id="no"
            value={data.no}
            onChange={handleChange}
          />
          <label htmlFor="description" className="mt-3">
            Description
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="text"
            name="description"
            id="description"
            value={data.description}
            onChange={handleChange}
          />
          <label htmlFor="ingredients" className="mt-3">
            Ingredients
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="text"
            name="ingredients"
            id="ingredients"
            value={data.ingredients}
            onChange={handleChange}
          />
          <label htmlFor="category" className="mt-3">
            Category
          </label>
          <input
            className="bg-gray-300 p-2 rounded outline-none"
            type="text"
            name="category"
            id="category"
            value={data.category}
            onChange={handleChange}
          />
          <button className="my-5 sm:w-1/3 m-auto p-2 bg-yellow-500 rounded-full border-b-4 border-cyan-300 whitespace-nowrap">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
