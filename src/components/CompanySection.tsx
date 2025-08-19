
import React from "react";
import CompanyCarousel from "./CompanyCarousel";

const CompanySection = () => {
  const companyImages = [
    "/lovable-uploads/INSTALAÇÕES/FOTO 5 - SB PLAST.jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 8 - SB PLAST .jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 11 - SB PLAST .jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 14 - SB PLAST .jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 15 - SB PLAST_.png",
    "/lovable-uploads/INSTALAÇÕES/FOTO 18 - SB PLAST .jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 19 - SB PLAST .jpeg",
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto text-center max-w-7xl">
        <div className="mb-12">
          <h2 className="font-poppins text-3xl md:text-5xl font-bold mb-4 text-sbplast-blue">
            A melhor estrutura você encontra aqui!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça nossas modernas instalações e tecnologia de ponta para produção de embalagens plásticas
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-sbplast-cyan to-sbplast-blue mx-auto rounded-full mt-6"></div>
        </div>
        
        <div className="mb-8">
          <CompanyCarousel images={companyImages} speed={20} />
        </div>
        
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-sbplast-blue mb-4">
            Infraestrutura de Excelência
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Nossa fábrica conta com equipamentos de última geração, processos automatizados e 
            rigoroso controle de qualidade, garantindo produtos de alta performance e durabilidade 
            para atender às mais diversas necessidades do mercado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
