"use client";

import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { isInFavorites, toggleFavorite } from "@/app/services/favorites";
import { RecipeDetails } from "@/app/types/recipe";

interface RecipeFavoriteButtonProps {
  recipe: RecipeDetails;
}

export default function RecipeFavoriteButton({
  recipe,
}: RecipeFavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isInFavorites(recipe.id));
  }, [recipe.id]);

  const handleToggleFavorite = () => {
    if (!recipe) return;

    const newStatus = toggleFavorite({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
    });

    setIsFavorite(newStatus);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
        isFavorite
          ? "bg-red-100 text-red-600 border border-red-200 hover:bg-red-200"
          : "bg-orange-500 text-white hover:bg-orange-600"
      }`}
    >
      {isFavorite ? (
        <>
          <FaHeart className="mr-2" />
          Remove from Favorites
        </>
      ) : (
        <>
          <FaRegHeart className="mr-2" />
          Add to Favorites
        </>
      )}
    </button>
  );
}
