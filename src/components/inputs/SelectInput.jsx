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
      {label && <h2 className="mb-1 pl-1 font-semibold">{label}</h2>}
      <select
        value={value}
        onChange={onChange}
        className={`select select-bordered w-full ${className} ${error ? 'border-red-500' : ''}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="pl-1 text-red-500 text-sm mt-1">* {errorMessage}</p>}
    </div>
  );
};

export default SelectInput;