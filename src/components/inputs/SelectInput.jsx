import React from 'react';

const SelectInput = ({
  label,
  options = [], // Default to an empty array if no options are provided
  value,
  onChange,
  className = '',
  placeholder = 'Select an option',
}) => {
  return (
    <div className="mb-5">
      {label && <h2 className="mb-1 pl-1 font-semibold">{label}</h2>}
      <select
        value={value}
        onChange={onChange}
        className={`select select-bordered w-full ${className}`}
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
    </div>
  );
};

export default SelectInput;