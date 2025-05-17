
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getProductCategories, 
  saveProduct, 
  getProductBySlug,
  uploadProductImage 
} from "@/services/productService";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditMode = !!id;

  // Initialize form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category_id: "",
    short_description: "",
    long_description: "",
    image_url: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [productId, setProductId] = useState<string | undefined>(undefined);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories
  });

  // Fetch product data if in edit mode
  const { data: productData, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductBySlug(id!),
    enabled: isEditMode
  });

  // Set form data from fetched product data
  useEffect(() => {
    if (productData) {
      console.log("Setting form data from product data:", productData);
      setFormData({
        name: productData.name || "",
        slug: productData.slug || "",
        category_id: productData.category_id || "",
        short_description: productData.short_description || "",
        long_description: productData.long_description || "",
        image_url: productData.image_url || "",
      });
      setProductId(productData.id);
    }
  }, [productData]);

  // Save product mutation
  const saveMutation = useMutation({
    mutationFn: saveProduct,
    onSuccess: (data) => {
      console.log("Save mutation success:", data);
      
      // Invalidate and refetch queries to get updated data
      queryClient.invalidateQueries({ queryKey: ["products"] });
      
      if (isEditMode && id) {
        queryClient.invalidateQueries({ queryKey: ["product", id] });
      }
      
      // Show success toast
      toast({
        title: isEditMode ? "Produto atualizado" : "Produto criado",
        description: isEditMode
          ? "O produto foi atualizado com sucesso."
          : "O produto foi criado com sucesso.",
      });
      
      // Navigate back to products list
      navigate("/admin/products");
    },
    onError: (error) => {
      console.error("Save mutation error:", error);
      
      // Show error toast
      toast({
        title: "Erro",
        description: `Erro ao salvar o produto: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Generate slug from name if name field is changed and we're not in edit mode
    if (name === "name" && !isEditMode) {
      const slug = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category_id: value });
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const imageUrl = await uploadProductImage(file);
      setFormData({
        ...formData,
        image_url: imageUrl,
      });
      
      toast({
        title: "Imagem enviada",
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.slug) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Submitting form data:", formData, "Product ID:", productId);
    
    // Prepare product data with ID if in edit mode
    const productToSave = {
      ...formData,
      id: productId
    };
    
    console.log("Final product data to save:", productToSave);
    saveMutation.mutate(productToSave);
  };

  if (isLoadingProduct && isEditMode) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Carregando...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Editar produto" : "Adicionar produto"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-md shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Nome do produto</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ex: Tanque de Polietileno 5.000L"
            />
          </div>

          {/* Product Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug" className="text-sm font-medium">Slug (URL)</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="Ex: tanque-de-polietileno-5000l"
            />
            <p className="text-sm text-gray-500">
              URL amigável para o produto. Gerado automaticamente.
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">Categoria</Label>
            <Select 
              value={formData.category_id} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Imagem do produto</Label>
            <div className="flex items-start gap-4">
              {formData.image_url && (
                <div className="flex-shrink-0">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded border"
                  />
                </div>
              )}
              <div className="space-y-2">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                <label htmlFor="image-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    disabled={isUploading}
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    {isUploading ? "Enviando..." : "Enviar imagem"}
                  </Button>
                </label>
                <p className="text-sm text-gray-500">
                  Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB.
                </p>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="short_description" className="text-sm font-medium">Descrição curta</Label>
            <Textarea
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              placeholder="Breve descrição do produto"
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Long Description */}
          <div className="space-y-2">
            <Label htmlFor="long_description" className="text-sm font-medium">Descrição completa</Label>
            <Textarea
              id="long_description"
              name="long_description"
              value={formData.long_description}
              onChange={handleChange}
              placeholder="Descrição detalhada do produto"
              className="resize-none"
              rows={6}
            />
          </div>
        </div>

        {/* Form actions */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/products")}
            disabled={saveMutation.isPending}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={saveMutation.isPending}>
            {saveMutation.isPending
              ? "Salvando..."
              : isEditMode ? "Atualizar produto" : "Criar produto"}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default ProductForm;
