import React from "react";

const Loading = () => {
  const skeletonItems = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="h-10 w-3/4 bg-gray-200 rounded-md mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletonItems.map((item) => (
          <div
            key={item}
            className="relative w-80 bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="w-full h-52 bg-gray-300 animate-pulse"></div>
            <div className="absolute top-3 right-3 bg-gray-300 w-16 h-6 rounded-full animate-pulse"></div>
            <div className="p-5 bg-gradient-to-b from-gray-50 to-white">
              <div className="h-7 bg-gray-200 rounded-md w-4/5 animate-pulse"></div>
              <div className="mt-4 h-10 bg-gray-200 rounded-lg w-full animate-pulse"></div>
              <div className="mt-3 h-4 bg-gray-200 rounded w-20 ml-auto animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center items-center">
        <div className="flex space-x-2">
          <div className="w-24 h-10 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
          <div className="w-24 h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="mt-4 w-60 h-6 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
    </div>
  );
};

export default Loading;
