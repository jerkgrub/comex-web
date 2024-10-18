import { useState, useEffect } from "react";
import api from "../../api"; // Updated to use the `api` instance

// Custom hook to fetch activities
export const useFetchActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get("/activity/approved"); // Using the `api` instance

        if (response.data && response.data.Activities) {
          setActivities(response.data.Activities);
        } else {
          console.warn("No activities found in the response.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError(err.message || "Unknown error occurred.");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading, error };
};

// Helper function to format the date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return { month, day };
};

// Helper function to format the time into 12-hour format with AM/PM
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 or 24-hour time to 12-hour format
  const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
