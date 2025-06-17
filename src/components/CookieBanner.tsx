
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookies-accepted');
    if (!cookieAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-sbplast-blue text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          Utilizamos cookies para melhorar sua experiência de navegação. 
          Ao continuar navegando, você concorda com nossa política de cookies.
        </p>
        <div className="flex items-center gap-2">
          <Button
            onClick={acceptCookies}
            className="bg-sbplast-cyan text-sbplast-blue hover:bg-sbplast-darkCyan"
          >
            Aceitar
          </Button>
          <button
            onClick={acceptCookies}
            className="p-2 hover:bg-sbplast-lightBlue rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
