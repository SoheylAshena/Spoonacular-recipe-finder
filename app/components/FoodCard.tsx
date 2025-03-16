import Image from "next/image";
import { FaUtensils } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

interface FoodCardProps {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
}

const FoodCard: React.FC<FoodCardProps> = ({
  id,
  title,
  image,
  readyInMinutes,
  servings,
}) => {
  return (
    <Link href={`/recipes/${id}`}>
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] h-full flex flex-col">
        {/* Image container */}
        <div className="relative">
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 transition-opacity duration-300`}
          ></div>
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />

          {/* Favorite  */}
          <FavoriteButton
            id={id.toString()}
            title={title}
            image={image}
            readyInMinutes={readyInMinutes}
            servings={servings}
          />

          {/*title on image */}
          <h2 className="absolute bottom-0 left-0 right-0 z-20 p-3 text-white font-bold text-lg line-clamp-2">
            {title}
          </h2>
        </div>

        {/* content */}
        <div className="p-4 flex-grow flex flex-col justify-between bg-gradient-to-b from-orange-50 to-white">
          {/*  info */}
          <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
            <div className="flex items-center">
              <MdOutlineTimer className="text-orange-500 mr-1" />
              <span>{readyInMinutes} min</span>
            </div>
            <div className="flex items-center">
              <BiDish className="text-orange-500 mr-1" />
              <span>{servings} servings</span>
            </div>
          </div>

          {/*button */}
          <button className="mt-4 w-full py-2 bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center">
            <FaUtensils className="mr-2" /> View Recipe
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
