
import React from "react";
import { Button } from "./ui/button";
import { Play, ArrowRight } from "lucide-react";

const SolutionsSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold text-center text-sbplast-blue mb-4">
            Nossas Soluções
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Oferecemos soluções completas em embalagens plásticas para diversos segmentos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="scroll-reveal">
            <h3 className="text-3xl font-bold text-sbplast-blue mb-6">
              Embalagens Personalizadas
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Desenvolvemos embalagens sob medida para atender às necessidades específicas 
              de cada cliente, garantindo qualidade e funcionalidade.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-sbplast-blue mb-2">Alimentos</h4>
                <p className="text-sm text-gray-600">Embalagens seguras para produtos alimentícios</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-sbplast-blue mb-2">Cosméticos</h4>
                <p className="text-sm text-gray-600">Design elegante para produtos de beleza</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-sbplast-blue mb-2">Farmacêuticos</h4>
                <p className="text-sm text-gray-600">Proteção e qualidade para medicamentos</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-sbplast-blue mb-2">Bebidas</h4>
                <p className="text-sm text-gray-600">Soluções para líquidos e bebidas</p>
              </div>
            </div>
          </div>
          
          <div className="scroll-reveal stagger-1">
            <img 
              src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Embalagens personalizadas"
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Nossa Produção Section */}
        <div className="mb-20">
          <div className="text-center mb-12 scroll-reveal">
            <h3 className="text-3xl font-bold text-sbplast-blue mb-4">
              Nossa Produção
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conheça nossos processos produtivos e tecnologia de ponta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tecnologia Avançada */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover scroll-reveal">
              <div className="relative">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <iframe
                    src="https://www.youtube.com/embed/upW3R8ZguZ4"
                    title="Tecnologia Avançada - SBPlast"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Play className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-sbplast-blue mb-3">
                  Tecnologia Avançada
                </h4>
                <p className="text-gray-600 mb-4">
                  Equipamentos de última geração para garantir a melhor qualidade em nossos produtos.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-sbplast-cyan text-sbplast-cyan hover:bg-sbplast-cyan hover:text-white"
                >
                  Assistir Vídeo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Vídeo Institucional */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover scroll-reveal stagger-1">
              <div className="relative">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <iframe
                    src="https://www.youtube.com/embed/PpyCi05kSzQ"
                    title="Vídeo Institucional - SBPlast"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Play className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-sbplast-blue mb-3">
                  Vídeo Institucional
                </h4>
                <p className="text-gray-600 mb-4">
                  Conheça a história, valores e compromisso da SBPlast com a qualidade.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-sbplast-cyan text-sbplast-cyan hover:bg-sbplast-cyan hover:text-white"
                >
                  Assistir Vídeo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sustentabilidade */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 scroll-reveal">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Sustentabilidade"
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="order-1 lg:order-2 scroll-reveal stagger-1">
            <h3 className="text-3xl font-bold text-sbplast-blue mb-6">
              Sustentabilidade P-Life
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Nossa linha P-Life oferece embalagens ecológicas que contribuem para 
              um futuro mais sustentável, sem comprometer a qualidade.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-sbplast-cyan rounded-full mr-4"></div>
                <span className="text-gray-700">Materiais recicláveis e biodegradáveis</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-sbplast-cyan rounded-full mr-4"></div>
                <span className="text-gray-700">Redução do impacto ambiental</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-sbplast-cyan rounded-full mr-4"></div>
                <span className="text-gray-700">Certificações ambientais</span>
              </div>
            </div>
            <Button className="bg-sbplast-cyan hover:bg-sbplast-darkCyan text-white">
              Saiba Mais
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
