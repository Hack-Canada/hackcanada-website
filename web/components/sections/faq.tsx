"use client";

import React from "react";
import { Plus, X } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer?: string;
}

const leftColumnItems: FAQItem[] = [
  {
    question: "What's a hackathon?",
    answer:
      "A hackathon is a weekend-long competition where \"hackers\" build projects in teams to present and compete for prizes. Competition isn't the only part however, as hackers are also given the opportunity to network, participate in awesome workshops, and eat free food!",
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
      "Hack Canada will start with an opening ceremony, immediately followed by the \"hacking period\" lasting 48 hours and giving hackers the chance to work on their projects. Soon after it is over, judging will take place, and then our closing ceremony to wrap up the event.",
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
    answer:
      "Teams can be up to four hackers, and soloing is allowed.",
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

export default function FAQ() {
  return (
    <section
      id="faq"
      className="w-full relative overflow-hidden"
      style={{ 
        minHeight: "clamp(800px, 120vh, 1600px)",
        paddingTop: "clamp(80px, 15vh, 200px)",
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
          top: "clamp(120px, 15vh, 250px)",
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
        <div
          className="max-w-full sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] mx-auto flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-4 justify-center pt-[350px] sm:pt-0"
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
                  className="border-none relative overflow-hidden border border-[#A2A2A2] bg-gradient-to-r from-[#5D2F47] to-[#2A222E]"
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
                      padding: "clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px)",
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
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "clamp(12px, 2.5vw, 14px)",
                        height: "clamp(12px, 2.5vw, 14px)",
                      }}
                    >
                      <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[2] data-[state=open]:hidden" />
                      <X
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[2] hidden data-[state=open]:block"
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
                  className="border-none relative overflow-hidden border border-[#A2A2A2] bg-gradient-to-r from-[#5D2F47] to-[#2A222E]"
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
                      padding: "clamp(10px, 2vw, 12px) clamp(12px, 2.5vw, 16px)",
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
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "clamp(12px, 2.5vw, 14px)",
                        height: "clamp(12px, 2.5vw, 14px)",
                      }}
                    >
                      <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[2] data-[state=open]:hidden" />
                      <X
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white stroke-[2] hidden data-[state=open]:block"
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
