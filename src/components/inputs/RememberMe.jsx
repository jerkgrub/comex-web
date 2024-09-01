import React, { useState } from 'react';

const RememberMe = ({ onChange, checked, className = '' }) => {
  return (
    <div className={`form-control mt-4 ${className}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="checkbox checkbox-xs checkbox-info mr-2"
          checked={checked}
          onChange={onChange}
        />
        <div>
          <h2 className='text-sm'>
            Remember me
            <br />
          </h2>
          
        </div>
      </div>
    </div>
  );
};

export default RememberMe;