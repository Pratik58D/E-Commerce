import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import backgroundOne from "../../assets/background3.webp"

const HeroSection = () => {
  return (
    <section className="relative h-[600px] lg:h-[800px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundOne}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Upgrade Your Lifestyle
          </h1>
          <p className="text-lg lg:text-xl mb-8">
            Discover premium products designed to make your life better.
          </p>
          <Link to="/shop/products">
            <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Shop Now
            </Button>
          </Link>
        </div>

       
      </div>
    </section>
  );
};

export default HeroSection;