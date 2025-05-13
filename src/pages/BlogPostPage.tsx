
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { LinkedIn, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";

// Mock data - This would be fetched from an API in a real application
const mockBlogPosts = {
  "sbplast-entra-no-mercado-de-irrigacao": {
    id: "1",
    title: "SBPlast entra no mercado de irrigação e avança no agronegócio",
    imageUrl: "https://via.placeholder.com/1200x600",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h2>Estratégia de expansão</h2>
      
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      
      <h2>Tecnologia aplicada</h2>
      
      <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
      
      <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
    `,
    category: "Notícias",
    categorySlug: "noticias",
    slug: "sbplast-entra-no-mercado-de-irrigacao",
    date: "2025-05-01",
    author: "Equipe SBPlast"
  }
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // In a real application, you would fetch data from your API here
  useEffect(() => {
    if (slug) {
      // Simulate API call
      const postData = mockBlogPosts[slug as keyof typeof mockBlogPosts];
      
      setPost(postData);
      setLoading(false);
    }
  }, [slug]);

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post?.title || "")}&summary=${encodeURIComponent(post?.excerpt || "")}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${post?.title} - ${window.location.href}`)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="sbplast-container py-16 text-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!post) {
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

  const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="sbplast-container py-8">
      <Breadcrumb
        items={[
          { label: "Blog", url: "/blog" },
          { label: post.category, url: `/blog/categoria/${post.categorySlug}` },
          { label: post.title }
        ]}
      />

      <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {/* Featured Image */}
        <div className="relative h-64 md:h-96">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-sbplast-blue opacity-20"></div>
        </div>

        <div className="p-6 md:p-8">
          {/* Meta info */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
            <span className="mr-4 text-sbplast-green font-medium">{post.category}</span>
            <span className="mr-4">{formattedDate}</span>
            <span>Por {post.author}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sbplast-blue mb-4">
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose max-w-none my-8" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Share buttons */}
          <div className="flex items-center mt-12 pt-6 border-t">
            <p className="font-medium text-gray-700 mr-4">Compartilhar:</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={shareOnLinkedIn}>
                <LinkedIn className="h-5 w-5" />
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
