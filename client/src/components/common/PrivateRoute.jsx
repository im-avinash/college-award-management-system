import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}
