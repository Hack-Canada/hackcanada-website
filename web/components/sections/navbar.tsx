'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

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

  return (
    <div className='fixed top-4 xl:top-12 left-4 right-64 xl:left-24 xl:right-64 z-50 flex border-1 border-white rounded-lg bg-white/50 backdrop-blur gap-8 items-center px-8 '>
      {/* logo */}
      <img src="beaver.png" alt="beaver logo" className="h-16" />
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
          <a href="discordlink"><FontAwesomeIcon icon={faDiscord} className='text-black' style={{ fontSize: 'clamp(20px, 2vw, 32px)' }}/></a>
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

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/75 backdrop-blur rounded-lg md:hidden z-50 border border-white">
          <nav className="flex flex-col gap-4 p-4">
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#venue" onClick={() => setIsMenuOpen(false)}>Venue</a>
            <a href="#sponsors" onClick={() => setIsMenuOpen(false)}>Sponsors</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <a href="#team" onClick={() => setIsMenuOpen(false)}>Team</a>
          </nav>
          <div className="border-t border-white p-4">
            <nav className='flex gap-4'>
              <a href="discordlink"><FontAwesomeIcon icon={faDiscord} className='text-black w-5 h-5' /></a>
              <a href="https://www.instagram.com/hackcanada/"><FontAwesomeIcon icon={faInstagram} className='text-black w-5 h-5' /></a>
              <a href="linkedinLink"><FontAwesomeIcon icon={faLinkedin} className='text-black w-5 h-5' /></a>
              <a href="mailto"><FontAwesomeIcon icon={faEnvelope} className='text-black w-5 h-5' /></a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

