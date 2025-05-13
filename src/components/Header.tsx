
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-sbplast-blue text-white">
      <div className="sbplast-container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src="/lovable-uploads/c2ed9252-9b1e-4e13-823f-02dcd9a24400.png" alt="SBPlast Logo" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button className="flex items-center space-x-1 py-2">
                <span>Produtos</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute z-10 hidden group-hover:block bg-white text-sbplast-blue p-4 rounded-md shadow-lg min-w-[200px]">
                <Link to="/produtos" className="block py-2 hover:text-sbplast-lightBlue">
                  Todos Produtos
                </Link>
                <Link to="/categoria/camisetas" className="block py-2 hover:text-sbplast-lightBlue">
                  Camisetas
                </Link>
                <Link to="/categoria/cadeado" className="block py-2 hover:text-sbplast-lightBlue">
                  Cadeado
                </Link>
                <Link to="/categoria/boca-de-palhaco" className="block py-2 hover:text-sbplast-lightBlue">
                  Boca de Palhaço
                </Link>
              </div>
            </div>
            <Link to="/atendimento" className="py-2 hover:text-sbplast-cyan transition-colors">
              Atendimento
            </Link>
            <Link to="/fortlev" className="py-2 hover:text-sbplast-cyan transition-colors">
              A Fortlev
            </Link>
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSearch}
                className="text-white hover:text-sbplast-cyan"
              >
                <Search className="h-5 w-5" />
              </Button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 p-2 bg-white rounded-md shadow-md">
                  <div className="flex">
                    <Input placeholder="Buscar..." className="mr-2" />
                    <Button>Buscar</Button>
                  </div>
                </div>
              )}
            </div>
          </nav>

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
                <Link 
                  to="/produtos" 
                  className="block py-2 hover:text-sbplast-cyan"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Todos Produtos
                </Link>
                <Link 
                  to="/categoria/camisetas" 
                  className="block py-2 hover:text-sbplast-cyan pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Camisetas
                </Link>
                <Link 
                  to="/categoria/cadeado" 
                  className="block py-2 hover:text-sbplast-cyan pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadeado
                </Link>
                <Link 
                  to="/categoria/boca-de-palhaco" 
                  className="block py-2 hover:text-sbplast-cyan pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Boca de Palhaço
                </Link>
              </div>
              <Link 
                to="/atendimento" 
                className="block py-2 hover:text-sbplast-cyan"
                onClick={() => setIsMenuOpen(false)}
              >
                Atendimento
              </Link>
              <Link 
                to="/fortlev" 
                className="block py-2 hover:text-sbplast-cyan"
                onClick={() => setIsMenuOpen(false)}
              >
                A Fortlev
              </Link>
              <div className="pt-2 border-t border-sbplast-cyan">
                <div className="flex">
                  <Input placeholder="Buscar..." className="mr-2" />
                  <Button>Buscar</Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
