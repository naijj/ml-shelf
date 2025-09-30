import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Hero } from './landing/Hero';
import { Features } from './landing/Features';
import { HowItWorks } from './landing/HowItWorks';
import { UseCases } from './landing/UseCases';
import { Community } from './landing/Community';
import { CTA } from './landing/CTA';
import { Footer } from './landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <Community />
      <CTA />
      <Footer />
    </div>
  );
}