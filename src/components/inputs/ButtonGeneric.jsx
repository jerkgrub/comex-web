import React from 'react';

const ButtonGeneric = ({ label, disabled = false, icon: Icon, className = "" }) => {
  return (
    <>
      <button
        className={`btn border-none flex flex-row justify-start items-center ${className}`}
        disabled={disabled}
      >
        {Icon && <Icon />} {label}
      </button>
    </>
  );
};

export default ButtonGeneric;
