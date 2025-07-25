import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, User, Phone, Mail, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TrabalheConoscoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TrabalheConoscoForm = ({ open, onOpenChange }: TrabalheConoscoFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    cargo: "",
    experiencia: "",
    curriculo: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 5MB.",
        });
        return;
      }
      
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Formato não suportado",
          description: "Por favor, envie um arquivo PDF ou DOC/DOCX.",
        });
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        curriculo: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.telefone || !formData.email || !formData.curriculo) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    // Aqui seria feita a integração com o backend para enviar o currículo
    console.log("Dados do formulário:", formData);
    
    toast({
      title: "Currículo enviado com sucesso!",
      description: "Entraremos em contato em breve. Obrigado pelo interesse!",
    });
    
    // Reset form
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      cargo: "",
      experiencia: "",
      curriculo: null
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-sbplast-blue flex items-center">
            <User className="mr-2 h-6 w-6" />
            Trabalhe Conosco
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-sbplast-blue font-medium">
                Nome Completo *
              </Label>
              <Input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Seu nome completo"
                required
                className="border-gray-300 focus:border-sbplast-cyan"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-sbplast-blue font-medium">
                Telefone/WhatsApp *
              </Label>
              <Input
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="(81) 99999-9999"
                required
                className="border-gray-300 focus:border-sbplast-cyan"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sbplast-blue font-medium">
              E-mail *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu.email@exemplo.com"
              required
              className="border-gray-300 focus:border-sbplast-cyan"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cargo" className="text-sbplast-blue font-medium">
              Cargo de Interesse
            </Label>
            <Input
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleInputChange}
              placeholder="Ex: Analista de Vendas, Operador de Máquina..."
              className="border-gray-300 focus:border-sbplast-cyan"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experiencia" className="text-sbplast-blue font-medium">
              Experiência Profissional
            </Label>
            <Textarea
              id="experiencia"
              name="experiencia"
              value={formData.experiencia}
              onChange={handleInputChange}
              placeholder="Conte-nos um pouco sobre sua experiência profissional..."
              className="border-gray-300 focus:border-sbplast-cyan min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="curriculo" className="text-sbplast-blue font-medium">
              Currículo (PDF ou DOC) *
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-sbplast-cyan transition-colors">
              <input
                id="curriculo"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <label htmlFor="curriculo" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.curriculo ? (
                    <span className="text-green-600 font-medium">
                      Arquivo selecionado: {formData.curriculo.name}
                    </span>
                  ) : (
                    <>
                      Clique para selecionar seu currículo
                      <br />
                      <span className="text-xs text-gray-500">PDF, DOC ou DOCX - Máximo 5MB</span>
                    </>
                  )}
                </p>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue"
            >
              <Mail className="mr-2 h-4 w-4" />
              Enviar Currículo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TrabalheConoscoForm;