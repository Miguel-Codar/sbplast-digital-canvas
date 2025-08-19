
import { useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Breadcrumb from "../components/Breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts, getBlogCategories } from "@/services/blogService";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Fetch blog posts and categories
  const { data: posts = [], isLoading: isLoadingPosts } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
  });
  
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: getBlogCategories,
  });
  
  // All categories including "All" option
  const allCategories = [
    { id: "all", name: "Todos", slug: "all" },
    ...(categories || []),
  ];

  // Filter posts by selected category
  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter(post => post.blog_categories?.slug === selectedCategory);

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
          <p className="mt-2">Notícias, eventos e conteúdos da SB Plast</p>
        </div>
      </div>

      <Breadcrumb
        items={[{ label: "Blog" }]}
      />

      <div className="mb-8">
        {isLoadingCategories ? (
          <div className="text-center py-4">Carregando categorias...</div>
        ) : (
          <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
            <TabsList className="w-full flex flex-wrap justify-center">
              {allCategories.map(category => (
                <TabsTrigger key={category.id} value={category.slug}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      {isLoadingPosts ? (
        <div className="text-center py-12">
          <p>Carregando artigos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              imageUrl={post.featured_image || "https://via.placeholder.com/600x400"}
              excerpt={post.excerpt || ""}
              category={post.blog_categories?.name || "Sem categoria"}
              slug={post.slug}
              date={post.created_at}
              videoUrl={post.video_url || undefined} // Novo campo
            />
          ))}
        </div>
      )}

      {!isLoadingPosts && filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">Nenhum artigo encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
