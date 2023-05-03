import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-hot-toast";
function Orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getData() {
      const response = await axios.get(
        "https://broadway.onrender.com/order/orders"
      );
      setData(response.data);
      console.log(response.data);
    }
    getData();
  }, []);

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://broadway.onrender.com/order/delete/${id}`
    );
    toast(response.data.message);
    window.location.reload();
  };

  return (
    <div className="p-10 min-h-screen">
      <h1 className="text-center text-3xl font-bold my-3">ALL ORDERS</h1>
      <table className="w-full border-2 border-black text-center">
        <tr className="border-2 border-black">
          <th className="border-2 border-black p-1 bg-yellow-500">#</th>
          <th className="border-2 border-black p-1 bg-yellow-500">
            Customer Name
          </th>
          <th className="border-2 border-black p-1 bg-yellow-500">
            Phone Number
          </th>
          <th className="border-2 border-black p-1 bg-yellow-500">Address</th>
          <th className="border-2 border-black p-1 bg-yellow-500">Order</th>
          <th className="border-2 border-black p-1 bg-yellow-500">
            Special Instructions
          </th>
          <th className="border-2 border-black p-1 bg-yellow-500">Total</th>
          <th className="border-2 border-black p-1 bg-yellow-500">Delete</th>
        </tr>
        {data.map((d, i) => (
          <tr>
            <td className="border-2 border-black p-1">{i + 1}</td>
            <td className="border-2 border-black p-1">{d.name}</td>
            <td className="border-2 border-black p-1">{d.no}</td>
            <td className="border-2 border-black p-1">{d.address}</td>
            <td className="border-2 border-black p-1 leading-4 text-sm">
              {d.order.map((o) => (
                <div className="relative">
                  <button className="peer">
                    {o.name} ({o.qty})
                  </button>
                  <div className="text-start border-2 border-black p-1 hidden peer-focus:flex bg-white absolute top-0 left-0  w-[120%] justify-between z-50 text-xs">
                    <div>
                      <p className="font-light my-0">CRUST: {o.crust}</p>
                      {o.size && (
                        <p className="font-light my-0">SIZE: {o.size}</p>
                      )}
                      {o.flavor && (
                        <p className="font-light my-0">FLAVOR: {o.flavor}</p>
                      )}
                      {o.drink && (
                        <p className="font-light my-0">DRINK: {o.drink}</p>
                      )}
                      {o.dip && <p className="font-light my-0">DIP: {o.dip}</p>}
                      {o.extra && (
                        <p className="font-light my-0">
                          EXTRA TOPPING: {o.extra}
                        </p>
                      )}
                    </div>
                    <p>Rs. {o.tprice}</p>
                  </div>
                </div>
              ))}
            </td>
            <td className="border-2 border-black p-1">
              {d.instructions ? d.instructions : "None"}
            </td>
            <td className="border-2 border-black p-1">Rs. {d.price}</td>
            <td className="border-2 border-black p-1">
              <DeleteForeverIcon
                className="cursor-pointer"
                onClick={() => handleDelete(d._id)}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Orders;
