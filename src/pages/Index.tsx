
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCarouselSlides } from "@/services/carouselService";
import { ScrollArea } from "@/components/ui/scroll-area";
import HomeCarousel from "@/components/HomeCarousel";

const Index = () => {
  const { data: slides = [], isLoading: slidesLoading } = useQuery({
    queryKey: ["carouselSlides"],
    queryFn: getCarouselSlides,
  });

  // Transform slides data to match Carousel component props
  const carouselItems = slides.map((slide) => ({
    id: slide.id,
    imageUrl: slide.image_url,
    title: slide.title || undefined,
    link: slide.link || undefined,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Carousel */}
      <section className="mb-12">
        {slidesLoading ? (
          <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md" />
        ) : (
          <HomeCarousel items={carouselItems} />
        )}
      </section>

      {/* Main Content */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Bem-vindo à SBPlast</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-4">
              A SBPlast é uma empresa especializada na fabricação de produtos
              plásticos de alta qualidade para diversos setores industriais.
            </p>
            <p className="text-gray-700 mb-4">
              Com mais de 20 anos de experiência no mercado, oferecemos soluções
              inovadoras e sustentáveis que atendem às necessidades dos nossos
              clientes com excelência.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Nossos Diferenciais</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Produtos de alta durabilidade</li>
              <li>Compromisso com a sustentabilidade</li>
              <li>Tecnologia de ponta</li>
              <li>Equipe altamente qualificada</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample product cards - these would be replaced with real data */}
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Produto exemplo {idx + 1}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Descrição breve do produto exemplo com detalhes relevantes.
                  </p>
                  <a
                    href={`/produto/exemplo-${idx + 1}`}
                    className="text-sbplast-cyan hover:text-sbplast-cyan-dark font-medium text-sm"
                  >
                    Ver detalhes →
                  </a>
                </div>
              </div>
            ))}
        </div>
        <div className="text-center mt-6">
          <a
            href="/produtos"
            className="inline-block bg-sbplast-cyan hover:bg-sbplast-cyan-dark text-white py-2 px-6 rounded-md transition-colors"
          >
            Ver todos os produtos
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-12">
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Sobre a SBPlast</h2>
          <ScrollArea className="h-60">
            <div className="space-y-4 pr-4">
              <p>
                Fundada em 2000, a SBPlast nasceu com a missão de oferecer
                soluções em plásticos que combinam qualidade, inovação e
                sustentabilidade. Ao longo dos anos, consolidamos nossa posição
                no mercado como referência em produtos plásticos para os mais
                diversos setores.
              </p>
              <p>
                Nossa equipe é formada por profissionais altamente qualificados e
                comprometidos com a excelência. Investimos constantemente em
                tecnologia e processos que nos permitem entregar produtos que
                superam as expectativas dos nossos clientes.
              </p>
              <p>
                Na SBPlast, a sustentabilidade não é apenas uma palavra, mas um
                valor que guia nossas decisões. Trabalhamos com materiais
                recicláveis e processos que minimizam o impacto ambiental,
                contribuindo para um futuro mais sustentável.
              </p>
              <p>
                Nosso compromisso com a qualidade é evidenciado pelas
                certificações que conquistamos e pelo reconhecimento dos nossos
                clientes, que nos escolhem como parceiros de negócios há mais de
                duas décadas.
              </p>
            </div>
          </ScrollArea>
          <div className="text-center mt-6">
            <a
              href="/sobre"
              className="inline-block border border-sbplast-cyan text-sbplast-cyan hover:bg-sbplast-cyan hover:text-white py-2 px-6 rounded-md transition-colors"
            >
              Conheça nossa história
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section>
        <div className="bg-sbplast-cyan text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Fale Conosco</h2>
          <p className="mb-6">
            Estamos à disposição para atender às suas necessidades e esclarecer
            suas dúvidas.
          </p>
          <a
            href="/contato"
            className="inline-block bg-white text-sbplast-cyan hover:bg-gray-100 py-2 px-6 rounded-md transition-colors"
          >
            Entre em contato
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
