"use client";

import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { RecipeDetails } from "@/app/types/recipe";

enum Tab {
  Ingredients = "ingredients",
  Instructions = "instructions",
  Nutrition = "nutrition",
}

interface RecipeTabsProps {
  recipe: RecipeDetails;
}

export default function RecipeTabs({ recipe }: RecipeTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Ingredients);

  return (
    <div className="mb-16">
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab(Tab.Ingredients)}
          className={`py-3 px-6 font-medium ${
            activeTab === Tab.Ingredients
              ? "border-b-2 border-orange-500 text-orange-600"
              : "text-gray-600 hover:text-orange-500"
          }`}
        >
          Ingredients
        </button>
        <button
          onClick={() => setActiveTab(Tab.Instructions)}
          className={`py-3 px-6 font-medium ${
            activeTab === Tab.Instructions
              ? "border-b-2 border-orange-500 text-orange-600"
              : "text-gray-600 hover:text-orange-500"
          }`}
        >
          Instructions
        </button>
        <button
          onClick={() => setActiveTab(Tab.Nutrition)}
          className={`py-3 px-6 font-medium ${
            activeTab === Tab.Nutrition
              ? "border-b-2 border-orange-500 text-orange-600"
              : "text-gray-600 hover:text-orange-500"
          }`}
        >
          Nutrition
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        {/* Ingredients Tab */}
        {activeTab === Tab.Ingredients && (
          <div>
            <h2 className="text-xl font-bold mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-orange-100 w-8 h-8 rounded-full mr-3 flex-shrink-0">
                    <FaUtensils className="text-orange-500" />
                  </span>
                  <div>
                    <span className="font-medium">{ingredient.name}</span>
                    <span className="text-gray-600">
                      {" "}
                      - {ingredient.amount} {ingredient.unit}
                    </span>
                    <p className="text-gray-500 text-sm">
                      {ingredient.original}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions Tab */}
        {activeTab === Tab.Instructions && (
          <div>
            <h2 className="text-xl font-bold mb-4">Instructions</h2>
            {recipe.analyzedInstructions?.length > 0 ? (
              <ol className="space-y-6">
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number} className="flex">
                    <span className="inline-flex items-center justify-center bg-orange-500 text-white w-8 h-8 rounded-full mr-3 flex-shrink-0 font-bold">
                      {step.number}
                    </span>
                    <div>
                      <p className="text-gray-700">{step.step}</p>
                      {step.ingredients.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {step.ingredients.map((ingredient) => (
                            <span
                              key={ingredient.id}
                              className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs"
                            >
                              {ingredient.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: recipe.instructions || "No instructions available.",
                }}
              />
            )}
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === Tab.Nutrition && (
          <div>
            <h2 className="text-xl font-bold mb-4">Nutrition Information</h2>
            {recipe.nutrition?.nutrients ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipe.nutrition.nutrients
                  .filter((nutrient) =>
                    [
                      "Calories",
                      "Fat",
                      "Carbohydrates",
                      "Protein",
                      "Sugar",
                      "Sodium",
                      "Fiber",
                      "Cholesterol",
                    ].includes(nutrient.name)
                  )
                  .map((nutrient) => (
                    <div
                      key={nutrient.name}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                    >
                      <div className="text-sm text-gray-500">
                        {nutrient.name}
                      </div>
                      <div className="text-xl font-semibold">
                        {Math.round(nutrient.amount)} {nutrient.unit}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-600">
                Nutrition information not available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
