import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AboutPage = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentInfraImageIndex, setCurrentInfraImageIndex] = useState(0);

  // Imagens do carrossel principal (fundo do título)
  const headerImages = [
    "/lovable-uploads/INSTALAÇÕES/FOTO 11 - SB PLAST .jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 14 - SB PLAST .jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 15 - SB PLAST_.png",
    "/lovable-uploads/INSTALAÇÕES/FOTO 18 - SB PLAST .jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 19 - SB PLAST .jpeg"
  ];

  // Imagens da seção de infraestrutura
  const infraImages = [
    "/lovable-uploads/INSTALAÇÕES/FOTO 5 - SB PLAST.jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 8 - SB PLAST .jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 11 - SB PLAST .jpeg",
    "/lovable-uploads/INSTALAÇÕES/FOTO 14 - SB PLAST .jpeg"
  ];

  // Auto-rotação do carrossel principal
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % headerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [headerImages.length]);

  // Auto-rotação do carrossel de infraestrutura
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfraImageIndex((prev) => (prev + 1) % infraImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [infraImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % headerImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + headerImages.length) % headerImages.length);
  };

  const nextInfraImage = () => {
    setCurrentInfraImageIndex((prev) => (prev + 1) % infraImages.length);
  };

  const prevInfraImage = () => {
    setCurrentInfraImageIndex((prev) => (prev - 1 + infraImages.length) % infraImages.length);
  };

  return (
    <div className="sbplast-container py-8">
      {/* Background banner with carousel */}
      <div className="relative mb-6 py-24 bg-sbplast-blue text-white rounded-lg overflow-hidden">
        {/* Carrossel de imagens de fundo */}
        <div className="absolute inset-0">
          {headerImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />
          ))}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-sbplast-blue opacity-70"></div>
        
        {/* Controles do carrossel */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-300 z-20"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-300 z-20"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
        
        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {headerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
        
        {/* Conteúdo do título */}
        <div className="relative z-10 text-center px-8">
          <h1 className="text-3xl md:text-4xl font-bold">SB Plast: 32 anos de tradição e inovação em embalagens plásticas</h1>
        </div>
      </div>

      <Breadcrumb
        items={[{ label: "A SB Plast", url: "/a-sbplast" }]}
      />

      {/* História da Empresa */}
      <section className="py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-sbplast-blue mb-4">Nossa História</h2>
            <p className="text-gray-700 mb-4">
              Há mais de três décadas, a SB Plast é referência em embalagens plásticas personalizadas, 
              atendendo com excelência empresas de todo o Nordeste do Brasil. Nossa história, que começou 
              em uma pequena fábrica movida por espírito empreendedor, evoluiu para um parque industrial 
              moderno, equipado com tecnologia de ponta e processos inovadores.
            </p>
            <h3 className="text-xl font-semibold text-sbplast-blue mb-3">Inovação sob medida para valorizar o seu produto</h3>
            <p className="text-gray-700 mb-4">
              Entendemos que cada cliente tem demandas únicas. Por isso, desenvolvemos soluções de embalagens 
              plásticas personalizadas que agregam valor ao seu produto, elevando a imagem da sua marca e 
              otimizando sua logística. Nossa equipe atua de ponta a ponta no processo – da concepção ao 
              acabamento – garantindo funcionalidade, estética diferenciada e máxima proteção.
            </p>
            <h3 className="text-xl font-semibold text-sbplast-blue mb-3">Qualidade, durabilidade e sustentabilidade em cada detalhe</h3>
            <p className="text-gray-700 mb-4">
              Na SB Plast, qualidade é prioridade absoluta. Seguimos os mais rígidos padrões de produção e 
              controle, entregando produtos duráveis, práticos e que atendem às exigências do mercado moderno. 
              Temos compromisso com o futuro, adotando práticas sustentáveis, o uso de materiais recicláveis 
              e processos ecoeficientes que minimizam nosso impacto ambiental.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/17c48107-0c2c-4715-887d-90477ca09214.png" 
              alt="Vista aérea da SB Plast" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Missão, Visão e Valores</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-sbplast-blue mb-3">Missão</h3>
            <p className="text-gray-700">
              Desenvolver e fornecer soluções em embalagens plásticas com qualidade, 
              inovação e sustentabilidade, gerando valor para nossos clientes, colaboradores 
              e parceiros.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-sbplast-blue mb-3">Visão</h3>
            <p className="text-gray-700">
              Ser reconhecida como referência nacional em soluções inovadoras e sustentáveis 
              no segmento de embalagens plásticas, expandindo nossa presença no mercado com 
              responsabilidade e excelência.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-sbplast-blue mb-3">Valores</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Inovação contínua</li>
              <li>• Compromisso com a qualidade</li>
              <li>• Responsabilidade ambiental</li>
              <li>• Ética nas relações</li>
              <li>• Valorização das pessoas</li>
              <li>• Compromisso com entrega</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nossa Trajetória - Timeline atualizada */}
      <section className="py-12 bg-white rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Nossa Trajetória</h2>
        
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-sbplast-cyan"></div>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">1992</h3>
                  <p className="text-gray-700">Fundação da SB Plast em Jaboatão dos Guararapes-PE, iniciando com foco em embalagens plásticas para o mercado nordestino.</p>
                </div>
              </div>
              <div className="hidden md:block w-4 h-4 bg-sbplast-cyan rounded-full border-4 border-white shadow-md z-10"></div>
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8"></div>
              <div className="hidden md:block w-4 h-4 bg-sbplast-cyan rounded-full border-4 border-white shadow-md z-10"></div>
              <div className="md:w-1/2 md:pl-8 mb-4 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2000</h3>
                  <p className="text-gray-700">Expansão da capacidade produtiva e modernização do parque fabril com equipamentos de última geração.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2010</h3>
                  <p className="text-gray-700">Implementação de processos sustentáveis e certificações de qualidade, consolidando nossa posição no mercado.</p>
                </div>
              </div>
              <div className="hidden md:block w-4 h-4 bg-sbplast-cyan rounded-full border-4 border-white shadow-md z-10"></div>
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8"></div>
              <div className="hidden md:block w-4 h-4 bg-sbplast-cyan rounded-full border-4 border-white shadow-md z-10"></div>
              <div className="md:w-1/2 md:pl-8 mb-4 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2024</h3>
                  <p className="text-gray-700">Lançamento da nova plataforma digital e expansão para novos mercados, mantendo o compromisso com inovação e qualidade.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infraestrutura e Capacidade */}
      <section className="py-12">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Infraestrutura e Capacidade</h2>
        
        {/* Carrossel de imagens da infraestrutura */}
        <div className="relative mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img 
                src={infraImages[currentInfraImageIndex]} 
                alt={`Instalações SB Plast ${currentInfraImageIndex + 1}`}
                className="w-full h-64 object-cover transition-all duration-500"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                {currentInfraImageIndex + 1} / {infraImages.length}
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img 
                src={infraImages[(currentInfraImageIndex + 1) % infraImages.length]} 
                alt={`Instalações SB Plast ${((currentInfraImageIndex + 1) % infraImages.length) + 1}`}
                className="w-full h-64 object-cover transition-all duration-500"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                {((currentInfraImageIndex + 1) % infraImages.length) + 1} / {infraImages.length}
              </div>
            </div>
          </div>
          
          {/* Controles do carrossel de infraestrutura */}
          <button
            onClick={prevInfraImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-sbplast-blue hover:bg-sbplast-darkBlue rounded-full p-2 transition-all duration-300 text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={nextInfraImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-sbplast-blue hover:bg-sbplast-darkBlue rounded-full p-2 transition-all duration-300 text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h3 className="text-xl font-medium text-sbplast-blue mb-3">Tecnologia e Inovação</h3>
            <p className="text-gray-700 mb-4">
              Nossa fábrica conta com equipamentos de última geração e processos automatizados, 
              garantindo alta produtividade com qualidade consistente. Investimos continuamente em 
              pesquisa e desenvolvimento para criar soluções inovadoras em embalagens plásticas.
            </p>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-medium text-sbplast-blue mb-3">Compromisso com Entrega</h3>
            <p className="text-gray-700 mb-4">
              Mantemos rigoroso controle de prazos e qualidade, garantindo que cada produto chegue 
              ao cliente no tempo certo e com a excelência esperada. Nosso compromisso vai além da 
              produção, estendendo-se ao atendimento personalizado e suporte contínuo.
            </p>
          </div>
        </div>
      </section>

      <ContactForm
        open={contactFormOpen}
        onOpenChange={setContactFormOpen}
      />
    </div>
  );
};

export default AboutPage;
