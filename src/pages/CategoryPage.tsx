
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";

// Mock data - This would be fetched from an API in a real application
const mockCategories = {
  "camisetas": {
    id: "1",
    name: "Camisetas",
    slug: "camisetas",
    description: "Sacolas plásticas tipo camiseta, ideais para supermercados e lojas."
  },
  "boca-de-palhaco": {
    id: "2",
    name: "Boca de Palhaço",
    slug: "boca-de-palhaco",
    description: "Sacolas tipo boca de palhaço, ótimas para farmácias e pequenas lojas."
  }
};

const mockProducts = {
  "camisetas": [
    {
      id: "1",
      name: "Camiseta 30x40 Branca",
      imageUrl: "https://via.placeholder.com/300",
      slug: "camiseta-30x40-branca",
      shortDescription: "Sacola plástica branca no tamanho 30x40cm"
    },
    {
      id: "2",
      name: "Camiseta 40x50 Branca",
      imageUrl: "https://via.placeholder.com/300",
      slug: "camiseta-40x50-branca",
      shortDescription: "Sacola plástica branca no tamanho 40x50cm"
    },
    {
      id: "3",
      name: "Camiseta Personalizada",
      imageUrl: "https://via.placeholder.com/300",
      slug: "camiseta-personalizada",
      shortDescription: "Sacola plástica personalizada com a sua marca"
    }
  ],
  "boca-de-palhaco": [
    {
      id: "4",
      name: "Boca de Palhaço 20x30",
      imageUrl: "https://via.placeholder.com/300",
      slug: "boca-de-palhaco-20x30",
      shortDescription: "Sacola plástica tipo boca de palhaço no tamanho 20x30cm"
    },
    {
      id: "5",
      name: "Boca de Palhaço 30x40",
      imageUrl: "https://via.placeholder.com/300",
      slug: "boca-de-palhaco-30x40",
      shortDescription: "Sacola plástica tipo boca de palhaço no tamanho 30x40cm"
    }
  ]
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // In a real application, you would fetch data from your API here
  useEffect(() => {
    if (slug) {
      // Simulate API call
      const categoryData = mockCategories[slug as keyof typeof mockCategories];
      const productData = mockProducts[slug as keyof typeof mockProducts] || [];
      
      setCategory(categoryData);
      setProducts(productData);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="sbplast-container py-16 text-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="sbplast-container py-16 text-center">
        <p>Categoria não encontrada.</p>
      </div>
    );
  }

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
          <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Produtos", url: "/produtos" },
          { label: category.name }
        ]}
      />

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-lg text-gray-700">{category.description}</p>
      </div>

      <h2 className="sbplast-subheading mb-6">Produtos nesta categoria</h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
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
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
