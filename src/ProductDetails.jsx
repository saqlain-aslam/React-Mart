import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { fetchProducts, addToCart } from "./redux/Slices/shopslice";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [id]);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p className="text-center p-6">No such product</p>;

  return (
    <section>
      <Header />
      <div className=" max-w-4xl mx-auto bg-cyan-800 my-6 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-1/2 h-auto object-cover items-center rounded"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-900 mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-2">${product.price}</p>
            <p className="mb-2">Category: {product.category}</p>
            <p className="mb-2">Brand: {product.brand}</p>
            <p className="mb-2">Rating: {product.rating} ⭐</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ProductDetails;
