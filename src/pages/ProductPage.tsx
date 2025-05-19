
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getProducts } from "@/services/productService";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);

  // Fetch product data based on slug
  const { data: product, isLoading: isLoadingProduct, error: productError } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug || ''),
    enabled: !!slug
  });

  // Fetch related products (products in the same category)
  const { data: allProducts = [], isLoading: isLoadingRelatedProducts } = useQuery({
    queryKey: ["relatedProducts", product?.category_id],
    queryFn: getProducts,
    enabled: !!product?.category_id
  });

  // Filter to get related products (same category, excluding current product)
  const relatedProducts = allProducts
    .filter(p => p.category_id === product?.category_id && p.id !== product?.id)
    .slice(0, 3); // Limit to 3 related products

  if (isLoadingProduct) {
    return (
      <div className="sbplast-container py-16 text-center">
        <p>Carregando produto...</p>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="sbplast-container py-16 text-center">
        <p>Produto não encontrado.</p>
        <div className="mt-4">
          <Link to="/produtos" className="text-sbplast-blue hover:underline">
            Voltar para lista de produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sbplast-container py-8">
      <Breadcrumb
        items={[
          { label: "Produtos", url: "/produtos" },
          { label: product.product_categories?.name || "Sem categoria", 
            url: product.product_categories ? `/categoria/${product.product_categories.slug}` : "/produtos" },
          { label: product.name }
        ]}
      />

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-50 p-4 rounded-md">
            <img
              src={product.image_url || "https://via.placeholder.com/600x400"}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-sbplast-blue mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.short_description || "Sem descrição curta"}</p>
            
            <div className="mb-6">
              {product.product_categories && (
                <span className="inline-block bg-sbplast-lightBlue text-white text-sm px-3 py-1 rounded">
                  {product.product_categories.name}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <p className="flex items-center">
                <span className="font-medium mr-2">Código:</span> {product.id}
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2">Categoria:</span> 
                {product.product_categories?.name || "Sem categoria"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Tabs */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <Tabs defaultValue="description">
          <TabsList className="mb-4">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="specifications">Especificações</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="prose max-w-none">
            {product.long_description ? (
              <div dangerouslySetInnerHTML={{ __html: product.long_description }} />
            ) : (
              <p>Nenhuma descrição detalhada disponível para este produto.</p>
            )}
          </TabsContent>
          
          <TabsContent value="specifications">
            <div className="py-4">
              <h3 className="font-bold mb-4">Especificações do Produto</h3>
              <p className="text-gray-600">
                As especificações detalhadas deste produto estão disponíveis mediante solicitação.
                Entre em contato com nosso departamento comercial para mais informações.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="py-4">
              <h3 className="font-bold mb-4">Documentos para Download</h3>
              <p className="text-gray-600">
                Documentação técnica e outros materiais estão disponíveis mediante solicitação.
                Entre em contato com nosso departamento técnico para mais informações.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-sbplast-blue mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProducts.map((product) => (
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
        </div>
      )}
    </div>
  );
};

export default ProductPage;
