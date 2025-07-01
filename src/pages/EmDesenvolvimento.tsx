
import React from "react";
import { Settings, Cog, Wrench, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmDesenvolvimento = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
          {/* Animated gears */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Settings className="w-20 h-20 text-sbplast-blue animate-spin" style={{ animationDuration: '3s' }} />
              <Cog className="w-12 h-12 text-sbplast-cyan absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
              <Wrench className="w-8 h-8 text-sbplast-lightBlue absolute -bottom-1 -left-1 animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-sbplast-blue mb-6">
            Estamos em Desenvolvimento
          </h1>
          
          <div className="flex items-center justify-center mb-6">
            <Clock className="w-6 h-6 text-sbplast-cyan mr-2" />
            <p className="text-xl text-gray-600">
              Nossa seção de produtos está sendo aprimorada
            </p>
          </div>

          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Estamos trabalhando para oferecer uma experiência ainda melhor na visualização 
            dos nossos produtos e soluções em embalagens plásticas. Em breve, você terá 
            acesso a um catálogo completo e interativo.
          </p>

          <div className="bg-gradient-to-r from-sbplast-cyan/10 to-sbplast-blue/10 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-sbplast-blue mb-3">
              Enquanto isso, você pode:
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Solicitar um orçamento personalizado</li>
              <li>• Entrar em contato via WhatsApp</li>
              <li>• Conhecer nossa empresa e história</li>
              <li>• Explorar nossas soluções por segmento</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-sbplast-blue text-sbplast-blue hover:bg-sbplast-blue hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Início
              </Button>
            </Link>
            
            <Link to="/atendimento">
              <Button className="bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue">
                Solicitar Orçamento
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmDesenvolvimento;
