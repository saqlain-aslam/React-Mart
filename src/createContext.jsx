import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  token: null,
  isLoading: true,
  login: (userData, token) => {},
  logout: () => {},
  signup: (userData, token) => {},
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("UserData");
    const storedToken = localStorage.getItem("authToken");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(JSON.parse(storedToken));
    }
    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("UserData", JSON.stringify(userData));
    localStorage.setItem("authToken", JSON.stringify(token));
    setUser(userData);
    setToken(token);
  };

  const signup = (userData, token) => {
    localStorage.setItem("UserData", JSON.stringify(userData));
    localStorage.setItem("authToken", JSON.stringify(token));
    setUser(userData);
    setToken(token);
    // navigate("/checkout");
  };

  const logout = () => {
    localStorage.clear();
    // navigate("/");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoading, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
