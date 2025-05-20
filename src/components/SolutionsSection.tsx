
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
  // Categories with icons provided by the user
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
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-4 text-sbplast-blue">Soluções SBPlast</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Oferecemos uma linha completa de soluções em embalagens plásticas para diversos segmentos do mercado, 
          atendendo às necessidades específicas de cada cliente.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center justify-center group"
            >
              <div className="w-24 h-24 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-lg font-medium text-sbplast-blue text-center mb-2">{category.name}</h3>
              {category.description && (
                <p className="text-sm text-gray-600 text-center">{category.description}</p>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-sbplast-blue">Nossa Produção</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-video">
              <div className="w-full h-full">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/6G5-J9_BdXw" 
                  title="Tecnologia Avançada SBPlast" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
              <div className="p-4">
                <h4 className="text-xl font-medium text-sbplast-blue">Tecnologia Avançada</h4>
                <p className="text-gray-600">Conheça nossa tecnologia de ponta para fabricação de embalagens plásticas</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-video">
              <div className="w-full h-full">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/H_Su5zB8-V4" 
                  title="Vídeo Institucional SBPlast" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
              <div className="p-4">
                <h4 className="text-xl font-medium text-sbplast-blue">Vídeo Institucional</h4>
                <p className="text-gray-600">Conheça mais sobre a SBPlast e nossa história</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
