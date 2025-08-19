
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SolutionCategory {
  id: string;
  name: string;
  image: string;
  mobileImage: string;
  slug: string;
  description?: string;
}

const SolutionsSection = () => {
  const categories: SolutionCategory[] = [
    {
      id: "1",
      name: "Indústria Alimentícia",
      image: "/lovable-uploads/B1.png",
      mobileImage: "/lovable-uploads/B1v2.png",
      slug: "industria-alimenticia",
      description: "Embalagens que atendem todas as normas da Vig. San. e BPF"
    },
    {
      id: "2",
      name: "Lojistas",
      image: "/lovable-uploads/B2.png",
      mobileImage: "/lovable-uploads/B2v2.png",
      slug: "lojistas",
      description: "Várias alças e espessuras para suas necessidades"
    },
    {
      id: "3",
      name: "Embalagens Personalizadas",
      image: "/lovable-uploads/B3.png",
      mobileImage: "/lovable-uploads/B3v2.png",
      slug: "embalagens-personalizadas",
      description: "Desenvolvemos embalagens sob medida para seus produtos"
    },
    {
      id: "4",
      name: "Soluções Sustentáveis",
      image: "/lovable-uploads/B4.png",
      mobileImage: "/lovable-uploads/B4v2.png",
      slug: "solucoes-sustentaveis",
      description: "Embalagens biodegradáveis e ecologicamente responsáveis"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="font-bold text-center mb-6 text-sbplast-blue text-5xl">
            Soluções SB Plast
          </h2>
          <p className="text-center text-gray-600 mb-4 max-w-4xl mx-auto text-xl leading-relaxed">
            Oferecemos uma linha completa de soluções em embalagens plásticas
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-sbplast-cyan to-sbplast-blue mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/categoria/${category.slug}`} 
              className={`group bg-white rounded-2xl shadow-lg card-hover border border-gray-100 overflow-hidden scroll-reveal stagger-${index + 1}`}
            >
              <div className="relative h-64 overflow-hidden">
                {/* Desktop Image */}
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="hidden md:block w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                {/* Mobile Image */}
                <img 
                  src={category.mobileImage} 
                  alt={category.name} 
                  className="block md:hidden w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 group-hover:bg-sbplast-cyan/20 transition-colors duration-300">
                    <ArrowRight className="h-5 w-5 text-white group-hover:text-sbplast-blue transition-colors duration-300" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-sbplast-blue text-center mb-3 group-hover:text-sbplast-lightBlue transition-colors duration-300">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12 scroll-reveal">
            <h3 className="text-3xl font-bold text-center text-sbplast-blue mb-4">
              Nossa Produção
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conheça nossa tecnologia de ponta e processos de fabricação
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl card-hover scroll-reveal-left">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <iframe
                  src="https://player.vimeo.com/video/1111474371?byline=0&portrait=0&title=0"
                  width="100%"
                  height="100%"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Nossa Tecnologia"
                ></iframe>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-sbplast-blue mb-2">Nossa Tecnologia</h4>
                <p className="text-gray-600 text-lg">Conheça nossa tecnologia de ponta para fabricação de embalagens plásticas</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl card-hover scroll-reveal-right">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <iframe
                  src="https://player.vimeo.com/video/1111472533?byline=0&portrait=0&title=0"
                  width="100%"
                  height="100%"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Time SB"
                ></iframe>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-sbplast-blue mb-2">Time SB</h4>
                <p className="text-gray-600 text-lg">Conheça mais sobre a SB Plast e nossa equipe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
