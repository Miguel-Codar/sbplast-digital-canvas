
import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductCategories } from "@/services/productService";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductsListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductsList = ({ open, onOpenChange }: ProductsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled: open,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories,
    enabled: open,
  });

  useEffect(() => {
    if (!products) return;

    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category_id === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl font-semibold text-sbplast-blue">
            Lista SBPlast - Produtos
          </SheetTitle>
        </SheetHeader>

        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category.id)}
              className={selectedCategory === category.id ? "bg-sbplast-blue text-white" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="space-y-2 mt-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/produto/${product.slug}`}
                onClick={() => onOpenChange(false)}
                className="flex items-center p-3 border rounded-md hover:bg-gray-50"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md mr-3"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-sbplast-blue">{product.name}</h3>
                  {product.product_categories && (
                    <p className="text-xs text-gray-500">
                      {product.product_categories.name}
                    </p>
                  )}
                  {product.short_description && (
                    <p className="text-sm line-clamp-1 text-gray-600">
                      {product.short_description}
                    </p>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || selectedCategory ? (
                <p>Nenhum produto encontrado com os filtros selecionados.</p>
              ) : (
                <p>Carregando produtos...</p>
              )}
            </div>
          )}
        </div>

        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sbplast-blue focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default ProductsList;
