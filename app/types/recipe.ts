export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string;
  extendedIngredients: {
    id: number;
    original: string;
    amount: number;
    unit: string;
    name: string;
  }[];
  analyzedInstructions: {
    steps: {
      number: number;
      step: string;
      ingredients: {
        id: number;
        name: string;
      }[];
    }[];
  }[];
  diets: string[];
  dishTypes: string[];
  nutrition?: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
}
