'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface SponsorHighlight {
  name: string;
  logo?: string;
  description: string;
  link?: string;
  linkText?: string;
}

interface SponsorBlock {
  name: string;
  logo?: string;
  link?: string;
}

// Sponsor highlights for the carousel
const sponsorHighlights: SponsorHighlight[] = [
  {
    name: 'Meta',
    logo: '/sponsors/meta.png',
    description: "Meta's mission is to give people the power to build community and bring the world closer together. Through our family of apps and services, we're building a different kind of company that connects billions of people around the world, gives them ways to share what matters most to them, and helps bring people closer together. Whether we're creating new products or helping a small business expand its reach, people at Meta are builders at heart. Our global teams are constantly iterating, solving problems, and working together to empower people around the world to build community and connect in meaningful ways. Together, we can help people build stronger communities — we're just getting started.",
    link: 'https://www.meta.com/careers',
    linkText: 'Explore careers at Meta →',
  },
  {
    name: 'Meta',
    logo: '/sponsors/meta.png',
    description: "Meta's mission is to give people the power to build community and bring the world closer together. Through our family of apps and services, we're building a different kind of company that connects billions of people around the world, gives them ways to share what matters most to them, and helps bring people closer together. Whether we're creating new products or helping a small business expand its reach, people at Meta are builders at heart. Our global teams are constantly iterating, solving problems, and working together to empower people around the world to build community and connect in meaningful ways. Together, we can help people build stronger communities — we're just getting started.",
    link: 'https://www.meta.com/careers',
    linkText: 'Explore careers at Meta →',
  },
  {
    name: 'Meta',
    logo: '/sponsors/meta.png',
    description: "Meta's mission is to give people the power to build community and bring the world closer together. Through our family of apps and services, we're building a different kind of company that connects billions of people around the world, gives them ways to share what matters most to them, and helps bring people closer together. Whether we're creating new products or helping a small business expand its reach, people at Meta are builders at heart. Our global teams are constantly iterating, solving problems, and working together to empower people around the world to build community and connect in meaningful ways. Together, we can help people build stronger communities — we're just getting started.",
    link: 'https://www.meta.com/careers',
    linkText: 'Explore careers at Meta →',
  },
];

// Sponsor blocks for the grid
const goldBlock: SponsorBlock = { name: 'Avalanche', logo: '/sponsors/avalanche.png' };
const silverBlocks: SponsorBlock[] = [
  { name: 'Microsoft', logo: '/sponsors/microsoft.png' },
  { name: 'Microsoft', logo: '/sponsors/microsoft.png' },
];
const bronzeBlocks: SponsorBlock[] = [
  { name: 'NordVPN', logo: '/sponsors/nordvpn.png' },
  { name: '1Password', logo: '/sponsors/1password.png' },
  { name: 'Warp', logo: '/sponsors/warp.png' },
];

