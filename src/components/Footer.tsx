
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
              <li><Link to="/categoria/industria-alimenticia" className="hover:text-sbplast-cyan">Indústria Alimentícia</Link></li>
              <li><Link to="/categoria/lojistas" className="hover:text-sbplast-cyan">Lojistas</Link></li>
              <li><Link to="/categoria/embalagens-personalizadas" className="hover:text-sbplast-cyan">Embalagens Personalizadas</Link></li>
              <li><Link to="/categoria/solucoes-sustentaveis" className="hover:text-sbplast-cyan">Soluções Sustentáveis</Link></li>
              <li><Link to="/categoria/acessorios-embalagens" className="hover:text-sbplast-cyan">Acessórios para Embalagens</Link></li>
              <li><Link to="/categoria/embalagens-industriais" className="hover:text-sbplast-cyan">Embalagens Industriais</Link></li>
              <li><Link to="/produtos/catalogo" className="hover:text-sbplast-cyan">Catálogo de Produtos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li><Link to="/atendimento" className="hover:text-sbplast-cyan">Solicitar orçamento online</Link></li>
              <li><Link to="/atendimento" className="hover:text-sbplast-cyan">Consumidor - Assistência técnica</Link></li>
              <li><Link to="/atendimento" className="hover:text-sbplast-cyan">Fornecedores - Cadastro</Link></li>
              <li><Link to="/blog" className="hover:text-sbplast-cyan">Blog SB Plast</Link></li>
              <li><Link to="/atendimento" className="hover:text-sbplast-cyan">Contato Institucional</Link></li>
              <li><Link to="/atendimento" className="hover:text-sbplast-cyan">Downloads</Link></li>
              <li><Link to="/atendimento" className="hover:text-sbplast-cyan">Canal de Ética</Link></li>
              <li><p className="text-sm text-sbplast-cyan">Envie seu currículo: rh@sbplasticos.com.br</p></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">A SB Plast</h3>
            <ul className="space-y-2">
              <li><Link to="/nossa-historia" className="hover:text-sbplast-cyan">Nossa História</Link></li>
              <li><Link to="/missao-visao-valores" className="hover:text-sbplast-cyan">Missão Visão e Valores</Link></li>
              <li><Link to="/localizacao" className="hover:text-sbplast-cyan">Localização</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Endereço:</p>
                <p className="text-sm">Rua Arabé, 112, Comportas</p>
                <p className="text-sm">Jaboatão dos Guararapes-PE</p>
              </div>
              <div>
                <p className="font-medium">Telefones:</p>
                <p className="text-sm">(81) 3476-1227</p>
                <p className="text-sm">(81) 99501-5223</p>
              </div>
              <div>
                <p className="font-medium">E-mails:</p>
                <p className="text-sm">vendas@sbplasticos.com.br</p>
                <p className="text-sm">sac@sbplasticos.com.br</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-sbplast-lightBlue mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://wa.me/5581995015223" className="hover:text-sbplast-cyan" aria-label="WhatsApp">
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
            SB Plast - 32 anos de referência no segmento de embalagens plásticas
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
