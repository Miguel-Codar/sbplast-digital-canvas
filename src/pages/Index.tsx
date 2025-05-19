
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCarouselSlides } from "@/services/carouselService";
import HomeCarousel from "@/components/HomeCarousel";
import SolutionsSection from "@/components/SolutionsSection";
import SimulatorsSection from "@/components/SimulatorsSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Fetch real carousel slides
  const { data: slides = [], isLoading: slidesLoading } = useQuery({
    queryKey: ["carouselSlides"],
    queryFn: getCarouselSlides,
  });

  // Transform slides data to match Carousel component props
  const carouselItems = slides.map((slide) => ({
    id: slide.id,
    imageUrl: slide.image_url,
    title: slide.title || undefined,
    link: slide.link || undefined,
  }));

  // Mock blog posts data (to be replaced with real data in the future)
  const blogPosts = {
    news: [
      {
        id: "1",
        title: "SBPlast entra no mercado de irrigação e avança no agronegócio",
        excerpt: "A SBPlast expande sua atuação com novas soluções para o agronegócio, oferecendo produtos inovadores para irrigação.",
        link: "#"
      }
    ],
    events: [
      {
        id: "1",
        title: "Retailshow Brasil 2024",
        excerpt: "A SBPlast estará presente no Retailshow Brasil 2024, apresentando suas soluções inovadoras para o mercado.",
        link: "#"
      }
    ],
    videos: [
      {
        id: "1",
        title: "Evento marca a transição oficial na gestão da SBPlast",
        excerpt: "Cerimônia aconteceu na sede da empresa, em Santo Teresinha.",
        link: "#"
      }
    ]
  };

  return (
    <div className="w-full">
      {/* Hero Section with Carousel - 90vh height */}
      <section className="relative h-[90vh]">
        {slidesLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          <div className="h-full">
            <HomeCarousel items={carouselItems} />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-white font-semibold text-3xl md:text-5xl mb-4 font-poppins max-w-4xl">
                SBPlast - Referência no segmento de embalagens plásticas
              </h1>
              <p className="text-white text-base md:text-xl mb-8 max-w-2xl">
                Soluções inovadoras e sustentáveis para diversos setores industriais
              </p>
              <Button 
                size="lg"
                className="bg-[#0e2e61] hover:bg-[#0e2e61]/90 text-white rounded-lg hover:scale-105 transition-transform shadow-md text-lg px-6 py-3"
                asChild
              >
                <Link to="/orcamento">Solicitar Orçamento</Link>
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Solutions Section */}
      <SolutionsSection />

      {/* Simulators Section */}
      <SimulatorsSection />

      {/* Content Section: News, Events, Videos */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-sbplast-blue">Informações</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Column */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Notícias</h3>
              <div className="space-y-4">
                {blogPosts.news.map(post => (
                  <div key={post.id} className="mb-4">
                    <h4 className="font-medium text-lg">{post.title}</h4>
                    <p className="text-gray-600 mt-1">{post.excerpt}</p>
                    <Link to={post.link} className="text-sbplast-cyan flex items-center mt-2 hover:underline">
                      Ver mais <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Events Column */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Eventos</h3>
              <div className="space-y-4">
                {blogPosts.events.map(post => (
                  <div key={post.id} className="mb-4">
                    <h4 className="font-medium text-lg">{post.title}</h4>
                    <p className="text-gray-600 mt-1">{post.excerpt}</p>
                    <Link to={post.link} className="text-sbplast-cyan flex items-center mt-2 hover:underline">
                      Ver mais <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Videos Column */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Vídeos</h3>
              <div className="space-y-4">
                {blogPosts.videos.map(post => (
                  <div key={post.id} className="mb-4">
                    <h4 className="font-medium text-lg">{post.title}</h4>
                    <p className="text-gray-600 mt-1">{post.excerpt}</p>
                    <Link to={post.link} className="text-sbplast-cyan flex items-center mt-2 hover:underline">
                      Ver mais <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Service Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-sbplast-blue">Atendimento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold mb-3">Lojista</h3>
              <p className="text-gray-600 mb-4">Solicite um orçamento para sua loja</p>
              <Button className="bg-sbplast-cyan text-sbplast-blue hover:bg-sbplast-cyan/90 mt-auto" asChild>
                <Link to="/orcamento">Solicitar orçamento</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold mb-3">Lojista</h3>
              <p className="text-gray-600 mb-4">Cadastre-se para vender nossos produtos</p>
              <Button className="bg-sbplast-cyan text-sbplast-blue hover:bg-sbplast-cyan/90 mt-auto" asChild>
                <Link to="/cadastro-lojista">Cadastrar para vender</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold mb-3">Consumidor</h3>
              <p className="text-gray-600 mb-4">Precisa de suporte para algum produto?</p>
              <Button className="bg-sbplast-cyan text-sbplast-blue hover:bg-sbplast-cyan/90 mt-auto" asChild>
                <Link to="/assistencia">Assistência técnica</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold mb-3">Projetista</h3>
              <p className="text-gray-600 mb-4">Acesse arquivos CAD/BIM dos produtos</p>
              <Button className="bg-sbplast-cyan text-sbplast-blue hover:bg-sbplast-cyan/90 mt-auto" asChild>
                <Link to="/arquivos-projeto">Solicitar CAD/BIM</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
