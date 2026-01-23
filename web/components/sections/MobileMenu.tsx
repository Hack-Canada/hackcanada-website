'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Ensure element is rendered with initial state first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsSliding(true);
          // Delay text fade in slightly after slide starts
          setTimeout(() => setIsAnimating(true), 200);
        });
      });
    } else {
      // First fade out the text
      setIsAnimating(false);
      // Then slide up after text fades
      const slideTimer = setTimeout(() => setIsSliding(false), 300);
      // Finally unmount after slide completes
      const unmountTimer = setTimeout(() => setShouldRender(false), 800);
      return () => {
        clearTimeout(slideTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 bg-[#111031] md:hidden z-50 flex flex-col items-center justify-center transition-transform duration-500 ${isSliding ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={onClose}
          className="absolute top-7 right-41 text-white text-3xl font-light hover:opacity-70 transition-opacity"
          aria-label="Close menu"
        >
          ×
        </button>
        <nav className="flex flex-col gap-4 p-4 text-center text-xl text-white">
          <a href="#about" onClick={onClose}>About</a>
          <a href="#venue" onClick={onClose}>Venue</a>
          <a href="#sponsors" onClick={onClose}>Sponsors</a>
          <a href="#faq" onClick={onClose}>FAQ</a>
          <a href="#team" onClick={onClose}>Team</a>
        </nav>
        <div className="border-t border-white w-32 my-4"></div>

        <nav className="flex justify-center items-center gap-6 w-full">
          <a href="https://www.instagram.com/hackcanada/">
            <FontAwesomeIcon icon={faInstagram} className="text-white w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/company/hack-canada/">
            <FontAwesomeIcon icon={faLinkedin} className="text-white w-6 h-6" />
          </a>
        </nav>

      </div>
    </div>
  );
}
