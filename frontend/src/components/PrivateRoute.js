import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { user, role, loading } = useAuth();

  // Wait until auth state is resolved
  if (loading) return <div>Loading...</div>; // or a spinner

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}