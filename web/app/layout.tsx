import type { Metadata } from "next";
import { Baloo_Chettan_2, Lato, Outfit } from "next/font/google";
import { Geist, Geist_Mono, Luckiest_Guy, Rubik } from "next/font/google";
import "./globals.css";
import AbstractBackground from "../components/effects/AbstractBackground";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const balooChettan = Baloo_Chettan_2({
  variable: "--font-baloo-chettan",
  subsets: ["latin"],
  weight: ["400"],
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

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hackcanada.ca"),
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
    canonical: "https://hackcanada.ca",
  },
  openGraph: {
    type: "website",
    url: "https://hackcanada.ca",
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
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
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
    url: "https://hackcanada.ca",
    logo: "https://hackcanada.ca/navbar/hackcanadaLogo.png",
    sameAs: [
      "https://www.instagram.com/hackcanada",
      "https://www.instagram.com/hackathoncanada/",
    ],
  };

  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "HackCanada Hackathon",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: "https://hackcanada.ca",
    description:
      "Canada's premier hackathon event for students and builders across the country.",
    organizer: {
      "@type": "Organization",
      name: "HackCanada",
      url: "https://hackcanada.ca",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${balooChettan.variable} ${lato.variable} ${outfit.variable} ${luckiestGuy.variable} ${rubik.variable} antialiased`}
      >
        <AbstractBackground />
        {/* <a
          id="mlh-trust-badge"
          style={{
            display: "block",
            maxWidth: "100px",
            minWidth: "60px",
            position: "fixed",
            right: "50px",
            top: "0",
            width: "10%",
            zIndex: "10000",
          }}
          href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
          target="_blank"
        >
          <img
            src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
            alt="Major League Hacking 2026 Hackathon Season"
            style={{ width: "100%" }}
          ></img>
        </a> */}
        {children}
        <Script id="ld-json-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLdOrganization)}
        </Script>
        <Script id="ld-json-event" type="application/ld+json" strategy="afterInteractive">
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
