"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface SponsorHighlight {
  name: string;
  logo?: string;
  description: string;
  link?: string;
  linkText?: string;
}

interface SponsorBlock {
  name: string;
  logo?: string;
  link?: string;
}

interface Partner {
  name: string;
  logo: string;
  blurb: string;
  team: string[];
  link?: string;
}

// Sponsor highlights for the carousel
const sponsorHighlights: SponsorHighlight[] = [
  {
    name: "Google",
    logo: "/sponsors/google.svg",
    description:
      "A problem isn't truly solved until it's solved for all. Googlers build products that help create opportunities for everyone, whether down the street or across the globe. Bring your insight, imagination and a healthy disregard for the impossible. Bring everything that makes you unique. Together, we can build for everyone.",
    link: "https://www.google.com/about/careers/applications/",
    linkText: "Website →",
  },
  {
    name: "SPUR Innovation Center",
    logo: "/sponsors/Spur.png",
    description:
      "SPUR Innovation/Ventures is building the largest venture studio in Canada, backed by the data and compute infrastructure of the SPUR ecosystem.",
    link: "https://spuric.com/",
    linkText: "Website →",
  },
];

// Sponsor blocks for the grid
const goldBlock: SponsorBlock[] = [
  {
    name: "Google",
    logo: "/sponsors/google.svg",
    link: "https://www.google.com/about/careers/applications/",
  },
  {
    name: "SPUR Innovation Center",
    logo: "/sponsors/Spur.png",
    link: "https://spuric.com/",
  },
  {
    name: "reactiv",
    logo: "/sponsors/reactiv.png",
    link: "https://www.reactiv.ai/",
  }
];
const silverBlocks: SponsorBlock[] = [
  {
    name: "Tailscale",
    logo: "/sponsors/tailscale.png",
    link: "https://tailscale.com/",
  },
  {
    name: "Stan",
    logo: "/sponsors/stan.png",
    link: "https://stan.store/",
  }, {
    name: "cloudinary",
    logo: "/sponsors/cloudinary.png",
    link: "https://cloudinary.com/",
  },
  {
    name: "Backboard",
    logo: "/sponsors/backboard.svg",
    link: "https://www.backboard.io/",
  }
];
const bronzeBlocks: SponsorBlock[] = [
  { name: "fantuan", logo: "/sponsors/fantuan.png" },
  { name: "Warp", logo: "/sponsors/warp.png" },
  { name: "GitHub", logo: "/sponsors/github.png" },
  { name: "pure buttons", logo: "/sponsors/PureButtons.png" },
  { name: "redbull", logo: "/sponsors/redbull.png" },

];

const partners: Partner[] = [
  {
    name: "GDG Laurier",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4cfKyMJNFvwqJ1BbG51ld9i8BbTIqDc4z2A&s",
    blurb: "Google Developer Group Laurier brings together developers and tech enthusiasts at Wilfrid Laurier University to learn, build, and connect.",
    team: ["Abdul Aziz", "Yash Dave", "Khushi Patel", "Akif Rahman"],
    link: "https://gdg.community.dev/gdg-on-campus-wilfrid-laurier-university-waterloo-canada/",
  },
];

interface Judge {
  name: string;
  position: string;
  photo: string;
}

