import React from 'react'
import Header from '../components/Layout/Header.jsx'
import Hero from '../components/Route/Hero/Hero.jsx'
import Tags from '../components/Route/Tags/Tags.jsx'
import FeaturedProducts from '../components/Route/FeaturedProducts/FeaturedProducts.jsx'
import Footer from '../components/Layout/Footer.jsx'

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1}/>
      <Hero />
      <Tags />
      <FeaturedProducts />
      <Footer />
    </div>
  )
}

export default HomePage
