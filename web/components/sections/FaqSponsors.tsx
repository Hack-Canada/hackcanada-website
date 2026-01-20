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

// Sponsor highlights for the carousel
const sponsorHighlights: SponsorHighlight[] = [
  {
    name: "Meta",
    logo: "/sponsors/meta.png",
    description:
      "Meta's mission is to give people the power to build community and bring the world closer together. Through our family of apps and services, we're building a different kind of company that connects billions of people around the world, gives them ways to share what matters most to them, and helps bring people closer together. Whether we're creating new products or helping a small business expand its reach, people at Meta are builders at heart. Our global teams are constantly iterating, solving problems, and working together to empower people around the world to build community and connect in meaningful ways. Together, we can help people build stronger communities — we're just getting started.",
    link: "https://www.meta.com/careers",
    linkText: "Explore careers at Meta →",
  },
  {
    name: "Meta",
    logo: "/sponsors/meta.png",
    description:
      "Meta's mission is to give people the power to build community and bring the world closer together. Through our family of apps and services, we're building a different kind of company that connects billions of people around the world, gives them ways to share what matters most to them, and helps bring people closer together. Whether we're creating new products or helping a small business expand its reach, people at Meta are builders at heart. Our global teams are constantly iterating, solving problems, and working together to empower people around the world to build community and connect in meaningful ways. Together, we can help people build stronger communities — we're just getting started.",
    link: "https://www.meta.com/careers",
    linkText: "Explore careers at Meta →",
  },
  {
    name: "Meta",
    logo: "/sponsors/meta.png",
    description:
      "Meta's mission is to give people the power to build community and bring the world closer together. Through our family of apps and services, we're building a different kind of company that connects billions of people around the world, gives them ways to share what matters most to them, and helps bring people closer together. Whether we're creating new products or helping a small business expand its reach, people at Meta are builders at heart. Our global teams are constantly iterating, solving problems, and working together to empower people around the world to build community and connect in meaningful ways. Together, we can help people build stronger communities — we're just getting started.",
    link: "https://www.meta.com/careers",
    linkText: "Explore careers at Meta →",
  },
];

