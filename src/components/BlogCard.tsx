
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Play } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  imageUrl: string;
  excerpt: string;
  category: string;
  slug: string;
  date: string;
  videoUrl?: string; // Novo campo para identificar posts de vídeo
}

const BlogCard = ({
  id,
  title,
  imageUrl,
  excerpt,
  category,
  slug,
  date,
  videoUrl,
}: BlogCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Ícone de play para posts de vídeo */}
        {videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white bg-opacity-90 rounded-full p-3">
              <Play className="h-8 w-8 text-sbplast-blue fill-current" />
            </div>
          </div>
        )}
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
          {videoUrl ? 'Assistir vídeo' : 'Ver mais'}
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
