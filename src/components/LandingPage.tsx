import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
    </div>
  );
}