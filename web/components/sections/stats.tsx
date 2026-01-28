'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';

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
    <section id="stats" className="w-full relative h-full overflow-hidden">
      <div className="relative w-full h-screen md:h-[120vh] bg-gradient-to-b from-[#17153D] via-[#4C40B3] to-[#5346C5]">
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
              <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl">
                <svg 
                  viewBox="0 0 1200 200" 
                  className="w-full"
                  style={{ overflow: 'visible' }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <path 
                      id="curve" 
                      d="M 50 150 Q 600 -220 1150 150" 
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
                    className=""
                    style={{ 
                      fontFamily: 'var(--font-luckiest-guy), system-ui, sans-serif',
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

              {/* Stats image */}
              <div className="absolute bottom-[-75] left-1/2 -translate-x-1/2 z-30 w-[70%] md:w-[60%] lg:w-[70%] xl:w-[75%] max-w-[750px]">
                <Image
                  src="/statsNew.png"
                  alt="Hack Canada statistics"
                  width={1100}
                  height={1100}
                  className="w-full h-auto drop-shadow-[0_0_35px_rgba(147,197,253,0.5)]"
                  priority
                />
              </div>

            </div>
            
            {/* City skyline */}
            <div className="absolute bottom-0 left-0 right-0 z-10 w-full">
              <Image
                src="/stat-images/city.svg"
                alt="City skyline"
                width={1920}
                height={1080}
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
              <div className="absolute top-[25%] left-1/2 -translate-x-1/2 z-40 w-full">
                <svg 
                  viewBox="0 0 1200 200" 
                  className="w-full"
                  style={{ overflow: 'visible' }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <path 
                      id="curve-mobile" 
                      d="M 50 150 Q 600 -180 1150 150" 
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
                      fontFamily: 'var(--font-luckiest-guy), system-ui, sans-serif',
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

              {/* Stats image - mobile */}
              <div className="absolute bottom-[-30] left-1/2 -translate-x-1/2 z-30 w-[85%] max-w-[600px]">
                <Image
                  src="/statsNew.png"
                  alt="Hack Canada statistics"
                  width={1100}
                  height={1100}
                  className="w-full h-auto drop-shadow-[0_0_25px_rgba(147,197,253,0.5)]"
                  priority
                />
              </div>

            </div>
            
            {/* City skyline - mobile */}
            <div className="absolute bottom-0 left-0 right-0 z-10 w-full">
              <Image
                src="/stat-images/city.svg"
                alt="City skyline"
                width={1920}
                height={1080}
                className="w-full h-auto object-contain object-bottom"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
