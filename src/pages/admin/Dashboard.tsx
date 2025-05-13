
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Package, FileText, Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const mockStats = {
  products: 24,
  categories: 8,
  blogPosts: 12,
  recentViews: 325
};

const mockRecentProducts = [
  { id: "1", name: "Tanque de Polietileno 5.000L - Verde", slug: "tanque-de-polietileno-5000l-verde", date: "2025-05-01" },
  { id: "2", name: "Pasta Lubrificante", slug: "pasta-lubrificante", date: "2025-04-28" },
  { id: "3", name: "Fita Isolante", slug: "fita-isolante", date: "2025-04-25" }
];

const mockRecentPosts = [
  { id: "1", title: "SBPlast entra no mercado de irrigação", slug: "sbplast-entra-no-mercado-de-irrigacao", date: "2025-05-01" },
  { id: "2", title: "Rainwater Brasil 2024", slug: "rainwater-brasil-2024", date: "2025-04-15" },
  { id: "3", title: "Evento marca a transição oficial na gestão da Spezzio", slug: "evento-marca-transicao-spezzio", date: "2025-04-10" }
];

const Dashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [recentProducts, setRecentProducts] = useState(mockRecentProducts);
  const [recentPosts, setRecentPosts] = useState(mockRecentPosts);

  // In a real application, you would fetch data from your API here
  useEffect(() => {
    // Fetch stats
    // Fetch recent products
    // Fetch recent posts
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.products}</div>
            <p className="text-xs text-muted-foreground pt-1">
              {stats.categories} categorias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.blogPosts}</div>
            <p className="text-xs text-muted-foreground pt-1">
              3 categorias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.recentViews}</div>
            <p className="text-xs text-muted-foreground pt-1">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.categories}</div>
            <p className="text-xs text-muted-foreground pt-1">
              8 produtos por categoria em média
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded mr-3">
                    <Package className="h-5 w-5 text-sbplast-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(product.date)}
                    </p>
                  </div>
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="text-xs text-sbplast-blue hover:underline"
                  >
                    Editar
                  </Link>
                </div>
              ))}
              
              <div className="pt-3">
                <Link
                  to="/admin/products"
                  className="text-sm text-sbplast-blue hover:underline"
                >
                  Ver todos os produtos →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Blog Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Artigos do Blog Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded mr-3">
                    <FileText className="h-5 w-5 text-sbplast-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{post.title}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(post.date)}
                    </p>
                  </div>
                  <Link
                    to={`/admin/blog/edit/${post.id}`}
                    className="text-xs text-sbplast-blue hover:underline"
                  >
                    Editar
                  </Link>
                </div>
              ))}
              
              <div className="pt-3">
                <Link
                  to="/admin/blog"
                  className="text-sm text-sbplast-blue hover:underline"
                >
                  Ver todos os artigos →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
