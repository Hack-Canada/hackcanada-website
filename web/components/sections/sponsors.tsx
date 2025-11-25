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
    name: 'Microsoft',
    logo: '/sponsors/microsoft.png',
    description: 'Microsoft\'s mission is to empower every person and every organization on the planet to achieve more. We build products and services that help people and businesses realize their full potential.',
    link: 'https://careers.microsoft.com',
    linkText: 'Explore careers at Microsoft →',
  },
  {
    name: 'Near',
    logo: '/sponsors/near.png',
    description: 'Near Protocol is building the infrastructure to power the next generation of decentralized applications and services.',
    link: 'https://near.org',
    linkText: 'Learn more about Near →',
  },
];

// Sponsor blocks for the grid
const avalancheBlock: SponsorBlock = { name: 'Avalanche', logo: '/sponsors/avalanche.png' };
const microsoftBlocks: SponsorBlock[] = [
  { name: 'Microsoft', logo: '/sponsors/microsoft.png' },
  { name: 'Microsoft', logo: '/sponsors/microsoft.png' },
];
const bottomBlocks: SponsorBlock[] = [
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
          
          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentHighlight * 100}%)` }}
              >
                {sponsorHighlights.map((sponsor, index) => (
                  <div
                    key={index}
                    className="min-w-full px-4"
                  >
                    <div className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-lg">
                      <div className="flex items-center gap-4 mb-6">
                        {sponsor.logo ? (
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                            <span className="text-2xl font-bold text-muted-foreground">
                              {sponsor.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <h3 className="text-3xl font-bold">{sponsor.name}</h3>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {sponsor.description}
                      </p>
                      {sponsor.link && (
                        <a
                          href={sponsor.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-2 font-medium"
                        >
                          {sponsor.linkText || 'Learn more →'}
                        </a>
                      )}
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
          {/* Avalanche - Large Single Block */}
          <div className="flex justify-center mb-8">
            <a
              href={avalancheBlock.link || '#'}
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
                {avalancheBlock.logo && (
                  <div style={{ transform: 'rotate(179.87deg)' }}>
                    <Image
                      src={avalancheBlock.logo}
                      alt={avalancheBlock.name}
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

          {/* Microsoft - Two Blocks Side by Side */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            {microsoftBlocks.map((sponsor, index) => (
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
                        width={200}
                        height={200}
                        className="object-contain"
                        style={{ maxWidth: '80%', maxHeight: '80%', width: 'auto', height: 'auto' }}
                      />
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* Bottom Row - Three Blocks */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {bottomBlocks.map((sponsor, index) => (
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
                        width={237}
                        height={161}
                        className="object-contain"
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '100%', 
                          width: 'auto', 
                          height: 'auto',
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
