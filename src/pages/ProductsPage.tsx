
import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";

// Mock data - This would be fetched from an API in a real application
const mockProducts = [
  {
    id: "1",
    name: "Tanque de Polietileno 5.000L - Verde",
    imageUrl: "https://via.placeholder.com/300",
    slug: "tanque-de-polietileno-5000l-verde",
    categoryId: "1",
    categoryName: "Reservatórios",
    shortDescription: "Tanque verde com capacidade de 5.000 litros"
  },
  {
    id: "2",
    name: "Pasta Lubrificante",
    imageUrl: "https://via.placeholder.com/300",
    slug: "pasta-lubrificante",
    categoryId: "2",
    categoryName: "Acessórios",
    shortDescription: "Pasta para lubrificação de conexões"
  },
  {
    id: "3",
    name: "Fita Isolante",
    imageUrl: "https://via.placeholder.com/300",
    slug: "fita-isolante",
    categoryId: "2",
    categoryName: "Acessórios",
    shortDescription: "Fita isolante para conexões"
  },
  {
    id: "4",
    name: "Tubo Esgoto Série Normal - 3 m",
    imageUrl: "https://via.placeholder.com/300",
    slug: "tubo-esgoto-serie-normal-3m",
    categoryId: "3",
    categoryName: "Esgoto",
    shortDescription: "Tubo para esgoto com 3 metros de comprimento"
  },
  {
    id: "5",
    name: "Torneira de Tanque Fortlev",
    imageUrl: "https://via.placeholder.com/300",
    slug: "torneira-de-tanque-fortlev",
    categoryId: "2",
    categoryName: "Acessórios",
    shortDescription: "Torneira para tanques"
  },
  {
    id: "6",
    name: "Torneira de Pia Fortlev",
    imageUrl: "https://via.placeholder.com/300",
    slug: "torneira-de-pia-fortlev",
    categoryId: "2",
    categoryName: "Acessórios",
    shortDescription: "Torneira para pias"
  }
];

const mockCategories = [
  { id: "1", name: "Reservatórios", slug: "reservatorios" },
  { id: "2", name: "Acessórios", slug: "acessorios" },
  { id: "3", name: "Esgoto", slug: "esgoto" },
  { id: "4", name: "Eletricidade", slug: "eletricidade" },
  { id: "5", name: "Telhas", slug: "telhas" }
];

const ProductsPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // In a real application, you would fetch data from your API here
  useEffect(() => {
    // Fetch products
    // Fetch categories
  }, []);

  useEffect(() => {
    // Filter products based on search term and selected category
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.categoryId === selectedCategory);
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
          </div>
        </div>

        {/* Product listings */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="sbplast-subheading">Todos os Produtos</h2>
            <span className="text-sm text-gray-500">{filteredProducts.length} itens</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                imageUrl={product.imageUrl}
                slug={product.slug}
                shortDescription={product.shortDescription}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
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
