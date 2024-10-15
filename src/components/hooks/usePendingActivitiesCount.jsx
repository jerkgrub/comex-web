// File: /hooks/usePendingActivitiesCount.js
import { useState, useEffect } from "react";
import api from "../../api";

const usePendingActivitiesCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await api.get("/activity/pending/count");
        setCount(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching pending activities count:", error);
        setCount(0);
      }
    };

    fetchPendingCount();

    // Optionally, refresh the count every 60 seconds
    const interval = setInterval(fetchPendingCount, 60000);
    return () => clearInterval(interval);
  }, []);

  return count;
};

export default usePendingActivitiesCount;
