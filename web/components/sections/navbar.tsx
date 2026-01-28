'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';

/**
 * Navbar Component
 * 
 * This component should include:
 * - Logo/branding
 * - Navigation links
 * - Mobile menu (hamburger menu)
 * - Responsive design
 * 
 * TODO: Implement navigation functionality
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        // Hide navbar when scrolling down
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Use with mlh badge */}
      {/* <div className={`fixed top-2 xl:top-6 left-4 right-32 xl:left-24 md:right-64 z-[100] flex border-1 border-white rounded-lg bg-white/50 backdrop-blur gap-8 items-center px-8 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-[200%]'}`}> */}
      <div
        className={`fixed top-2 xl:top-6 left-1/2 -translate-x-1/2 z-[100]
        w-[calc(100%-2rem)] max-w-[1200px]
        flex items-center gap-8 px-8
        border border-white rounded-lg bg-white/50 backdrop-blur
        transition-transform duration-300
        ${isVisible ? "translate-y-0" : "-translate-y-[200%]"}`}
      >

        {/* logo */}
        <img src="/navbar/hackcanadaLogo.png" alt="Hack Canada Logo" className="h-18 rounded-full p-4" />
        <div className='hidden lg:flex gap-8 justify-between items-center flex-1'>
          <nav className="flex gap-8 text-lg xl:text-2xl font-bold font-rubik">
            {/* page link */}
            <a href="#about" className="transition-all duration-300 hover:scale-110 hover:text-[#441E0A]">About</a>
            {/* TODO: Change this to 2025.hackcanada.org */}
            <a href="#stats" className="transition-all duration-300 hover:scale-110 hover:text-[#441E0A]">2025</a>
            <a href="#sponsors" className="transition-all duration-300 hover:scale-110 hover:text-[#441E0A]">Sponsors</a>
            <a href="#faq" className="transition-all duration-300 hover:scale-110 hover:text-[#441E0A]">FAQ</a>
            <a href="#team" className="transition-all duration-300 hover:scale-110 hover:text-[#441E0A]">Team</a>
          </nav>
          <nav className='flex gap-6'>
            {/* social links */}
            <a href="https://www.instagram.com/hackcanada/"><FontAwesomeIcon icon={faInstagram} className='text-black' style={{ fontSize: 'clamp(20px, 2vw, 32px)' }}/></a>
            <a href="https://www.linkedin.com/company/hack-canada/"><FontAwesomeIcon icon={faLinkedin} className='text-black' style={{ fontSize: 'clamp(20px, 2vw, 32px)' }}/></a>
          </nav>
        </div>
        
        {/* Mobile Hamburger Menu */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden ml-auto"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <div className="w-6 h-0.5 bg-black transition-all"></div>
            <div className="w-6 h-0.5 bg-black transition-all"></div>
            <div className="w-6 h-0.5 bg-black transition-all"></div>
          </div>
        </button>
      </div>
      
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

