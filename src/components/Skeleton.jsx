import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`bg-gray-300 animate-pulse ${className}`}></div>
  );
};

export default Skeleton;
