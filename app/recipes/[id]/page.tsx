import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaClock, FaLeaf, FaArrowLeft, FaCheck } from "react-icons/fa";
import { BiDish } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";
import RecipeTabs from "@/app/components/RecipeTabs";
import RecipeFavoriteButton from "@/app/components/RecipeFavoriteButton";
import { RecipeDetails } from "@/app/types/recipe";

async function getRecipeDetails(id: string): Promise<RecipeDetails> {
  const apiKey = process.env.API_KEY;
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true`,
    {
      next: { revalidate: 3600 },
      headers: {
        "x-api-key": apiKey as string,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Recipe not found`);
    }
    throw new Error(`Error ${response.status}: Failed to fetch recipe details`);
  }

  return await response.json();
}

export default async function RecipeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let recipe: RecipeDetails;

  try {
    recipe = await getRecipeDetails(id);
  } catch (err) {
    if ((err as Error).message === "Recipe not found") {
      notFound();
    }

    // Handle other errors with an error message on the page
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 p-8 rounded-xl max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Recipe
          </h1>
          <p className="text-gray-700 mb-6">
            Failed to load recipe details. Please try again later.
          </p>
          <Link
            href=".."
            className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/recipes"
          className="inline-flex items-center text-orange-600 hover:text-orange-700"
        >
          <FaArrowLeft className="mr-2" /> Back to Recipes
        </Link>
      </div>

      {/* Recipe title and description */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
        {recipe.title}
      </h1>
      <div
        className="mb-8 text-center text-gray-600"
        dangerouslySetInnerHTML={{
          __html: recipe.summary.split(". ")[0] + ".",
        }}
      />

      {/* Recipe image and info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Recipe image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Recipe info */}
        <div>
          {/* Recipe details */}
          <div className="border border-orange-100 rounded-xl p-6 bg-orange-50 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Time */}
              <div className="text-center">
                <div className="flex items-center justify-center bg-white p-4 rounded-full w-16 h-16 mx-auto mb-3 shadow-sm border border-orange-100">
                  <FaClock className="text-xl text-orange-500" />
                </div>
                <p className="text-gray-500 text-sm">Ready In</p>
                <p className="font-semibold">{recipe.readyInMinutes} min</p>
              </div>

              {/* Servings */}
              <div className="text-center">
                <div className="flex items-center justify-center bg-white p-4 rounded-full w-16 h-16 mx-auto mb-3 shadow-sm border border-orange-100">
                  <BiDish className="text-xl text-orange-500" />
                </div>
                <p className="text-gray-500 text-sm">Servings</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>

              {/* Dish type */}
              <div className="text-center">
                <div className="flex items-center justify-center bg-white p-4 rounded-full w-16 h-16 mx-auto mb-3 shadow-sm border border-orange-100">
                  <GiKnifeFork className="text-xl text-orange-500" />
                </div>
                <p className="text-gray-500 text-sm">Type</p>
                <p className="font-semibold capitalize">
                  {recipe.dishTypes?.length > 0 ? recipe.dishTypes[0] : "Main"}
                </p>
              </div>

              {/* Diet */}
              <div className="text-center">
                <div className="flex items-center justify-center bg-white p-4 rounded-full w-16 h-16 mx-auto mb-3 shadow-sm border border-orange-100">
                  <FaLeaf className="text-xl text-orange-500" />
                </div>
                <p className="text-gray-500 text-sm">Diet</p>
                <p className="font-semibold capitalize">
                  {recipe.vegetarian
                    ? "Vegetarian"
                    : recipe.dishTypes?.some(
                        (type) =>
                          type.includes("meat") || type.includes("chicken")
                      )
                    ? "Non-Veg"
                    : "Regular"}
                </p>
              </div>
            </div>
          </div>

          {/* Diet tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Dietary Information
            </h3>
            <div className="flex flex-wrap gap-2">
              {recipe.vegetarian && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <FaCheck className="mr-1" /> Vegetarian
                </span>
              )}
              {recipe.vegan && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <FaCheck className="mr-1" /> Vegan
                </span>
              )}
              {recipe.glutenFree && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <FaCheck className="mr-1" /> Gluten-Free
                </span>
              )}
              {recipe.dairyFree && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <FaCheck className="mr-1" /> Dairy-Free
                </span>
              )}
              {recipe.diets?.map((diet) => (
                <span
                  key={diet}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {diet}
                </span>
              ))}
            </div>
          </div>

          <RecipeFavoriteButton recipe={recipe} />
        </div>
      </div>

      <RecipeTabs recipe={recipe} />
    </div>
  );
}
