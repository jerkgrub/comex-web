import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FetchUserData from "./hooks/FetchUserData";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = FetchUserData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setLoading(false); // Stop loading when user data is fetched
    }
  }, [user]);

  // Show loading indicator while fetching user data
  if (loading) {  
    return <div>Loading...</div>;
  }

  // Check if the user is logged in
  const isLoggedIn = Boolean(localStorage.getItem("userEmail"));

  // Check if the user role is allowed
  const isAllowed = allowedRoles.includes(user.usertype);

  console.log("User role:", user.usertype); // Add this to check the user role
  console.log("Allowed roles:", allowedRoles); // Add this to check the allowed roles
  console.log("Is user allowed?", isAllowed); // Check if the user is allowed

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isAllowed) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;