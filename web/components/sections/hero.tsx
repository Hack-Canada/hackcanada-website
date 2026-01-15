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
  const [sectionHeight, setSectionHeight] = useState(1400);
  const backgroundImgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageLoad = () => {
    if (backgroundImgRef.current) {
      setSectionHeight(backgroundImgRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (backgroundImgRef.current) {
        setSectionHeight(backgroundImgRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <section id="hero" className="w-full flex items-center lg:items-start justify-center relative overflow-hidden lg:pt-[25%]" style={{ height: `${sectionHeight + 300}px` }}>
      {/* Background layer - slower parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${-100 + scrollY * 0.1}px)`,
        }}
      >
        <Image 
          ref={backgroundImgRef}
          src="/background.png" 
          alt="Background" 
          width={1920}
          height={1080}
          className="object-cover w-screen h-auto min-w-[1920px] min-h-[1080px]"
          priority
          onLoad={handleImageLoad}
        />
      </div>

      {/* Foreground layer - faster parallax */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          transform: `translateY(${300 + scrollY * 0.001}px)`,
        }}
      >
        <Image 
          src="/foreground.png" 
          alt="Foreground" 
          width={1920}
          height={1080}
          className="object-top w-screen h-auto min-w-375"
          priority
        />
      </div>

      <div className="z-20 flex flex-col items-center text-center px-4 lg:ml-[50vw] -mt-[40vh] lg:mt-0 backdrop-blur-md mx-10 bg-white/20 rounded-lg py-6 lg:backdrop-blur-none lg:bg-transparent lg:py-0"
        style={{
          transform: `translateY(${scrollY * 0.002}px)`,
        }}
      >
        <h1 className='text-6xl lg:text-8xl font-bold text-[#441E0A]'>Hack Canada</h1>
        <p className='text-[#441E0A] text lg:text-2xl mt-2 lg:mt-0'>Feb 30-32, 2025 | In-Person Event | Unofficial MLH Partner</p>
        <div className='mt-4 lg:mt-6 flex flex-col items-center'>
          <div className='bg-[#441E0A] text-white px-8 lg:px-10 py-2 lg:py-3 rounded-t-lg lg:rounded-lg hover:bg-[#5C2E0F] transition'>
            <a href="" className='font-bold text-lg lg:text-2xl'>Apply Now!</a>
          </div>
          <div className='bg-[#EC294D] text-white px-4 py-1 rounded-b-lg text-center'>
            <span className='font-semibold text-sm'>Due Feb 20, 2025!</span>
          </div>
        </div>
      </div>
    </section>
  );
}

