import { Link } from "react-router-dom";

const Tile = ({ name, id, firstName }) => {
  return (
    <div className="flex flex-row px-8 py-2 justify-between items-center bg-gray-50 rounded-2xl">
      <span className="text-lg">{name}</span>
      <Link
        to={`/send/?id=${id}&firstName=${firstName}`}
        className="bg-black text-white px-3 py-1 text-sm rounded-md"
      >
        Send Money
      </Link>
    </div>
  );
};

export default Tile;
