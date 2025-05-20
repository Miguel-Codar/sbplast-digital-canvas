
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const AboutPage = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);

  return (
    <div className="sbplast-container py-8">
      {/* Background banner with title */}
      <div 
        className="relative mb-6 py-16 bg-sbplast-blue text-white rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-sbplast-blue opacity-70"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">A SBPlast</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">Referência no segmento de embalagens plásticas</p>
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
              src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
              alt="Fábrica SBPlast" 
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
              <li>• Foco no cliente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Linha do Tempo */}
      <section className="py-12 bg-white rounded-lg p-8">
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
            src="https://images.unsplash.com/photo-1531758565361-ce8534eb0d7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Fábrica SBPlast" 
            className="rounded-lg shadow-md w-full h-auto"
          />
          <img 
            src="https://images.unsplash.com/photo-1612473741370-74bf94887efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Linha de produção" 
            className="rounded-lg shadow-md w-full h-auto"
          />
          <img 
            src="https://images.unsplash.com/photo-1673191889046-5fb4b92e5601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
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

      {/* Diferenciais */}
      <section className="py-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Nossos Diferenciais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-sbplast-blue mb-3">Frota Própria</h3>
            <p className="text-gray-700">
              Contamos com frota própria para garantir entregas pontuais e preservar a 
              integridade dos nossos produtos até o destino final.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-sbplast-blue mb-3">Atendimento Especializado</h3>
            <p className="text-gray-700">
              Nossa equipe de atendimento está preparada para oferecer suporte técnico 
              e comercial personalizado para cada cliente.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-sbplast-blue mb-3">Equipamentos Modernos</h3>
            <p className="text-gray-700">
              Utilizamos máquinas e equipamentos de última geração para garantir 
              produtos com alta qualidade e precisão.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-sbplast-blue mb-3">Experiência no Setor</h3>
            <p className="text-gray-700">
              Com mais de 20 anos no mercado, acumulamos know-how para desenvolver 
              soluções eficientes para diversos segmentos.
            </p>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-12 bg-white rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Nossa Localização</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="flex items-start mb-6">
              <MapPin className="h-6 w-6 text-sbplast-blue mr-3 mt-0.5" />
              <div>
                <h3 className="text-xl font-medium text-sbplast-blue mb-2">Endereço</h3>
                <p className="text-gray-700 mb-1">Rua São Paulo, s/n</p>
                <p className="text-gray-700 mb-1">Distrito Industrial</p>
                <p className="text-gray-700 mb-4">São Paulo - SP, 00000-000</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <Phone className="h-6 w-6 text-sbplast-blue mr-3 mt-0.5" />
              <div>
                <h3 className="text-xl font-medium text-sbplast-blue mb-2">Telefone</h3>
                <p className="text-gray-700 mb-1">(11) 5555-5555</p>
                <p className="text-gray-700 mb-1">(11) 9999-9999 (WhatsApp)</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <Mail className="h-6 w-6 text-sbplast-blue mr-3 mt-0.5" />
              <div>
                <h3 className="text-xl font-medium text-sbplast-blue mb-2">E-mail</h3>
                <p className="text-gray-700 mb-1">contato@sbplast.com.br</p>
                <p className="text-gray-700 mb-1">vendas@sbplast.com.br</p>
              </div>
            </div>
            
            <Button 
              className="mt-4 bg-sbplast-blue hover:bg-sbplast-blue/90"
              onClick={() => setContactFormOpen(true)}
            >
              Fale Conosco
            </Button>
          </div>
          <div className="md:w-1/2 h-64 md:h-auto">
            <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14628.328173732997!2d-46.6394192!3d-23.5505199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5f8c61020205%3A0x9ae474c606fef4!2sSP%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1621436342161!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy"
                title="Localização SBPlast"
              ></iframe>
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
