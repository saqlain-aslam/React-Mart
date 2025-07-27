import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./createContext";

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;

