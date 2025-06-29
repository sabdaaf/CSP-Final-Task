import { Navigate } from "react-router-dom";
import { useAuth } from "@/Utils/Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user === null) {
    return null;
  }
  if (!user) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;