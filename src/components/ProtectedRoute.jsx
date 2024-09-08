import { Navigate } from "react-router-dom";
import FetchUserData from "./hooks/FetchUserData";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = FetchUserData();
  console.log(user.email); // Add this

  // Check if the user is logged in
  const isLoggedIn = Boolean(localStorage.getItem("userEmail"));

  // Check if the user role is allowed
  const isAllowed = allowedRoles.includes(user.usertype);

  console.log("User role:", user.usertype); // Add this
  console.log("Allowed roles:", allowedRoles); // Add this
  console.log("Is user allowed?", isAllowed); // Add this

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isAllowed) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
