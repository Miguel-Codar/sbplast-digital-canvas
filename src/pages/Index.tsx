import { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";
import BlogCard from "../components/BlogCard";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

// Mock data - This would be fetched from an API in a real application
const mockCarouselItems = [
  {
    id: "1",
    imageUrl: "/lovable-uploads/41731074-1f24-4281-88c1-f6ab149e9a60.png",
    title: "Conheça agora a SBPlast, referência no seguimento de embalagens plásticas para o seu negócio.",
    link: "/about"
  },
  {
    id: "2",
    imageUrl: "/lovable-uploads/b6da674e-7345-45c5-8b6f-9e632d3a1e0c.png",
    title: "Produtos de qualidade para atender suas necessidades",
    link: "/produtos"
  }
];

// Updated categories with icon URLs pointing to the uploaded images
const mockCategories = [
  { id: "1", name: "Camisetas", iconUrl: "/lovable-uploads/0ff84c18-89ac-4f41-b384-f6db164ffe99.png", slug: "camisetas" },
  { id: "2", name: "Cadeado", iconUrl: "/lovable-uploads/e18be978-f6a6-4c66-9c8e-298c343931fa.png", slug: "cadeado" },
  { id: "3", name: "Boca de Palhaço", iconUrl: "/lovable-uploads/29d793e3-09e9-42f3-9e87-f3e5d5ef2867.png", slug: "boca-de-palhaco" },
  { id: "4", name: "Alças Prensadas", iconUrl: "/lovable-uploads/e6211444-3846-41fe-8844-004682018f4b.png", slug: "alcas-prensadas" },
  { id: "5", name: "Autocapas", iconUrl: "/lovable-uploads/b27e4176-5400-4fc7-a96b-bac51cbe83d7.png", slug: "autocapas" },
  { id: "6", name: "Biodegradável", iconUrl: "/lovable-uploads/7fbb85fc-0948-404b-8a4f-8a8e37ea8569.png", slug: "biodegradavel" }
];

const mockBlogPosts = [
  {
    id: "1",
    title: "SBPlast entra no mercado de irrigação e avança no agronegócio",
    imageUrl: "https://via.placeholder.com/400x300",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Notícias",
    slug: "sbplast-entra-no-mercado-de-irrigacao",
    date: "2025-05-01"
  },
  {
    id: "2",
    title: "Rainwater Brasil 2024",
    imageUrl: "https://via.placeholder.com/400x300",
    excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: "Eventos",
    slug: "rainwater-brasil-2024",
    date: "2025-04-15"
  },
  {
    id: "3",
    title: "Evento marca a transição oficial na gestão da Spezzio",
    imageUrl: "https://via.placeholder.com/400x300",
    excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    category: "Vídeos",
    slug: "evento-marca-transicao-spezzio",
    date: "2025-04-10"
  }
];

const Index = () => {
  const [carouselItems, setCarouselItems] = useState(mockCarouselItems);
  const [categories, setCategories] = useState(mockCategories);
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);

  // In a real application, you would fetch data from your API here
  useEffect(() => {
    // Fetch carousel items
    // Fetch categories
    // Fetch blog posts
  }, []);

  return (
    <div>
      {/* Hero Carousel */}
      <section className="mb-12">
        <Carousel items={carouselItems} />
      </section>

      {/* Solutions Section */}
      <section className="sbplast-container mb-16">
        <h2 className="sbplast-heading text-center mb-8">Soluções SBPlast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              iconUrl={category.iconUrl}
              slug={category.slug}
            />
          ))}
        </div>
      </section>

      {/* Simulators Section */}
      <section className="sbplast-container mb-16">
        <h2 className="sbplast-heading text-center mb-4">Simuladores SBPlast</h2>
        <p className="text-center text-gray-600 mb-8">
          Está em dúvida de qual produto melhor atende às suas necessidades?<br />
          Então utilize nossos simuladores e encontre o produto ideal.
        </p>
        <div className="flex justify-center">
          <Link to="/simulador">
            <Button className="bg-sbplast-cyan text-sbplast-blue hover:bg-sbplast-cyan/80">
              Preencha o formulário
            </Button>
          </Link>
        </div>
      </section>

      {/* Blog/News Section */}
      <section className="sbplast-container mb-16">
        <h2 className="sbplast-heading text-center mb-8">Informações</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
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
      </section>
    </div>
  );
};

export default Index;