export default function Sponsors() {
  const [currentHighlight, setCurrentHighlight] = useState(0);

  const nextHighlight = () => {
    setCurrentHighlight((prev) => (prev + 1) % sponsorHighlights.length);
  };

  const prevHighlight = () => {
    setCurrentHighlight((prev) => (prev - 1 + sponsorHighlights.length) % sponsorHighlights.length);
  };

  const goToHighlight = (index: number) => {
    setCurrentHighlight(index);
  };

  return (
    <section 
      id="sponsors" 
      className="w-full relative overflow-hidden"
      style={{ minHeight: '2585px' }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/sponsors/Rectangle%20351.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(179.99deg, rgba(7, 7, 8, 0.4) 0.01%, rgba(67, 30, 61, 0.4) 30.77%, rgba(26, 16, 38, 0.4) 96.62%)',
        }}
      />
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 
            className="mb-6 text-center"
            style={{
              fontFamily: 'var(--font-baloo-chettan)',
              fontSize: '96px',
              lineHeight: '96%',
              fontWeight: 400,
              color: '#DBDAF3',
            }}
          >
            Sponsors
          </h1>
          <p 
            className="text-center max-w-4xl mx-auto"
            style={{
              fontFamily: 'var(--font-lato)',
              fontSize: '35px',
              lineHeight: '60px',
              fontWeight: 500,
              color: '#E7DAE6',
            }}
          >
            A huge thank you to our sponsors for making Hack Canada possible! Your support helps us reach new heights across the tech landscape.
          </p>
        </div>

        {/* Sponsor Highlights Carousel */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">Sponsor Highlights</h2>
          
          <div className="relative max-w-[954.94px] mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentHighlight * 100}%)` }}
              >
                {sponsorHighlights.map((sponsor, index) => (
                  <div
                    key={index}
                    className="min-w-full flex justify-center"
                  >
                    <div 
                      className="relative flex flex-col items-center w-full max-w-[953.54px] mx-auto"
                      style={{
                        width: '953.54px',
                        height: '638.36px',
                        maxWidth: '100%',
                        aspectRatio: '953.54/638.36',
                        background: '#FFFFFF',
                        boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.25)',
                        borderRadius: '20px',
                        transform: 'rotate(-179.87deg)',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div style={{ transform: 'rotate(179.87deg)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                        {sponsor.logo && (
                          <div className="mb-8">
                            <Image
                              src={sponsor.logo}
                              alt={sponsor.name}
                              width={318}
                              height={64}
                              className="object-contain"
                              style={{ 
                                width: '318px',
                                height: '64px',
                                maxWidth: '100%',
                              }}
                            />
                          </div>
                        )}
                        <p 
                          className="text-center mb-8"
                          style={{
                            fontFamily: 'var(--font-lato)',
                            fontWeight: 500,
                            fontSize: '20px',
                            lineHeight: '150%',
                            color: '#282D5C',
                            maxWidth: '708px',
                            width: '100%',
                          }}
                        >
                          {sponsor.description}
                        </p>
                        {sponsor.link && (
                          <a
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: 'var(--font-lato)',
                              fontWeight: 500,
                              fontSize: '20px',
                              lineHeight: '150%',
                              color: '#282D5C',
                              textDecoration: 'underline',
                            }}
                          >
                            {sponsor.linkText || 'Learn more →'}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevHighlight}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-card border border-border rounded-full p-3 shadow-lg hover:bg-muted transition-colors z-10"
              aria-label="Previous sponsor"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextHighlight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-card border border-border rounded-full p-3 shadow-lg hover:bg-muted transition-colors z-10"
              aria-label="Next sponsor"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {sponsorHighlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToHighlight(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentHighlight
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to sponsor ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sponsor Blocks Grid */}
        <div className="max-w-6xl mx-auto px-4">
          {/* Gold - Large Single Block */}
          <div className="flex justify-center mb-8">
            <a
              href={goldBlock.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-full max-w-[954px]"
              style={{
                height: '294px',
                aspectRatio: '954/294',
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  background: '#FFFFFF',
                  boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.25)',
                  borderRadius: '20px',
                  transform: 'rotate(-179.87deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {goldBlock.logo && (
                  <div style={{ transform: 'rotate(179.87deg)' }}>
                    <Image
                      src={goldBlock.logo}
                      alt={goldBlock.name}
                      width={561}
                      height={294}
                      className="object-contain"
                      style={{ 
                        width: '561px',
                        height: '294px',
                        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                      }}
                    />
                  </div>
                )}
              </div>
            </a>
          </div>

          {/* Silver - Two Blocks Side by Side */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            {silverBlocks.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-full md:w-[465px]"
                style={{
                  height: '258px',
                  aspectRatio: '465/258',
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.25)',
                    borderRadius: '20px',
                    transform: 'matrix(-1, 0, 0, -1, 0, 0)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {sponsor.logo && (
                    <div style={{ transform: 'matrix(-1, 0, 0, -1, 0, 0)' }}>
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={294}
                        height={63}
                        className="object-contain"
                        style={{ 
                          width: '294px',
                          height: '63px',
                        }}
                      />
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* Bronze - Three Blocks */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {bronzeBlocks.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-full sm:w-[291px]"
                style={{
                  height: '208px',
                  aspectRatio: '291/208',
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center p-4 transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.25)',
                    borderRadius: '20px',
                    transform: 'matrix(-1, -0.01, 0, -1, 0, 0)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {sponsor.logo && (
                    <div style={{ transform: 'matrix(-1, -0.01, 0, -1, 0, 0)' }}>
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={174}
                        height={161}
                        className="object-contain"
                        style={{ 
                          width: '174px',
                          height: '161px',
                        }}
                      />
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
