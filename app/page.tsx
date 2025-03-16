import Link from "next/link";
import Image from "next/image";
import { FaUtensils, FaHeart, FaClock } from "react-icons/fa";
import { MdRestaurant, MdOutlineTimer } from "react-icons/md";
import { TbSalad } from "react-icons/tb";
import { GiCookingPot } from "react-icons/gi";
import MainSearchBar from "./components/MainSearchBar";

const categories = [
  {
    name: "Breakfast",
    icon: <MdRestaurant className="text-2xl" />,
    color: "from-yellow-400 to-orange-400",
  },
  {
    name: "Lunch",
    icon: <FaUtensils className="text-2xl" />,
    color: "from-green-400 to-teal-400",
  },
  {
    name: "Dinner",
    icon: <GiCookingPot className="text-2xl" />,
    color: "from-blue-400 to-indigo-400",
  },
  {
    name: "Desserts",
    icon: <FaHeart className="text-2xl" />,
    color: "from-pink-400 to-rose-400",
  },
  {
    name: "Vegetarian",
    icon: <TbSalad className="text-2xl" />,
    color: "from-emerald-400 to-green-500",
  },
  {
    name: "Quick Meals",
    icon: <MdOutlineTimer className="text-2xl" />,
    color: "from-orange-400 to-red-400",
  },
];

const featuredRecipes = [
  {
    id: 716429,
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    readyInMinutes: 45,
  },
  {
    id: 715538,
    title: "Bruschetta Style Pork & Pasta",
    image: "https://spoonacular.com/recipeImages/715538-556x370.jpg",
    readyInMinutes: 35,
  },
  {
    id: 716437,
    title: "Chilled Cucumber Avocado Soup with Yogurt and Kefir",
    image: "https://spoonacular.com/recipeImages/716437-556x370.jpg",
    readyInMinutes: 55,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-md">
            Discover Delicious Recipes for Every Taste
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Find thousands of recipes from around the world, perfect for any
            occasion, diet, or craving.
          </p>

          {/* Search Bar */}
          <MainSearchBar />

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/recipes?sort=popularity"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors backdrop-blur-sm"
            >
              Popular Recipes
            </Link>
            <Link
              href="/recipes?diet=vegetarian"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors backdrop-blur-sm"
            >
              Vegetarian
            </Link>

            <Link
              href="/recipes?diet=gluten+free"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors backdrop-blur-sm"
            >
              Gluten-Free
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Explore Recipe Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/recipes?query=${category.name}`}
                className="group"
              >
                <div
                  className={`bg-gradient-to-r ${category.color} rounded-xl p-6 text-white text-center shadow-md transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}
                >
                  <div className="flex justify-center mb-3">
                    {category.icon}
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Featured Recipes
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Try these delicious recipes handpicked by our culinary experts
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl h-80 overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <span className="font-medium">View Recipe</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-1 text-orange-500" />
                      <span>{recipe.readyInMinutes} minutes</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/recipes"
              className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-colors shadow-md"
            >
              Explore All Recipes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
