"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaTimes, FaFilter } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { TbSalad } from "react-icons/tb";
import { BiSortAlt2 } from "react-icons/bi";

type FilterOption = {
  value: string;
  label: string;
};

const cuisines: FilterOption[] = [
  { value: "", label: "All Cuisines" },
  { value: "American", label: "American" },
  { value: "Italian", label: "Italian" },
  { value: "Mexican", label: "Mexican" },
  { value: "Chinese", label: "Chinese" },
  { value: "Japanese", label: "Japanese" },
  { value: "Indian", label: "Indian" },
  { value: "French", label: "French" },
  { value: "Greek", label: "Greek" },
  { value: "Thai", label: "Thai" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Korean", label: "Korean" },
  { value: "Spanish", label: "Spanish" },
  { value: "Mediterranean", label: "Mediterranean" },
];

const diets: FilterOption[] = [
  { value: "", label: "All Diets" },
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "pescetarian", label: "Pescetarian" },
  { value: "gluten free", label: "Gluten-free" },
  { value: "dairy free", label: "Dairy-free" },
  { value: "ketogenic", label: "Keto" },
  { value: "paleo", label: "Paleo" },
];

const sortOptions: FilterOption[] = [
  { value: "popularity", label: "Most Popular" },
  { value: "healthiness", label: "Healthiest" },
  { value: "price", label: "Cheapest" },
  { value: "time", label: "Quickest" },
  { value: "random", label: "Random" },
];

const resultsPerPageOptions = [12, 24, 36, 48];

interface FilterPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function FilterPanel({ isVisible, onClose }: FilterPanelProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    diet: "",
    cuisine: "",
    sort: "popularity",
    limit: "12",
  });

  useEffect(() => {
    setFilters({
      diet: searchParams.get("diet") || "",
      cuisine: searchParams.get("cuisine") || "",
      sort: searchParams.get("sort") || "popularity",
      limit: searchParams.get("limit") || "12",
    });
  }, [searchParams]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/recipes?${params.toString()}`);
    onClose();
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.forEach((_, key) => {
      if (key !== "query") {
        params.delete(key);
      }
    });

    setFilters({
      diet: "",
      cuisine: "",
      sort: "popularity",
      limit: "12",
    });

    router.push(`/recipes?${params.toString()}`);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto pt-20 px-4 pb-10 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaFilter className="mr-2 text-orange-500" />
              Filter Recipes
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <FaTimes />
            </button>
          </div>

          <div className="space-y-5">
            {/* Cuisine Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="w-36 flex items-center text-gray-700 font-medium">
                <MdRestaurant className="mr-2 text-orange-500" /> Cuisine:
              </div>
              <div className="flex-grow">
                <select
                  name="cuisine"
                  value={filters.cuisine}
                  onChange={handleFilterChange}
                  className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  {cuisines.map((cuisine) => (
                    <option key={cuisine.value} value={cuisine.value}>
                      {cuisine.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Diet Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="w-36 flex items-center text-gray-700 font-medium">
                <TbSalad className="mr-2 text-orange-500" /> Diet:
              </div>
              <div className="flex-grow">
                <select
                  name="diet"
                  value={filters.diet}
                  onChange={handleFilterChange}
                  className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  {diets.map((diet) => (
                    <option key={diet.value} value={diet.value}>
                      {diet.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Order */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="w-36 flex items-center text-gray-700 font-medium">
                <BiSortAlt2 className="mr-2 text-orange-500" /> Sort by:
              </div>
              <div className="flex-grow">
                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Per Page */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="w-36 flex items-center text-gray-700 font-medium">
                Results per page:
              </div>
              <div className="flex-grow">
                <select
                  name="limit"
                  value={filters.limit}
                  onChange={handleFilterChange}
                  className="w-full p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  {resultsPerPageOptions.map((option) => (
                    <option key={option} value={option.toString()}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 justify-between">
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 text-orange-600 font-medium rounded-lg border border-orange-500 hover:bg-orange-50 transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
