
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Breadcrumb from "../components/Breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Mock data - This would be fetched from an API in a real application
const mockBlogPosts = [
  {
    id: "1",
    title: "SBPlast entra no mercado de irrigação e avança no agronegócio",
    imageUrl: "https://via.placeholder.com/600x400",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "Notícias",
    categorySlug: "noticias",
    slug: "sbplast-entra-no-mercado-de-irrigacao",
    date: "2025-05-01"
  },
  {
    id: "2",
    title: "Rainwater Brasil 2024",
    imageUrl: "https://via.placeholder.com/600x400",
    excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "Eventos",
    categorySlug: "eventos",
    slug: "rainwater-brasil-2024",
    date: "2025-04-15"
  },
  {
    id: "3",
    title: "Evento marca a transição oficial na gestão da Spezzio",
    imageUrl: "https://via.placeholder.com/600x400",
    excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Vídeos",
    categorySlug: "videos",
    slug: "evento-marca-transicao-spezzio",
    date: "2025-04-10"
  },
  {
    id: "4",
    title: "Cerimônia aconteceu na sede da empresa, em Santo Estevão/ES",
    imageUrl: "https://via.placeholder.com/600x400",
    excerpt: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: "Vídeos",
    categorySlug: "videos",
    slug: "cerimonia-sede-empresa-santo-estevao",
    date: "2025-04-05"
  },
  {
    id: "5",
    title: "Novo investimento em tecnologia para melhorar a produção",
    imageUrl: "https://via.placeholder.com/600x400",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    category: "Notícias",
    categorySlug: "noticias",
    slug: "novo-investimento-tecnologia-producao",
    date: "2025-03-20"
  },
  {
    id: "6",
    title: "Workshop de capacitação para parceiros",
    imageUrl: "https://via.placeholder.com/600x400",
    excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "Eventos",
    categorySlug: "eventos",
    slug: "workshop-capacitacao-parceiros",
    date: "2025-03-10"
  }
];

const categories = [
  { id: "1", name: "Todos", slug: "all" },
  { id: "2", name: "Notícias", slug: "noticias" },
  { id: "3", name: "Eventos", slug: "eventos" },
  { id: "4", name: "Vídeos", slug: "videos" }
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState(mockBlogPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockBlogPosts);

  // In a real application, you would fetch data from your API here
  useEffect(() => {
    // Fetch blog posts
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.categorySlug === selectedCategory));
    }
  }, [selectedCategory, posts]);

  return (
    <div className="sbplast-container py-8">
      {/* Background banner with title */}
      <div 
        className="relative mb-6 py-16 bg-sbplast-blue text-white rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url(https://via.placeholder.com/1200x300)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-sbplast-blue opacity-70"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          <p className="mt-2">Notícias, eventos e conteúdos da SBPlast</p>
        </div>
      </div>

      <Breadcrumb
        items={[{ label: "Blog" }]}
      />

      <div className="mb-8">
        <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
          <TabsList className="w-full flex flex-wrap justify-center">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.slug}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            imageUrl={post.imageUrl}
            excerpt={post.excerpt}
            category={post.category}
            slug={post.slug}
            date={post.date}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">Nenhum artigo encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
