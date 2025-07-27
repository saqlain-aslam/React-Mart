import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart } from "./redux/Slices/shopslice";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const Products = () => {
  document.title = "Products";
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.shop);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <section>
      <Header />

      <h1 className="text-3xl font-bold mb-4 p-4 text-blue-400">Products</h1>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-6 p-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-blue-950 rounded-xl shadow-md overflow-hidden p-4 flex flex-col justify-between"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h4 className="text-lg font-semibold">{product.title}</h4>
            <p className="text-gray-300">${product.price}</p>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-4 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500 cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              className="mt-2 bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 cursor-pointer"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      <Footer />
    </section>
  );
};

export default Products;