const judges: Judge[] = [
  {
    name: "Jaskirat Singh",
    position: "CEO @ Humonos",
    photo: "/judges/jaskirat-singh.jpg",
  },
  {
    name: "Simerus Mahesh",
    position: "a37; prev. Meta, Sony",
    photo: "/judges/simerus-mahesh.jpg",
  },
  {
    name: "Sammy Lam",
    position: "SWE 2",
    photo: "/judges/sammy-lam.jpg",
  },
  {
    name: "Pravesh Mansharamani",
    position: "Co-Founder @ Totalis",
    photo: "/judges/pravesh-mansharamani.jpg",
  },
  {
    name: "Osher Ahn-Clifford",
    position: "Software Dev Intern @ Wealthsimple",
    photo: "/judges/osher.jpg",
  },
  {
    name: "Michael Clifford",
    position: "Design at Jobber",
    photo: "/judges/michael-clifford.jpg",
  },
  {
    name: "Gaurav Shah",
    position: "Product design @ Cresta",
    photo: "/judges/gaurav-shah.jpeg",
  },
  {
    name: "Neal Panamdanam",
    position: "Lead DevOps Engineer @ HONK",
    photo: "/judges/neal-panamdanam.jpg",
  },
  {
    name: "Eric Liu",
    position: "CTO",
    photo: "/judges/eric-liu.jpg",
  },
  {
    name: "James Liang",
    position: "Business System Analyst",
    photo: "/judges/james-liang.jpg",
  },
  {
    name: "Hendryck Santos",
    position: "Startups @ Google Cloud",
    photo: "/judges/hendryck-santos.jpg",
  },
  {
    name: "Jacqline Geng",
    position: "Senior Financial Engineer",
    photo: "/judges/jacqline-geng.jpg",
  },
  {
    name: "Kaivalya Gandhi",
    position: "Director, CUTC Foundation",
    photo: "/judges/kaivalya-gandhi.jpg",
  },
  {
    name: "Terry Zha",
    position: "Prev SWE Intern @ Roblox/Warp",
    photo: "/judges/terry-zha.jpg",
  },
  {
    name: "William Zeng",
    position: "SWE @ Polymarket",
    photo: "/judges/william-zeng.jpg",
  },
  {
    name: "Lucas Crupi",
    position: "CEO of Loombotic (YC F24)",
    photo: "/judges/lucas-crupi.png",
  },
  {
    name: "Ethan Breit",
    position: "CTO of Loombotic (YC F24)",
    photo: "/judges/ethan-breit.jpg",
  },
  {
    name: "Adam Ghandour",
    position: "VC Analyst @ Access Bridge Ventures",
    photo: "/judges/adam-ghandour.jpg",
  },
];

