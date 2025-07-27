import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../createContext";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/Slices/shopslice";   

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const cartItems = useSelector((state) => state.shop.cartItems);

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + (parseFloat(item.price) || 0) * (item.quantity || 0),
    0
  );

  const handleLogout = () => {
    logout();
    dispatch(clearCart());      
    navigate("/");
  };

  return (
    <header className="bg-cyan-950 shadow-md py-5 px-4 flex justify-between items-center w-full">
      <div className="text-2xl font-bold text-blue-400">
        <Link to="/">MyStore</Link>
      </div>

      <div className="space-x-4 flex">
        <Link to="/">
          <button className="bg-blue-400 text-white px-4 py-2 rounded-xl hover:bg-blue-500">
            Products
          </button>
        </Link>

        <Link to="/cart">
          <button className="bg-blue-400 text-white px-4 py-2 rounded-xl hover:bg-blue-500">
            Cart&nbsp;<span>({cartItems.length})</span>
          </button>
        </Link>

        <button className="bg-blue-400 text-white px-4 py-2 rounded-xl hover:bg-blue-500">
          Total:&nbsp;
          <span className="text-gray-900 font-medium">
            ${totalCartPrice.toFixed(2)}
          </span>
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="bg-blue-400 text-white px-4 py-2 rounded-xl hover:bg-blue-500"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
