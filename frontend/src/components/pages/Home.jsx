import React from 'react'
import Navbar from '../common/Navbar'
import HeroSlider from '../common/Hero'
import ProductListingPage from './ProductListingPage '
import Footer from '../common/Footer'


export default function Home() {
  return (
  <>
  <Navbar/>
  <HeroSlider/>
  <ProductListingPage/>
  <Footer/>
  </>
  )
}
