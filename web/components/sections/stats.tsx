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
    position: { top: '33%', left: '39%' },
  },
  {
    number: '$15K+',
    label: 'in prizes',
    cartImage: '/stat-images/cart2.svg',
    position: { top: '48%', left: '83%' },
  },
  {
    number: '36',
    label: 'Hours of Hacking',
    cartImage: '/stat-images/cart3.svg',
    position: { top: '63%', left: '12%' },
  },
  {
    number: '20+',
    label: 'sponsors',
    cartImage: '/stat-images/cart4.svg',
    position: { top: '102%', left: '37%' },
  },
  {
    number: '85+',
    label: 'projects',
    cartImage: '/stat-images/cart5.svg',
    position: { top: '85%', left: '85%' },
  },
];

// Format percentage with consistent precision to avoid hydration mismatches
const formatPercent = (val: number): string => {
  const rounded = Math.round(val * 10000) / 10000;
  return `${rounded}%`;
};

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
      
      // Round to 4 decimal places to ensure server/client consistency
      const x = Math.round(((seedX1 + Math.sin(seedX2 * Math.PI * 2) * 0.3) * 100) % 100 * 10000) / 10000;
      const y = Math.round(((seedY1 + Math.cos(seedY2 * Math.PI * 2) * 0.3) * 100) % 100 * 10000) / 10000;
      
      let size;
      if (seedSize > 0.92) size = 5;
      else if (seedSize > 0.82) size = 4;
      else if (seedSize > 0.65) size = 3.5;
      else if (seedSize > 0.45) size = 3;
      else if (seedSize > 0.25) size = 2.5;
      else size = 2;
      
      // Round opacity and delay to ensure consistency
      const opacity = Math.round((0.4 + (seedOpacity * 0.6)) * 100000) / 100000;
      const delay = Math.round((1.5 + (seedDelay * 4)) * 10000) / 10000;
      
      return {
        left: formatPercent(x),
        top: formatPercent(y),
        opacity: opacity,
        delay: delay,
        size: size,
      };
    });
  }, []);

  return (
    <section id="stats" className="w-full relative overflow-hidden">
      <div className="relative w-full min-h-screen bg-gradient-to-b from-[#1a1a3e] via-[#2d1b4e] to-[#1a1a3e]">
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

        <div className="relative w-full min-h-screen flex items-center justify-center py-8">
          <div className="relative w-full max-w-[1100px] aspect-[0.93]">
            

            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-30 w-full px-4">
              <svg 
                viewBox="0 0 1200 200" 
                className="w-full max-w-6xl mx-auto"
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
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
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

            <div className="absolute top-[-22%] left-1/2 -translate-x-1/2 z-20 w-[140%]">
              <Image
                src="/stat-images/ferris_wheel.svg"
                alt="Ferris wheel"
                width={1100}
                height={1100}
                className="w-full h-auto drop-shadow-[0_0_35px_rgba(147,197,253,0.5)]"
                priority
              />
            </div>

            {stats.map((stat, index) => (
              <div
                key={index}
                className="absolute z-30"
                style={{
                  top: stat.position.top,
                  left: stat.position.left,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[26rem]">
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
          
          <div className="absolute bottom-0 left-0 right-0 z-10 h-[100vh]">
            <Image
              src="/stat-images/city.svg"
              alt="City skyline"
              width={1920}
              height={600}
              className="w-full h-full object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
