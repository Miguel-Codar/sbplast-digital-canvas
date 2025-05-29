
import React from "react";
import { Link } from "react-router-dom";

interface SolutionCategory {
  id: string;
  name: string;
  icon: string;
  slug: string;
  description?: string;
}

const SolutionsSection = () => {
  const categories: SolutionCategory[] = [
    {
      id: "1",
      name: "Segurança e Fechamento",
      icon: "/lovable-uploads/745796f5-50e0-440b-8c0e-d859b1903b47.png",
      slug: "seguranca-fechamento",
      description: "Soluções completas para segurança e fechamento de embalagens"
    },
    {
      id: "2",
      name: "Embalagens Personalizadas",
      icon: "/lovable-uploads/72bab4a1-815e-4ab6-b332-d5beea374620.png",
      slug: "embalagens-personalizadas",
      description: "Desenvolvemos embalagens sob medida para seus produtos"
    },
    {
      id: "3",
      name: "Acessórios para Embalagens",
      icon: "/lovable-uploads/b88714d4-e794-4848-b549-de497dd18a00.png",
      slug: "acessorios-embalagens",
      description: "Componentes complementares para embalagens plásticas"
    },
    {
      id: "4",
      name: "Alças e Suportes",
      icon: "/lovable-uploads/e2434e72-bf5f-4bc3-ba0b-b56c06183ce4.png",
      slug: "alcas-suportes",
      description: "Soluções ergonômicas para manuseio e transporte"
    },
    {
      id: "5",
      name: "Embalagens Industriais",
      icon: "/lovable-uploads/69254766-97a2-4e05-8e14-82a9dc13f36e.png",
      slug: "embalagens-industriais",
      description: "Produtos resistentes para aplicações industriais"
    },
    {
      id: "6",
      name: "Soluções Sustentáveis",
      icon: "/lovable-uploads/6cca6f0e-6bdf-49d7-9014-821a93244d59.png",
      slug: "solucoes-sustentaveis",
      description: "Embalagens biodegradáveis e ecologicamente responsáveis"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="font-bold text-center mb-6 text-sbplast-blue text-5xl">
            Soluções SBPlast
          </h2>
          <p className="text-center text-gray-600 mb-4 max-w-4xl mx-auto text-xl leading-relaxed">
            Oferecemos uma linha completa de soluções em embalagens plásticas para diversos segmentos do mercado, 
            atendendo às necessidades específicas de cada cliente com qualidade e inovação.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-sbplast-cyan to-sbplast-blue mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/categoria/${category.slug}`} 
              className={`group bg-white rounded-2xl shadow-lg card-hover p-8 flex flex-col items-center justify-center border border-gray-100 scroll-reveal stagger-${index + 1}`}
            >
              <div className="w-28 h-28 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 icon-bounce">
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="w-20 h-20 object-contain group-hover:brightness-110 transition-all duration-300" 
                />
              </div>
              <h3 className="text-xl font-bold text-sbplast-blue text-center mb-3 group-hover:text-sbplast-lightBlue transition-colors duration-300">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-gray-600 text-center leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {category.description}
                </p>
              )}
              <div className="w-0 h-0.5 bg-sbplast-cyan group-hover:w-full transition-all duration-300 mt-4"></div>
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
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/6G5-J9_BdXw" 
                  title="Tecnologia Avançada SBPlast" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-sbplast-blue mb-2">Tecnologia Avançada</h4>
                <p className="text-gray-600 text-lg">Conheça nossa tecnologia de ponta para fabricação de embalagens plásticas</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl card-hover scroll-reveal-right">
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/H_Su5zB8-V4" 
                  title="Vídeo Institucional SBPlast" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-sbplast-blue mb-2">Vídeo Institucional</h4>
                <p className="text-gray-600 text-lg">Conheça mais sobre a SBPlast e nossa história</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
