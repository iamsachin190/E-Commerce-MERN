import React from "react";

const HeroSlider = () => {
  return (
    <div className="relative w-full h-auto bg-gray-100 flex flex-col md:flex-row justify-between items-center p-8">
      <div className="flex flex-col justify-center mb-4 md:mb-0">
        <h2 className="text-4xl font-bold text-green-600">
          Grab Upto 50% Off On Selected Headphones
        </h2>
      </div>
      <img
        src="src/hero_image.png" // Replace with the actual image URL
        alt="Model with Headphones"
        className="w-full md:w-1/2 h-auto object-cover"
      />
    </div>
  );
};

export default HeroSlider;
