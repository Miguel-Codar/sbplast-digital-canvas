
import React from "react";

const WhatsAppButton = () => {
  const whatsappNumber = "5581995015223";
  const message = encodeURIComponent("Olá! Gostaria de solicitar um orçamento para embalagens plásticas.");

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center animate-pulse p-2"
      aria-label="WhatsApp"
    >
      <img 
        src="/lovable-uploads/14a1d9f0-66d3-45c1-a709-fac3c43002d3.png" 
        alt="WhatsApp" 
        className="w-10 h-10"
      />
    </button>
  );
};

export default WhatsAppButton;
