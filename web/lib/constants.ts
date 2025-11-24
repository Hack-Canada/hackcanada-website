/**
 * Shared constants and data for the HackCanada website
 * 
 * This file contains data that might be shared across multiple components.
 * Update these values as needed for your section.
 */

export const SITE_CONFIG = {
  name: 'HackCanada',
  tagline: "Canada's Premier Hackathon",
  email: 'info@hackcanada.ca',
  year: new Date().getFullYear(),
} as const;

export const NAVIGATION_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
] as const;

// Add more constants as needed for your sections

