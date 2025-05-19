
import React from "react";
import { Link } from "react-router-dom";

interface SolutionCategory {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

const SolutionsSection = () => {
  // Categories with icons provided by the user
  const categories: SolutionCategory[] = [
    {
      id: "1",
      name: "Camisetas",
      icon: "/lovable-uploads/72bab4a1-815e-4ab6-b332-d5beea374620.png",
      slug: "camisetas"
    },
    {
      id: "2", 
      name: "Cadeado",
      icon: "/lovable-uploads/745796f5-50e0-440b-8c0e-d859b1903b47.png",
      slug: "cadeado"
    },
    {
      id: "3",
      name: "Boca de Palhaço",
      icon: "/lovable-uploads/b88714d4-e794-4848-b549-de497dd18a00.png",
      slug: "boca-de-palhaco"
    },
    {
      id: "4",
      name: "Alças Prensadas",
      icon: "/lovable-uploads/e2434e72-bf5f-4bc3-ba0b-b56c06183ce4.png",
      slug: "alcas-prensadas"
    },
    {
      id: "5",
      name: "Autocapas",
      icon: "/lovable-uploads/69254766-97a2-4e05-8e14-82a9dc13f36e.png",
      slug: "autocapas"
    },
    {
      id: "6",
      name: "Biodegradável",
      icon: "/lovable-uploads/6cca6f0e-6bdf-49d7-9014-821a93244d59.png",
      slug: "biodegradavel"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12 text-sbplast-blue">Soluções SBPlast</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 flex items-center justify-center mb-4">
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-base font-medium text-sbplast-blue text-center">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
