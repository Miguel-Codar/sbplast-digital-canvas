
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
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-sbplast-blue mb-4">
            Nossa Infraestrutura
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça nossas modernas instalações e equipamentos de última geração
          </p>
        </div>
        
        <div className="mb-8">
          <CompanyCarousel images={companyImages} speed={20} />
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
