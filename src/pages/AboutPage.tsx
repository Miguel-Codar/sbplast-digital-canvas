
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { useState } from "react";

const AboutPage = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);

  return (
    <div className="sbplast-container py-8">
      {/* Background banner with title */}
      <div 
        className="relative mb-6 py-16 bg-sbplast-blue text-white rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url(https://via.placeholder.com/1200x300)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-sbplast-blue opacity-70"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">A SBPlast</h1>
        </div>
      </div>

      <Breadcrumb
        items={[{ label: "A SBPlast", url: "/a-sbplast" }]}
      />

      {/* História da Empresa */}
      <section className="py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-sbplast-blue mb-4">Nossa História</h2>
            <p className="text-gray-700 mb-4">
              A SBPlast é uma empresa brasileira especializada no segmento de embalagens plásticas, com mais de 20 anos de experiência no mercado. 
              Nossa trajetória começou em uma pequena fábrica e hoje contamos com instalações modernas e tecnologia de ponta.
            </p>
            <p className="text-gray-700 mb-4">
              Nosso compromisso com a qualidade e inovação nos posicionou como referência no setor, 
              desenvolvendo soluções que atendem às necessidades específicas de nossos clientes e parceiros.
            </p>
            <p className="text-gray-700">
              Trabalhamos constantemente para oferecer produtos que combinam praticidade, durabilidade e 
              respeito ao meio ambiente, seguindo rigorosos padrões de produção e controle de qualidade.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://via.placeholder.com/600x400" 
              alt="Fábrica SBPlast" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Linha do Tempo */}
      <section className="py-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Nossa Trajetória</h2>
        
        <div className="relative">
          {/* Linha vertical central */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-sbplast-cyan"></div>
          
          {/* Marcos históricos */}
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2000</h3>
                  <p className="text-gray-700">Fundação da empresa com foco em embalagens para o setor de alimentos.</p>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
              <div className="md:w-1/2 md:pl-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2005</h3>
                  <p className="text-gray-700">Expansão da planta fabril e aumento da capacidade produtiva.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2010</h3>
                  <p className="text-gray-700">Certificação ISO 9001 e investimento em novas tecnologias.</p>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
              <div className="md:w-1/2 md:pl-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2015</h3>
                  <p className="text-gray-700">Lançamento da linha de produtos sustentáveis e biodegradáveis.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2020</h3>
                  <p className="text-gray-700">Modernização completa do parque industrial com automação e eficiência energética.</p>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
              <div className="md:w-1/2 md:pl-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2023</h3>
                  <p className="text-gray-700">Expansão para o mercado internacional e diversificação do portfólio de produtos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Fábrica */}
      <section className="py-12">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Nossa Fábrica</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <img 
            src="https://via.placeholder.com/400x300" 
            alt="Fábrica SBPlast" 
            className="rounded-lg shadow-md w-full h-auto"
          />
          <img 
            src="https://via.placeholder.com/400x300" 
            alt="Linha de produção" 
            className="rounded-lg shadow-md w-full h-auto"
          />
          <img 
            src="https://via.placeholder.com/400x300" 
            alt="Controle de qualidade" 
            className="rounded-lg shadow-md w-full h-auto"
          />
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
            <h3 className="text-xl font-medium text-sbplast-blue mb-3">Sustentabilidade</h3>
            <p className="text-gray-700 mb-4">
              Comprometidos com o meio ambiente, implementamos processos de produção mais sustentáveis, 
              incluindo o uso de energia renovável, reaproveitamento de água e desenvolvimento de 
              produtos biodegradáveis e de menor impacto ambiental.
            </p>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Nossa Localização</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h3 className="text-xl font-medium text-sbplast-blue mb-3">Endereço</h3>
            <p className="text-gray-700 mb-1">Av. Industrial, 2000</p>
            <p className="text-gray-700 mb-1">Distrito Industrial</p>
            <p className="text-gray-700 mb-4">São Paulo - SP, 00000-000</p>
            
            <h3 className="text-xl font-medium text-sbplast-blue mb-3 mt-6">Contato</h3>
            <p className="text-gray-700 mb-1">Telefone: (11) 5555-5555</p>
            <p className="text-gray-700 mb-4">E-mail: contato@sbplast.com.br</p>
            
            <Button 
              className="mt-4 bg-sbplast-blue hover:bg-sbplast-blue/90"
              onClick={() => setContactFormOpen(true)}
            >
              Fale Conosco
            </Button>
          </div>
          <div className="md:w-1/2 h-64 md:h-auto">
            {/* Aqui poderia ser integrado um mapa do Google Maps */}
            <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Mapa da localização</span>
            </div>
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
