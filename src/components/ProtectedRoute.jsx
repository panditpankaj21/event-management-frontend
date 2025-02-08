import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token"); 
      return false;
    }

    return true;
    
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
