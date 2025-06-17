
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { MapPin, Mail, Phone, FileText, Users } from "lucide-react";

const AtendimentoPage = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactFormType, setContactFormType] = useState<"contato" | "orcamento" | "assistencia">("orcamento");

  const openContactForm = (type: "contato" | "orcamento" | "assistencia") => {
    setContactFormType(type);
    setContactFormOpen(true);
  };

  return (
    <div className="sbplast-container py-8">
      {/* Background banner with title */}
      <div 
        className="relative mb-6 py-16 bg-sbplast-blue text-white rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-sbplast-blue opacity-70"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Atendimento SBPlast</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">Escolha o canal ideal para suas necessidades</p>
        </div>
      </div>

      <Breadcrumb
        items={[{ label: "Atendimento", url: "/atendimento" }]}
      />

      {/* Canais de Atendimento */}
      <section className="py-12">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Nossos Canais de Atendimento</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Solicitar Orçamento */}
          <div className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-sbplast-cyan to-sbplast-blue rounded-full flex items-center justify-center text-white mb-6 mx-auto">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-sbplast-blue mb-4 text-center">Solicitar Orçamento</h3>
            <p className="text-gray-600 text-center mb-6">
              Preencha nosso formulário e receba um orçamento personalizado para suas necessidades
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue"
              onClick={() => openContactForm("orcamento")}
            >
              Solicitar Orçamento
            </Button>
          </div>

          {/* WhatsApp Comercial */}
          <div className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 mx-auto">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-sbplast-blue mb-4 text-center">WhatsApp Comercial</h3>
            <p className="text-gray-600 text-center mb-6">
              Fale diretamente com nossa equipe comercial pelo WhatsApp
            </p>
            <Button 
              className="w-full bg-green-500 text-white hover:bg-green-600"
              onClick={() => window.open('https://wa.me/5581995015223?text=Olá! Gostaria de falar com o comercial da SBPlast.', '_blank')}
            >
              Abrir WhatsApp
            </Button>
          </div>

          {/* Cadastro de Fornecedores */}
          <div className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-sbplast-cyan to-sbplast-blue rounded-full flex items-center justify-center text-white mb-6 mx-auto">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-sbplast-blue mb-4 text-center">Cadastro de Fornecedores</h3>
            <p className="text-gray-600 text-center mb-6">
              Cadastre-se como fornecedor e faça parte da nossa rede de parceiros
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue"
              onClick={() => openContactForm("contato")}
            >
              Cadastrar Fornecedor
            </Button>
          </div>
        </div>
      </section>

      {/* Contatos Diretos */}
      <section className="py-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Contatos Diretos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* E-mails */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <Mail className="h-6 w-6 text-sbplast-blue mr-3 mt-0.5" />
              <div>
                <h3 className="text-xl font-medium text-sbplast-blue mb-3">E-mails</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-gray-800">Vendas:</p>
                    <a href="mailto:vendas@sbplasticos.com.br" className="text-sbplast-cyan hover:underline">
                      vendas@sbplasticos.com.br
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">SAC:</p>
                    <a href="mailto:sac@sbplasticos.com.br" className="text-sbplast-cyan hover:underline">
                      sac@sbplasticos.com.br
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Telefones */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start mb-4">
              <Phone className="h-6 w-6 text-sbplast-blue mr-3 mt-0.5" />
              <div>
                <h3 className="text-xl font-medium text-sbplast-blue mb-3">Telefones</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-gray-800">Fixo:</p>
                    <a href="tel:+558134761227" className="text-sbplast-cyan hover:underline">
                      (81) 3476-1227
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">WhatsApp:</p>
                    <a 
                      href="https://wa.me/5581995015223" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sbplast-cyan hover:underline"
                    >
                      (81) 99501-5223
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-12">
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

      {/* Downloads */}
      <section className="py-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-sbplast-blue mb-8 text-center">Downloads</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FileText className="h-12 w-12 text-sbplast-blue mx-auto mb-4" />
            <h3 className="text-lg font-medium text-sbplast-blue mb-2">Catálogo de Produtos</h3>
            <p className="text-gray-600 mb-4">Conheça toda nossa linha de embalagens</p>
            <Button variant="outline" className="w-full">
              Download PDF
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FileText className="h-12 w-12 text-sbplast-blue mx-auto mb-4" />
            <h3 className="text-lg font-medium text-sbplast-blue mb-2">Manual Técnico</h3>
            <p className="text-gray-600 mb-4">Especificações técnicas dos produtos</p>
            <Button variant="outline" className="w-full">
              Download PDF
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FileText className="h-12 w-12 text-sbplast-blue mx-auto mb-4" />
            <h3 className="text-lg font-medium text-sbplast-blue mb-2">Certificações</h3>
            <p className="text-gray-600 mb-4">Nossos certificados de qualidade</p>
            <Button variant="outline" className="w-full">
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      <ContactForm
        open={contactFormOpen}
        onOpenChange={setContactFormOpen}
        type={contactFormType}
      />
    </div>
  );
};

export default AtendimentoPage;