// Sponsor blocks for the grid
const goldBlock: SponsorBlock = {
  name: "Avalanche",
  logo: "/sponsors/avalanche.png",
};
const silverBlocks: SponsorBlock[] = [
  { name: "Microsoft", logo: "/sponsors/microsoft.png" },
  { name: "Microsoft", logo: "/sponsors/microsoft.png" },
];
const bronzeBlocks: SponsorBlock[] = [
  { name: "NordVPN", logo: "/sponsors/nordvpn.png" },
  { name: "1Password", logo: "/sponsors/1password.png" },
  { name: "Warp", logo: "/sponsors/warp.png" },
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
  }, [currentHighlight]);

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
  }, [currentHighlight, infiniteSlides.length, sponsorHighlights.length]);

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
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10 pt-20 md:pt-32">
        {/* Header */}
        <div
          className="mx-auto mb-16"
          style={{ maxWidth: "1129px", width: "100%" }}
        >
          <h1
            className="mb-6 text-center text-5xl md:text-6xl font-semibold tracking-tight"
            style={{
              color: "#DBDAF3",
            }}
          >
            Sponsors
          </h1>
          <p
            className="text-center mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl px-4"
            style={{
              fontFamily: "var(--font-lato)",
              fontSize: "clamp(18px, 3vw, 35px)",
              lineHeight: "clamp(28px, 4vw, 60px)",
              fontWeight: 500,
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
            className="mb-8 text-center mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4"
            style={{
              fontFamily: "var(--font-lato)",
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
              style={{ minHeight: "clamp(400px, 50vw, 700px)" }}
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
                        height: "638.36px",
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
                              width={318}
                              height={64}
                              className="object-contain"
                              style={{
                                width: "clamp(200px, 30vw, 318px)",
                                height: "auto",
                                maxWidth: "100%",
                              }}
                            />
                          </div>
                        )}
                        <p
                          className="text-center mb-8 text-sm sm:text-base md:text-lg lg:text-xl px-4"
                          style={{
                            fontFamily: "var(--font-lato)",
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
                            className="text-sm sm:text-base md:text-lg lg:text-xl"
                            style={{
                              fontFamily: "var(--font-lato)",
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
                    className={`rounded-full transition-all ${
                      index === realIndex
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
          <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
            <a
              href={goldBlock.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-full max-w-[954px]"
              style={{
                height: "clamp(180px, 25vw, 294px)",
                aspectRatio: "954/294",
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "clamp(12px, 2vw, 20px)",
                  transform: "rotate(-179.87deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {goldBlock.logo && (
                  <div style={{ transform: "rotate(179.87deg)" }}>
                    <Image
                      src={goldBlock.logo}
                      alt={goldBlock.name}
                      width={561}
                      height={294}
                      className="object-contain"
                      style={{
                        width: "clamp(200px, 35vw, 400px)",
                        height: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                )}
              </div>
            </a>
          </div>

          {/* Silver - Two Blocks Side by Side */}
          <div className="flex flex-col md:flex-row justify-center gap-3 sm:gap-4 mb-2 sm:mb-3 md:mb-4">
            {silverBlocks.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-full md:w-[465px]"
                style={{
                  height: "clamp(140px, 20vw, 258px)",
                  aspectRatio: "465/258",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "clamp(12px, 2vw, 20px)",
                    transform: "matrix(-1, 0, 0, -1, 0, 0)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {sponsor.logo && (
                    <div style={{ transform: "matrix(-1, 0, 0, -1, 0, 0)" }}>
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={294}
                        height={63}
                        className="object-contain"
                        style={{
                          width: "clamp(120px, 20vw, 200px)",
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
          <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-2 sm:gap-4 max-w-4xl mx-auto">
            {bronzeBlocks.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-full sm:w-[291px]"
                style={{
                  height: "clamp(100px, 25vw, 208px)",
                  aspectRatio: "291/208",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center p-1.5 sm:p-3 md:p-4 transition-all duration-300 hover:scale-105"
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "clamp(10px, 2vw, 20px)",
                    transform: "matrix(-1, -0.01, 0, -1, 0, 0)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {sponsor.logo && (
                    <div
                      style={{ transform: "matrix(-1, -0.01, 0, -1, 0, 0)" }}
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={174}
                        height={161}
                        className="object-contain"
                        style={{
                          width: "clamp(60px, 12vw, 140px)",
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
          transform:
            "translateY(calc(50% + clamp(120px, 16vw, 200px)))",
          backgroundImage: "url('/additional.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
    </section>
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
    answer:
      "Hack Canada is a yearly held, in-person hackathon run by the Hackathons Canada, a community of tech-enthusiasts across Canada. Hack Canada 2026 will run from March 5th to 7th for 48 hours.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Hack Canada is 100% free to attend. All food, drinks, and overnight accommodations are provided for free to all hackers. Workshops, snacks, and all other activities during Hack Canada are also all completely free and funded by our generous sponsors.",
  },
  {
    question: "Where and when is Hack Canada?",
    answer:
      "Hack Canada will be held overnight at the Lazaridis Centre at Wilfrid Laurier University, from March 4th to 6th.",
  },
  {
    question: "What is the schedule like?",
    answer:
      'Hack Canada will start with an opening ceremony, immediately followed by the "hacking period" lasting 48 hours and giving hackers the chance to work on their projects. Soon after it is over, judging will take place, and then our closing ceremony to wrap up the event.',
  },
  {
    question: "Who is eligible to participate?",
    answer:
      "Any student in high school or currently enrolled in an undergraduate degree can participate.",
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
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/faq/full-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

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
          style={{
            transform: "rotate(-9.46deg)",
            width: "clamp(200px, 85vw, 350px)",
            height: "clamp(22px, 3.5vw, 29px)",
            maxWidth: "90vw",
            fontFamily: "var(--font-baloo-chettan)",
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
          style={{
            transform: "rotate(-9.46deg)",
            width: "clamp(400px, 90vw, 643px)",
            height: "clamp(36px, 5vw, 48px)",
            fontFamily: "var(--font-baloo-chettan)",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "clamp(32px, 5.5vw, 50px)",
            lineHeight: "96%",
            textAlign: "center",
            color: "#FFDFF7",
            whiteSpace: "nowrap",
            overflow: "visible",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Frequently Asked Questions
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-[180px] pb-4 sm:pt-[220px] sm:pb-8 md:pt-[260px] md:pb-12 lg:pt-[300px] lg:pb-16 relative z-10">
        {/* Two Column Layout */}
        <div className="max-w-full sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] mx-auto flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-4 justify-center pt-[350px] sm:pt-0">
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
                      "flex items-start justify-between",
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
                        fontFamily: "var(--font-baloo-chettan)",
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
                        fontFamily: "var(--font-outfit)",
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
                      "flex items-start justify-between",
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
                        fontFamily: "var(--font-baloo-chettan)",
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
                        fontFamily: "var(--font-outfit)",
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
