
import React, { useEffect, useRef, useState } from "react";

interface CompanyCarouselProps {
  images: string[];
  speed?: number; // pixels per second
  pauseOnHover?: boolean;
}

const CompanyCarousel: React.FC<CompanyCarouselProps> = ({
  images,
  speed = 30,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  // Clone images to create the illusion of infinite scrolling
  const allImages = [...images, ...images];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get the total width of all items
    const firstItem = container.querySelector(".carousel-item") as HTMLElement;
    if (firstItem) {
      setItemWidth(firstItem.offsetWidth);
    }
    setContainerWidth(container.scrollWidth);

    // Set initial position
    let position = 0;
    let animationId: number;

    const animate = () => {
      if (!isPaused) {
        position -= speed / 60; // Adjust based on 60fps
        
        // Reset position when first set of images is scrolled past
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
      className="overflow-hidden relative w-full"
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
            className="carousel-item flex-shrink-0 px-2"
          >
            <img 
              src={src} 
              alt={`Company image ${index % images.length + 1}`}
              className="h-40 w-64 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCarousel;
