
import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Search, Pencil, Trash, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: "1",
    title: "SBPlast entra no mercado de irrigação e avança no agronegócio",
    category: "Notícias",
    slug: "sbplast-entra-no-mercado-de-irrigacao",
    status: "Publicado",
    date: "2025-05-01",
  },
  {
    id: "2",
    title: "Rainwater Brasil 2024",
    category: "Eventos",
    slug: "rainwater-brasil-2024",
    status: "Publicado",
    date: "2025-04-15",
  },
  {
    id: "3",
    title: "Evento marca a transição oficial na gestão da Spezzio",
    category: "Vídeos",
    slug: "evento-marca-transicao-spezzio",
    status: "Rascunho",
    date: "2025-04-10",
  },
  {
    id: "4",
    title: "Os benefícios das embalagens biodegradáveis",
    category: "Sustentabilidade",
    slug: "beneficios-embalagens-biodegradaveis",
    status: "Rascunho",
    date: "2025-04-05",
  },
];

const BlogPage = () => {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleDelete = (id: string) => {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      setPosts(posts.filter((post) => post.id !== postToDelete));
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
      toast({
        title: "Post excluído",
        description: "O post foi excluído com sucesso.",
      });
    }
  };

  const getStatusBadgeClass = (status: string) => {
    return status === "Publicado"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Link to="/admin/blog/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Adicionar post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-md shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar posts..."
              className="pl-10 max-w-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>{formatDate(post.date)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeClass(
                          post.status
                        )}`}
                      >
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="h-8 w-8 p-0"
                      >
                        <Link to={`/blog/${post.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver</span>
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="h-8 w-8 p-0"
                      >
                        <Link to={`/admin/blog/edit/${post.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(post.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Nenhum post encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir post</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default BlogPage;
