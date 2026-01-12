'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';

interface StatItem {
  number: string;
  label: string;
  cartImage: string;
  position: { top: string; left: string };
}

const stats: StatItem[] = [
  {
    number: '400+',
    label: 'hackers',
    cartImage: '/stat-images/cart1.svg',
    position: { top: '31%', left: '39%' },
  },
  {
    number: '$15K+',
    label: 'in prizes',
    cartImage: '/stat-images/cart2.svg',
    position: { top: '55%', left: '86%' },
  },
  {
    number: '36',
    label: 'Hours of Hacking',
    cartImage: '/stat-images/cart3.svg',
    position: { top: '69%', left: '9%' },
  },
  {
    number: '20+',
    label: 'sponsors',
    cartImage: '/stat-images/cart4.svg',
    position: { top: '112%', left: '37%' },
  },
  {
    number: '85+',
    label: 'projects',
    cartImage: '/stat-images/cart5.svg',
    position: { top: '100%', left: '85%' },
  },
];

export default function Stats() {
  const stars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => {
      const seedX1 = (i * 7919) % 10000 / 10000;
      const seedX2 = (i * 2341) % 10000 / 10000;
      const seedY1 = (i * 6421) % 10000 / 10000;
      const seedY2 = (i * 5879) % 10000 / 10000;
      const seedOpacity = (i * 4201) % 10000 / 10000;
      const seedDelay = (i * 3307) % 10000 / 10000;
      const seedSize = (i * 8147) % 10000 / 10000;
      
      const x = ((seedX1 + Math.sin(seedX2 * Math.PI * 2) * 0.3) * 100) % 100;
      const y = ((seedY1 + Math.cos(seedY2 * Math.PI * 2) * 0.3) * 100) % 100;
      
      let size;
      if (seedSize > 0.92) size = 5;
      else if (seedSize > 0.82) size = 4;
      else if (seedSize > 0.65) size = 3.5;
      else if (seedSize > 0.45) size = 3;
      else if (seedSize > 0.25) size = 2.5;
      else size = 2;
      
      return {
        left: `${x}%`,
        top: `${y}%`,
        opacity: 0.4 + (seedOpacity * 0.6),
        delay: 1.5 + (seedDelay * 4),
        size: size,
      };
    });
  }, []);

  return (
    <section id="stats" className="w-full relative overflow-hidden">
      <div className="relative w-full h-screen bg-gradient-to-b from-[#17153D] via-[#4C40B3] to-[#5346C5]">
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `twinkle ${star.delay}s infinite`,
                boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.9), 0 0 ${star.size * 1.5}px rgba(255, 255, 255, 1)`,
              }}
            />
          ))}
        </div>

        {/* LAPTOP VIEW - hidden on mobile */}
        <div className="hidden md:block relative w-full h-full">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full max-w-7xl mx-auto px-4">
              
              {/* Title text */}
              <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl">
                <svg 
                  viewBox="0 0 1200 200" 
                  className="w-full"
                  style={{ overflow: 'visible' }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <path 
                      id="curve" 
                      d="M 50 150 Q 600 -200 1150 150" 
                      fill="transparent"
                    />
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <text 
                    className="font-bold"
                    style={{ 
                      fontFamily: '"Trebuchet MS", "Arial Rounded MT Bold", Verdana, sans-serif',
                      fill: '#d8b4fe',
                      filter: 'url(#glow)',
                      letterSpacing: '0.02em',
                      fontSize: '85px'
                    }}
                  >
                    <textPath href="#curve" startOffset="50%" textAnchor="middle">
                      Last year we had...
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Ferris wheel */}
              <div className="absolute top-[59%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[75%] max-w-[750px]">
                <Image
                  src="/stat-images/ferris_wheel.svg"
                  alt="Ferris wheel"
                  width={1100}
                  height={1100}
                  className="w-full h-auto drop-shadow-[0_0_35px_rgba(147,197,253,0.5)]"
                  priority
                />
              </div>

              {/* Cart stats */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] max-w-[750px] h-[75vh] max-h-[750px] z-50">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      top: stat.position.top,
                      left: stat.position.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="relative w-52 sm:w-60 md:w-72 lg:w-80">
                      <Image
                        src={stat.cartImage}
                        alt={`${stat.label} stat cart`}
                        width={520}
                        height={520}
                        className="w-full h-auto drop-shadow-[0_0_20px_rgba(196,181,253,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
            
            {/* City skyline */}
            <div className="absolute bottom-0 left-0 right-0 z-0 w-full">
              <Image
                src="/stat-images/city.svg"
                alt="City skyline"
                width={1920}
                height={600}
                className="w-full h-auto object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>

        {/* MOBILE VIEW - hidden on laptop */}
        <div className="block md:hidden relative w-full h-full">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full mx-auto px-2">
              
              {/* Title text - mobile */}
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 z-30 w-full">
                <svg 
                  viewBox="0 0 1200 200" 
                  className="w-full"
                  style={{ overflow: 'visible' }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <path 
                      id="curve-mobile" 
                      d="M 50 150 Q 600 -150 1150 150" 
                      fill="transparent"
                    />
                    <filter id="glow-mobile">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <text 
                    className="font-bold"
                    style={{ 
                      fontFamily: '"Trebuchet MS", "Arial Rounded MT Bold", Verdana, sans-serif',
                      fill: '#d8b4fe',
                      filter: 'url(#glow-mobile)',
                      letterSpacing: '0.02em',
                      fontSize: '110px'
                    }}
                  >
                    <textPath href="#curve-mobile" startOffset="50%" textAnchor="middle">
                      Last year we had...
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Ferris wheel - mobile */}
              <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[110%]">
                <Image
                  src="/stat-images/ferris_wheel.svg"
                  alt="Ferris wheel"
                  width={1100}
                  height={1100}
                  className="w-full h-auto drop-shadow-[0_0_25px_rgba(147,197,253,0.5)]"
                  priority
                />
              </div>

              {/* Cart stats - mobile */}
              <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85vh] z-50">
                {/* Cart 1 - 400+ hackers */}
                <div
                  className="absolute"
                  style={{
                    top: '55%',
                    left: '39%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative w-50">
                    <Image
                      src="/stat-images/cart1.svg"
                      alt="hackers stat cart"
                      width={520}
                      height={520}
                      className="w-full h-auto drop-shadow-[0_0_15px_rgba(196,181,253,0.5)]"
                    />
                  </div>
                </div>

                {/* Cart 2 - $15K+ in prizes */}
                <div
                  className="absolute"
                  style={{
                    top: '70%',
                    left: '95%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative w-50">
                    <Image
                      src="/stat-images/cart2.svg"
                      alt="prizes stat cart"
                      width={520}
                      height={520}
                      className="w-full h-auto drop-shadow-[0_0_15px_rgba(196,181,253,0.5)]"
                    />
                  </div>
                </div>

                {/* Cart 3 - 36 Hours of Hacking */}
                <div
                  className="absolute"
                  style={{
                    top: '75%',
                    left: '8%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative w-50">
                    <Image
                      src="/stat-images/cart3.svg"
                      alt="hours stat cart"
                      width={520}
                      height={520}
                      className="w-full h-auto drop-shadow-[0_0_15px_rgba(196,181,253,0.5)]"
                    />
                  </div>
                </div>

                {/* Cart 4 - 20+ sponsors */}
                <div
                  className="absolute"
                  style={{
                    top: '106%',
                    left: '37%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative w-50">
                    <Image
                      src="/stat-images/cart4.svg"
                      alt="sponsors stat cart"
                      width={520}
                      height={520}
                      className="w-full h-auto drop-shadow-[0_0_15px_rgba(196,181,253,0.5)]"
                    />
                  </div>
                </div>

                {/* Cart 5 - 85+ projects */}
                <div
                  className="absolute"
                  style={{
                    top: '97%',
                    left: '85%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative w-50">
                    <Image
                      src="/stat-images/cart5.svg"
                      alt="projects stat cart"
                      width={520}
                      height={520}
                      className="w-full h-auto drop-shadow-[0_0_15px_rgba(196,181,253,0.5)]"
                    />
                  </div>
                </div>
              </div>

            </div>
            
            {/* City skyline - mobile */}
            <div className="absolute bottom-0 left-0 right-0 z-0 w-full">
              <Image
                src="/stat-images/city.svg"
                alt="City skyline"
                width={1920}
                height={600}
                className="w-full h-auto object-contain object-bottom"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