function SponsorsContent() {
  const [currentHighlight, setCurrentHighlight] = useState(1); // Start at 1 because we duplicate first slide
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Create infinite loop by duplicating slides
  const infiniteSlides = [
    sponsorHighlights[sponsorHighlights.length - 1], // Last slide at beginning
    ...sponsorHighlights,
    sponsorHighlights[0], // First slide at end
  ];

  useEffect(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
    }
  }, [currentHighlight, isTransitioning]);

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentHighlight === 0) {
        // Jump to real last slide (without transition)
        setIsTransitioning(false);
        setCurrentHighlight(sponsorHighlights.length);
      } else if (currentHighlight === infiniteSlides.length - 1) {
        // Jump to real first slide (without transition)
        setIsTransitioning(false);
        setCurrentHighlight(1);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("transitionend", handleTransitionEnd);
      return () =>
        carousel.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [currentHighlight, infiniteSlides.length]);

  const nextHighlight = () => {
    if (currentHighlight < infiniteSlides.length - 1) {
      setCurrentHighlight((prev) => prev + 1);
    }
  };

  const prevHighlight = () => {
    if (currentHighlight > 0) {
      setCurrentHighlight((prev) => prev - 1);
    }
  };

  const goToHighlight = (index: number) => {
    setCurrentHighlight(index + 1); // +1 because of duplicate at start
  };

  return (
    <>
      <style>{`
        @keyframes float-random {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
      <section
        id="sponsors"
        className="w-full relative overflow-visible"
        style={{ minHeight: "clamp(800px, 100vh, 2585px)" }}
      >
        {/* Full Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/sponsors/asdfasdfasdfasdfadsf%201.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Mountains Overlay - Sits on top of background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/sponsors/asdfasfasdfasfasd%201.svg)",
            backgroundSize: "contain",
            backgroundPosition: "bottom center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            zIndex: 1,
            opacity: 0.95,
          }}
        />

        {/* Decorative Floating Background Clouds */}
        <div
          className="absolute pointer-events-none hidden lg:block"
          style={{
            top: "15%",
            left: "5%",
            width: "350px",
            height: "200px",
            backgroundImage: "url(/sponsors/cloud.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            opacity: 0.4,
            filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.2))",
            zIndex: 5,
            animation: "float-random 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none hidden lg:block"
          style={{
            top: "25%",
            right: "2%",
            width: "450px",
            height: "250px",
            backgroundImage: "url(/sponsors/cloud.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            opacity: 0.4,
            filter: "drop-shadow(0px 12px 24px rgba(0, 0, 0, 0.2))",
            zIndex: 5,
            animation: "float-random 11s ease-in-out infinite",
            animationDelay: "-2s",
          }}
        />
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10 pt-20 md:pt-32">
          {/* Header */}
          <div
            className="mx-auto mb-16"
            style={{ maxWidth: "1129px", width: "100%" }}
          >
            <h1
              className="mb-6 text-center text-5xl md:text-8xl mt-20 font-luckiest"
              style={{
                color: "#DBDAF3",
              }}
            >
              Sponsors
            </h1>
            <p
              className="text-center mx-auto text-md sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-rubik"
              style={{
                fontSize: "clamp(18px, 3vw, 35px)",
                lineHeight: "clamp(28px, 4vw, 60px)",
                fontWeight: 400,
                color: "#E7DAE6",
                maxWidth: "1129px",
                width: "100%",
              }}
            >
              A huge thank you to our sponsors for making Hack Canada possible!
              Your support helps us reach new heights across the tech landscape.
            </p>
          </div>

          {/* Sponsor Highlights Carousel */}
          <div className="mb-20 hidden sm:block">
            <h2
              className="mb-8 text-center mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 font-luckiest"
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(20px, 3vw, 32px)",
                lineHeight: "clamp(32px, 4vw, 60px)",
                color: "#FBDCDC",
                maxWidth: "1129px",
                width: "100%",
              }}
            >
              Sponsor Highlights
            </h2>

            <div className="relative max-w-[954.94px] mx-auto px-4">
              {/* Carousel Container */}
              <div
                className="relative overflow-hidden"
                style={{ minHeight: "clamp(400px, 50vw, 500px)" }}
              >
                <div
                  ref={carouselRef}
                  className="flex"
                  style={{
                    transform: `translateX(-${currentHighlight * 100}%)`,
                    transition: isTransitioning
                      ? "transform 0.5s ease-in-out"
                      : "none",
                  }}
                >
                  {infiniteSlides.map((sponsor, index) => (
                    <div
                      key={index}
                      className="min-w-full flex justify-center px-4"
                    >
                      <div
                        className="relative flex flex-col items-center w-full max-w-[953.54px] mx-auto"
                        style={{
                          width: "953.54px",
                          height: "500px",
                          maxWidth: "100%",
                          aspectRatio: "953.54/638.36",
                          background: "#FFFFFF",
                          borderRadius: "20px",
                          zIndex: index === currentHighlight ? 10 : 1,
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "clamp(20px, 4vw, 40px)",
                          }}
                        >
                          {sponsor.logo && (
                            <div className="mb-8">
                              <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                width={400}
                                height={64}
                                className="object-contain"
                                style={{
                                  width: "clamp(200px, 30vw, 400px)",
                                  height: "auto",
                                  maxWidth: "100%",
                                }}
                              />
                            </div>
                          )}
                          <p
                            className="text-center mb-8 text-sm sm:text-base md:text-lg lg:text-xl px-4 font-rubik"
                            style={{
                              fontWeight: 500,
                              fontSize: "clamp(14px, 2vw, 20px)",
                              lineHeight: "150%",
                              color: "#282D5C",
                              maxWidth: "708px",
                              width: "100%",
                            }}
                          >
                            {sponsor.description}
                          </p>
                          {sponsor.link && (
                            <a
                              href={sponsor.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm sm:text-base md:text-lg lg:text-xl font-rubik"
                              style={{
                                fontWeight: 500,
                                fontSize: "clamp(14px, 2vw, 20px)",
                                lineHeight: "150%",
                                color: "#282D5C",
                                textDecoration: "underline",
                              }}
                            >
                              {sponsor.linkText || "Learn more →"}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevHighlight}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white border-2 border-gray-300 rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-20"
                aria-label="Previous sponsor"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#D1D5DB" }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextHighlight}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white border-2 border-gray-300 rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-20"
                aria-label="Next sponsor"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#D1D5DB" }}
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-8 z-20 relative">
                {sponsorHighlights.map((_, index) => {
                  // Map the infinite carousel index to the real index for pagination
                  const realIndex =
                    currentHighlight === 0
                      ? sponsorHighlights.length - 1
                      : currentHighlight === infiniteSlides.length - 1
                        ? 0
                        : currentHighlight - 1;
                  return (
                    <button
                      key={index}
                      onClick={() => goToHighlight(index)}
                      className={`rounded-full transition-all ${index === realIndex
                        ? "bg-white w-8 h-2"
                        : "bg-white/50 w-2 h-2 hover:bg-white/75"
                        }`}
                      style={{
                        backgroundColor:
                          index === realIndex
                            ? "#FFFFFF"
                            : "rgba(255, 255, 255, 0.5)",
                      }}
                      aria-label={`Go to sponsor ${index + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sponsor Blocks Grid */}
          <div className="max-w-6xl mx-auto px-4">
            {/* Gold - Large Single Block */}
            <div>
              {goldBlock.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex justify-center mb-4 sm:mb-5 md:mb-6"
                >
                  <a
                    href={sponsor.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center my-5 w-full max-w-[954px]"
                    style={{
                      height: "clamp(120px, 19vw, 230px)",
                    }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "clamp(12px, 2vw, 20px)",
                      }}
                    >
                      {sponsor.logo && (
                        <div>
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            width={561}
                            height={294}
                            className="object-contain my-2"
                            style={{
                              width: "clamp(320px, 50vw, 560px)",
                              height: "auto",
                              maxWidth: "100%",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Silver - Two Blocks Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6 max-w-[954px] mx-auto">
              {silverBlocks.map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center w-full py-2"
                  style={{
                    height: "clamp(100px, 14vw, 175px)",
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "clamp(12px, 2vw, 20px)",
                    }}
                  >
                    {sponsor.logo && (
                      <div>
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          width={294}
                          height={63}
                          className="object-contain"
                          style={{
                            width: "clamp(180px, 32vw, 320px)",
                            height: "auto",
                            maxWidth: "100%",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Bronze - Three Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 justify-center gap-4 sm:gap-5 md:gap-6 max-w-[954px] mx-auto">
              {bronzeBlocks.map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center w-full"
                  style={{
                    height: "clamp(70px, 12vw, 140px)",
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center p-1.5 sm:p-3 md:p-4 transition-all duration-300 hover:scale-105"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "clamp(10px, 2vw, 20px)",
                    }}
                  >
                    {sponsor.logo && (
                      <div>
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          width={174}
                          height={161}
                          className="object-contain"
                          style={{
                            width: "clamp(90px, 20vw, 200px)",
                            height: "auto",
                            maxWidth: "100%",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Judges */}
            <div className="mt-20 mb-4 max-w-[950px] mx-auto px-2">
              <h2
                className="mb-10 text-center px-4 font-luckiest"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(30px, 4.2vw, 52px)",
                  lineHeight: "clamp(44px, 5vw, 68px)",
                  color: "#4a4a4a",
                }}
              >
                Our Judges
              </h2>
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-2 sm:gap-x-6 gap-y-0 sm:gap-y-8 max-w-[1000px] mx-auto justify-items-center">
                {judges.map((judge, index) => {
                  const seed = index + 1;

                  // Randomly push to left, right, up, or down (reduced magnitude)
                  let tx = ((seed * 456) % 50) - 25; // -25 to 25 px
                  let ty = ((seed * 789) % 50) - 25; // -25 to 25 px

                  const zIndex = (seed * 345) % 30;
                  const duration = 5 + (index % 4) * 1.2;
                  const delay = -(index % 5) * 0.8;

                  // Move Hendryck a bit more up
                  if (judge.name === "Hendryck Santos") {
                    ty -= 30;
                  }

                  return (
                    <div
                      key={index}
                      className="w-full max-w-[320px] relative flex flex-col items-center justify-center my-0 sm:-my-14 shrink-0 transition-transform duration-500 hover:scale-110 hover:z-[100]"
                      style={{
                        minHeight: "clamp(200px, 50vw, 320px)",
                        transform: `translate(${tx}px, ${ty}px)`,
                        zIndex: zIndex,
                      }}
                    >
                      <div
                        className="w-full h-full relative flex flex-col items-center justify-center"
                        style={{
                          animation: `float-random ${duration}s ease-in-out infinite`,
                          animationDelay: `${delay}s`,
                        }}
                      >
                        {/* Cloud Background */}
                        <div
                          className="absolute inset-0 z-0 scale-[1.2] sm:scale-[1.35] 2xl:scale-[1.6]"
                          style={{
                            backgroundImage: "url(/sponsors/cloud.png)",
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))",
                          }}
                        />
                        {/* Content */}
                        <div className="relative z-10 flex flex-row items-center text-left px-2 sm:px-4 gap-2 sm:gap-4 scale-85 sm:scale-85 2xl:scale-[0.7] translate-y-3 sm:translate-y-5">
                          <div className="w-[65px] h-[65px] sm:w-[85px] sm:h-[85px] 2xl:w-[75px] 2xl:h-[75px] rounded-full overflow-hidden shrink-0 border-[3px] sm:border-4 border-white shadow-md bg-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={judge.photo}
                              alt={judge.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <h3
                              className="font-luckiest text-xl sm:text-2xl 2xl:text-xl mb-1 leading-tight truncate"
                              style={{ color: "#282D5C" }}
                              title={judge.name}
                            >
                              {judge.name}
                            </h3>
                            <p
                              className="font-rubik text-xs sm:text-sm 2xl:text-[10px] font-medium leading-snug"
                              style={{ color: "#282D5C" }}
                            >
                              {judge.position}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Partners */}
            <div className="mt-20 mb-4 max-w-[1100px] mx-auto px-2 translate-y-8">
              <h2
                className="mb-10 text-center px-4 font-luckiest"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(30px, 4.2vw, 52px)",
                  lineHeight: "clamp(44px, 5vw, 68px)",
                  color: "#4a4a4a",
                }}
              >
                Our Partners
              </h2>
              <div className="flex flex-col gap-8">
                {partners.map((partner, index) => {
                  const card = (
                    <div
                      className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 sm:p-10 md:p-12 font-rubik"
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "clamp(14px, 2vw, 24px)",
                        color: "#282D5C",
                        minHeight: "clamp(200px, 28vw, 280px)",
                      }}
                    >
                      <div className="shrink-0 flex justify-center">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="object-contain"
                          style={{
                            width: "clamp(140px, 22vw, 220px)",
                            height: "auto",
                          }}
                        />
                      </div>
                      <div className="flex-1 text-center sm:text-left min-w-0">
                        <h3
                          className="font-luckiest mb-3"
                          style={{
                            color: "#282D5C",
                            fontSize: "clamp(26px, 3.2vw, 40px)",
                          }}
                        >
                          {partner.name}
                        </h3>
                        <p
                          className="mb-5"
                          style={{
                            fontWeight: 500,
                            lineHeight: "150%",
                            color: "#282D5C",
                            fontSize: "clamp(19px, 2.4vw, 26px)",
                          }}
                        >
                          {partner.blurb}
                        </p>
                        <div
                          className="pt-3 border-t border-gray-200 text-lg"
                        >
                          <span
                            className="font-luckiest opacity-90"
                          >
                            Huge thank you to {" "}
                          </span>
                          <span >
                            {partner.team.length > 0
                              ? partner.team.join(", ")
                              : "—"}
                            !
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                  return partner.link ? (
                    <a
                      key={index}
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full transition-all duration-300 hover:scale-[1.01]"
                    >
                      {card}
                    </a>
                  ) : (
                    <div key={index} className="block w-full">
                      {card}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute left-0 right-0 z-20"
          style={{
            bottom: 0,
            height: "clamp(120px, 16vw, 200px)",
            transform: "translateY(50%)",
            backgroundImage: "url('/faq-qa.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-0 right-0 z-20"
          style={{
            bottom: 0,
            height: "clamp(160px, 20vw, 260px)",
            transform: "translateY(calc(50% + clamp(120px, 16vw, 200px)))",
            backgroundImage: "url('/additional.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden="true"
        />
      </section>
    </>
  );
}

interface FAQItem {
  question: string;
  answer?: string;
}

const leftColumnItems: FAQItem[] = [
  {
    question: "What's a hackathon?",
    answer:
      'A hackathon is a weekend-long competition where "hackers" build projects in teams to present and compete for prizes. Competition isn\'t the only part however, as hackers are also given the opportunity to network, participate in awesome workshops, and eat free food!',
  },
  {
    question: "What is Hack Canada?",
    answer: "Hack Canada is built around tackling real Canadian challenges. This year, we're extending that mission beyond the weekend with a 30-day building period—giving teams 1 on 1 access to sponsors and funding to transform prototypes into lasting side projects or startups."
  },
  {
    question: "How much does it cost?",
    answer:
      "Hack Canada is 100% free to attend. All food, drinks, and overnight accommodations are provided for free to all hackers. Workshops, snacks, and all other activities during Hack Canada are also all completely free and funded by our generous sponsors.",
  },
  {
    question: "Where and when is Hack Canada?",
    answer:
      "Hack Canada will be held overnight at SPUR office, 2240 University Av east, from March 6th to 8th.",
  },
  {
    question: "What is the schedule like?",
    answer:
      'Hack Canada runs like a normal hackathon weekend, but we\'ve added a 30 day building period afterwards. Teams get 1-on-1 access to sponsors and funding to turn their prototypes into real projects or startups. At the end, there\'s a demo day where you present to sponsors and VCs.',
  },
  {
    question: "Who is eligible to participate?",
    answer:
      "High schoolers, undergrad students, and recent graduates are all eligible.",
  },
];

const rightColumnItems: FAQItem[] = [
  {
    question: "What size are the teams?",
    answer: "Teams can be up to four hackers, and soloing is allowed.",
  },
  {
    question: "What can we make?",
    answer:
      "You are allowed to make any software or hardware project as long as you start within the hacking period.",
  },
  {
    question: "When are application results released?",
    answer:
      "Results will be released within 2 weeks of the application due date.",
  },
  {
    question: "What do you get from attending?",
    answer:
      "You will be given your own custom bag of Hack Canada swag, the opportunity to network with industry professionals during our networking panel and during the event, and access to numerous fun activities and workshops to assist you on your tech journey and provide you with a fun experience!",
  },
  {
    question: "What do I need to participate?",
    answer:
      "Bring a laptop, charger, and an excited spirit for technology and building! If you are sleeping overnight, make sure to also bring a sleeping bag, toiletries (toothbrush, toothpaste, etc.), an extra pair of clothes, and other sleeping gear (pillow, blanket, etc.)",
  },
];

function FaqContent() {
  return (
    <section
      id="faq"
      className="w-full relative overflow-hidden"
      style={{
        minHeight: "clamp(800px, 120vh, 1600px)",
        paddingTop: "clamp(120px, 18vh, 240px)",
      }}
    >
      {/* Full Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/faq/full-bg.webp"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          quality={75}
          sizes="100vw"
        />
      </div>

      {/* FAQ Header Text Group */}
      <div
        className="absolute z-10"
        style={{
          top: "clamp(160px, 18vh, 280px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(20px, 3vh, 40px)",
        }}
      >
        {/* Let's shed some light on... */}
        <div
          className="font-rubik"
          style={{
            transform: "rotate(-9.46deg)",
            width: "clamp(200px, 85vw, 350px)",
            height: "clamp(22px, 3.5vw, 29px)",
            maxWidth: "90vw",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "clamp(20px, 3.5vw, 30px)",
            lineHeight: "96%",
            letterSpacing: "0%",
            textAlign: "center",
            color: "#CCC7D0",
            opacity: 1,
            borderRadius: 0,
            whiteSpace: "nowrap",
            overflow: "visible",
            WebkitTextStroke: "1px rgba(204, 199, 208, 0.5)",
            textShadow:
              "2px 2px 0px rgba(0, 0, 0, 0.4), " +
              "3px 3px 4px rgba(0, 0, 0, 0.3), " +
              "0px 0px 8px rgba(204, 199, 208, 0.2)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          Let&apos;s shed some light on...
        </div>

        {/* Frequently Asked Questions */}
        <div
          className="font-luckiest"
          style={{
            transform: "rotate(-9.46deg)",
            width: "clamp(280px, 90vw, 643px)",
            height: "auto",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "clamp(32px, 5.5vw, 50px)",
            lineHeight: "96%",
            textAlign: "center",
            color: "#FFDFF7",
            overflow: "visible",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Mobile: two lines */}
          <span className="sm:hidden text-center font-luckiest">
            Frequently <br />
            Asked Questions
          </span>

          {/* Desktop: one line */}
          <span className="hidden sm:inline whitespace-nowrap font-luckiest">
            Frequently Asked Questions
          </span>
        </div>
      </div>

      <div className="container mx-auto px-3 pb-12 sm:px-4 md:px-6 lg:px-8 pt-[180px] sm:pt-[220px] sm:pb-8 md:pt-[260px] lg:pt-[300px] lg:pb-16 relative z-10">
        {/* Two Column Layout */}
        <div
          className="max-w-full sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] mx-auto flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-4 justify-center pt-40 sm:pt-0
"
        >
          {/* Left Column */}
          <Accordion
            type="multiple"
            className="w-full md:w-[clamp(260px,42vw,420px)] lg:w-[420px] max-w-full flex flex-col gap-1.5 sm:gap-2"
          >
            {leftColumnItems.map((item, index) => {
              const value = `left-${index}`;

              return (
                <AccordionItem
                  key={index}
                  value={value}
                  className="border-none relative overflow-hidden border border-[#A2A2A2] bg-linear-to-r from-[#5D2F47] to-[#2A222E]"
                  style={{
                    borderRadius: "clamp(6px, 1.2vw, 8px)",
                  }}
                >
                  <AccordionTrigger
                    className={cn(
                      "relative w-full transition-all duration-300",
                      "hover:no-underline",
                      "[&>svg]:hidden",
                      "flex items-start justify-between"
                    )}
                    style={{
                      padding:
                        "clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px)",
                      boxSizing: "border-box",
                      minHeight: "clamp(40px, 7vw, 44px)",
                    }}
                  >
                    <span
                      className="text-white flex-1 pr-2 sm:pr-3"
                      style={{
                        fontFamily: "var(--font-rubik)",
                        fontWeight: 400,
                        fontSize: "clamp(12px, 2.2vw, 14px)",
                        lineHeight: "96%",
                      }}
                    >
                      {item.question}
                    </span>
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: "clamp(12px, 2.5vw, 14px)",
                        height: "clamp(12px, 2.5vw, 14px)",
                      }}
                    >
                      <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-2 data-[state=open]:hidden" />
                      <X
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-2 hidden data-[state=open]:block"
                        style={{ transform: "rotate(45deg)" }}
                      />
                    </div>
                  </AccordionTrigger>
                  {item.answer && (
                    <AccordionContent
                      className="text-white"
                      style={{
                        padding: `0 clamp(12px, 2.5vw, 16px) clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px)`,
                        fontFamily: "var(--font-rubik)",
                        fontWeight: 400,
                        fontSize: "clamp(11px, 2vw, 13px)",
                        lineHeight: "117%",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {item.answer}
                    </AccordionContent>
                  )}
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Right Column */}
          <Accordion
            type="multiple"
            className="w-full md:w-[clamp(260px,42vw,420px)] lg:w-[420px] max-w-full flex flex-col gap-1.5 sm:gap-2"
          >
            {rightColumnItems.map((item, index) => {
              const value = `right-${index}`;

              return (
                <AccordionItem
                  key={index}
                  value={value}
                  className="border-none relative overflow-hidden border border-[#A2A2A2] bg-linear-to-r from-[#5D2F47] to-[#2A222E]"
                  style={{
                    borderRadius: "clamp(6px, 1.2vw, 8px)",
                  }}
                >
                  <AccordionTrigger
                    className={cn(
                      "relative w-full transition-all duration-300",
                      "hover:no-underline",
                      "[&>svg]:hidden",
                      "flex items-start justify-between"
                    )}
                    style={{
                      padding:
                        "clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px)",
                      boxSizing: "border-box",
                      minHeight: "clamp(40px, 7vw, 44px)",
                    }}
                  >
                    <span
                      className="text-white flex-1 pr-2 sm:pr-3"
                      style={{
                        fontFamily: "var(--font-rubik)",
                        fontWeight: 400,
                        fontSize: "clamp(12px, 2.2vw, 14px)",
                        lineHeight: "96%",
                      }}
                    >
                      {item.question}
                    </span>
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: "clamp(12px, 2.5vw, 14px)",
                        height: "clamp(12px, 2.5vw, 14px)",
                      }}
                    >
                      <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-2 data-[state=open]:hidden" />
                      <X
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-2 hidden data-[state=open]:block"
                        style={{ transform: "rotate(45deg)" }}
                      />
                    </div>
                  </AccordionTrigger>
                  {item.answer && (
                    <AccordionContent
                      className="text-white"
                      style={{
                        padding: `0 clamp(12px, 2.5vw, 16px) clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px)`,
                        fontFamily: "var(--font-rubik)",
                        fontWeight: 400,
                        fontSize: "clamp(11px, 2vw, 13px)",
                        lineHeight: "117%",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {item.answer}
                    </AccordionContent>
                  )}
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default function FaqSponsors() {
  return (
    <>
      <SponsorsContent />
      <FaqContent />
    </>
  );
}
