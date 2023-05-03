import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-hot-toast";
function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getData() {
      const response = await axios.get(
        "https://broadway.onrender.com/user/users"
      );
      setData(response.data);
      console.log(response.data);
    }
    getData();
  }, []);

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://broadway.onrender.com/user/delete/${id}`
    );
    toast(response.data.message);
    window.location.reload();
  };

  return (
    <div className="p-10 min-h-screen">
      <h1 className="text-center text-3xl font-bold my-3">ALL USERS</h1>
      <table className="w-full border-2 border-black text-center">
        <tr className="border-2 border-black">
          <th className="border-2 border-black p-1 bg-yellow-500">#</th>
          <th className="border-2 border-black p-1 bg-yellow-500">User Name</th>
          <th className="border-2 border-black p-1 bg-yellow-500">
            Phone Number
          </th>
          <th className="border-2 border-black p-1 bg-yellow-500">Address</th>
          <th className="border-2 border-black p-1 bg-yellow-500">Password</th>
          <th className="border-2 border-black p-1 bg-yellow-500">Delete</th>
        </tr>
        {data.map((d, i) => (
          <tr>
            <td className="border-2 border-black p-1">{i + 1}</td>
            <td className="border-2 border-black p-1">{d.name}</td>
            <td className="border-2 border-black p-1">{d.no}</td>
            <td className="border-2 border-black p-1">{d.address}</td>
            <td className="border-2 border-black p-1 text-start">
              {d.password}
            </td>
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

export default Users;
