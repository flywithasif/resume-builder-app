import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for Firebase to resolve auth state
  if (loading) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <div className="h-6 w-6 rounded-full border-2 border-[#395B64] border-t-transparent animate-spin" />
      </div>
    );
  }

  // Not signed in → send to login, remember origin
  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  // Signed in → render the protected content
  return children;
};

export default ProtectedRoute;
