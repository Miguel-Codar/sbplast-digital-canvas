
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
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="w-24 h-24 flex items-center justify-center text-sbplast-blue mb-3">
        <img src={iconUrl} alt={name} className="w-20 h-20 object-contain" />
      </div>
      <h3 className="text-center text-sm font-medium text-sbplast-blue">{name}</h3>
    </Link>
  );
};

export default CategoryCard;
