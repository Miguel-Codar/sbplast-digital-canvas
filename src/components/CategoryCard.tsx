
import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  iconUrl: string;
  slug: string;
}

const CategoryCard = ({ id, name, iconUrl, slug }: CategoryCardProps) => {
  return (
    <Link 
      to={`/categoria/${slug}`}
      className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md card-hover border border-gray-100 scroll-reveal"
    >
      <div className="w-24 h-24 flex items-center justify-center text-sbplast-blue mb-4 group-hover:scale-110 transition-transform duration-300 icon-bounce">
        <img 
          src={iconUrl} 
          alt={name} 
          className="w-20 h-20 object-contain group-hover:brightness-110 transition-all duration-300" 
        />
      </div>
      <h3 className="text-center text-base font-semibold text-sbplast-blue group-hover:text-sbplast-lightBlue transition-colors duration-300">
        {name}
      </h3>
      <div className="w-0 h-0.5 bg-sbplast-cyan group-hover:w-full transition-all duration-300 mt-2"></div>
    </Link>
  );
};

export default CategoryCard;
