
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type CarouselItem = {
  id: string;
  imageUrl: string;
  title?: string;
  link?: string;
};

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

const HomeCarousel = ({ items, autoPlay = true, interval = 5000 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden w-full rounded-lg shadow-md">
      <div
        className="transition-transform duration-500 flex"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="min-w-full relative"
          >
            {item.link ? (
              <Link to={item.link} className="block">
                <img
                  src={item.imageUrl}
                  alt={item.title || "Carousel image"}
                  className="w-full h-64 md:h-96 object-cover"
                />
                {item.title && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-40 p-4 rounded-md">
                      <h3 className="text-xl md:text-3xl text-white font-bold">{item.title}</h3>
                    </div>
                  </div>
                )}
              </Link>
            ) : (
              <>
                <img
                  src={item.imageUrl}
                  alt={item.title || "Carousel image"}
                  className="w-full h-64 md:h-96 object-cover"
                />
                {item.title && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-40 p-4 rounded-md">
                      <h3 className="text-xl md:text-3xl text-white font-bold">{item.title}</h3>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75"
            onClick={handlePrevious}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-sbplast-cyan" : "bg-white bg-opacity-50"
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeCarousel;
