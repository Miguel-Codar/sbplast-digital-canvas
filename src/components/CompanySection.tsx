
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
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto text-center max-w-6xl">
        <h2 className="font-poppins text-2xl md:text-4xl font-semibold mb-10 text-sbplast-blue">
          A melhor estrutura você encontra aqui!
        </h2>
        
        <div className="bg-gray-50 py-10 px-4 rounded-lg shadow-sm">
          <div className="mb-8">
            <CompanyCarousel images={companyImages} speed={25} />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
