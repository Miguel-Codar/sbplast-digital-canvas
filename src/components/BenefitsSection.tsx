
import React from "react";
import CompanyCarousel from "./CompanyCarousel";

const BenefitsSection = () => {
  const clientLogos = [
    "/lovable-uploads/4f8de077-3faa-44df-9074-a3852e154563.png",
    "/lovable-uploads/41b2ffd7-38b8-40de-bc98-c13f73f9a72e.png",
    "/lovable-uploads/c96088ea-58e8-42e3-9f00-e4ed2bfdf3ed.png",
    "/lovable-uploads/7057e344-acf3-405b-9a92-05841fcfe709.png",
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold text-sbplast-blue mb-4">
            Clientes parceiros que confiam em nós
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça algumas das empresas que confiam na qualidade e excelência da SB Plast
          </p>
        </div>

        <div className="bg-white py-10 px-4 rounded-2xl shadow-lg">
          <CompanyCarousel images={clientLogos} speed={30} />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
