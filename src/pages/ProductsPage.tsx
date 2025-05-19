
import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductCategories } from "@/services/productService";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products and categories using React Query
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories
  });

  useEffect(() => {
    // Filter products based on search term and selected category
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already happening in the useEffect
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <div className="sbplast-container py-8">
      {/* Background banner with title */}
      <div 
        className="relative mb-6 py-16 bg-sbplast-blue text-white rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url(https://via.placeholder.com/1200x300)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-sbplast-blue opacity-70"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Todos os produtos</h1>
        </div>
      </div>

      <Breadcrumb
        items={[{ label: "Produtos", url: "/produtos" }]}
      />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mr-2"
                />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <h3 className="font-semibold mb-3">Categorias</h3>
            {isLoadingCategories ? (
              <div className="py-4 text-center">Carregando categorias...</div>
            ) : (
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`w-full text-left py-2 px-3 rounded ${
                        selectedCategory === category.id
                          ? "bg-sbplast-blue text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Product listings */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="sbplast-subheading">Todos os Produtos</h2>
            <span className="text-sm text-gray-500">{filteredProducts.length} itens</span>
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gray-100 h-64 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  imageUrl={product.image_url || "https://via.placeholder.com/300"}
                  slug={product.slug}
                  shortDescription={product.short_description || undefined}
                />
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && !isLoadingProducts && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
