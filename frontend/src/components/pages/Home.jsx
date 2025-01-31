import React from 'react';
import Navbar from '../common/Navbar';
import Header from '../common/Header'; // Importing the new Header component
import HeroSlider from '../common/Hero';
import Footer from '../common/Footer';
import ThreeDAnimation from '../common/ThreeDAnimation'; // Importing the 3D Animation component
import ProductListingPage from './ProductListingPage';

export default function Home() {
  return (
    <>
      <Header /> {/* Adding the Header component */}
      <Navbar />
      <HeroSlider />
      <ProductListingPage />
      <Footer />
    </>
  );
}
