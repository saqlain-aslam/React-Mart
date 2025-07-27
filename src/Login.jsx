import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./createContext";

function Login() {
  const [email, setEmail] = useState("");
  const { login, token, isLoading } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email) {
      const token = "Token123";
      const userData = {
        firstName: "ABC",
        lastName: "ABC",
        email,
      };
      login(userData, token);
    }
  }

  if (isLoading) return <p>Loading....</p>;
  if (!isLoading && token) return <Navigate to="/checkout" />;
  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded-xl"
        />
        <button
          type="submit"
          className="bg-blue-400 text-white px-4 py-2 w-full rounded-xl"
        >
          Login
        </button>
        <div className="my-3">
          Do not have an account.{" "}
          <span
            className="text-blue-300 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
