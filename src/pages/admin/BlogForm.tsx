
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
import {
  Card,
  CardContent,
} from "@/components/ui/card";

// Mock categories data
const mockCategories = [
  { id: "1", name: "Notícias" },
  { id: "2", name: "Eventos" },
  { id: "3", name: "Vídeos" },
  { id: "4", name: "Sustentabilidade" },
];

// Mock blog post data (used for edit mode)
const mockPostDetails = {
  id: "1",
  title: "SBPlast entra no mercado de irrigação e avança no agronegócio",
  slug: "sbplast-entra-no-mercado-de-irrigacao",
  category: "1",
  excerpt: "A SBPlast está expandindo sua atuação no segmento de irrigação para o agronegócio, com soluções inovadoras e sustentáveis.",
  content: "A SBPlast, referência no mercado de embalagens plásticas, acaba de anunciar sua entrada no segmento de irrigação para o agronegócio. Com uma linha completa de produtos desenvolvidos especialmente para este setor, a empresa visa atender à crescente demanda por soluções eficientes e sustentáveis.\n\nEntre os produtos destacados estão os sistemas de gotejamento de alta precisão, mangueiras resistentes a produtos químicos e conexões de fácil instalação. A empresa também está investindo em pesquisa para desenvolver materiais biodegradáveis que possam ser utilizados em sistemas de irrigação.\n\n\"Nosso objetivo é proporcionar ao produtor rural ferramentas que otimizem o uso da água e aumentem a produtividade, sempre com foco na sustentabilidade\", afirma o diretor comercial da empresa.",
  featuredImage: "https://via.placeholder.com/800x600",
  status: "Publicado",
};

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;

  // Initialize form state
  const [formData, setFormData] = useState(
    isEditMode ? mockPostDetails : {
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      status: "Rascunho",
    }
  );

  const [isUploading, setIsUploading] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Generate slug from title if title field is changed and we're not in edit mode
    if (name === "title" && !isEditMode) {
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

  // Handle status selection
  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value });
  };

  // Handle image upload
  const handleImageUpload = () => {
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setFormData({
        ...formData,
        featuredImage: "https://via.placeholder.com/800x600",
      });
      toast({
        title: "Imagem enviada",
        description: "A imagem de destaque foi carregada com sucesso.",
      });
    }, 1500);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: isEditMode ? "Post atualizado" : "Post criado",
        description: isEditMode
          ? "O post foi atualizado com sucesso."
          : "O post foi criado com sucesso.",
      });
      navigate("/admin/blog");
    }, 500);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Editar post" : "Adicionar post"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content column */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                {/* Post Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Digite o título do post"
                  />
                </div>

                {/* Post Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-sm font-medium">Slug (URL)</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    placeholder="Ex: titulo-do-post"
                  />
                  <p className="text-sm text-gray-500">
                    URL amigável para o post. Gerado automaticamente.
                  </p>
                </div>

                {/* Post Excerpt */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-sm font-medium">Resumo</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Breve resumo do post (exibido na listagem)"
                    className="resize-none"
                    rows={3}
                  />
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium">Conteúdo</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Conteúdo completo do post"
                    className="resize-none min-h-[300px]"
                    rows={10}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar column */}
          <div className="space-y-6">
            {/* Post Settings Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                {/* Featured Image */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Imagem destacada</Label>
                  {formData.featuredImage && (
                    <div className="mb-3">
                      <img
                        src={formData.featuredImage}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded border"
                      />
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageUpload}
                    disabled={isUploading}
                    className="w-full"
                  >
                    {isUploading ? "Enviando..." : "Enviar imagem"}
                  </Button>
                  <p className="text-sm text-gray-500">
                    Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB.
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

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Publicado">Publicado</SelectItem>
                      <SelectItem value="Rascunho">Rascunho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Form actions */}
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                {isEditMode ? "Atualizar post" : "Publicar post"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/blog")}
                className="w-full"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default BlogForm;
