import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => { 
    navigate(-1); // This will navigate the user back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">403 - Not Authorized</h1>
      <p className="text-lg mb-6">You do not have permission to view this page.</p>
      <button
        onClick={handleGoBack}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotAuthorized;