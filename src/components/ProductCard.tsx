
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
      className="group block bg-white rounded-xl shadow-md card-hover border border-gray-100 overflow-hidden scroll-reveal"
    >
      <div className="h-48 overflow-hidden bg-gray-50">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-center text-lg font-bold text-sbplast-blue group-hover:text-sbplast-lightBlue transition-colors duration-300 mb-2">
          {name}
        </h3>
        {shortDescription && (
          <p className="text-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            {shortDescription}
          </p>
        )}
        <div className="flex justify-center mt-3">
          <span className="text-sbplast-cyan text-sm font-medium group-hover:underline">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
