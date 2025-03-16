"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function MainSearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recipes?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row shadow-lg rounded-lg overflow-hidden">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for recipes by name or ingredients..."
            className="w-full py-4 pl-12 pr-4 bg-white text-gray-800 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
