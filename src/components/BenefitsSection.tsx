
import React from "react";
import { Shield, Clock, Award, Zap, Users } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "32 Anos de Confiança",
      description: "Escolha quem tem tradição e experiência no mercado de embalagens plásticas personalizadas, com mais de três décadas de atuação no Nordeste brasileiro.",
      bgColor: "bg-white"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Embalagens Personalizadas para Diversos Setores",
      description: "Soluções sob medida para alimentos, bebidas, cosméticos, farmacêuticos e muito mais, adaptadas exatamente às necessidades do seu negócio.",
      bgColor: "bg-gray-50"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Qualidade Certificada e Garantida",
      description: "Rigorosos padrões de produção e controle asseguram embalagens duráveis, seguras e aprovadas em qualidade no mercado.",
      bgColor: "bg-white"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Tecnologia e Inovação de Ponta",
      description: "Invista em embalagens desenvolvidas com máquinas de última geração e processos inovadores, que garantem acabamento impecável e máxima eficiência.",
      bgColor: "bg-gray-50"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Atendimento Rápido e Próximo ao Cliente",
      description: "Conte com uma equipe especializada, pronta para entender e resolver suas demandas, oferecendo suporte ágil em toda a região Nordeste.",
      bgColor: "bg-white"
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
