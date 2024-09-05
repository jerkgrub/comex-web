import { useState, useEffect } from "react";
import axios from "axios";

const FetchUserData = () => {
  const [user, setUser] = useState({});

  const fetchUserData = async () => {
    const signedEmail = localStorage.getItem("userEmail");

    if (signedEmail) {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/email/${signedEmail}`);
        const userData = response.data;

        // Update the state with the fetched user data
        setUser(userData.User);
        console.log("User data fetched:", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return user;
};

export default FetchUserData;