
import React from "react";
import { Shield, Recycle, Clock, ThumbsUp, Truck, HeartHandshake } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Produtos Seguros",
      description: "Embalagens que garantem a proteção e conservação dos seus produtos com total segurança alimentar.",
      bgColor: "bg-white"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Sustentabilidade",
      description: "Comprometidos com o meio ambiente, oferecemos soluções eco-friendly e materiais recicláveis.",
      bgColor: "bg-gray-50"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Entrega Rápida",
      description: "Logística eficiente para atender seus prazos com agilidade e pontualidade em todo Brasil.",
      bgColor: "bg-white"
    },
    {
      icon: <ThumbsUp className="w-8 h-8" />,
      title: "Qualidade Garantida",
      description: "Controle rigoroso de qualidade em todas as etapas de produção para sua total satisfação.",
      bgColor: "bg-gray-50"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Logística Nacional",
      description: "Rede de distribuição presente em todo território nacional para melhor atendimento.",
      bgColor: "bg-white"
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Suporte Dedicado",
      description: "Equipe especializada para apoiar você desde o projeto até o pós-venda.",
      bgColor: "bg-gray-50"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold text-sbplast-blue mb-4">
            Por que Escolher a SBPlast?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra os diferenciais que fazem da SBPlast a melhor escolha 
            para suas necessidades em embalagens plásticas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`${benefit.bgColor} p-8 rounded-2xl card-tilt border border-gray-100 scroll-reveal stagger-${index + 1}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-sbplast-cyan to-sbplast-blue rounded-full flex items-center justify-center text-white mb-6 icon-bounce">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-sbplast-blue mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
