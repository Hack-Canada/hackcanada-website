import React from 'react';

/**
 * Hero Section Component
 * 
 * This component should include:
 * - Main headline/title
 * - Subtitle or tagline
 * - Call-to-action buttons (Register, Learn More, etc.)
 * - Hero image or background
 * - Date/location information
 * 
 * TODO: Add hero content, images, and CTAs
 */
export default function Hero() {
  return (
    <section id="hero" className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to HackCanada
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join Canada's premier hackathon event. Build, innovate, and connect with developers from across the country.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Register Now
          </button>
          <button className="px-8 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors">
            Learn More
          </button>
        </div>
        <div className="mt-12 text-muted-foreground">
          <p className="text-lg">Date: TBD</p>
          <p className="text-lg">Location: TBD</p>
        </div>
      </div>
    </section>
  );
}

