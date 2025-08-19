
import React from "react";
import { CheckCircle, Award, Users, Zap, Truck, ShoppingCart, Car, UtensilsCrossed, Factory, Building2, Coffee, Hotel, Heart, Pill } from "lucide-react";

const AboutSection = () => {
  const differentials = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Mais de 30 anos de experiência",
      description: "Tradição e expertise no mercado de embalagens plásticas"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Qualidade certificada",
      description: "Produtos que atendem aos mais rigorosos padrões de qualidade"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Atendimento personalizado",
      description: "Soluções sob medida para cada necessidade do cliente"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Inovação constante",
      description: "Sempre buscando as melhores tecnologias e materiais"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Compromisso com a entrega",
      description: "Rigoroso controle de prazos e qualidade, garantindo que cada produto chegue no tempo certo"
    }
  ];

  const segments = [
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: "Comércio varejista e atacadista"
    },
    {
      icon: <Car className="w-5 h-5" />,
      title: "Comércio de peças, reparação de veículos e concessionárias"
    },
    {
      icon: <UtensilsCrossed className="w-5 h-5" />,
      title: "Fabricação de produtos alimentícios"
    },
    {
      icon: <Factory className="w-5 h-5" />,
      title: "Indústria de diversos segmentos"
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: "Supermercados"
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      title: "Padarias e delicatessens"
    },
    {
      icon: <UtensilsCrossed className="w-5 h-5" />,
      title: "Restaurantes"
    },
    {
      icon: <Hotel className="w-5 h-5" />,
      title: "Hotéis e lavanderias"
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Hospitais, clínicas e laboratórios"
    },
    {
      icon: <Pill className="w-5 h-5" />,
      title: "Farmácias"
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
            {differentials.map((item, index) => (
              <div 
                key={index}
                className={`flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 scroll-reveal stagger-${index + 1}`}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-sbplast-cyan/10 rounded-lg flex items-center justify-center text-sbplast-blue mb-4">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-sbplast-blue mb-2 text-sm">{item.title}</h4>
                <p className="text-gray-600 text-xs">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Atendemos todos os segmentos */}
          <h3 className="text-2xl font-bold text-sbplast-blue mb-8">
            Atendemos todos os segmentos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {segments.map((segment, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-sbplast-cyan/10 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-sbplast-cyan/20 rounded-full flex items-center justify-center text-sbplast-blue">
                  {segment.icon}
                </div>
                <span className="text-sm font-medium text-sbplast-blue">{segment.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Segunda parte - Vídeo com 32 anos */}
        <div className="flex justify-center">
          <div className="scroll-reveal-up max-w-5xl">
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://player.vimeo.com/video/1100323006?byline=0&portrait=0&title=0"
                  width="100%"
                  height="100%"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="32 anos de experiência SB Plast"
                ></iframe>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-sbplast-cyan text-sbplast-blue p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">32</div>
                <div className="text-sm">Anos de</div>
                <div className="text-sm">Experiência</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
