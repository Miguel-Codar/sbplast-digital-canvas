import React, { useEffect, useRef, useState } from "react";

interface ClientCarouselProps {
  images: string[];
  speed?: number;
  pauseOnHover?: boolean;
}

const ClientCarousel: React.FC<ClientCarouselProps> = ({
  images,
  speed = 25,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);

  // Duplicar imagens para loop infinito
  const allImages = [...images, ...images, ...images];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isPaused && container) {
        positionRef.current -= speed / 60;
        
        // Reset suave quando chegar ao final do primeiro conjunto
        const itemWidth = 200; // largura aproximada de cada item
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
      className="overflow-hidden relative w-full bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl py-4"
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
            className="flex-shrink-0 px-3 py-2"
          >
            <img 
              src={src} 
              alt={`Cliente ${index % images.length + 1}`}
              className="h-16 w-32 sm:h-20 sm:w-40 md:h-24 md:w-48 lg:h-28 lg:w-56 object-contain rounded-md"
              style={{
                objectFit: 'contain',
                objectPosition: 'center'
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default ClientCarousel;