const FAVORITES_KEY = "recipes_favorites";

export interface RecipeData {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
}

const isClient = typeof window !== "undefined";

// Get all
export const getFavorites = (): RecipeData[] => {
  if (!isClient) return [];

  try {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Error retrieving favorites from localStorage:", error);
    return [];
  }
};

// Get all IDs
export const getFavoriteIds = (): string[] => {
  const favorites = getFavorites();
  return favorites.map((recipe) => recipe.id.toString());
};

// Add
export const addToFavorites = (recipe: RecipeData): void => {
  if (!isClient) return;

  try {
    const favorites = getFavorites();

    if (!favorites.some((item) => item.id === recipe.id)) {
      const updatedFavorites = [...favorites, recipe];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
};

// Remove
export const removeFromFavorites = (id: number | string): void => {
  if (!isClient) return;

  try {
    const favorites = getFavorites();
    const idToRemove = typeof id === "string" ? parseInt(id) : id;

    const updatedFavorites = favorites.filter(
      (recipe) => recipe.id !== idToRemove
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

// Check
export const isInFavorites = (id: number | string): boolean => {
  if (!isClient) return false;

  try {
    const favorites = getFavorites();
    const idToCheck = typeof id === "string" ? parseInt(id) : id;

    return favorites.some((recipe) => recipe.id === idToCheck);
  } catch (error) {
    console.error("Error checking favorites:", error);
    return false;
  }
};

// Toggle
export const toggleFavorite = (
  recipe: RecipeData | number | string
): boolean => {
  if (!isClient) return false;

  try {
    if (typeof recipe === "number" || typeof recipe === "string") {
      const id = typeof recipe === "string" ? parseInt(recipe) : recipe;
      const isFavorited = isInFavorites(id);

      if (isFavorited) {
        removeFromFavorites(id);
        return false;
      } else {
        console.error(
          "Cannot add to favorites with just an ID. Full recipe data required."
        );
        return false;
      }
    } else {
      const isFavorited = isInFavorites(recipe.id);

      if (isFavorited) {
        removeFromFavorites(recipe.id);
        return false;
      } else {
        addToFavorites(recipe);
        return true;
      }
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return false;
  }
};
