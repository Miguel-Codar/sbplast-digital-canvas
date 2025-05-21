
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const SimulatorsSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="font-poppins text-2xl md:text-4xl font-semibold mb-6 text-sbplast-blue">
          Está em dúvida de qual produto melhor atende às suas necessidades?
        </h2>
        
        <p className="text-lg md:text-xl mb-8 text-gray-700">
          Utilize nossos simuladores e encontre o produto ideal.
        </p>
        <Button 
          size="lg"
          className="bg-[#0e2e61] hover:bg-[#0e2e61]/90 text-white rounded-lg hover:scale-105 transition-transform shadow-md text-lg px-6 py-3"
          asChild
        >
          <Link to="/simuladores">Preencher Formulário</Link>
        </Button>
      </div>
    </section>
  );
};

export default SimulatorsSection;
