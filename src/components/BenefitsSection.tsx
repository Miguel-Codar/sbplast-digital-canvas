import React from "react";
import ClientCarousel from "./ClientCarousel";

const BenefitsSection = () => {
  const clientLogos = [
    "/lovable-uploads/LOGOMARCAS/IMG_1636.PNG",
    "/lovable-uploads/LOGOMARCAS/IMG_1637.JPG",
    "/lovable-uploads/LOGOMARCAS/IMG_1638.JPG",
    "/lovable-uploads/LOGOMARCAS/IMG_1639.PNG",
    "/lovable-uploads/LOGOMARCAS/IMG_1640.JPG",
    "/lovable-uploads/LOGOMARCAS/IMG_1641.PNG",
    "/lovable-uploads/LOGOMARCAS/IMG_1642.PNG",
    "/lovable-uploads/LOGOMARCAS/IMG_1643.PNG",
    "/lovable-uploads/LOGOMARCAS/IMG_1644.PNG",
    "/lovable-uploads/LOGOMARCAS/IMG_1645.PNG",
    "/lovable-uploads/LOGOMARCAS/IMG_1646.PNG",
    "/lovable-uploads/LOGOMARCAS/IMG_1647.PNG",
    "/lovable-uploads/LOGOMARCAS/IMG_1648.JPG",
    "/lovable-uploads/LOGOMARCAS/IMG_1649.PNG",
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-sbplast-blue mb-4">
            Clientes parceiros que confiam em nós
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça algumas das empresas que confiam na qualidade e excelência da SB Plast
          </p>
        </div>

        <div className="bg-white py-6 px-4 rounded-xl shadow-lg">
          <ClientCarousel images={clientLogos} speed={30} />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;