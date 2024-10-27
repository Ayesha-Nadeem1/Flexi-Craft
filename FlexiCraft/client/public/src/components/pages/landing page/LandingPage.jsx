import React from 'react'
import HeroSection from './HeroSection';
import Features from './Features';
import Workflow from './Workflow';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import WithLayout from '../../WithLayout';

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <Workflow />
      <Pricing />
      <Testimonials />
    </>
  )
}

export default WithLayout(LandingPage)