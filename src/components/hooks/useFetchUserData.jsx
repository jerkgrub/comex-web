// src/hooks/useFetchUserData.jsx
import { useState, useEffect } from 'react';
import api from '../../api'; // Import the custom Axios instance

const useFetchUserData = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const signedEmail = localStorage.getItem('userEmail');

    if (signedEmail) {
      try {
        // Use the custom api instance for API calls
        const response = await api.get(`/users/email/${signedEmail}`);
        const userData = response.data;

        setUser(userData.User);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    } else {
      setLoading(false); // Handle case where no signedEmail is found
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { user, loading };
};

export default useFetchUserData;
