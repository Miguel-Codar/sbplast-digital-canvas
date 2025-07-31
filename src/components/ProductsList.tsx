
import React, { useState, useEffect } from "react";
import { X, Search, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductsListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductsList = ({ open, onOpenChange }: ProductsListProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-xl font-semibold text-sbplast-blue">
            Lista SB Plast - Produtos
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="flex justify-center">
            <Settings className="w-16 h-16 text-sbplast-blue animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-sbplast-blue">
              Em Desenvolvimento
            </h3>
            <p className="text-gray-600 max-w-sm">
              Nossa lista de produtos está sendo aprimorada. Em breve você terá acesso ao catálogo completo.
            </p>
          </div>

          <div className="space-y-3 w-full max-w-xs">
            <Link to="/atendimento" onClick={() => onOpenChange(false)}>
              <Button className="w-full bg-gradient-to-r from-sbplast-cyan to-sbplast-blue text-white hover:from-sbplast-darkCyan hover:to-sbplast-darkBlue">
                Solicitar Orçamento
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full border-sbplast-blue text-sbplast-blue hover:bg-sbplast-blue hover:text-white"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
          </div>
        </div>

        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sbplast-blue focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default ProductsList;
