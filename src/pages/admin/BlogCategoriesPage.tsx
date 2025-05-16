
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
import { Plus, Search, Pencil, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

// Mock blog categories data
const mockBlogCategories = [
  { id: "1", name: "Notícias", slug: "noticias", postCount: 5 },
  { id: "2", name: "Eventos", slug: "eventos", postCount: 3 },
  { id: "3", name: "Vídeos", slug: "videos", postCount: 2 },
  { id: "4", name: "Sustentabilidade", slug: "sustentabilidade", postCount: 2 },
];

const BlogCategoriesPage = () => {
  const [categories, setCategories] = useState(mockBlogCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const { toast } = useToast();

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setCategoryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((category) => category.id !== categoryToDelete));
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
      toast({
        title: "Categoria excluída",
        description: "A categoria foi excluída com sucesso.",
      });
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory({ ...category });
    setIsEditDialogOpen(true);
  };

  const handleNewCategory = () => {
    setEditingCategory({
      id: `new-${Date.now()}`,
      name: "",
      slug: "",
      postCount: 0,
    });
    setIsNewCategoryDialogOpen(true);
  };

  const handleSaveEdit = () => {
    const updatedCategories = categories.map(category => 
      category.id === editingCategory.id ? editingCategory : category
    );
    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    toast({
      title: "Categoria atualizada",
      description: "As informações da categoria foram atualizadas com sucesso.",
    });
  };

  const handleSaveNewCategory = () => {
    setCategories([...categories, editingCategory]);
    setIsNewCategoryDialogOpen(false);
    toast({
      title: "Categoria adicionada",
      description: "Uma nova categoria foi adicionada com sucesso.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingCategory({ ...editingCategory, [name]: value });
    
    // Generate slug from name if name field is changed
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      
      setEditingCategory((prev: any) => ({ ...prev, slug }));
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categorias do Blog</h1>
        <Button onClick={handleNewCategory} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar categoria
        </Button>
      </div>

      <div className="bg-white rounded-md shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar categorias..."
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
                <TableHead>Nome</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.postCount}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(category)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(category.id)}
                        className="h-8 w-8 p-0"
                        disabled={category.postCount > 0}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    Nenhuma categoria encontrada
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
            <DialogTitle>Excluir categoria</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.
              Nota: Categorias que possuem posts associados não podem ser excluídas.
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

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar categoria</DialogTitle>
            <DialogDescription>
              Atualize as informações da categoria abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {editingCategory && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da categoria</Label>
                  <Input
                    id="name"
                    name="name"
                    value={editingCategory.name}
                    onChange={handleInputChange}
                    placeholder="Digite o nome da categoria"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={editingCategory.slug}
                    onChange={handleInputChange}
                    placeholder="slug-da-categoria"
                  />
                  <p className="text-xs text-gray-500">
                    URL amigável para a categoria. Gerado automaticamente do nome.
                  </p>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>Salvar alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Category Dialog */}
      <Dialog open={isNewCategoryDialogOpen} onOpenChange={setIsNewCategoryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar nova categoria</DialogTitle>
            <DialogDescription>
              Preencha as informações para adicionar uma nova categoria.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {editingCategory && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da categoria</Label>
                  <Input
                    id="name"
                    name="name"
                    value={editingCategory.name}
                    onChange={handleInputChange}
                    placeholder="Digite o nome da categoria"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={editingCategory.slug}
                    onChange={handleInputChange}
                    placeholder="slug-da-categoria"
                  />
                  <p className="text-xs text-gray-500">
                    URL amigável para a categoria. Gerado automaticamente do nome.
                  </p>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCategoryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveNewCategory}>Adicionar categoria</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default BlogCategoriesPage;
