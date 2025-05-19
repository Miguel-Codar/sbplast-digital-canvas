
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductCategories } from "@/services/productService";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all categories and products
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories
  });

  const { data: allProducts = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  });

  // Filter products and find selected category based on slug
  useEffect(() => {
    if (!isLoadingCategories && !isLoadingProducts && slug) {
      // Find the category by slug
      const selectedCategory = categories.find(cat => cat.slug === slug);
      setCategory(selectedCategory || null);
      
      if (selectedCategory) {
        // Filter products belonging to this category
        const categoryProducts = allProducts.filter(
          product => product.category_id === selectedCategory.id
        );
        setProducts(categoryProducts);
      } else {
        setProducts([]);
      }
      
      setLoading(false);
    }
  }, [slug, categories, allProducts, isLoadingCategories, isLoadingProducts]);

  if (isLoadingCategories || isLoadingProducts) {
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
        <p className="text-lg text-gray-700">
          {/* Display category description if available */}
          {category.description || `Produtos na categoria ${category.name}`}
        </p>
      </div>

      <h2 className="sbplast-subheading mb-6">Produtos nesta categoria</h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
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
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
