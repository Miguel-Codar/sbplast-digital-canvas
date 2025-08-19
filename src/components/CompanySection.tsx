
import React from "react";
import CompanyCarousel from "./CompanyCarousel";

const CompanySection = () => {
  const companyImages = [
    "/lovable-uploads/7b49706f-93c2-4f25-a3ab-19766cb08174.png",
    "/lovable-uploads/4ca6ebe7-41eb-43df-af0c-c7d93b5090b9.png",
    "/lovable-uploads/0d8de366-80fc-438f-92c3-f3a01d7a166c.png",
    "/lovable-uploads/8a084be6-bda6-44ae-9dac-aed8d47a964a.png",
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
