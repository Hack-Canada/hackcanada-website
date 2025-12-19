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
    <div className='m-4 md:mt-10 md:ml-16 md:mr-64 flex border-1 border-white rounded-lg bg-white/75 backdrop-blur gap-8 items-center px-8 py-2 relative'>
      {/* logo */}
      <img src="beaver.png" alt="beaver logo" className="h-16" />
      <div className='hidden md:flex gap-8 justify-between items-center flex-1'>
        <nav className="flex gap-8 text-2xl font-bold">
          {/* page linsk */}
          <a href="#about">About</a>
          <a href="#venue">Venue</a>
          <a href="#sponsors">Sponsors</a>
          <a href="#faq">FAQ</a>
          <a href="#team">Team</a>
        </nav>
        <nav className='flex gap-6'>
          {/* social links */}
          <a href="discordlink"><FontAwesomeIcon icon={faDiscord} className='text-black w-7.5 h-7.5' /></a>
          <a href="https://www.instagram.com/hackcanada/"><FontAwesomeIcon icon={faInstagram} className='text-black w-7.5 h-7.5' /></a>
          <a href="linkedinLink"><FontAwesomeIcon icon={faLinkedin} className='text-black w-7.5 h-7.5' /></a>
          <a href="mailto"><FontAwesomeIcon icon={faEnvelope} className='text-black w-7.5 h-7.5' /></a>
        </nav>
      </div>
      
      {/* Mobile Hamburger Menu */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden ml-auto"
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

