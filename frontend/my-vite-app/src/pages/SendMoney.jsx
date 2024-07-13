import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const id = searchParams.get("id");
  const firstName = searchParams.get("firstName");
  const myToken = localStorage.getItem("token");

  const handleSend = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      if (res) {
        toast.success(`Amount ${amount} transferred successfully!`);
      }
    } catch (error) {
      console.log({ error });
      toast.error(error?.response?.data?.message ?? "Error");
    }
  };
  return (
    <div className="flex flex-col gap-5 items-center my-52">
      <h1 className="text-3xl font-bold">Send Money to {firstName}</h1>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter Amount"
          className="border"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="button"
          className="bg-black text-white"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendMoney;
