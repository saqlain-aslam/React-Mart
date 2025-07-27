import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "./redux/Slices/shopslice";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  document.title = "Cart";
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shop.cartItems);
  const navigate = useNavigate();

  const handleBuyNow = (item) => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    if (!isAuthenticated) {
      // alert("You need to log in to proceed to checkout.");
      navigate("/login");
    } else {
      localStorage.setItem("checkoutItem", JSON.stringify(item));
      navigate("/checkout");
    }
  };

  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <div className="p-4 flex-grow">
        <h1 className="text-3xl font-bold mb-4 text-blue-400">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-300">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                className="card border p-4 rounded-lg shadow bg-blue-950"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-40 object-contain mx-auto mb-4"
                />
                <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                <p className="text-gray-300 mb-1">${item.price}</p>
                <p className="mb-3 text-white">Quantity: {item.quantity}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, change: 1 }))
                    }
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, change: -1 }))
                    }
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 cursor-pointer"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleBuyNow(item)}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Cart;
