
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
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
import { 
  getBlogCategories, 
  getBlogPostBySlug, 
  saveBlogPost, 
  uploadBlogImage,
  uploadBlogVideo,
  BlogPost 
} from "@/services/blogService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BlogForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast: hookToast } = useToast();
  const queryClient = useQueryClient();
  const isEditMode = !!slug;

  // Initialize form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category_id: "",
    excerpt: "",
    content: "",
    featured_image: "",
    video_url: "",
    status: "Rascunho",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [videoUploadError, setVideoUploadError] = useState("");
  const [postId, setPostId] = useState<string | undefined>(undefined);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: getBlogCategories
  });

  // Fetch post data if in edit mode
  const { data: postData, isLoading: isLoadingPost } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => getBlogPostBySlug(slug!),
    enabled: isEditMode
  });

  // Set form data from fetched post data
  useEffect(() => {
    if (postData) {
      console.log("Setting form data from post data:", postData);
      setFormData({
        title: postData.title || "",
        slug: postData.slug || "",
        category_id: postData.category_id || "",
        excerpt: postData.excerpt || "",
        content: postData.content || "",
        featured_image: postData.featured_image || "",
        video_url: postData.video_url || "",
        status: postData.status || "Rascunho",
      });
      setPostId(postData.id);
    }
  }, [postData]);

  // Save post mutation
  const saveMutation = useMutation({
    mutationFn: saveBlogPost,
    onSuccess: (data) => {
      console.log("Save mutation success:", data);
      
      // Invalidate and refetch queries to get updated data
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      
      if (isEditMode) {
        queryClient.invalidateQueries({ queryKey: ["blogPost", slug] });
      }
      
      // Show success toast
      toast.success(isEditMode ? "Post atualizado" : "Post criado", {
        description: isEditMode
          ? "O post foi atualizado com sucesso."
          : "O post foi criado com sucesso."
      });
      
      hookToast({
        title: isEditMode ? "Post atualizado" : "Post criado",
        description: isEditMode
          ? "O post foi atualizado com sucesso."
          : "O post foi criado com sucesso.",
      });
      
      // Navigate back to blog list
      navigate("/admin/blog");
    },
    onError: (error) => {
      console.error("Save mutation error:", error);
      
      // Show error toast
      toast.error("Erro ao salvar", {
        description: `Erro ao salvar o post: ${error.message}`
      });
      
      hookToast({
        title: "Erro",
        description: `Erro ao salvar o post: ${error.message}`,
        variant: "destructive",
      });
    },
  });

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
    setFormData({ ...formData, category_id: value });
  };

  // Handle status selection
  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value });
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    setUploadError("");
    
    try {
      const imageUrl = await uploadBlogImage(file);
      setFormData({
        ...formData,
        featured_image: imageUrl,
      });
      
      toast.success("Imagem enviada", {
        description: "A imagem de destaque foi carregada com sucesso."
      });
      
      hookToast({
        title: "Imagem enviada",
        description: "A imagem de destaque foi carregada com sucesso.",
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setUploadError("Erro ao enviar imagem. Por favor, tente novamente.");
      
      toast.error("Erro de upload", {
        description: "Não foi possível enviar a imagem."
      });
      
      hookToast({
        title: "Erro",
        description: "Não foi possível enviar a imagem.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle video upload
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploadingVideo(true);
    setVideoUploadError("");
    
    try {
      const videoUrl = await uploadBlogVideo(file);
      setFormData({
        ...formData,
        video_url: videoUrl,
      });
      
      toast.success("Vídeo enviado", {
        description: "O vídeo foi carregado com sucesso."
      });
      
      hookToast({
        title: "Vídeo enviado",
        description: "O vídeo foi carregado com sucesso.",
      });
    } catch (error: any) {
      console.error("Error uploading video:", error);
      setVideoUploadError("Erro ao enviar vídeo. Por favor, tente novamente.");
      
      toast.error("Erro de upload", {
        description: "Não foi possível enviar o vídeo."
      });
      
      hookToast({
        title: "Erro",
        description: "Não foi possível enviar o vídeo.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingVideo(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.slug) {
      toast.error("Campos obrigatórios", {
        description: "Por favor, preencha todos os campos obrigatórios."
      });
      
      hookToast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Submitting form data:", formData, "Post ID:", postId);
    
    // Prepare post data with ID if in edit mode
    const postToSave: Partial<BlogPost> = {
      ...formData,
    };
    
    if (postId) {
      postToSave.id = postId;
    }
    
    console.log("Final post data to save:", postToSave);
    saveMutation.mutate(postToSave);
  };

  if (isLoadingPost && isEditMode) {
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
                  {formData.featured_image && (
                    <div className="mb-3">
                      <img
                        src={formData.featured_image}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded border"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
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
                        className="w-full cursor-pointer"
                        disabled={isUploading}
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        {isUploading ? "Enviando..." : "Enviar imagem"}
                      </Button>
                    </label>
                    {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
                  </div>
                  <p className="text-sm text-gray-500">
                    Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB.
                  </p>
                </div>

                {/* Video Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Vídeo</Label>
                  {formData.video_url && (
                    <div className="mb-3">
                      <video
                        src={formData.video_url}
                        controls
                        className="w-full h-40 rounded border"
                      >
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      id="video-upload"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      disabled={isUploadingVideo}
                    />
                    <label htmlFor="video-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full cursor-pointer"
                        disabled={isUploadingVideo}
                        onClick={() => document.getElementById("video-upload")?.click()}
                      >
                        {isUploadingVideo ? "Enviando..." : "Enviar vídeo"}
                      </Button>
                    </label>
                    {videoUploadError && <p className="text-red-500 text-sm">{videoUploadError}</p>}
                  </div>
                  <p className="text-sm text-gray-500">
                    Formatos aceitos: MP4, MOV, AVI. Tamanho máximo: 50MB.
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
              <Button 
                type="submit" 
                className="w-full"
                disabled={saveMutation.isPending || isUploading || isUploadingVideo}
              >
                {saveMutation.isPending 
                  ? "Salvando..." 
                  : isEditMode 
                    ? "Atualizar post" 
                    : "Publicar post"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/blog")}
                className="w-full"
                disabled={saveMutation.isPending}
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
