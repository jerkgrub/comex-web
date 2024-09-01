import React from 'react';
import { useNavigate } from 'react-router-dom';

const Alternate = ({ labelText, linkTo, linkText }) => {
  const navigate = useNavigate();

  return (
    <h2 className="mt-4">
      {labelText}{" "}
      <button
        onClick={() => navigate(linkTo)}
        className="text-nucolor6 underline focus:outline-none"
      >
        {linkText}
      </button>
      {"."}
      <br />
    </h2>
  );
};

export default Alternate;