
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import CompanyCarousel from "./CompanyCarousel";

const SimulatorsSection = () => {
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
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="font-poppins text-2xl md:text-4xl font-semibold mb-6 text-sbplast-blue">
          Está em dúvida de qual produto melhor atende às suas necessidades?
        </h2>
        
        {/* Company Images Carousel */}
        <div className="my-8">
          <CompanyCarousel images={companyImages} speed={40} />
        </div>
        
        <p className="text-lg md:text-xl mb-8 text-gray-700">
          Utilize nossos simuladores e encontre o produto ideal.
        </p>
        <Button 
          size="lg"
          className="bg-[#0e2e61] hover:bg-[#0e2e61]/90 text-white rounded-lg hover:scale-105 transition-transform shadow-md text-lg px-6 py-3"
          asChild
        >
          <Link to="/simuladores">Preencher Formulário</Link>
        </Button>
      </div>
    </section>
  );
};

export default SimulatorsSection;
