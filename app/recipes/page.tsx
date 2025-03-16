import FoodCard from "@/app/components/FoodCard";
import { FaFilter, FaSearch } from "react-icons/fa";
import { BiSortAlt2 } from "react-icons/bi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Link from "next/link";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
}

interface SearchParams {
  query?: string;
  diet?: string;
  cuisine?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

interface ApiResponse {
  results: Recipe[];
  totalResults: number;
}

const getSearchParamValue = (
  searchParams: SearchParams,
  key: keyof SearchParams,
  defaultValue: string = ""
): string => {
  return searchParams[key] || defaultValue;
};

const Recipes = async (props: { searchParams: Promise<SearchParams> }) => {
  const searchParams = await props.searchParams;
  const query = getSearchParamValue(searchParams, "query");
  const diet = getSearchParamValue(searchParams, "diet");
  const cuisine = getSearchParamValue(searchParams, "cuisine");
  const sort = getSearchParamValue(searchParams, "sort", "popularity");

  //pagination
  const pageStr = getSearchParamValue(searchParams, "page", "1");
  const limitStr = getSearchParamValue(searchParams, "limit", "12");
  const currentPage = parseInt(pageStr);
  const resultsPerPage = parseInt(limitStr);
  const offset = (currentPage - 1) * resultsPerPage;

  //API query
  const apiUrl = new URL("https://api.spoonacular.com/recipes/complexSearch");
  apiUrl.searchParams.append("query", query);
  apiUrl.searchParams.append("number", resultsPerPage.toString());
  apiUrl.searchParams.append("offset", offset.toString());
  apiUrl.searchParams.append("sort", sort);
  apiUrl.searchParams.append("addRecipeInformation", "true");
  if (diet) apiUrl.searchParams.append("diet", diet);
  if (cuisine) apiUrl.searchParams.append("cuisine", cuisine);

  // API key
  const apiKey = process.env.API_KEY || "";

  try {
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    const recipes = data.results;
    const totalResults = data.totalResults || 0;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    //search params
    const getPageUrl = (pageNum: number) => {
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (diet) params.append("diet", diet);
      if (cuisine) params.append("cuisine", cuisine);
      if (sort) params.append("sort", sort);
      params.append("page", pageNum.toString());
      params.append("limit", resultsPerPage.toString());
      return `?${params.toString()}`;
    };

    //active filters
    const getActiveFilterCount = () => {
      let count = 0;
      if (diet) count++;
      if (cuisine) count++;
      if (sort && sort !== "popularity") count++;
      return count;
    };

    return (
      <div className="py-8 px-4 min-h-screen">
        {/* header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
              {query ? (
                <>
                  Results for
                  <span className="text-orange-500">&ldquo;{query}&rdquo;</span>
                </>
              ) : (
                "All Recipes"
              )}
            </h1>

            {getActiveFilterCount() > 0 && (
              <div className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                <FaFilter className="mr-1" /> {getActiveFilterCount()} active
                filters
              </div>
            )}
          </div>

          {/* Active filters*/}
          <div className="flex flex-wrap gap-2 mt-2">
            {diet && (
              <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
                Diet: {diet}
              </div>
            )}
            {cuisine && (
              <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center">
                <MdOutlineRestaurantMenu className="mr-1" /> {cuisine} cuisine
              </div>
            )}
            {sort && sort !== "popularity" && (
              <div className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full flex items-center">
                <BiSortAlt2 className="mr-1" /> Sorted by: {sort}
              </div>
            )}
          </div>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No recipes found
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
          </div>
        ) : (
          <>
            {/* Recipe grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recipes.map((recipe: Recipe) => (
                <FoodCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  readyInMinutes={recipe.readyInMinutes}
                  servings={recipe.servings}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                {/* Previous Page Button */}
                <Link
                  href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    currentPage > 1
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Previous
                </Link>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;

                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                    ) {
                      return (
                        <Link
                          key={pageNum}
                          href={getPageUrl(pageNum)}
                          className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
                            pageNum === currentPage
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-orange-200"
                          }`}
                        >
                          {pageNum}
                        </Link>
                      );
                    } else if (
                      (pageNum === currentPage - 3 && currentPage > 4) ||
                      (pageNum === currentPage + 3 &&
                        currentPage < totalPages - 3)
                    ) {
                      return (
                        <span
                          key={pageNum}
                          className="w-10 h-10 flex items-center justify-center"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Next Page Button */}
                <Link
                  href={
                    currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"
                  }
                  className={`px-4 py-2 rounded-md transition-colors ${
                    currentPage < totalPages
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next
                </Link>
              </div>
            )}

            {/* Summary */}
            <div className="mt-4 text-center text-gray-600">
              Showing {offset + 1}-
              {Math.min(offset + resultsPerPage, totalResults)} of{" "}
              {totalResults} results
            </div>
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return (
      <div className="p-8 bg-white rounded-xl shadow-sm max-w-2xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error Loading Recipes
        </h2>
        <p className="text-gray-700 mb-6">
          We couldn&apos;t load the recipes at this time. Please try again
          later.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }
};

export default Recipes;
