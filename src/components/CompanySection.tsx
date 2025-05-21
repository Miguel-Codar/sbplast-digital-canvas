
import React from "react";
import CompanyCarousel from "./CompanyCarousel";

const CompanySection = () => {
  const companyImages = [
    "/lovable-uploads/b1f0df19-504e-4b45-bc38-a2fd5def32c9.png",
    "/lovable-uploads/3fd96328-92ad-489a-ab9c-bc2ddcc9dac1.png",
    "/lovable-uploads/db6909d7-b30c-474a-9bf7-b0fbb5b13c57.png",
    "/lovable-uploads/c419d0a9-4176-48ae-a591-3887eb8077b9.png",
    "/lovable-uploads/7081af8d-e844-4f89-8aba-f99b4c7a0c71.png",
    "/lovable-uploads/c7524110-e322-42ab-9918-b0b4aa4b1aaf.png",
    "/lovable-uploads/4edf2385-3091-46ab-9c6b-be12f716a6c5.png",
    "/lovable-uploads/931d18db-998c-4395-a6c4-3d0ff80568d2.png"
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto text-center max-w-6xl">
        <h2 className="font-poppins text-2xl md:text-4xl font-semibold mb-10 text-sbplast-blue">
          Conheça as nossas instalações
        </h2>
        
        <div className="bg-gray-50 py-10 px-4 rounded-lg shadow-sm">
          <div className="mb-8">
            <CompanyCarousel images={companyImages} speed={25} />
          </div>
          
          <p className="text-lg text-gray-700 mt-6 max-w-3xl mx-auto">
            Nossa empresa conta com instalações modernas e equipamentos de última geração para garantir 
            a qualidade dos nossos produtos e o melhor atendimento aos nossos clientes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
