
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";
import { useOnClickOutside } from "@/hooks/use-click-outside";

interface ProductSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductSearch = ({ isOpen, onClose }: ProductSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled: isOpen,
  });

  useOnClickOutside(searchRef, onClose);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredResults = products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 results

    setSearchResults(filteredResults);
  }, [searchTerm, products]);

  if (!isOpen) return null;

  return (
    <div
      ref={searchRef}
      className={`absolute top-full right-0 mt-2 w-full md:w-96 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 z-50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="O que você procura?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>

        {searchResults.length > 0 && (
          <div className="mt-2 max-h-60 overflow-y-auto">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                to={`/produto/${product.slug}`}
                onClick={onClose}
                className="flex items-center p-2 hover:bg-gray-100 rounded-md"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md mr-3"
                  />
                )}
                <div>
                  <p className="font-medium text-sbplast-blue">{product.name}</p>
                  {product.product_categories && (
                    <p className="text-xs text-gray-500">
                      {product.product_categories.name}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {searchTerm && searchResults.length === 0 && (
          <p className="text-center py-3 text-gray-500">
            Nenhum produto encontrado
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
