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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCarouselSlides,
  createCarouselSlide,
  updateCarouselSlide,
  deleteCarouselSlide,
  updateCarouselOrder,
  uploadCarouselImage,
  CarouselSlide
} from "@/services/carouselService";

const CarouselPage = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewSlideDialogOpen, setIsNewSlideDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Partial<CarouselSlide> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch carousel slides
  const { data: slides = [], isLoading } = useQuery({
    queryKey: ["carouselSlides"],
    queryFn: getCarouselSlides
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCarouselSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carouselSlides"] });
      toast({
        title: "Slide removido",
        description: "O slide foi removido do carrossel com sucesso.",
      });
      setIsDeleteDialogOpen(false);
      setSlideToDelete(null);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao remover slide: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Create slide mutation
  const createMutation = useMutation({
    mutationFn: createCarouselSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carouselSlides"] });
      toast({
        title: "Slide adicionado",
        description: "Um novo slide foi adicionado ao carrossel.",
      });
      setIsNewSlideDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao adicionar slide: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Update slide mutation
  const updateMutation = useMutation({
    mutationFn: updateCarouselSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carouselSlides"] });
      toast({
        title: "Slide atualizado",
        description: "As informações do slide foram atualizadas com sucesso.",
      });
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao atualizar slide: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Update order mutation
  const updateOrderMutation = useMutation({
    mutationFn: updateCarouselOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carouselSlides"] });
      toast({
        title: "Ordem atualizada",
        description: "A ordem dos slides foi atualizada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao atualizar ordem: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(slides);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the display_order property for all items
    const reorderedItems = items.map((item, index) => ({
      id: item.id,
      display_order: index
    }));

    // Update the order in the database
    updateOrderMutation.mutate(reorderedItems);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;

    const newSlides = Array.from(slides);
    const slideToMove = newSlides[index];
    const slideAbove = newSlides[index - 1];
    
    // Swap display_order values
    const slideToMoveOrder = slideToMove.display_order;
    const slideAboveOrder = slideAbove.display_order;
    
    updateOrderMutation.mutate([
      { id: slideToMove.id, display_order: slideAboveOrder },
      { id: slideAbove.id, display_order: slideToMoveOrder }
    ]);
  };

  const handleMoveDown = (index: number) => {
    if (index === slides.length - 1) return;

    const newSlides = Array.from(slides);
    const slideToMove = newSlides[index];
    const slideBelow = newSlides[index + 1];
    
    // Swap display_order values
    const slideToMoveOrder = slideToMove.display_order;
    const slideBelowOrder = slideBelow.display_order;
    
    updateOrderMutation.mutate([
      { id: slideToMove.id, display_order: slideBelowOrder },
      { id: slideBelow.id, display_order: slideToMoveOrder }
    ]);
  };

  const handleDelete = (id: string) => {
    setSlideToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (slideToDelete) {
      deleteMutation.mutate(slideToDelete);
    }
  };

  const handleEdit = (slide: CarouselSlide) => {
    setEditingSlide({ ...slide });
    setIsEditDialogOpen(true);
  };

  const handleNewSlide = () => {
    setEditingSlide({
      image_url: "",
      title: "",
      link: "",
    });
    setIsNewSlideDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingSlide && editingSlide.id) {
      updateMutation.mutate(editingSlide as CarouselSlide);
    }
  };

  const handleSaveNewSlide = () => {
    if (editingSlide && editingSlide.image_url) {
      createMutation.mutate(editingSlide);
    } else {
      toast({
        title: "Imagem obrigatória",
        description: "Por favor, envie uma imagem para o slide.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingSlide) {
      setEditingSlide({ ...editingSlide, [name]: value });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingSlide) return;
    
    setIsUploading(true);
    
    try {
      const imageUrl = await uploadCarouselImage(file);
      setEditingSlide({
        ...editingSlide,
        image_url: imageUrl,
      });
      
      toast({
        title: "Imagem carregada",
        description: "A imagem foi carregada com sucesso.",
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      
      toast({
        title: "Erro",
        description: "Não foi possível enviar a imagem.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Carrossel</h1>
        <Button onClick={handleNewSlide} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar slide
        </Button>
      </div>

      <div className="bg-white rounded-md shadow p-6">
        <p className="text-sm text-gray-500 mb-4">
          Arraste os slides para reordenar. Os slides aparecerão na home na ordem exibida abaixo.
        </p>

        {isLoading ? (
          <div className="text-center py-8">
            <p>Carregando slides...</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="carousel">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {slides.map((slide, index) => (
                    <Draggable key={slide.id} draggableId={slide.id} index={index}>
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
                            {slide.image_url ? (
                              <img
                                src={slide.image_url}
                                alt={slide.title || "Slide"}
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
                              {slide.title || "Sem título"}
                            </h3>
                            {slide.link && (
                              <p className="text-xs text-gray-500">
                                Link: {slide.link}
                              </p>
                            )}
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMoveUp(index)}
                              disabled={index === 0 || updateOrderMutation.isPending}
                              className="h-8 w-8 p-0"
                            >
                              <ArrowUp className="h-4 w-4" />
                              <span className="sr-only">Mover para cima</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMoveDown(index)}
                              disabled={index === slides.length - 1 || updateOrderMutation.isPending}
                              className="h-8 w-8 p-0"
                            >
                              <ArrowDown className="h-4 w-4" />
                              <span className="sr-only">Mover para baixo</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(slide)}
                              className="h-8 w-8 p-0"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(slide.id)}
                              className="h-8 w-8 p-0"
                              disabled={deleteMutation.isPending}
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
                  
                  {slides.length === 0 && (
                    <div className="text-center py-12 border rounded-md bg-gray-50">
                      <p className="text-gray-500 mb-4">Nenhum slide no carrossel</p>
                      <Button onClick={handleNewSlide} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Adicionar slide
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
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
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Excluindo..." : "Remover"}
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
            {editingSlide && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Imagem</Label>
                  {editingSlide.image_url ? (
                    <div className="mb-3">
                      <img
                        src={editingSlide.image_url}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded border"
                      />
                    </div>
                  ) : null}
                  <input
                    type="file"
                    id="edit-image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label htmlFor="edit-image-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full cursor-pointer"
                      disabled={isUploading}
                      onClick={() => document.getElementById("edit-image-upload")?.click()}
                    >
                      {isUploading ? "Enviando..." : editingSlide.image_url ? "Trocar imagem" : "Enviar imagem"}
                    </Button>
                  </label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título (opcional)</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editingSlide.title || ""}
                    onChange={handleInputChange}
                    placeholder="Digite um título para o slide"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Link (opcional)</Label>
                  <Input
                    id="link"
                    name="link"
                    value={editingSlide.link || ""}
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
            <Button 
              onClick={handleSaveEdit}
              disabled={updateMutation.isPending || isUploading}
            >
              {updateMutation.isPending ? "Salvando..." : "Salvar alterações"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Slide Dialog */}
      <Dialog open={isNewSlideDialogOpen} onOpenChange={setIsNewSlideDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar novo slide</DialogTitle>
            <DialogDescription>
              Preencha as informações para adicionar um novo slide ao carrossel.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {editingSlide && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Imagem</Label>
                  {editingSlide.image_url ? (
                    <div className="mb-3">
                      <img
                        src={editingSlide.image_url}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded border"
                      />
                    </div>
                  ) : null}
                  <input
                    type="file"
                    id="new-image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label htmlFor="new-image-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full cursor-pointer"
                      disabled={isUploading}
                      onClick={() => document.getElementById("new-image-upload")?.click()}
                    >
                      {isUploading ? "Enviando..." : editingSlide.image_url ? "Trocar imagem" : "Enviar imagem"}
                    </Button>
                  </label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título (opcional)</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editingSlide.title || ""}
                    onChange={handleInputChange}
                    placeholder="Digite um título para o slide"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Link (opcional)</Label>
                  <Input
                    id="link"
                    name="link"
                    value={editingSlide.link || ""}
                    onChange={handleInputChange}
                    placeholder="Ex: /produtos"
                  />
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewSlideDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveNewSlide}
              disabled={createMutation.isPending || isUploading}
            >
              {createMutation.isPending ? "Salvando..." : "Adicionar slide"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CarouselPage;
