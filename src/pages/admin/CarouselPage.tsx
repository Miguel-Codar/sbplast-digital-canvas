
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUp, ArrowDown, Pencil, Trash, Grip } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for carousel items
const mockCarouselItems = [
  {
    id: "1",
    imageUrl: "/lovable-uploads/41731074-1f24-4281-88c1-f6ab149e9a60.png",
    title: "Conheça agora a SBPlast, referência no seguimento de embalagens plásticas para o seu negócio.",
    link: "/about"
  },
  {
    id: "2",
    imageUrl: "/lovable-uploads/b6da674e-7345-45c5-8b6f-9e632d3a1e0c.png",
    title: "Produtos de qualidade para atender suas necessidades",
    link: "/produtos"
  }
];

const CarouselPage = () => {
  const [carouselItems, setCarouselItems] = useState(mockCarouselItems);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(carouselItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCarouselItems(items);
    toast({
      title: "Ordem atualizada",
      description: "A ordem dos slides foi atualizada com sucesso.",
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const items = Array.from(carouselItems);
    [items[index], items[index - 1]] = [items[index - 1], items[index]];
    setCarouselItems(items);
  };

  const handleMoveDown = (index: number) => {
    if (index === carouselItems.length - 1) return;
    const items = Array.from(carouselItems);
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    setCarouselItems(items);
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setCarouselItems(carouselItems.filter(item => item.id !== itemToDelete));
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
      toast({
        title: "Slide removido",
        description: "O slide foi removido do carrossel com sucesso.",
      });
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleNewItem = () => {
    setEditingItem({
      id: `new-${Date.now()}`,
      imageUrl: "",
      title: "",
      link: "",
    });
    setIsNewItemDialogOpen(true);
  };

  const handleSaveEdit = () => {
    const updatedItems = carouselItems.map(item => 
      item.id === editingItem.id ? editingItem : item
    );
    setCarouselItems(updatedItems);
    setIsEditDialogOpen(false);
    toast({
      title: "Slide atualizado",
      description: "As informações do slide foram atualizadas com sucesso.",
    });
  };

  const handleSaveNewItem = () => {
    setCarouselItems([...carouselItems, editingItem]);
    setIsNewItemDialogOpen(false);
    toast({
      title: "Slide adicionado",
      description: "Um novo slide foi adicionado ao carrossel.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  const simulateImageUpload = () => {
    // Simulate image upload delay
    toast({
      title: "Enviando imagem...",
      description: "Por favor, aguarde enquanto a imagem é carregada.",
    });
    
    setTimeout(() => {
      setEditingItem({
        ...editingItem,
        imageUrl: "https://via.placeholder.com/1200x400",
      });
      toast({
        title: "Imagem carregada",
        description: "A imagem foi carregada com sucesso.",
      });
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Carrossel</h1>
        <Button onClick={handleNewItem} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar slide
        </Button>
      </div>

      <div className="bg-white rounded-md shadow p-6">
        <p className="text-sm text-gray-500 mb-4">
          Arraste os slides para reordenar. Os slides aparecerão na home na ordem exibida abaixo.
        </p>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="carousel">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {carouselItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center bg-gray-50 border rounded-md p-4 gap-4"
                      >
                        {/* Drag handle */}
                        <div {...provided.dragHandleProps} className="cursor-grab">
                          <Grip className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        {/* Image preview */}
                        <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.title || "Slide"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              Sem imagem
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-grow">
                          <h3 className="font-medium text-sm">
                            {item.title || "Sem título"}
                          </h3>
                          {item.link && (
                            <p className="text-xs text-gray-500">
                              Link: {item.link}
                            </p>
                          )}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            className="h-8 w-8 p-0"
                          >
                            <ArrowUp className="h-4 w-4" />
                            <span className="sr-only">Mover para cima</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMoveDown(index)}
                            disabled={index === carouselItems.length - 1}
                            className="h-8 w-8 p-0"
                          >
                            <ArrowDown className="h-4 w-4" />
                            <span className="sr-only">Mover para baixo</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Remover</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                
                {carouselItems.length === 0 && (
                  <div className="text-center py-12 border rounded-md bg-gray-50">
                    <p className="text-gray-500 mb-4">Nenhum slide no carrossel</p>
                    <Button onClick={handleNewItem} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Adicionar slide
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover slide</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover este slide do carrossel? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Slide Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar slide</DialogTitle>
            <DialogDescription>
              Atualize as informações do slide abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {editingItem && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Imagem</Label>
                  {editingItem.imageUrl ? (
                    <div className="mb-3">
                      <img
                        src={editingItem.imageUrl}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded border"
                      />
                    </div>
                  ) : null}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={simulateImageUpload}
                    className="w-full"
                  >
                    {editingItem.imageUrl ? "Trocar imagem" : "Enviar imagem"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título (opcional)</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editingItem.title}
                    onChange={handleInputChange}
                    placeholder="Digite um título para o slide"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Link (opcional)</Label>
                  <Input
                    id="link"
                    name="link"
                    value={editingItem.link}
                    onChange={handleInputChange}
                    placeholder="Ex: /produtos"
                  />
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

      {/* New Slide Dialog */}
      <Dialog open={isNewItemDialogOpen} onOpenChange={setIsNewItemDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar novo slide</DialogTitle>
            <DialogDescription>
              Preencha as informações para adicionar um novo slide ao carrossel.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {editingItem && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Imagem</Label>
                  {editingItem.imageUrl ? (
                    <div className="mb-3">
                      <img
                        src={editingItem.imageUrl}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded border"
                      />
                    </div>
                  ) : null}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={simulateImageUpload}
                    className="w-full"
                  >
                    {editingItem.imageUrl ? "Trocar imagem" : "Enviar imagem"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título (opcional)</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editingItem.title}
                    onChange={handleInputChange}
                    placeholder="Digite um título para o slide"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Link (opcional)</Label>
                  <Input
                    id="link"
                    name="link"
                    value={editingItem.link}
                    onChange={handleInputChange}
                    placeholder="Ex: /produtos"
                  />
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewItemDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveNewItem}>Adicionar slide</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CarouselPage;
