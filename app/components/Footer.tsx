import { FaHeart, FaGithub, FaTelegram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Delicious Recipes</h3>
            <p className="text-white/80 mb-4">
              Welcome to my food recipe website. Here you can find a lot of
              recipes for different types of food.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://t.me/ColdDiver"
                className="text-white/80 hover:text-white transition-colors"
              >
                <FaTelegram className="text-xl" />
              </a>

              <a
                href="https://github.com/SoheylAshena"
                className="text-white/80 hover:text-white transition-colors"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/recipes?sort=popularity"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Popular Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?diet=vegetarian"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Vegetarian
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?cuisine=Italian"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Italian Cuisine
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?cuisine=Asian"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Asian Cuisine
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?sort=time"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Quick Meals
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm flex items-center justify-center">
            © {new Date().getFullYear()} Delicious Recipes. Made with
            <FaHeart className="mx-1 text-red-300" />
            by Soheyl Ashena.
          </p>
        </div>
      </div>
    </footer>
  );
}
