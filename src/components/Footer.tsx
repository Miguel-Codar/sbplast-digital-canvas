
import { Link } from "react-router-dom";
import { Phone, Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sbplast-blue text-white">
      <div className="sbplast-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Produtos</h3>
            <ul className="space-y-2">
              <li><Link to="/categoria/seguranca-fechamento" className="hover:text-sbplast-cyan">Segurança e Fechamento</Link></li>
              <li><Link to="/categoria/embalagens-personalizadas" className="hover:text-sbplast-cyan">Embalagens Personalizadas</Link></li>
              <li><Link to="/categoria/acessorios-embalagens" className="hover:text-sbplast-cyan">Acessórios para Embalagens</Link></li>
              <li><Link to="/categoria/alcas-suportes" className="hover:text-sbplast-cyan">Alças e Suportes</Link></li>
              <li><Link to="/categoria/embalagens-industriais" className="hover:text-sbplast-cyan">Embalagens Industriais</Link></li>
              <li><Link to="/categoria/solucoes-sustentaveis" className="hover:text-sbplast-cyan">Soluções Sustentáveis</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li><Link to="/lojista-orcamento" className="hover:text-sbplast-cyan">Lojista - Solicite orçamento online</Link></li>
              <li><Link to="/lojista-cadastro" className="hover:text-sbplast-cyan">Lojista - Cadastre-se para vender</Link></li>
              <li><Link to="/assistencia-tecnica" className="hover:text-sbplast-cyan">Consumidor - Assistência técnica</Link></li>
              <li><Link to="/instalacao" className="hover:text-sbplast-cyan">Instalador - Manual técnico em PDF</Link></li>
              <li><Link to="/blog" className="hover:text-sbplast-cyan">Blog SBPlast</Link></li>
              <li><Link to="/contato" className="hover:text-sbplast-cyan">Contato Institucional</Link></li>
              <li><Link to="/downloads" className="hover:text-sbplast-cyan">Downloads</Link></li>
              <li><Link to="/etica" className="hover:text-sbplast-cyan">Canal de Ética</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">A SBPlast</h3>
            <ul className="space-y-2">
              <li><Link to="/certificacoes" className="hover:text-sbplast-cyan">Certificações</Link></li>
              <li><Link to="/noticias" className="hover:text-sbplast-cyan">Notícias</Link></li>
              <li><Link to="/videos" className="hover:text-sbplast-cyan">Vídeos</Link></li>
              <li><Link to="/eventos" className="hover:text-sbplast-cyan">Eventos</Link></li>
              <li><Link to="/a-sbplast" className="hover:text-sbplast-cyan">Empresa</Link></li>
              <li><Link to="/trabalhe-conosco" className="hover:text-sbplast-cyan">Trabalhe Conosco</Link></li>
              <li><Link to="/manual" className="hover:text-sbplast-cyan">Manual de Identidade</Link></li>
              <li><Link to="/privacidade" className="hover:text-sbplast-cyan">Política de Privacidade</Link></li>
              <li><Link to="/transparencia" className="hover:text-sbplast-cyan">Transparência</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Lojista</h3>
            <div className="mb-4">
              <Link to="/orcamento" className="bg-sbplast-cyan text-sbplast-blue px-4 py-2 rounded hover:opacity-90 inline-block">
                Solicitar orçamento online
              </Link>
            </div>
            <div className="mt-6">
              <Link to="/vender" className="border border-sbplast-cyan text-white px-4 py-2 rounded hover:bg-sbplast-blue/30 inline-block">
                Credenciar para vender produtos
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-sbplast-lightBlue mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://api.whatsapp.com/send?phone=5511999999999" className="hover:text-sbplast-cyan" aria-label="WhatsApp">
              <Phone className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/company/sbplast" className="hover:text-sbplast-cyan" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/sbplast" className="hover:text-sbplast-cyan" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://www.youtube.com/sbplast" className="hover:text-sbplast-cyan" aria-label="YouTube">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm text-sbplast-cyan">
            SBPlast - Referência no segmento de embalagens plásticas
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
