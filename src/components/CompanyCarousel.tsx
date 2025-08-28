
import React, { useEffect, useRef, useState } from "react";

interface CompanyCarouselProps {
  images: string[];
  speed?: number;
  pauseOnHover?: boolean;
}

const CompanyCarousel: React.FC<CompanyCarouselProps> = ({
  images,
  speed = 25,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);

  // Triplicar imagens para loop mais suave
  const allImages = [...images, ...images, ...images];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isPaused && container) {
        positionRef.current -= speed / 60;
        
        // Reset suave quando chegar ao final do primeiro conjunto
        const itemWidth = 450; // largura aproximada de cada item com padding
        const resetPoint = -(itemWidth * images.length);
        
        if (positionRef.current <= resetPoint) {
          positionRef.current = 0;
        }
        
        container.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, isPaused, images.length]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div 
      className="overflow-hidden relative w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl shadow-2xl py-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={containerRef}
        className="flex transition-none"
        style={{ willChange: "transform" }}
      >
        {allImages.map((src, index) => (
          <div 
            key={`${src}-${index}`} 
            className="flex-shrink-0 px-4 py-3"
          >
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 p-4 border border-gray-100">
              <img 
                src={src} 
                alt={`Instalação SB Plast ${index % images.length + 1}`}
                className="h-48 w-80 sm:h-56 sm:w-96 md:h-64 md:w-[28rem] lg:h-72 lg:w-[32rem] xl:h-80 xl:w-[36rem] object-cover rounded-xl shadow-lg"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: 'brightness(1.1) contrast(1.075) saturate(1.15)'
                }}
              />
              <div className="mt-3 text-center">
                <div className="w-12 h-1 bg-gradient-to-r from-sbplast-cyan to-sbplast-blue mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-blue-50 via-blue-50/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-blue-50 via-blue-50/80 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default CompanyCarousel;
