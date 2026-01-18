import React from 'react';

const AbstractBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <img
        src="/Rectangle 1291.svg"
        alt="background gradient transition"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default AbstractBackground;