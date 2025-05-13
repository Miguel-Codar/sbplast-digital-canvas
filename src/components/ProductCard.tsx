
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
  shortDescription?: string;
}

const ProductCard = ({ id, name, imageUrl, slug, shortDescription }: ProductCardProps) => {
  return (
    <Link
      to={`/produto/${slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-center text-sm font-medium text-sbplast-blue">
          {name}
        </h3>
        {shortDescription && (
          <p className="text-center text-xs text-gray-600 mt-2">
            {shortDescription}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
