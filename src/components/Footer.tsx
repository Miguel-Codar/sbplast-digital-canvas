import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, User, ExternalLink, Send } from "lucide-react";
import { Button } from "./ui/button";
import TrabalheConoscoForm from "./TrabalheConoscoForm";

const Footer = () => {
  const [trabalheConoscoOpen, setTrabalheConoscoOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#0e2e61] text-white">
        <div className="sbplast-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <img 
                  src="/lovable-uploads/b6da674e-7345-45c5-8b6f-9e632d3a1e0c.png" 
                  alt="SB Plast Logo" 
                  className="h-12"
                />
              </Link>
              <p className="text-gray-300 text-sm mb-6">
                Há mais de 30 anos no mercado, oferecemos soluções completas 
                em embalagens plásticas com qualidade e inovação.
              </p>
              
              {/* Botão WhatsApp aumentado */}
              <Button
                onClick={() => setTrabalheConoscoOpen(true)}
                className="w-full bg-gradient-to-r from-sbplast-cyan to-green-500 text-white hover:from-sbplast-darkCyan hover:to-green-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                <User className="mr-3 h-6 w-6" />
                Envie seu Currículo
              </Button>
            </div>

            {/* Segmentos (substituindo Produtos) */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#18ffff]">Segmentos Atendidos</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-300 text-sm">Alimentício</span>
                </li>
                <li>
                  <span className="text-gray-300 text-sm">Farmacêutico</span>
                </li>
                <li>
                  <span className="text-gray-300 text-sm">Cosmético</span>
                </li>
                <li>
                  <span className="text-gray-300 text-sm">Químico</span>
                </li>
                <li>
                  <span className="text-gray-300 text-sm">Automotivo</span>
                </li>
                <li>
                  <span className="text-gray-300 text-sm">Têxtil</span>
                </li>
                <li>
                  <span className="text-gray-300 text-sm">Agrícola</span>
                </li>
                <li>
                  <span className="text-gray-300 text-sm">Industrial</span>
                </li>
                <li>
                  <span className="text-gray-300 text-sm">Hospitalar</span>
                </li>
                <li>
                  <span className="text-gray-300 text-sm">Limpeza</span>
                </li>
              </ul>
            </div>

            {/* A SB Plast */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#18ffff]">A SB Plast</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/a-sbplast#historia" className="text-gray-300 hover:text-[#18ffff] transition-colors text-sm">
                    Nossa História
                  </Link>
                </li>
                <li>
                  <Link to="/a-sbplast#missao-visao-valores" className="text-gray-300 hover:text-[#18ffff] transition-colors text-sm">
                    Missão, Visão e Valores
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contato (removendo localização) */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#18ffff]">Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-[#18ffff] mr-2 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <a href="tel:+558134761227" className="hover:text-[#18ffff] transition-colors">
                      (81) 3476-1227
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-[#18ffff] mr-2 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <a 
                      href="https://wa.me/5581995015223" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#18ffff] transition-colors font-medium"
                    >
                      (81) 99501-5223 (WhatsApp)
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-4 w-4 text-[#18ffff] mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>
                      <a href="mailto:vendas@sbplasticos.com.br" className="hover:text-[#18ffff] transition-colors">
                        vendas@sbplasticos.com.br
                      </a>
                    </p>
                    <p>
                      <a href="mailto:rh@sbplasticos.com.br" className="hover:text-[#18ffff] transition-colors flex items-center">
                        rh@sbplasticos.com.br
                        <Send className="ml-1 h-3 w-3" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Informações / Artigos */}
              <div className="mt-6">
                <h4 className="text-base font-medium mb-2 text-[#18ffff]">Artigos</h4>
                <Link to="/blog" className="text-gray-300 hover:text-[#18ffff] transition-colors text-sm">
                  Blog e Artigos
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20">
          <div className="sbplast-container py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 SB Plast. Todos os direitos reservados.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">PT</span>
                <div className="w-px h-4 bg-gray-400"></div>
                <Link to="/atendimento" className="text-gray-300 hover:text-[#18ffff] transition-colors text-sm">
                  Atendimento
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Trabalhe Conosco */}
      <TrabalheConoscoForm
        open={trabalheConoscoOpen}
        onOpenChange={setTrabalheConoscoOpen}
      />
    </>
  );
};

export default Footer;