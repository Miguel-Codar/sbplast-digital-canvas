
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogCardProps {
  id: string;
  title: string;
  imageUrl: string;
  excerpt: string;
  category: string;
  slug: string;
  date: string;
}

const BlogCard = ({
  id,
  title,
  imageUrl,
  excerpt,
  category,
  slug,
  date,
}: BlogCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-sbplast-green">{category}</span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        <h3 className="text-lg font-bold text-sbplast-blue mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <Link
          to={`/blog/${slug}`}
          className="inline-block px-4 py-2 bg-sbplast-blue text-white rounded hover:bg-sbplast-lightBlue transition-colors"
        >
          Ver mais
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
