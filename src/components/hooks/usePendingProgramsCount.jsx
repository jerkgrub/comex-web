// src/components/hooks/usePendingProgramsCount.js

import { useState, useEffect } from "react";
import api from "../../api";

const usePendingProgramsCount = () => {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await api.get("/program/pending/count");
        setPendingCount(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching pending programs count:", error);
      }
    };

    fetchPendingCount();
  }, []);

  return pendingCount;
};

export default usePendingProgramsCount;
