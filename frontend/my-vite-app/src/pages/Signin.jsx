import { Link } from "react-router-dom";
const Signin = () => {
  return (
    <div className="flex flex-col gap-5 items-center my-52">
      <h1 className="text-3xl font-bold">Signin Page</h1>
      <div className="flex flex-col gap-3">
        <input type="text" placeholder="Enter Email" className="border" />
        <input type="text" placeholder="Enter Password" className="border" />
        <button type="button" className="bg-black text-white">
          Signin
        </button>
        <span>
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signin;
