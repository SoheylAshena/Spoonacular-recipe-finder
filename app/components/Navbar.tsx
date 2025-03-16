"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaHome, FaUtensils, FaHeart, FaSearch } from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";
import FilterPanel from "./FilterPanel";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize search query from URL params if on recipes page
  useEffect(() => {
    if (pathname === "/recipes") {
      setSearchQuery(searchParams.get("query") || "");
    }
  }, [pathname, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("query", searchQuery.trim());
    } else {
      params.delete("query");
    }

    router.push(`/recipes?${params.toString()}`);
  };

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            {/* Top navigation row */}
            <div className="flex justify-between items-center py-3 w-full">
              {/* Logo */}
              <Link
                href="/"
                className="text-2xl font-extrabold tracking-tight flex items-center group transition-all duration-300 hover:text-yellow-200"
              >
                <FaUtensils className="mr-2 text-yellow-200 group-hover:scale-110 transition-transform" />
                <span className="bg-clip-text bg-gradient-to-r from-white to-yellow-100">
                  Delicious Recipes
                </span>
              </Link>

              {/* Nav Links */}
              <ul className="hidden md:flex space-x-8">
                <li>
                  <Link
                    href="/"
                    className="hover:text-yellow-200 transition-colors duration-300 flex items-center py-1 px-2 rounded-lg hover:bg-white/10"
                  >
                    <FaHome className="mr-2" /> Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recipes"
                    className={`transition-colors duration-300 flex items-center py-1 px-2 rounded-lg ${
                      pathname === "/recipes"
                        ? "bg-white/20 text-yellow-200"
                        : "hover:text-yellow-200 hover:bg-white/10"
                    }`}
                  >
                    <FaUtensils className="mr-2" /> Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/favorites"
                    className="hover:text-yellow-200 transition-colors duration-300 flex items-center py-1 px-2 rounded-lg hover:bg-white/10"
                  >
                    <FaHeart className="mr-2" /> Favorites
                  </Link>
                </li>
              </ul>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      mobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu - Slides down when open */}
            <div
              className={`w-full md:hidden transition-all duration-300 overflow-hidden ${
                mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="flex flex-col py-2 border-t border-white/20">
                <li>
                  <Link
                    href="/"
                    className={`block px-4 py-2 hover:bg-white/10 transition-colors ${
                      pathname === "/" ? "bg-white/20 text-yellow-200" : ""
                    }`}
                  >
                    <FaHome className="inline-block mr-2" /> Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recipes"
                    className={`block px-4 py-2 hover:bg-white/10 transition-colors ${
                      pathname === "/recipes"
                        ? "bg-white/20 text-yellow-200"
                        : ""
                    }`}
                  >
                    <FaUtensils className="inline-block mr-2" /> Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/favorites"
                    className={`block px-4 py-2 hover:bg-white/10 transition-colors ${
                      pathname === "/favorites"
                        ? "bg-white/20 text-yellow-200"
                        : ""
                    }`}
                  >
                    <FaHeart className="inline-block mr-2" /> Favorites
                  </Link>
                </li>
              </ul>
            </div>

            {/* Search bar shown only on recipes page */}
            {pathname === "/recipes" && (
              <div className="w-full py-3 border-t border-white/20">
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative flex-grow">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for recipes..."
                      className="bg-white/10 text-white placeholder-white/60 w-full py-2 pl-10 pr-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-r-lg text-white font-medium transition-colors"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`ml-2 p-2 rounded-lg transition-colors ${
                      showFilters
                        ? "bg-white/30 text-yellow-200"
                        : "bg-white/15 hover:bg-white/25"
                    }`}
                    aria-label="Toggle filters"
                  >
                    <BiFilterAlt className="text-lg" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Filter Panel */}
      {pathname === "/recipes" && (
        <FilterPanel
          isVisible={showFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </>
  );
}
