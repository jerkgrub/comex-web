import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FetchUserData from "./hooks/FetchUserData";
import LoadingPage from "../pages/LoadingPage";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = FetchUserData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stop loading when user data is fetched or if the user is not authenticated
    if (Object.keys(user).length !== 0 || !localStorage.getItem("userEmail")) {
      setLoading(false);
    }
  }, [user]);

  // Show loading indicator while fetching user data
  if (loading) {
    return <LoadingPage />;
  }

  // Check if the user is logged in
  const isLoggedIn = Boolean(localStorage.getItem("userEmail"));

  // If the user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Check if the user role is allowed
  const isAllowed = allowedRoles.includes(user?.usertype);

  if (!isAllowed) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;