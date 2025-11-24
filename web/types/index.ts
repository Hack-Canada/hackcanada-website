/**
 * Shared TypeScript types and interfaces for the HackCanada website
 */

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface Sponsor {
  name: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  logo?: string;
  website?: string;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface StatItem {
  label: string;
  value: string | number;
  description?: string;
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

