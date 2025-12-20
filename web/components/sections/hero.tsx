'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="w-full min-h-[1400px] flex items-center justify-center relative overflow-hidden">
      {/* Background layer - slower parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
        }}
      >
        <Image 
          src="/background.png" 
          alt="Background" 
          width={1920}
          height={1080}
          className="object-cover w-[1920px] h-[1080px]"
          priority
        />
      </div>

      {/* Foreground layer - faster parallax */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          transform: `translateY(${300 + scrollY * 0.2}px)`,
        }}
      >
        <Image 
          src="/foreground.png" 
          alt="Foreground" 
          width={1920}
          height={1080}
          className="object-cover object-top w-[1920px] h-[1080px]"
          priority
        />
      </div>
    </section>
  );
}

