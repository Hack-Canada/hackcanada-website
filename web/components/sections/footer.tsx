import React from 'react';

/**
 * Footer Component
 * 
 * This component should include:
 * - Social media links
 * - Copyright information
 * - Additional navigation links
 * - Contact information
 * 
 * TODO: Add social media icons and links
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HackCanada</h3>
            <p className="text-muted-foreground text-sm">
              Canada's premier hackathon event
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#sponsors" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sponsors
                </a>
              </li>
              <li>
                <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Email: info@hackcanada.ca
            </p>
            <div className="flex gap-4 mt-4">
              {/* TODO: Add social media icons */}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HackCanada. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

