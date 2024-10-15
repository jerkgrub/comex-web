// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useFetchUserData from "./hooks/useFetchUserData";
import LoadingPage from "../pages/LoadingPage";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useFetchUserData();

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
