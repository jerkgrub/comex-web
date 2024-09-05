import React from "react";

const ButtonGeneric = ({
  label,
  disabled = false,
  icon: Icon,
  className = "",
  onChange,
  tabIndex,
  role,
}) => {
  return (
    <>
      <button
        className={`btn border-none flex flex-row justify-start items-center ${className}`}
        disabled={disabled}
        onChange={onChange}
        tabIndex={tabIndex}
        role={role}
      >
        {Icon && <Icon className="w-4" />} {label}
      </button>
    </>
  );
};

export default ButtonGeneric;
