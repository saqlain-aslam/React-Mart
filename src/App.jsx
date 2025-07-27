import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Login";
import Cart from "./Cart";
import AuthProvider from "./createContext";
import Products from "./Products";
import Checkout from "./Checkout";
import Payment from "./Payment";
import ProductDetails from "./ProductDetails";
import PrivateRoute from "./PrivateRoute";
import Signup from "./Signup";

function App() {
  return (
    <div className="bg-gray-600 min-h-screen">
      <Router>
        <AuthProvider>
          {/* <ProductProvider> */}
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
          </Routes>
          {/* </ProductProvider> */}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
