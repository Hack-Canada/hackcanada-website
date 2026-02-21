import type { Metadata } from "next";
import { Lato, Outfit } from "next/font/google";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import AbstractBackground from "../components/effects/AbstractBackground";
import MLHBadge from "../components/MLHBadge";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hackcanada.org"),
  title: {
    default: "HackCanada - Canada's Premier Hackathon",
    template: "%s | HackCanada",
  },
  description:
    "Join Canada's premier hackathon event. Build, innovate, and connect with developers from across the country.",
  keywords: [
    "HackCanada",
    "hackathon",
    "Canada hackathon",
    "student hackathon",
    "coding competition",
    "tech event",
    "software engineering",
    "developer event",
  ],
  applicationName: "HackCanada",
  alternates: {
    canonical: "https://hackcanada.org",
  },
  openGraph: {
    type: "website",
    url: "https://hackcanada.org",
    siteName: "HackCanada",
    title: "HackCanada - Canada's Premier Hackathon",
    description:
      "Join Canada's premier hackathon event. Build, innovate, and connect with developers from across the country.",
    images: [
      {
        url: "/navbar/hackcanadaLogo.png",
        width: 1200,
        height: 630,
        alt: "Hack Canada Logo",
      },
    ],
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "HackCanada - Canada's Premier Hackathon",
    description:
      "Join Canada's premier hackathon event. Build, innovate, and connect with developers from across the country.",
    images: ["/navbar/hackcanadaLogo.png"],
    site: "@hackcanada",
    creator: "@hackathoncanada",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/navbar/hackcanadaLogo.png", type: "image/png" }],
    apple: [
      {
        url: "/navbar/hackcanadaLogo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/navbar/hackcanadaLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HackCanada",
    url: "https://hackcanada.org",
    logo: "https://hackcanada.org/navbar/hackcanadaLogo.png",
    sameAs: [
      "https://www.instagram.com/hackcanada",
      "https://www.instagram.com/hackathoncanada/",
    ],
  };

  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Hack Canada 2026 - In-Person Event",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: "https://hackcanada.org",
    startDate: "2026-03-06",
    endDate: "2026-03-08",
    location: {
      "@type": "Place",
      name: "SPUR Campus - Spur Innovation Center",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2240 University Ave W",
        addressLocality: "Waterloo",
        addressRegion: "ON",
        postalCode: "N2K 0G3",
        addressCountry: "CA",
      },
    },
    description:
      "Canada's premier hackathon event for students and builders across the country.",
    organizer: {
      "@type": "Organization",
      name: "Hack Canada",
      url: "https://hackcanada.org",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lato.variable} ${outfit.variable} ${rubik.variable} antialiased`}
      >
        <AbstractBackground />
        <MLHBadge />
        {children}
        <Script
          id="ld-json-org"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLdOrganization)}
        </Script>
        <Script
          id="ld-json-event"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(jsonLdEvent)}
        </Script>
        <Script
          async
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-0EB9C7F9C0"
        />
        <Script strategy="afterInteractive" id="gtag-script">
          {`
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0EB9C7F9C0');`}
        </Script>
        <Script strategy="afterInteractive" id="clarity-script">
          {`
          (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "v8lm62mhkr");
        `}
        </Script>
      </body>
    </html>
  );
}
