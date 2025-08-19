
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
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const allImages = [...images, ...images];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const firstItem = container.querySelector(".carousel-item") as HTMLElement;
    if (firstItem) {
      setItemWidth(firstItem.offsetWidth);
    }
    setContainerWidth(container.scrollWidth);

    let position = 0;
    let animationId: number;

    const animate = () => {
      if (!isPaused) {
        position -= speed / 60;
        
        if (Math.abs(position) >= (containerWidth / 2)) {
          position = 0;
        }
        
        if (container) {
          container.style.transform = `translateX(${position}px)`;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed, isPaused, containerWidth, images.length]);

  return (
    <div 
      className="overflow-hidden relative w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl shadow-2xl py-8"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div 
        ref={containerRef}
        className="flex transition-transform"
        style={{ willChange: "transform" }}
      >
        {allImages.map((src, index) => (
          <div 
            key={`${src}-${index}`} 
            className="carousel-item flex-shrink-0 px-6 py-4"
          >
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 p-6 border border-gray-100">
              <img 
                src={src} 
                alt={`Instalação SB Plast ${index % images.length + 1}`}
                className="h-64 w-96 sm:h-72 sm:w-[28rem] md:h-80 md:w-[32rem] lg:h-96 lg:w-[36rem] xl:h-[26rem] xl:w-[40rem] object-cover rounded-xl shadow-lg"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              <div className="mt-4 text-center">
                <div className="w-16 h-1 bg-gradient-to-r from-sbplast-cyan to-sbplast-blue mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Gradient overlays melhorados */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-blue-50 via-blue-50/80 to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-blue-50 via-blue-50/80 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default CompanyCarousel;
