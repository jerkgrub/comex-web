// src/components/inputs/SelectInput.jsx

import React from 'react';

const SelectInput = ({
  label,
  options = [],
  value,
  onChange,
  className = '',
  placeholder = 'Select an option',
  error = false,
  errorMessage = '',
}) => {
  return (
    <div className="mb-5">
      {label && <label className="mb-1 pl-1 font-semibold">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`select select-bordered w-full ${className} ${error ? 'border-red-500' : ''}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="pl-1 text-red-500 text-sm mt-1">* {errorMessage}</p>}
    </div>
  );
};

export default SelectInput;