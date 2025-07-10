
import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "5581995015223";
  const message = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para embalagens plásticas.");

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center animate-pulse"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </button>
  );
};

export default WhatsAppButton;
