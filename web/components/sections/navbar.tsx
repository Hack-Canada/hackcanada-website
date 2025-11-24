import React from 'react';

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
  return (
    <nav className="w-full border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">
            HackCanada
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#sponsors" className="hover:text-primary transition-colors">
              Sponsors
            </a>
            <a href="#team" className="hover:text-primary transition-colors">
              Team
            </a>
            <a href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </a>
          </div>
          <button className="md:hidden">
            {/* Mobile menu button */}
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-foreground"></div>
              <div className="w-6 h-0.5 bg-foreground"></div>
              <div className="w-6 h-0.5 bg-foreground"></div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

