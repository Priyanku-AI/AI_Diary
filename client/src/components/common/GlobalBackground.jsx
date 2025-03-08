import React from 'react';

const GlobalBackground = ({ children }) => {
  return (
    <div className="min-h-screen relative bg-[#F1F8E9] overflow-hidden">
      {/* Decorative Organic Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#A5D6A7] rounded-full opacity-10"></div>
      <div className="absolute top-40 -left-20 w-72 h-72 bg-[#81C784] rounded-full opacity-10"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#4CAF50] rounded-full opacity-10"></div>
      {/* Main content */}
      {children}
    </div>
  );
};

export default GlobalBackground;
