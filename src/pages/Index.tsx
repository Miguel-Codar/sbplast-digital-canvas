
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
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
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

  // Simplified queries without console logs to prevent loops
  const { data: slides = [], isLoading: slidesLoading } = useQuery({
    queryKey: ["carouselSlides"],
    queryFn: getCarouselSlides,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
  });

  const { data: blogPostsData = [], isLoading: blogLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
  });

  // Placeholder slides with stable data
  const placeholderSlides = [
    {
      id: "banner-1",
      imageUrl: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Gama Completa de Produtos - Embalagens Personalizadas para Todos os Segmentos",
    },
    {
      id: "banner-2",
      imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Principais Segmentos Atendidos - Alimentos, Bebidas, Cosméticos e Farmacêuticos",
    },
    {
      id: "banner-3",
      imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Produção Moderna - Tecnologia de Ponta a Serviço da Qualidade",
    },
    {
      id: "banner-4",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Solução Ecológica P-Life - Embalagens Sustentáveis para o Futuro",
    }
  ];

  // Use real slides if available, otherwise use placeholders
  const carouselItems = Array.isArray(slides) && slides.length > 0 
    ? slides.map((slide) => ({
        id: slide.id,
        imageUrl: slide.image_url,
        title: slide.title || undefined,
        link: slide.link || undefined,
        youtubeUrl: slide.youtube_url || undefined,
      }))
    : placeholderSlides;

  // Group blog posts by category - ensure blogPostsData is an array
  const blogPosts = {
    news: Array.isArray(blogPostsData) ? blogPostsData.filter(post => post.blog_categories?.name === "Notícias" || post.blog_categories?.name === "Noticias") || [] : [],
    events: Array.isArray(blogPostsData) ? blogPostsData.filter(post => post.blog_categories?.name === "Eventos") || [] : [],
    videos: Array.isArray(blogPostsData) ? blogPostsData.filter(post => post.blog_categories?.name === "Videos" || post.blog_categories?.name === "Vídeos") || [] : [],
  };

  const openContactForm = (type: "contato" | "orcamento" | "assistencia") => {
    setContactFormType(type);
    setContactFormOpen(true);
  };

  return (
    <div className="w-full">
      {/* Hero Section with Carousel */}
      <section className="relative w-full overflow-hidden bg-gray-100">
        {slidesLoading ? (
          <div className="w-full bg-gray-200 animate-pulse flex items-center justify-center" style={{ aspectRatio: '1600/583' }}>
            <p className="text-gray-500">Carregando...</p>
          </div>
        ) : (
          <HomeCarousel items={carouselItems} />
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

      {/* Simulators Section - Updated text */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold text-center text-sbplast-blue mb-4">Fale com Nossos Consultores</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Nossa equipe especializada está pronta para ajudar você a encontrar a solução ideal em embalagens plásticas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100 scroll-reveal stagger-1">
              <h3 className="text-2xl font-bold mb-6 text-sbplast-blue">Orçamento Personalizado</h3>
              <p className="text-gray-600 mb-8">
                Receba uma proposta sob medida para suas necessidades específicas
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue transition-all duration-300"
                onClick={() => openContactForm("orcamento")}
              >
                Solicitar Orçamento
              </Button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100 scroll-reveal stagger-2">
              <h3 className="text-2xl font-bold mb-6 text-sbplast-blue">Consultoria Técnica</h3>
              <p className="text-gray-600 mb-8">
                Tire suas dúvidas com nossos especialistas em embalagens
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue transition-all duration-300"
                onClick={() => openContactForm("contato")}
              >
                Falar com Consultor
              </Button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100 scroll-reveal stagger-3">
              <h3 className="text-2xl font-bold mb-6 text-sbplast-blue">Suporte Técnico</h3>
              <p className="text-gray-600 mb-8">
                Assistência técnica especializada para seus produtos
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue transition-all duration-300"
                onClick={() => openContactForm("assistencia")}
              >
                Solicitar Suporte
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section: News, Events, Videos */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl font-bold text-center text-sbplast-blue mb-4">Informações</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Fique por dentro das últimas novidades, eventos e conteúdos da SB Plast
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
                    <p className="text-gray-400 text-sm mt-2">Fique atento às novidades da SB Plast</p>
                  </div>
                )}
              </div>
            </div>

            {/* Articles Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 card-hover border border-gray-100 scroll-reveal stagger-2">
              <h3 className="text-2xl font-bold mb-6 text-sbplast-blue">Artigos</h3>
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
                    <p className="text-gray-400 text-sm mt-2">Aguarde a agenda de eventos da SB Plast</p>
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

      {/* Contact Form Modal */}
      <ContactForm 
        open={contactFormOpen}
        onOpenChange={setContactFormOpen}
        type={contactFormType}
      />

      {/* Cookie Banner */}
      <CookieBanner />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
