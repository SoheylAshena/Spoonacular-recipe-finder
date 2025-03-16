import React from "react";
import { FaClock, FaUser, FaUtensils } from "react-icons/fa";
import { BiDish } from "react-icons/bi";

export default function RecipeDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Skeleton header */}
      <div className="animate-pulse mb-8">
        <div className="h-12 bg-gray-200 rounded-md w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-md w-1/2 mx-auto"></div>
      </div>

      {/* Skeleton recipe image and info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Skeleton image */}
        <div className="bg-gray-200 h-96 rounded-xl animate-pulse"></div>

        {/* Skeleton info */}
        <div className="animate-pulse">
          {/* Recipe details */}
          <div className="border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex flex-wrap gap-6 justify-between">
              {/* Time */}
              <div className="flex items-center">
                <div className="flex items-center bg-gray-100 p-3 rounded-full mr-3">
                  <FaClock className="text-xl text-gray-300" />
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>

              {/* Servings */}
              <div className="flex items-center">
                <div className="flex items-center bg-gray-100 p-3 rounded-full mr-3">
                  <BiDish className="text-xl text-gray-300" />
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>

              {/* Difficulty */}
              <div className="flex items-center">
                <div className="flex items-center bg-gray-100 p-3 rounded-full mr-3">
                  <FaUser className="text-xl text-gray-300" />
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center">
                <div className="flex items-center bg-gray-100 p-3 rounded-full mr-3">
                  <FaUtensils className="text-xl text-gray-300" />
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Diet tags */}
          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded-md w-40 mb-3"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 bg-gray-200 rounded-full w-24"
                ></div>
              ))}
            </div>
          </div>

          {/* Add to favorites button */}
          <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
        </div>
      </div>

      {/* Skeleton tabs */}
      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          {["Ingredients", "Instructions", "Nutrition"].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 rounded-t-lg w-32 mx-1"
            ></div>
          ))}
        </div>
        <div className="h-64 bg-gray-100 rounded-b-lg p-4 animate-pulse">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
