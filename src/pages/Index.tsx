
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCarouselSlides } from "@/services/carouselService";
import { getBlogPosts } from "@/services/blogService";
import HomeCarousel from "@/components/HomeCarousel";
import SolutionsSection from "@/components/SolutionsSection";
import SimulatorsSection from "@/components/SimulatorsSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactFormType, setContactFormType] = useState<"contato" | "orcamento" | "assistencia">("contato");

  // Fetch real carousel slides
  const { data: slides = [], isLoading: slidesLoading } = useQuery({
    queryKey: ["carouselSlides"],
    queryFn: getCarouselSlides,
  });

  // Fetch real blog posts
  const { data: blogPostsData = [], isLoading: blogLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
  });

  // If no slides are available, create placeholder slides
  const placeholderSlides = [
    {
      id: "placeholder-1",
      imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      title: "Capa SBPlast",
    },
    {
      id: "placeholder-2",
      imageUrl: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      title: "Capa SBPlast",
    },
    {
      id: "placeholder-3",
      imageUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      title: "Capa SBPlast",
    }
  ];

  // Transform slides data to match Carousel component props or use placeholder slides if none available
  const carouselItems = slides && slides.length > 0 
    ? slides.map((slide) => ({
        id: slide.id,
        imageUrl: slide.image_url,
        title: slide.title || undefined,
        link: slide.link || undefined,
        youtubeUrl: slide.youtube_url || undefined,
      }))
    : placeholderSlides;

  // Group blog posts by category for display in different sections
  const blogPosts = {
    news: blogPostsData.filter(post => post.blog_categories?.name === "Notícias" || post.blog_categories?.name === "Noticias") || [],
    events: blogPostsData.filter(post => post.blog_categories?.name === "Eventos") || [],
    videos: blogPostsData.filter(post => post.blog_categories?.name === "Videos" || post.blog_categories?.name === "Vídeos") || [],
  };

  const openContactForm = (type: "contato" | "orcamento" | "assistencia") => {
    setContactFormType(type);
    setContactFormOpen(true);
  };

  return (
    <div className="w-full">
      {/* Hero Section with Carousel - 100vh height */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {slidesLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          <div className="w-full h-full">
            <HomeCarousel items={carouselItems} />
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
                {blogPosts.news.length > 0 ? (
                  blogPosts.news.slice(0, 3).map(post => (
                    <div key={post.id} className="mb-4">
                      <h4 className="font-medium text-lg">{post.title}</h4>
                      <p className="text-gray-600 mt-1">{post.excerpt || post.title}</p>
                      <Link to={`/blog/${post.slug}`} className="text-sbplast-cyan flex items-center mt-2 hover:underline">
                        Ver mais <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Novas notícias em breve.</p>
                    <p className="text-gray-400 text-sm mt-2">Fique atento às novidades da SBPlast</p>
                  </div>
                )}
              </div>
            </div>

            {/* Events Column */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Eventos</h3>
              <div className="space-y-4">
                {blogPosts.events.length > 0 ? (
                  blogPosts.events.slice(0, 3).map(post => (
                    <div key={post.id} className="mb-4">
                      <h4 className="font-medium text-lg">{post.title}</h4>
                      <p className="text-gray-600 mt-1">{post.excerpt || post.title}</p>
                      <Link to={`/blog/${post.slug}`} className="text-sbplast-cyan flex items-center mt-2 hover:underline">
                        Ver mais <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Novos eventos em breve.</p>
                    <p className="text-gray-400 text-sm mt-2">Aguarde a agenda de eventos da SBPlast</p>
                  </div>
                )}
              </div>
            </div>

            {/* Videos Column */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Vídeos</h3>
              <div className="space-y-4">
                {blogPosts.videos.length > 0 ? (
                  blogPosts.videos.slice(0, 3).map(post => (
                    <div key={post.id} className="mb-4">
                      <h4 className="font-medium text-lg">{post.title}</h4>
                      <p className="text-gray-600 mt-1">{post.excerpt || post.title}</p>
                      <Link to={`/blog/${post.slug}`} className="text-sbplast-cyan flex items-center mt-2 hover:underline">
                        Ver mais <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Novos vídeos em breve.</p>
                    <p className="text-gray-400 text-sm mt-2">Confira em breve nossos vídeos institucionais</p>
                  </div>
                )}
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
              <Button 
                className="bg-sbplast-cyan text-sbplast-blue hover:bg-sbplast-cyan/90 mt-auto"
                onClick={() => openContactForm("orcamento")}
              >
                Solicitar orçamento
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold mb-3">Lojista</h3>
              <p className="text-gray-600 mb-4">Cadastre-se para vender nossos produtos</p>
              <Button 
                className="bg-sbplast-cyan text-sbplast-blue hover:bg-sbplast-cyan/90 mt-auto"
                onClick={() => openContactForm("orcamento")}
              >
                Cadastrar para vender
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold mb-3">Consumidor</h3>
              <p className="text-gray-600 mb-4">Precisa de suporte para algum produto?</p>
              <Button 
                className="bg-sbplast-cyan text-sbplast-blue hover:bg-sbplast-cyan/90 mt-auto"
                onClick={() => openContactForm("assistencia")}
              >
                Assistência técnica
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold mb-3">Projetista</h3>
              <p className="text-gray-600 mb-4">Acesse arquivos CAD/BIM dos produtos</p>
              <Button 
                className="bg-sbplast-cyan text-sbplast-blue hover:bg-sbplast-cyan/90 mt-auto"
                onClick={() => openContactForm("contato")}
              >
                Solicitar CAD/BIM
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactForm 
        open={contactFormOpen}
        onOpenChange={setContactFormOpen}
        type={contactFormType}
      />
    </div>
  );
};

export default Index;
