import Tile from "../components/Tile";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  let totalAmount;

  users.forEach((item) => {
    totalAmount;
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${filter}`
      );
      console.log({ response });
      setUsers(response?.data?.user);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full bg-gray-100 flex flex-row justify-between h-14 p-4">
        <span className="text-xl font-bold">Paytm</span>
        <div className="flex flex-row gap-3 items-center">
          <span>Hello, user</span>
          <button className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
            U
          </button>
        </div>
      </div>
      <hr />
      <div className="flex gap-3 px-3 items-center">
        <span className="text-xl font-bold">Your Balance:</span>
        <span className="text-lg">$5000</span>
      </div>
      <span className="text-2xl font-bold px-3">Users</span>
      <input
        type="text"
        placeholder="Search Users"
        className="border rounded-sm mx-3 px-3 py-1 border-gray-300"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="flex flex-col gap-1">
        {users.map((item) => {
          return (
            <Tile
              key={item?._id}
              name={`${item?.firstName} ${item?.lastName}`}
              id={item?._id}
              firstName={item?.firstName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
