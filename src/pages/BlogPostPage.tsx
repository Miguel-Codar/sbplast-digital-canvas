
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Linkedin, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getBlogPostBySlug } from "@/services/blogService";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [notFound, setNotFound] = useState(false);

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => getBlogPostBySlug(slug!),
    retry: false,
    meta: {
      onError: () => {
        setNotFound(true);
      }
    }
  });

  useEffect(() => {
    if (error) {
      setNotFound(true);
    }
  }, [error]);

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post?.title || "")}&summary=${encodeURIComponent(post?.excerpt || "")}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${post?.title} - ${window.location.href}`)}`;
    window.open(url, "_blank");
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  if (isLoading) {
    return (
      <div className="sbplast-container py-16 text-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (notFound || error) {
    return (
      <div className="sbplast-container py-16 text-center">
        <p>Artigo não encontrado.</p>
        <div className="mt-4">
          <Link to="/blog" className="text-sbplast-blue hover:underline">
            Voltar para o blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sbplast-container py-8">
      <Breadcrumb
        items={[
          { label: "Blog", url: "/blog" },
          { label: post?.blog_categories?.name || "Categoria", url: `/blog/categoria/${post?.blog_categories?.slug}` },
          { label: post?.title || "" }
        ]}
      />

      <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {/* Featured Image */}
        {post?.featured_image && (
          <div className="relative h-64 md:h-96">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-sbplast-blue opacity-20"></div>
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Meta info */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
            <span className="mr-4 text-sbplast-green font-medium">{post?.blog_categories?.name || "Sem categoria"}</span>
            <span className="mr-4">{formatDate(post?.created_at || "")}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sbplast-blue mb-4">
            {post?.title}
          </h1>

          {/* Content */}
          <div className="prose max-w-none my-8 whitespace-pre-wrap">
            {post?.content}
          </div>

          {/* Share buttons */}
          <div className="flex items-center mt-12 pt-6 border-t">
            <p className="font-medium text-gray-700 mr-4">Compartilhar:</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={shareOnLinkedIn}>
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">Compartilhar no LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" onClick={shareOnWhatsApp}>
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Compartilhar no WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <div className="text-center">
        <Link to="/blog" className="text-sbplast-blue hover:underline">
          Voltar para todos os artigos
        </Link>
      </div>
    </div>
  );
};

export default BlogPostPage;
