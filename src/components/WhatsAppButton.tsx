
import React from "react";
import { Phone } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "5581995015223";
  const message = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para embalagens plásticas.");

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center animate-pulse"
      aria-label="WhatsApp"
    >
      <Phone className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppButton;
