import type { Metadata } from "next";
import { Geist, Geist_Mono, Baloo_Chettan_2, Lato, Outfit } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "HackCanada - Canada's Premier Hackathon",
  description: "Join Canada's premier hackathon event. Build, innovate, and connect with developers from across the country.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${balooChettan.variable} ${lato.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
