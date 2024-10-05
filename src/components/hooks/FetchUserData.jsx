import { useState, useEffect } from "react";
import axios from "axios";

const FetchUserData = () => {
  const [user, setUser] = useState(() => {
    // Try to get the cached user from localStorage when the component mounts
    const cachedUser = localStorage.getItem("user");
    return cachedUser ? JSON.parse(cachedUser) : {}; // Parse and return cached user or an empty object
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const signedEmail = localStorage.getItem("userEmail");

      if (signedEmail && Object.keys(user).length === 0) {
        // Fetch user data only if it's not in the state
        try {
          const response = await axios.get(`https://comex-server.vercel.app/api/users/email/${signedEmail}`);
          const userData = response.data.User;

          // Only update state and localStorage if user data has changed
          if (userData) {
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData)); // Cache user data for future use
            console.log("User data fetched and cached:", userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]); // Ensure this only runs if the user object is empty

  return user;
};

export default FetchUserData;
