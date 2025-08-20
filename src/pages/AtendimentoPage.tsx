
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import TrabalheConoscoForm from "@/components/TrabalheConoscoForm";
import { Mail, Phone, FileText, Users, Briefcase } from "lucide-react";

const AtendimentoPage = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [trabalheConoscoOpen, setTrabalheConoscoOpen] = useState(false);
  const [contactFormType, setContactFormType] = useState<"contato" | "orcamento" | "assistencia">("orcamento");

  const openContactForm = (type: "contato" | "orcamento" | "assistencia") => {
    setContactFormType(type);
    setContactFormOpen(true);
  };

  return (
    <div className="sbplast-container py-8">
      {/* Background banner with title */}
      <div 
        className="relative mb-6 py-24 text-white rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url(/lovable-uploads/Atendimento SB.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#1e40af"
        }}
      >
        <div className="absolute inset-0 bg-sbplast-blue bg-opacity-70"></div>
        <div className="relative z-10 text-center px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Fale conosco agora mesmo</h1>
          <Button
            onClick={() => setTrabalheConoscoOpen(true)}
            className="bg-gradient-to-r from-sbplast-cyan to-green-500 text-white hover:from-sbplast-darkCyan hover:to-green-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Briefcase className="mr-2 h-5 w-5" />
            Venha trabalhar aqui
          </Button>
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

          {/* SAC (corrigido de SACO) */}
          <div className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-sbplast-cyan to-sbplast-blue rounded-full flex items-center justify-center text-white mb-6 mx-auto">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-sbplast-blue mb-4 text-center">SAC - Atendimento ao Cliente</h3>
            <p className="text-gray-600 text-center mb-6">
              Entre em contato com nosso Serviço de Atendimento ao Cliente para dúvidas e suporte
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue"
              onClick={() => openContactForm("contato")}
            >
              Falar com SAC
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
      
      <TrabalheConoscoForm
        open={trabalheConoscoOpen}
        onOpenChange={setTrabalheConoscoOpen}
      />
    </div>
  );
};

export default AtendimentoPage;
