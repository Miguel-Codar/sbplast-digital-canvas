
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getProductCategories, 
  saveProductCategory, 
  deleteProductCategory, 
  uploadCategoryIcon 
} from "@/services/productService";

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProductCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      toast({
        title: "Categoria excluída",
        description: "A categoria foi excluída com sucesso.",
      });
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao excluir a categoria: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Save category mutation
  const saveMutation = useMutation({
    mutationFn: saveProductCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      
      toast({
        title: editingCategory.id.startsWith("new-") ? "Categoria adicionada" : "Categoria atualizada",
        description: editingCategory.id.startsWith("new-") 
          ? "Uma nova categoria foi adicionada com sucesso."
          : "As informações da categoria foram atualizadas com sucesso.",
      });
      
      setIsEditDialogOpen(false);
      setIsNewCategoryDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao salvar a categoria: ${error.message}`,
        variant: "destructive",
      });
    },
  });

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
      deleteMutation.mutate(categoryToDelete);
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
      icon_url: "",
    });
    setIsNewCategoryDialogOpen(true);
  };

  const handleSaveEdit = () => {
    // If it's a new category (has temporary id), remove the id so it's created as a new record
    const categoryToSave = { ...editingCategory };
    if (categoryToSave.id.startsWith("new-")) {
      delete categoryToSave.id;
    }
    
    saveMutation.mutate(categoryToSave);
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

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const iconUrl = await uploadCategoryIcon(file);
      setEditingCategory({
        ...editingCategory,
        icon_url: iconUrl,
      });
      
      toast({
        title: "Ícone carregado",
        description: "O ícone foi carregado com sucesso.",
      });
    } catch (error: any) {
      console.error("Error uploading icon:", error);
      
      toast({
        title: "Erro",
        description: "Não foi possível enviar o ícone.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categorias</h1>
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
                <TableHead className="w-[80px]">Ícone</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                        {category.icon_url ? (
                          <img
                            src={category.icon_url}
                            alt={category.name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <div className="text-xs text-gray-400">Sem ícone</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
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
                        disabled={deleteMutation.isPending}
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
              Tem certeza que deseja excluir esta categoria? Todos os produtos associados ficarão sem categoria.
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
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

                <div className="space-y-2">
                  <Label htmlFor="icon_url">Ícone</Label>
                  <div className="flex items-center gap-4">
                    {editingCategory.icon_url && (
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                        <img
                          src={editingCategory.icon_url}
                          alt="Ícone"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      id="icon-upload"
                      accept="image/*"
                      onChange={handleIconUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <label htmlFor="icon-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        disabled={isUploading}
                        onClick={() => document.getElementById("icon-upload")?.click()}
                      >
                        {isUploading ? "Enviando..." : editingCategory.icon_url ? "Trocar ícone" : "Enviar ícone"}
                      </Button>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveEdit}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? "Salvando..." : "Salvar alterações"}
            </Button>
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

                <div className="space-y-2">
                  <Label htmlFor="icon_url">Ícone</Label>
                  <div className="flex items-center gap-4">
                    {editingCategory.icon_url && (
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                        <img
                          src={editingCategory.icon_url}
                          alt="Ícone"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      id="new-icon-upload"
                      accept="image/*"
                      onChange={handleIconUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <label htmlFor="new-icon-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        disabled={isUploading}
                        onClick={() => document.getElementById("new-icon-upload")?.click()}
                      >
                        {isUploading ? "Enviando..." : editingCategory.icon_url ? "Trocar ícone" : "Enviar ícone"}
                      </Button>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCategoryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveEdit}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? "Salvando..." : "Adicionar categoria"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CategoriesPage;
