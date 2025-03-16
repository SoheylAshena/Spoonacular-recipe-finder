"use client";
import React, { useState, useEffect } from "react";
import { getFavorites } from "../services/favorites";
import FoodCard from "../components/FoodCard";
import { FaHeart, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { RecipeData } from "../services/favorites";

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get favorite recipes directly from localStorage
    const loadFavorites = () => {
      try {
        setLoading(true);
        const recipes = getFavorites();
        console.log(`Loaded ${recipes.length} favorites from localStorage`);
        setFavoriteRecipes(recipes);
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    // Add event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "recipes_favorites") {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <FaHeart className="text-red-500 mr-2" /> My Favorite Recipes
        </h1>
        <p className="text-gray-600">Your saved recipes, all in one place.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-pulse text-orange-500 text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading your favorites...</p>
          </div>
        </div>
      ) : favoriteRecipes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            No favorite recipes yet
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Start exploring recipes and add some to your favorites!
          </p>
          <Link
            href="/recipes"
            className="inline-block bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Explore Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
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
      )}
    </div>
  );
};

export default FavoritesPage;
