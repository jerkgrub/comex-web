// src/FetchUserData.jsx
import { useState, useEffect } from 'react';
import api from '../../api'; // Import the custom Axios instance

const FetchUserData = () => {
  const [user, setUser] = useState({});

  const fetchUserData = async () => {
    const signedEmail = localStorage.getItem('userEmail');

    if (signedEmail) {
      try {
        // Use the custom `api` instance for API calls
        const response = await api.get(`/users/email/${signedEmail}`);
        const userData = response.data;

        setUser(userData.User);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return user;
};

export default FetchUserData;
