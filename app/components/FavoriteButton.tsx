"use client";

import { isInFavorites, toggleFavorite } from "@/app/services/favorites";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

interface FavoriteButtonProps {
  id: string | number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
}

const FavoriteButton = ({
  id,
  title,
  image,
  readyInMinutes = 0,
  servings = 0,
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isInFavorites(id));
  }, [id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newStatus = toggleFavorite({
      id: typeof id === "string" ? parseInt(id) : id,
      title,
      image,
      readyInMinutes,
      servings,
    });

    setIsFavorite(newStatus);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <FaHeart className="text-red-500 text-xl" />
      ) : (
        <FaRegHeart className="text-white text-xl" />
      )}
    </button>
  );
};

export default FavoriteButton;
