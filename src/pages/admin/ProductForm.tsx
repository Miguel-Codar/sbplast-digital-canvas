
import { useState } from "react";
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

// Mock categories data
const mockCategories = [
  { id: "1", name: "Camisetas" },
  { id: "2", name: "Cadeado" },
  { id: "3", name: "Boca de Palhaço" },
  { id: "4", name: "Alças Prensadas" },
  { id: "5", name: "Autocapas" },
  { id: "6", name: "Biodegradável" },
];

// Mock product data (used for edit mode)
const mockProductDetails = {
  id: "1",
  name: "Tanque de Polietileno 5.000L",
  slug: "tanque-de-polietileno-5000l",
  category: "1",
  shortDescription: "Tanque de polietileno com capacidade para 5.000 litros.",
  longDescription: "Tanque de polietileno de alta resistência, ideal para armazenamento de água, produtos químicos e outros fluidos. Possui proteção contra raios UV e é certificado pelo INMETRO.",
  imageUrl: "https://via.placeholder.com/400x300",
};

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;

  // Initialize form state
  const [formData, setFormData] = useState(
    isEditMode ? mockProductDetails : {
      name: "",
      slug: "",
      category: "",
      shortDescription: "",
      longDescription: "",
      imageUrl: "",
    }
  );

  const [isUploading, setIsUploading] = useState(false);

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
    setFormData({ ...formData, category: value });
  };

  // Handle image upload
  const handleImageUpload = () => {
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setFormData({
        ...formData,
        imageUrl: "https://via.placeholder.com/400x300",
      });
      toast({
        title: "Imagem enviada",
        description: "A imagem foi carregada com sucesso.",
      });
    }, 1500);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: isEditMode ? "Produto atualizado" : "Produto criado",
        description: isEditMode
          ? "O produto foi atualizado com sucesso."
          : "O produto foi criado com sucesso.",
      });
      navigate("/admin/products");
    }, 500);
  };

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
              value={formData.category} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {mockCategories.map((category) => (
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
              {formData.imageUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded border"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleImageUpload}
                  disabled={isUploading}
                >
                  {isUploading ? "Enviando..." : "Enviar imagem"}
                </Button>
                <p className="text-sm text-gray-500">
                  Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB.
                </p>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="shortDescription" className="text-sm font-medium">Descrição curta</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Breve descrição do produto"
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Long Description */}
          <div className="space-y-2">
            <Label htmlFor="longDescription" className="text-sm font-medium">Descrição completa</Label>
            <Textarea
              id="longDescription"
              name="longDescription"
              value={formData.longDescription}
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
          >
            Cancelar
          </Button>
          <Button type="submit">
            {isEditMode ? "Atualizar produto" : "Criar produto"}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default ProductForm;
