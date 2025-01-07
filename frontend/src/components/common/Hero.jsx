import React, { useState, useEffect } from "react";

const HeroSlider = () => {
  // Slides data
  const slides = [
    {
      id: 1,
      image: "https://via.placeholder.com/1200x600/FF5733/FFFFFF?text=Slide+1",
      title: "Discover New Horizons",
      subtitle: "Explore the world of possibilities",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/1200x600/33B5FF/FFFFFF?text=Slide+2",
      title: "Learn and Grow",
      subtitle: "Your journey to success starts here",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/1200x600/75FF33/FFFFFF?text=Slide+3",
      title: "Achieve Your Goals",
      subtitle: "Unlock your potential with us",
    },
  ];

  // State for current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden z-10">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
            <h2 className="text-4xl font-bold">{slide.title}</h2>
            <p className="mt-2 text-lg">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
      >
        ❯
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
