
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type CarouselItem = {
  id: string;
  imageUrl: string;
  title?: string;
  link?: string;
  youtubeUrl?: string;
};

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

const HomeCarousel = ({ items, autoPlay = true, interval = 5000 }: CarouselProps) => {
  console.log("HomeCarousel rendering with items:", items);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    console.log("HomeCarousel useEffect triggered", { isPlaying, itemsLength: items.length, currentIndex });
    
    if (!isPlaying || items.length <= 1) {
      console.log("Auto-play disabled or single item");
      return;
    }

    const timer = setInterval(() => {
      // Only auto-advance if current item isn't a video
      const currentItem = items[currentIndex];
      if (!currentItem?.youtubeUrl) {
        console.log("Auto-advancing to next slide");
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }
    }, interval);

    return () => {
      console.log("Clearing carousel timer");
      clearInterval(timer);
    }
  }, [isPlaying, interval, items.length, currentIndex]);

  useEffect(() => {
    // Reset auto-play when changing slides
    setIsPlaying(autoPlay);
    console.log("Resetting auto-play to:", autoPlay);
  }, [currentIndex, autoPlay]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (!items || items.length === 0) {
    console.log("No carousel items available");
    return (
      <div className="w-full bg-gray-200 flex items-center justify-center" style={{ aspectRatio: '1600/583' }}>
        <p className="text-gray-500">Carregando carousel...</p>
      </div>
    );
  }

  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url?: string): string | null => {
    if (!url) return null;
    
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  console.log("HomeCarousel rendering JSX");

  return (
    <div className="relative w-full" style={{ aspectRatio: '1600/583' }}>
      <div
        className="transition-transform duration-500 flex h-full w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => {
          const youtubeVideoId = getYoutubeVideoId(item.youtubeUrl);
          
          return (
            <div
              key={item.id}
              className="min-w-full h-full relative"
            >
              {youtubeVideoId ? (
                <div className="w-full h-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&showinfo=0&rel=0`}
                    title={item.title || "YouTube video"}
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    onLoad={() => {
                      console.log("YouTube video loaded, stopping auto-play");
                      setIsPlaying(false);
                    }}
                  ></iframe>
                </div>
              ) : item.link ? (
                <Link to={item.link} className="block h-full w-full">
                  <img
                    src={item.imageUrl}
                    alt={item.title || "Carousel image"}
                    className="w-full h-full object-cover object-center"
                  />
                </Link>
              ) : (
                <img
                  src={item.imageUrl}
                  alt={item.title || "Carousel image"}
                  className="w-full h-full object-cover object-center"
                />
              )}
              
              {/* Caption/Title overlay */}
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                  <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">{item.title}</h2>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 z-10"
            onClick={handlePrevious}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 z-10"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots indicators */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
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
