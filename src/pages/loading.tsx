// Loading.tsx

import React from 'react';

const Loading = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-white">
      <img
        src="/website-builder.gif" // Path to your GIF
        alt="Loading..."
        className="w-64 h-64" // Adjust size if needed
        width={256} // Adjust width according to the actual size of your GIF
        height={256} // Adjust height according to the actual size of your GIF
      />
    </div>
  );
};

export default Loading;
