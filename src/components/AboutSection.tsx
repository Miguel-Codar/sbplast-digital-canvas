
import React from "react";
import { CheckCircle, Award, Users, Zap, Truck, ShoppingCart, Car, UtensilsCrossed, Factory, Building2, Coffee, Hotel, Heart, Pill, Wrench } from "lucide-react";

const AboutSection = () => {
  const differentials = [
    {
      icon: Award,
      title: "Mais de 30 anos de experiência",
      description: "Tradição e expertise no mercado de embalagens plásticas"
    },
    {
      icon: CheckCircle,
      title: "Qualidade certificada",
      description: "Produtos que atendem aos mais rigorosos padrões de qualidade"
    },
    {
      icon: Users,
      title: "Atendimento personalizado",
      description: "Soluções sob medida para cada necessidade do cliente"
    },
    {
      icon: Zap,
      title: "Inovação constante",
      description: "Sempre buscando as melhores tecnologias e materiais"
    },
    {
      icon: Truck,
      title: "Compromisso com a entrega",
      description: "Rigoroso controle de prazos e qualidade, garantindo que cada produto chegue no tempo certo"
    }
  ];

  const segments = [
    {
      icon: Wrench,
      title: "Tecnologia SB"
    },
    {
      icon: Pill,
      title: "Farmácias"
    },
    {
      icon: Heart,
      title: "Clínica e hospitais"
    },
    {
      icon: Hotel,
      title: "Hotel e lavanderias"
    },
    {
      icon: UtensilsCrossed,
      title: "Restaurantes"
    },
    {
      icon: Coffee,
      title: "Padaria e deli"
    },
    {
      icon: Building2,
      title: "Supermercados"
    },
    {
      icon: Factory,
      title: "Indústrias"
    },
    {
      icon: UtensilsCrossed,
      title: "Alimentícios"
    },
    {
      icon: Car,
      title: "Autopeças"
    },
    {
      icon: ShoppingCart,
      title: "Atacado varejo"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        {/* Primeira parte - O que você encontra aqui */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-sbplast-blue mb-12">
            O que você encontra aqui
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {differentials.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className={`flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 scroll-reveal stagger-${index + 1}`}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-sbplast-cyan/10 rounded-lg flex items-center justify-center text-sbplast-blue mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-sbplast-blue mb-2 text-sm">{item.title}</h4>
                  <p className="text-gray-600 text-xs">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Atendemos todos os segmentos */}
          <h3 className="text-2xl font-bold text-sbplast-blue mb-8">
            Atendemos todos os segmentos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((differential, index) => {
              const IconComponent = differential.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center card-hover">
                  <div className="w-16 h-16 bg-gradient-to-br from-sbplast-cyan to-sbplast-blue rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-sbplast-blue mb-2">{differential.title}</h3>
                  <p className="text-gray-600 text-sm">{differential.description}</p>
                </div>
              );
            })}
          </div>

          {/* Segmentos Atendidos */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-sbplast-blue mb-12">Segmentos Atendidos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {segments.map((segment, index) => {
                const IconComponent = segment.icon;
                return (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center card-hover">
                    <div className="w-12 h-12 bg-gradient-to-br from-sbplast-cyan to-sbplast-blue rounded-full flex items-center justify-center text-white mb-3 mx-auto">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-medium text-sbplast-blue">{segment.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
