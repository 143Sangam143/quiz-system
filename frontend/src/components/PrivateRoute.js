import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait until auth state is resolved
  if (loading) return <div>Loading...</div>; // or a spinner

  if (!user) return <Navigate to="/login" replace />;

  return children;
}