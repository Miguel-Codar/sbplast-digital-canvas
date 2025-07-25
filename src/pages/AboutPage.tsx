
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { useState } from "react";
import { MapPin, Mail, Phone, Truck } from "lucide-react";

const AboutPage = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);

  return (
    <div className="sbplast-container py-8">
      {/* Background banner with title */}
      <div 
        className="relative mb-6 py-24 bg-sbplast-blue text-white rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url(/lovable-uploads/4ed71b0f-a9c9-4b08-9130-8255c10afd3d.png)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-sbplast-blue opacity-70"></div>
        <div className="relative z-10 text-center px-8">
          <h1 className="text-3xl md:text-4xl font-bold">SBPlast: 32 anos de tradição e inovação em embalagens plásticas</h1>
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
              Há mais de três décadas, a SBPlast é referência em embalagens plásticas personalizadas, 
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
              Na SBPlast, qualidade é prioridade absoluta. Seguimos os mais rígidos padrões de produção e 
              controle, entregando produtos duráveis, práticos e que atendem às exigências do mercado moderno. 
              Temos compromisso com o futuro, adotando práticas sustentáveis, o uso de materiais recicláveis 
              e processos ecoeficientes que minimizam nosso impacto ambiental.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/4ed71b0f-a9c9-4b08-9130-8255c10afd3d.png" 
              alt="Vista aérea da SBPlast" 
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
                  <p className="text-gray-700">Fundação da SBPlast em Jaboatão dos Guararapes-PE, iniciando com foco em embalagens plásticas para o mercado nordestino.</p>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
              <div className="md:w-1/2 md:pl-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">1998</h3>
                  <p className="text-gray-700">Primeira expansão da fábrica e implementação de novas linhas de produção para atender a crescente demanda.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2005</h3>
                  <p className="text-gray-700">Modernização do parque fabril com equipamentos de última geração e certificação de qualidade.</p>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
              <div className="md:w-1/2 md:pl-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2012</h3>
                  <p className="text-gray-700">Lançamento da linha de embalagens personalizadas e início do foco em soluções sustentáveis.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2018</h3>
                  <p className="text-gray-700">Expansão para novos segmentos de mercado e desenvolvimento da linha P-Life com materiais biodegradáveis.</p>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 hidden md:block"></div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-1/2 md:pr-8 hidden md:block"></div>
              <div className="md:w-1/2 md:pl-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-medium text-sbplast-blue">2024</h3>
                  <p className="text-gray-700">Consolidação como líder regional em embalagens personalizadas, com 32 anos de tradição e inovação contínua.</p>
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
            src="/lovable-uploads/1cd73103-ccca-4cbb-8767-933e9b8c3606.png" 
            alt="Equipamentos de produção SBPlast" 
            className="rounded-lg shadow-md w-full h-auto"
          />
          <img 
            src="/lovable-uploads/01a39553-7d53-43e5-a047-30b87d9565e7.png" 
            alt="Máquinas industriais" 
            className="rounded-lg shadow-md w-full h-auto"
          />
          <img 
            src="/lovable-uploads/dd7487f2-6072-4b19-bc21-6d729742f717.png" 
            alt="Matéria-prima plástica" 
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
            <h3 className="text-xl font-medium text-sbplast-blue mb-3">Compromisso com Entrega</h3>
            <p className="text-gray-700 mb-4">
              Mantemos rigoroso controle de prazos e qualidade, garantindo que cada produto chegue 
              ao cliente no tempo certo e com a excelência esperada. Nosso compromisso vai além da 
              produção, estendendo-se ao atendimento personalizado e suporte contínuo.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa Localização */}
      <section className="py-12 bg-white rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Nossa Localização</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="flex items-start mb-6">
              <MapPin className="h-6 w-6 text-sbplast-blue mr-3 mt-0.5" />
              <div>
                <h3 className="text-xl font-medium text-sbplast-blue mb-2">Endereço</h3>
                <p className="text-gray-700 mb-1">Rua Arabé, 112</p>
                <p className="text-gray-700 mb-1">Comportas</p>
                <p className="text-gray-700 mb-4">Jaboatão dos Guararapes-PE</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <Phone className="h-6 w-6 text-sbplast-blue mr-3 mt-0.5" />
              <div>
                <h3 className="text-xl font-medium text-sbplast-blue mb-2">Telefones</h3>
                <p className="text-gray-700 mb-1">
                  <a href="tel:+558134761227" className="hover:text-sbplast-cyan">(81) 3476-1227</a>
                </p>
                <p className="text-gray-700 mb-1">
                  <a 
                    href="https://wa.me/5581995015223" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-sbplast-cyan"
                  >
                    (81) 99501-5223 (WhatsApp)
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <Mail className="h-6 w-6 text-sbplast-blue mr-3 mt-0.5" />
              <div>
                <h3 className="text-xl font-medium text-sbplast-blue mb-2">E-mails</h3>
                <p className="text-gray-700 mb-1">
                  <a href="mailto:vendas@sbplasticos.com.br" className="hover:text-sbplast-cyan">
                    vendas@sbplasticos.com.br
                  </a>
                </p>
                <p className="text-gray-700 mb-1">
                  <a href="mailto:sac@sbplasticos.com.br" className="hover:text-sbplast-cyan">
                    sac@sbplasticos.com.br
                  </a>
                </p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.8857765631996!2d-34.9468!3d-8.1137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae1c5e6e6e6e6e%3A0x6e6e6e6e6e6e6e6e!2sRua%20Arab%C3%A9%2C%20112%20-%20Comportas%2C%20Jaboat%C3%A3o%20dos%20Guararapes%20-%20PE!5e0!3m2!1spt-BR!2sbr!4v1621436342161!5m2!1spt-BR!2sbr" 
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
