
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Search, User, List } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ProductSearch from "./ProductSearch";
import ProductsList from "./ProductsList";
import ContactForm from "./ContactForm";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductsListOpen, setIsProductsListOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactFormType, setContactFormType] = useState<"contato" | "orcamento" | "assistencia">("contato");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  const openContactForm = (type: "contato" | "orcamento" | "assistencia" = "contato") => {
    setContactFormType(type);
    setContactFormOpen(true);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const openProductsList = () => {
    setIsProductsListOpen(true);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#0e2e61] text-white" style={{ height: "80px" }}>
      <div className="sbplast-container h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex-shrink-0">
            <img src="/lovable-uploads/b6da674e-7345-45c5-8b6f-9e632d3a1e0c.png" alt="SBPlast Logo" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center justify-center h-10 px-6 rounded-full border border-white text-white bg-transparent hover:bg-transparent hover:text-[#18ffff] hover:border-[#18ffff] transition-colors"
                onClick={toggleSearch}
              >
                <span className="font-normal text-base">Produtos</span>
                <Search className="h-5 w-5 ml-2 text-[#00eaff]" />
              </Button>
              <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            </div>
            
            <div className="flex items-center space-x-10">
              <Link to="/produtos" className="text-base hover:text-[#18ffff] transition-colors">
                Produtos
              </Link>
              <Link to="/atendimento" className="text-base hover:text-[#18ffff] transition-colors">
                Atendimento
              </Link>
              <Link to="/a-sbplast" className="text-base hover:text-[#18ffff] transition-colors">
                A SBPlast
              </Link>
            </div>
          </nav>

          {/* User Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Solicitar Orçamento Block */}
            <button
              className="flex items-center hover:text-[#18ffff] transition-colors"
              onClick={() => openContactForm("orcamento")}
            >
              <User className="h-6 w-6 text-[#18ffff] mr-2" />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">Solicitar</span>
                <span className="text-sm leading-tight">Orçamento</span>
              </div>
            </button>
            
            {/* Lista SBPlast Block */}
            <button
              className="flex items-center hover:text-[#18ffff] transition-colors"
              onClick={openProductsList}
            >
              <List className="h-6 w-6 text-[#18ffff] mr-2" />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">Lista</span>
                <span className="text-sm leading-tight">SBPlast</span>
              </div>
            </button>
            
            {/* Language Selector */}
            <div className="flex items-center mr-4">
              <span className="text-sm mr-1">PT</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6">
            <nav className="flex flex-col space-y-4">
              <div className="border-b border-sbplast-cyan pb-2">
                <button 
                  className="flex items-center py-2 hover:text-[#18ffff] w-full text-left"
                  onClick={toggleSearch}
                >
                  <span>Produtos</span>
                  <Search className="h-4 w-4 ml-2 text-[#18ffff]" />
                </button>
                <Link 
                  to="/produtos" 
                  className="block py-2 hover:text-[#18ffff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produtos
                </Link>
                <Link 
                  to="/atendimento" 
                  className="block py-2 hover:text-[#18ffff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Atendimento
                </Link>
                <Link 
                  to="/a-sbplast" 
                  className="block py-2 hover:text-[#18ffff]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  A SBPlast
                </Link>
              </div>
              
              {/* Solicitar Orçamento Mobile */}
              <button
                className="flex items-center py-2 w-full text-left"
                onClick={() => {
                  setIsMenuOpen(false);
                  openContactForm("orcamento");
                }}
              >
                <User className="h-5 w-5 text-[#18ffff] mr-2" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Solicitar</span>
                  <span className="text-sm">Orçamento</span>
                </div>
              </button>
              
              {/* Lista SBPlast Mobile */}
              <button
                className="flex items-center py-2 w-full text-left"
                onClick={() => {
                  setIsMenuOpen(false);
                  openProductsList();
                }}
              >
                <List className="h-5 w-5 text-[#18ffff] mr-2" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Lista</span>
                  <span className="text-sm">SBPlast</span>
                </div>
              </button>
              
              {/* Language Selector Mobile */}
              <div className="flex items-center py-2">
                <span className="text-sm mr-1">PT</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              
              <div className="pt-2 border-t border-sbplast-cyan">
                <div className="flex">
                  <Input placeholder="Buscar..." className="mr-2" />
                  <Button>Buscar</Button>
                </div>
              </div>
            </nav>
          </div>
        )}

        {/* ProductSearch (Mobile) */}
        {isSearchOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white z-50 p-4 shadow-lg">
            <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      <ContactForm 
        open={contactFormOpen}
        onOpenChange={setContactFormOpen}
        type={contactFormType}
      />

      {/* Products List Drawer */}
      <ProductsList 
        open={isProductsListOpen}
        onOpenChange={setIsProductsListOpen}
      />
    </header>
  );
};

export default Header;
