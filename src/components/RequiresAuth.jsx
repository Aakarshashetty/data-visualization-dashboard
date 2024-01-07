import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/auth-context";

export const RequiresAuth = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    return isLoggedIn ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );
  };