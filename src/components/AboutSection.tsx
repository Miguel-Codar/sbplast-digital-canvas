
import React from "react";
import { CheckCircle, Award, Users, Zap, Truck } from "lucide-react";

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
      title: "Compromisso com Entrega",
      description: "Rigoroso controle de prazos e qualidade, garantindo que cada produto chegue no tempo certo"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Vídeo Local */}
          <div className="scroll-reveal-left">
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center">
                <video
                  width="100%"
                  height="100%"
                  controls
                  className="w-full h-full object-cover"
                  preload="none"
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='%236b7280' font-family='Arial, sans-serif' font-size='16'%3ECarregando vídeo...%3C/text%3E%3C/svg%3E"
                >
                  <source src="/lovable-uploads/sb.mp4" type="video/mp4" />
                  <source src="./lovable-uploads/sb.mp4" type="video/mp4" />
                  <source src="lovable-uploads/sb.mp4" type="video/mp4" />
                  Seu navegador não suporta a reprodução de vídeo.
                </video>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-sbplast-cyan text-sbplast-blue p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">32</div>
                <div className="text-sm">Anos de</div>
                <div className="text-sm">Experiência</div>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="scroll-reveal-right">
            <h2 className="text-4xl font-bold text-sbplast-blue mb-6">
              Sobre a SB Plast
            </h2>
            
            <div className="quote-block mb-8">
              Somos especialistas em desenvolver soluções inovadoras em embalagens plásticas, 
              sempre priorizando a qualidade e sustentabilidade em cada produto.
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Em mais de 30 anos no mercado, a SB Plast se consolidou como referência 
              em embalagens plásticas, oferecendo produtos de alta qualidade e soluções 
              personalizadas para diversos segmentos industriais.
            </p>

            <div className="space-y-4">
              {differentials.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 scroll-reveal stagger-${index + 1}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-sbplast-cyan/10 rounded-lg flex items-center justify-center text-sbplast-blue">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sbplast-blue mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
