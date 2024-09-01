import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Adjust the import path if necessary

const PasswordInput = ({ label, placeholder = '', value, onChange, className = '' }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="mb-5">
      {label && <h2 className="pl-1 font-semibold mb-1">{label}</h2>}
      <label className="input input-bordered flex  items-center gap-2 w-full">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`-ml-3 grow border-none outline-none focus:border-none focus:ring-0 ${className}`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-gray-600"
        >
          {isPasswordVisible ? <EyeOff className='w-5' /> : <Eye className='w-5' />}
        </button>
      </label>
    </div>
  );
};

export default PasswordInput;