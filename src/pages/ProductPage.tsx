
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Mock data - This would be fetched from an API in a real application
const mockProduct = {
  id: "1",
  name: "Tanque de Polietileno 5.000L - Verde",
  imageUrl: "https://via.placeholder.com/600x400",
  slug: "tanque-de-polietileno-5000l-verde",
  categoryId: "1",
  categoryName: "Reservatórios",
  categorySlug: "reservatorios",
  shortDescription: "Tanque verde com capacidade de 5.000 litros",
  longDescription: `
    <p>O Tanque de Polietileno 5.000L na cor verde é fabricado com matéria-prima de alta qualidade, garantindo resistência e durabilidade. Ideal para armazenamento de água potável ou água de reuso.</p>
    <p>Características:</p>
    <ul>
      <li>Capacidade: 5.000 litros</li>
      <li>Material: Polietileno de alta densidade</li>
      <li>Cor: Verde</li>
      <li>Proteção contra raios UV</li>
      <li>Tampa com sistema de travamento</li>
      <li>Fácil instalação</li>
    </ul>
    <p>Este produto é certificado e atende todas as normas técnicas exigidas.</p>
  `
};

const mockRelatedProducts = [
  {
    id: "2",
    name: "Tanque de Polietileno 2.000L - Verde",
    imageUrl: "https://via.placeholder.com/300",
    slug: "tanque-de-polietileno-2000l-verde",
    shortDescription: "Tanque verde com capacidade de 2.000 litros"
  },
  {
    id: "3",
    name: "Tanque de Polietileno 10.000L - Verde",
    imageUrl: "https://via.placeholder.com/300",
    slug: "tanque-de-polietileno-10000l-verde",
    shortDescription: "Tanque verde com capacidade de 10.000 litros"
  },
  {
    id: "4",
    name: "Tanque de Polietileno 5.000L - Azul",
    imageUrl: "https://via.placeholder.com/300",
    slug: "tanque-de-polietileno-5000l-azul",
    shortDescription: "Tanque azul com capacidade de 5.000 litros"
  }
];

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState(mockProduct);
  const [relatedProducts, setRelatedProducts] = useState(mockRelatedProducts);
  const [loading, setLoading] = useState(true);

  // In a real application, you would fetch data from your API here
  useEffect(() => {
    // Fetch product based on slug
    // Fetch related products
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="sbplast-container py-16 text-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="sbplast-container py-8">
      <Breadcrumb
        items={[
          { label: "Produtos", url: "/produtos" },
          { label: product.categoryName, url: `/categoria/${product.categorySlug}` },
          { label: product.name }
        ]}
      />

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-50 p-4 rounded-md">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-sbplast-blue mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.shortDescription}</p>
            
            <div className="mb-6">
              <span className="inline-block bg-sbplast-lightBlue text-white text-sm px-3 py-1 rounded">
                {product.categoryName}
              </span>
            </div>

            <div className="space-y-4">
              <p className="flex items-center">
                <span className="font-medium mr-2">Código:</span> {product.id}
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2">Categoria:</span> {product.categoryName}
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
            <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
          </TabsContent>
          
          <TabsContent value="specifications">
            <div className="py-4">
              <h3 className="font-bold mb-4">Especificações do Produto</h3>
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Material</td>
                    <td className="py-3">Polietileno de alta densidade</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Capacidade</td>
                    <td className="py-3">5.000 litros</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Cor</td>
                    <td className="py-3">Verde</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Dimensões (L x A x P)</td>
                    <td className="py-3">2.35m x 1.63m x 2.35m</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Peso</td>
                    <td className="py-3">112 kg</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Garantia</td>
                    <td className="py-3">5 anos</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="py-4">
              <h3 className="font-bold mb-4">Documentos para Download</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    className="flex items-center text-sbplast-blue hover:underline"
                    download
                  >
                    Manual de Instalação (PDF, 2.3MB)
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center text-sbplast-blue hover:underline"
                    download
                  >
                    Ficha Técnica (PDF, 1.5MB)
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center text-sbplast-blue hover:underline"
                    download
                  >
                    Certificado de Garantia (PDF, 0.9MB)
                  </a>
                </li>
              </ul>
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
                imageUrl={product.imageUrl}
                slug={product.slug}
                shortDescription={product.shortDescription}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
