'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Parallax from 'parallax-js';

export default function Hero() {
  const [sectionHeight, setSectionHeight] = useState(1400);
  const backgroundImgRef = useRef<HTMLImageElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<Parallax | null>(null);

  const handleImageLoad = () => {
    if (backgroundImgRef.current)
      setSectionHeight(backgroundImgRef.current.offsetHeight);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (backgroundImgRef.current)
        setSectionHeight(backgroundImgRef.current.offsetHeight);
    };
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    parallaxRef.current = new Parallax(scene, {
      relativeInput: true,
      hoverOnly: true,
      pointerEvents: true,
      limitX: 35,
      limitY: 35,
      scalarX: 12,
      scalarY: 12,
    });
    return () => {
      parallaxRef.current?.destroy();
      parallaxRef.current = null;
    };
  }, []);

  return (
    <section id="hero" className="w-full flex items-start justify-center relative lg:pt-[25%]" style={{ height: `${sectionHeight + 350}px` }}>
      <div ref={sceneRef} className="absolute inset-0 overflow-hidden z-0">
        <div data-depth="0.05" className="absolute inset-0 z-0 overflow-visible flex justify-center items-start">
          <div className="relative left-1/2 -translate-x-1/2 min-w-[1920px] w-screen flex justify-center">
            <Image
              ref={backgroundImgRef}
              src="/background.png"
              alt="Background"
              width={1920}
              height={1080}
              className="object-top w-full h-auto origin-top"
              priority
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div data-depth="0.2" className="absolute inset-0 z-10 lg:z-30 overflow-visible flex justify-center items-start pt-[20vh]">
          <div className="relative left-1/2 -translate-x-1/2 min-w-[1920px] w-screen">
            <Image
              src="/foreground.png"
              alt="Foreground"
              width={1920}
              height={1080}
              className="object-top w-full h-auto scale-105"
              priority
            />
          </div>
        </div>
      </div>
      <div className="z-20 flex flex-col items-center text-center px-4 mt-[12vh] lg:ml-[50vw] lg:-mt-24 backdrop-blur-md mx-10 bg-white/20 rounded-lg py-6 lg:backdrop-blur-none lg:bg-transparent lg:py-0">
        <h1 className="text-6xl lg:text-8xl text-[#441E0A] font-luckiest">Hack Canada</h1>
        <p className="text-[#441E0A] text lg:text-2xl mt-2 lg:mt-0 font-rubik">March 6-8, 2025 | In-Person Event</p>
        <div className="mt-4 lg:mt-6 flex flex-col items-center">
          <div className="bg-[#441E0A] text-white px-8 lg:px-10 py-2 lg:py-3 rounded-t-lg lg:rounded-lg hover:bg-[#5C2E0F] transition">
            <a href="" className="font-bold text-lg lg:text-2xl font-rubik">Coming Soon</a>
          </div>
          <div className="bg-[#EC294D] text-white px-8 lg:px-10 py-1 rounded-b-lg text-center flex items-center justify-center">
            <span className="font-semibold text-sm font-rubik">Due Feb 20, 2025!</span>
          </div>
        </div>
      </div>
    </section>
  );
}

