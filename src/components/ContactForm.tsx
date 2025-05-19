
import React, { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: "contato" | "orcamento" | "assistencia";
}

const ContactForm = ({ open, onOpenChange, type = "contato" }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: type === "orcamento" ? "" : undefined,
    message: "",
    products: type === "orcamento" ? "" : undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aqui iria a lógica de envio do formulário para o backend
      // Por enquanto só simulamos um delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Em breve entraremos em contato.",
      });
      
      // Resetamos o formulário
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: type === "orcamento" ? "" : undefined,
        message: "",
        products: type === "orcamento" ? "" : undefined,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (type) {
      case "orcamento":
        return "Solicitar Orçamento";
      case "assistencia":
        return "Assistência Técnica";
      default:
        return "Entre em Contato";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-xl font-semibold text-sbplast-blue">
          {getTitle()}
        </DialogTitle>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Telefone (opcional)</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {type === "orcamento" && (
            <>
              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Nome da empresa"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="products">Produtos desejados</Label>
                <Textarea
                  id="products"
                  name="products"
                  placeholder="Liste os produtos para orçamento"
                  value={formData.products}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          
          <div>
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Como podemos ajudar?"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-sbplast-blue hover:bg-sbplast-blue/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>

        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sbplast-blue focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
