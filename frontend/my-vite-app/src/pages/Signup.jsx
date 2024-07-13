import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName,
        lastName,
        username,
        password,
      });
      console.log({ res });
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message ?? "logged in successfully!");
    } catch (error) {
      console.log({ error });
      toast.error(error?.response?.data?.message ?? "Something Went Wrong");
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center my-52">
      <h1 className="text-3xl font-bold">Signup Page</h1>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter First Name"
          className="border"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Last Name"
          className="border"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Email"
          className="border"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Password"
          className="border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="bg-black text-white"
          onClick={handleSubmit}
        >
          Signup
        </button>
        <span>
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Signin
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
