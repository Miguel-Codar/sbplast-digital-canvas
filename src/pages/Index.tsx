import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCarouselSlides } from "@/services/carouselService";
import { getBlogPosts } from "@/services/blogService";
import HomeCarousel from "@/components/HomeCarousel";
import SolutionsSection from "@/components/SolutionsSection";
import SimulatorsSection from "@/components/SimulatorsSection";
import CompanySection from "@/components/CompanySection";
import AboutSection from "@/components/AboutSection";
import BenefitsSection from "@/components/BenefitsSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactFormType, setContactFormType] = useState<"contato" | "orcamento" | "assistencia">("contato");

  // Initialize scroll reveal animations
  useScrollReveal();

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
      {/* Hero Section with Carousel - aspect ratio 1600:583 */}
      <section className="relative w-full overflow-hidden bg-gray-100">
        {slidesLoading ? (
          <div className="w-full bg-gray-200 animate-pulse" style={{ aspectRatio: '1600/583' }} />
        ) : (
          <div className="w-full">
            <HomeCarousel items={carouselItems} />
          </div>
        )}
      </section>

      {/* Solutions Section */}
      <SolutionsSection />
      
      {/* About Section */}
      <AboutSection />

      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Company Images Section */}
      <CompanySection />

      {/* Simulators Section */}
      <SimulatorsSection />

      {/* Content Section: News, Events, Videos */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl font-bold text-center text-sbplast-blue mb-4">Informações</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Fique por dentro das últimas novidades, eventos e conteúdos da SBPlast
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 card-hover border border-gray-100 scroll-reveal stagger-1">
              <h3 className="text-2xl font-bold mb-6 text-sbplast-blue">Notícias</h3>
              <div className="space-y-6">
                {blogPosts.news.length > 0 ? (
                  blogPosts.news.slice(0, 3).map(post => (
                    <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-lg text-sbplast-blue hover:text-sbplast-lightBlue transition-colors duration-300 mb-2">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">{post.excerpt || post.title}</p>
                      <Link to={`/blog/${post.slug}`} className="text-sbplast-cyan flex items-center font-medium hover:underline">
                        Ver mais <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <p className="text-gray-500 font-medium">Novas notícias em breve.</p>
                    <p className="text-gray-400 text-sm mt-2">Fique atento às novidades da SBPlast</p>
                  </div>
                )}
              </div>
            </div>

            {/* Events Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 card-hover border border-gray-100 scroll-reveal stagger-2">
              <h3 className="text-2xl font-bold mb-6 text-sbplast-blue">Eventos</h3>
              <div className="space-y-6">
                {blogPosts.events.length > 0 ? (
                  blogPosts.events.slice(0, 3).map(post => (
                    <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-lg text-sbplast-blue hover:text-sbplast-lightBlue transition-colors duration-300 mb-2">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">{post.excerpt || post.title}</p>
                      <Link to={`/blog/${post.slug}`} className="text-sbplast-cyan flex items-center font-medium hover:underline">
                        Ver mais <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <p className="text-gray-500 font-medium">Novos eventos em breve.</p>
                    <p className="text-gray-400 text-sm mt-2">Aguarde a agenda de eventos da SBPlast</p>
                  </div>
                )}
              </div>
            </div>

            {/* Videos Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 card-hover border border-gray-100 scroll-reveal stagger-3">
              <h3 className="text-2xl font-bold mb-6 text-sbplast-blue">Vídeos</h3>
              <div className="space-y-6">
                {blogPosts.videos.length > 0 ? (
                  blogPosts.videos.slice(0, 3).map(post => (
                    <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-lg text-sbplast-blue hover:text-sbplast-lightBlue transition-colors duration-300 mb-2">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">{post.excerpt || post.title}</p>
                      <Link to={`/blog/${post.slug}`} className="text-sbplast-cyan flex items-center font-medium hover:underline">
                        Ver mais <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <p className="text-gray-500 font-medium">Novos vídeos em breve.</p>
                    <p className="text-gray-400 text-sm mt-2">Confira em breve nossos vídeos institucionais</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Service Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold text-center text-sbplast-blue mb-4">Atendimento</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Escolha o tipo de atendimento ideal para suas necessidades
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg card-tilt flex flex-col items-center text-center border border-gray-100 scroll-reveal stagger-1">
              <h3 className="text-xl font-bold mb-4 text-sbplast-blue">Lojista</h3>
              <p className="text-gray-600 mb-6 flex-grow">Solicite um orçamento personalizado para sua loja</p>
              <Button 
                className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => openContactForm("orcamento")}
              >
                Solicitar orçamento
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg card-tilt flex flex-col items-center text-center border border-gray-100 scroll-reveal stagger-2">
              <h3 className="text-xl font-bold mb-4 text-sbplast-blue">Lojista</h3>
              <p className="text-gray-600 mb-6 flex-grow">Cadastre-se para vender nossos produtos</p>
              <Button 
                className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => openContactForm("orcamento")}
              >
                Cadastrar para vender
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg card-tilt flex flex-col items-center text-center border border-gray-100 scroll-reveal stagger-3">
              <h3 className="text-xl font-bold mb-4 text-sbplast-blue">Consumidor</h3>
              <p className="text-gray-600 mb-6 flex-grow">Precisa de suporte para algum produto?</p>
              <Button 
                className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => openContactForm("assistencia")}
              >
                Assistência técnica
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg card-tilt flex flex-col items-center text-center border border-gray-100 scroll-reveal stagger-4">
              <h3 className="text-xl font-bold mb-4 text-sbplast-blue">Projetista</h3>
              <p className="text-gray-600 mb-6 flex-grow">Acesse arquivos CAD/BIM dos produtos</p>
              <Button 
                className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue transition-all duration-300 transform hover:scale-105 shadow-lg"
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
