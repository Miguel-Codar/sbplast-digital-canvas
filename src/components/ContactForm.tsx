
import React, { useState } from "react";
import { X, Clock, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Em breve entraremos em contato.",
      });
      
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

  const getButtonText = () => {
    switch (type) {
      case "orcamento":
        return "Quero meu orçamento rápido";
      case "assistencia":
        return "Solicitar assistência";
      default:
        return "Enviar mensagem";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl border-0 shadow-2xl">
        <DialogTitle className="text-2xl font-bold text-sbplast-blue text-center mb-2">
          {getTitle()}
        </DialogTitle>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div className="floating-label">
            <input
              id="name"
              name="name"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sbplast-blue focus:outline-none transition-colors duration-300"
            />
            <label htmlFor="name" className="floating-label-text">
              Nome completo
            </label>
          </div>
          
          {/* Email */}
          <div className="floating-label">
            <input
              id="email"
              name="email"
              type="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sbplast-blue focus:outline-none transition-colors duration-300"
            />
            <label htmlFor="email" className="floating-label-text">
              E-mail
            </label>
          </div>
          
          {/* Telefone */}
          <div className="floating-label">
            <input
              id="phone"
              name="phone"
              placeholder=" "
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sbplast-blue focus:outline-none transition-colors duration-300"
            />
            <label htmlFor="phone" className="floating-label-text">
              Telefone (opcional)
            </label>
          </div>

          {/* Campos específicos para orçamento */}
          {type === "orcamento" && (
            <>
              <div className="floating-label">
                <input
                  id="company"
                  name="company"
                  placeholder=" "
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sbplast-blue focus:outline-none transition-colors duration-300"
                />
                <label htmlFor="company" className="floating-label-text">
                  Nome da empresa
                </label>
              </div>
              
              <div className="floating-label">
                <textarea
                  id="products"
                  name="products"
                  placeholder=" "
                  value={formData.products}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sbplast-blue focus:outline-none transition-colors duration-300 resize-none"
                />
                <label htmlFor="products" className="floating-label-text">
                  Produtos desejados
                </label>
              </div>
            </>
          )}
          
          {/* Mensagem */}
          <div className="floating-label">
            <textarea
              id="message"
              name="message"
              placeholder=" "
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sbplast-blue focus:outline-none transition-colors duration-300 resize-none"
            />
            <label htmlFor="message" className="floating-label-text">
              Como podemos ajudar?
            </label>
          </div>
          
          {/* Botão de envio */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sbplast-blue to-sbplast-lightBlue hover:from-sbplast-darkBlue hover:to-sbplast-blue text-white py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : getButtonText()}
            </Button>
          </div>

          {/* Selo de confiança */}
          <div className="flex items-center justify-center space-x-3 pt-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-sbplast-cyan" />
              <span>Retorno em até 12h úteis</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>100% seguro</span>
            </div>
          </div>
        </form>

        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sbplast-blue focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
