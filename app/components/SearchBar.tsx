"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FilterOptions = string[];

const cuisines: FilterOptions = [
  "American",
  "Italian",
  "Mexican",
  "Chinese",
  "Japanese",
  "Indian",
  "French",
  "Greek",
  "Thai",
  "Vietnamese",
  "Korean",
  "Spanish",
  "German",
  "Middle Eastern",
  "African",
  "Caribbean",
  "Mediterranean",
];

const diets: FilterOptions = [
  "Vegan",
  "vegetarian",
  "Pescatarian",
  "Gluten-free",
  "Dairy-free",
  "Nut-free",
  "Soy-free",
  "Low-carb",
  "Keto",
  "Paleo",
];

const resultsPerPageOptions = [12, 24, 36, 48];

const SearchBar = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    query: "",
    diet: "",
    cuisine: "",
    limit: "12",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value.trim()) {
        params.append(key, value.trim());
      }
    });

    const queryString = params.toString();
    router.push(queryString ? `/recipes?${queryString}` : "/recipes");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name.toLowerCase()]: value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-amber-100 to-orange-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-orange-700 mb-3">
          Find Your Perfect Recipe
        </h1>
        <p className="text-lg text-orange-600">
          Discover thousands of delicious meals from around the world
        </p>
      </div>

      {/* Search Bar  */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl border border-orange-200">
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400">
              🔍
            </span>
            <input
              name="query"
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Search for pasta, chicken, desserts..."
              className="bg-orange-50 p-4 pl-10 w-full rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              value={searchParams.query}
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-xl transition duration-300 shadow-md font-bold"
          >
            Find Recipes
          </button>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full">
          {/* Diet Select */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400">
              🥗
            </span>
            <select
              name="diet"
              onChange={handleInputChange}
              value={searchParams.diet}
              className="bg-orange-50 p-4 pl-10 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full appearance-none"
            >
              <option value="">All Diets</option>
              {diets.map((diet) => (
                <option key={diet} value={diet}>
                  {diet}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Cuisine Select */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400">
              🌍
            </span>
            <select
              name="cuisine"
              onChange={handleInputChange}
              value={searchParams.cuisine}
              className="bg-orange-50 p-4 pl-10 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full appearance-none"
            >
              <option value="">All Cuisines</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Results Per Page Select */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400">
              📊
            </span>
            <select
              name="limit"
              onChange={handleInputChange}
              value={searchParams.limit}
              className="bg-orange-50 p-4 pl-10 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full appearance-none"
            >
              {resultsPerPageOptions.map((option) => (
                <option key={option} value={option.toString()}>
                  {option} per page
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-10 gap-4">
        <div className="bg-white p-3 rounded-full shadow-md border border-orange-200 text-orange-700 font-medium">
          🍕 Pizza
        </div>
        <div className="bg-white p-3 rounded-full shadow-md border border-orange-200 text-orange-700 font-medium">
          🍔 Burgers
        </div>
        <div className="bg-white p-3 rounded-full shadow-md border border-orange-200 text-orange-700 font-medium">
          🍜 Pasta
        </div>
        <div className="bg-white p-3 rounded-full shadow-md border border-orange-200 text-orange-700 font-medium">
          🥗 Salads
        </div>
        <div className="bg-white p-3 rounded-full shadow-md border border-orange-200 text-orange-700 font-medium">
          🍰 Desserts
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
