// src/pages/NotFound.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ButtonGeneric from './inputs/ButtonGeneric';
import { Undo2 } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-20">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Page Not Found 👻</h2>
        <p className="text-lg mb-8">
          It doesn't exist.
        </p>
        <ButtonGeneric 
        label={"Go Back"}
        icon={Undo2}
        onClick={handleGoBack}/>
      </div>
    </>
  );
};

export default NotFound;