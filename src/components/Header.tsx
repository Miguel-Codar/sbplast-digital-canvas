
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
    <header className="bg-[#0e2e61] text-white relative z-50" style={{ height: "80px" }}>
      <div className="sbplast-container h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex-shrink-0">
            <img src="/lovable-uploads/b6da674e-7345-45c5-8b6f-9e632d3a1e0c.png" alt="SB Plast Logo" className="h-10" />
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
                A SB Plast
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
            
            {/* Lista SB Plast Block */}
            <button
              className="flex items-center hover:text-[#18ffff] transition-colors"
              onClick={openProductsList}
            >
              <List className="h-6 w-6 text-[#18ffff] mr-2" />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">Lista</span>
                <span className="text-sm leading-tight">SB Plast</span>
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
              className="text-white hover:bg-white/10 focus:bg-white/10 active:bg-white/20"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-[80px] left-0 right-0 bg-[#0e2e61] border-t border-white/20 z-40 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <nav className="flex flex-col space-y-4">
                <div className="border-b border-sbplast-cyan/30 pb-4">
                  <button 
                    className="flex items-center py-3 hover:text-[#18ffff] w-full text-left text-white"
                    onClick={toggleSearch}
                  >
                    <span className="text-base">Produtos</span>
                    <Search className="h-4 w-4 ml-2 text-[#18ffff]" />
                  </button>
                  <Link 
                    to="/produtos" 
                    className="block py-3 hover:text-[#18ffff] text-white text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Produtos
                  </Link>
                  <Link 
                    to="/atendimento" 
                    className="block py-3 hover:text-[#18ffff] text-white text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Atendimento
                  </Link>
                  <Link 
                    to="/a-sbplast" 
                    className="block py-3 hover:text-[#18ffff] text-white text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    A SB Plast
                  </Link>
                </div>
                
                {/* Solicitar Orçamento Mobile */}
                <button
                  className="flex items-center py-3 w-full text-left text-white hover:text-[#18ffff]"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openContactForm("orcamento");
                  }}
                >
                  <User className="h-5 w-5 text-[#18ffff] mr-3" />
                  <div className="flex flex-col">
                    <span className="font-bold text-base">Solicitar</span>
                    <span className="text-sm">Orçamento</span>
                  </div>
                </button>
                
                {/* Lista SB Plast Mobile */}
                <button
                  className="flex items-center py-3 w-full text-left text-white hover:text-[#18ffff]"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openProductsList();
                  }}
                >
                  <List className="h-5 w-5 text-[#18ffff] mr-3" />
                  <div className="flex flex-col">
                    <span className="font-bold text-base">Lista</span>
                    <span className="text-sm">SB Plast</span>
                  </div>
                </button>
                
                {/* Language Selector Mobile */}
                <div className="flex items-center py-3 text-white">
                  <span className="text-base mr-2">PT</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* ProductSearch (Mobile) */}
        {isSearchOpen && (
          <div className="md:hidden absolute top-[80px] left-0 right-0 bg-white z-50 shadow-lg">
            <div className="p-4">
              <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            </div>
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
