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
      <div className={`fixed top-4 xl:top-12 left-4 right-32 xl:left-24 md:right-64 z-50 flex border-1 border-white rounded-lg bg-white/50 backdrop-blur gap-8 items-center px-8 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-[200%]'}`}>
        {/* logo */}
        <img src="/navbar/hackcanadaLogo.png" alt="Hack Canada Logo" className="h-16" />
        <div className='hidden lg:flex gap-8 justify-between items-center flex-1'>
          <nav className="flex gap-8 text-lg xl:text-2xl font-bold">
            {/* page link */}
            <a href="#about">About</a>
            <a href="#venue">Venue</a>
            <a href="#sponsors">Sponsors</a>
            <a href="#faq">FAQ</a>
            <a href="#team">Team</a>
          </nav>
          <nav className='flex gap-6'>
            {/* social links */}
            <a href="https://www.instagram.com/hackcanada/"><FontAwesomeIcon icon={faInstagram} className='text-black' style={{ fontSize: 'clamp(20px, 2vw, 32px)' }}/></a>
            <a href="linkedinLink"><FontAwesomeIcon icon={faLinkedin} className='text-black' style={{ fontSize: 'clamp(20px, 2vw, 32px)' }}/></a>
            <a href="mailto"><FontAwesomeIcon icon={faEnvelope} className='text-black' style={{ fontSize: 'clamp(20px, 2vw, 32px)' }}/></a>
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

