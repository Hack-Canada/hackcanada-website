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
      style={{ minHeight: "1256px" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/faq/background1.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Sky Artwork */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/faq/Untitled_Artwork%203.svg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      />
      {/* Lighthouse */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: "url('/faq/background.svg')",
          backgroundSize: "contain",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Two Column Layout */}
        <div
          className="max-w-[976px] mx-auto flex flex-col md:flex-row gap-[14px] justify-center"
          style={{ marginTop: "100px" }}
        >
          {/* Left Column */}
          <Accordion
            type="multiple"
            className="w-[474px] max-w-full flex flex-col gap-[14px]"
          >
            {leftColumnItems.map((item, index) => {
              const value = `left-${index}`;

              return (
                <AccordionItem
                  key={index}
                  value={value}
                  className="border-none relative overflow-hidden rounded-[10px] border border-[#A2A2A2] bg-gradient-to-r from-[#5D2F47] to-[#2A222E]"
                >
                  <AccordionTrigger
                    className={cn(
                      "relative w-full min-h-[56px] transition-all duration-300",
                      "hover:no-underline",
                      "[&>svg]:hidden",
                      "flex items-start justify-between"
                    )}
                    style={{
                      padding: "19px 22px",
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      className="text-white flex-1 pr-4"
                      style={{
                        fontFamily: "var(--font-baloo-chettan)",
                        fontWeight: 400,
                        fontSize: "17px",
                        lineHeight: "96%",
                      }}
                    >
                      {item.question}
                    </span>
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "15px",
                        height: "15px",
                      }}
                    >
                      <Plus className="w-4 h-4 text-white stroke-[2] data-[state=open]:hidden" />
                      <X
                        className="w-4 h-4 text-white stroke-[2] hidden data-[state=open]:block"
                        style={{ transform: "rotate(45deg)" }}
                      />
                    </div>
                  </AccordionTrigger>
                  {item.answer && (
                    <AccordionContent
                      className="text-white"
                      style={{
                        padding: "0 22px 19px 22px",
                        fontFamily: "var(--font-outfit)",
                        fontWeight: 400,
                        fontSize: "15px",
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
            className="w-[474px] max-w-full flex flex-col gap-[14px]"
          >
            {rightColumnItems.map((item, index) => {
              const value = `right-${index}`;

              return (
                <AccordionItem
                  key={index}
                  value={value}
                  className="border-none relative overflow-hidden rounded-[10px] border border-[#A2A2A2] bg-gradient-to-r from-[#5D2F47] to-[#2A222E]"
                >
                  <AccordionTrigger
                    className={cn(
                      "relative w-full min-h-[56px] transition-all duration-300",
                      "hover:no-underline",
                      "[&>svg]:hidden",
                      "flex items-start justify-between"
                    )}
                    style={{
                      padding: "19px 22px",
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      className="text-white flex-1 pr-4"
                      style={{
                        fontFamily: "var(--font-baloo-chettan)",
                        fontWeight: 400,
                        fontSize: "17px",
                        lineHeight: "96%",
                      }}
                    >
                      {item.question}
                    </span>
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "15px",
                        height: "15px",
                      }}
                    >
                      <Plus className="w-4 h-4 text-white stroke-[2] data-[state=open]:hidden" />
                      <X
                        className="w-4 h-4 text-white stroke-[2] hidden data-[state=open]:block"
                        style={{ transform: "rotate(45deg)" }}
                      />
                    </div>
                  </AccordionTrigger>
                  {item.answer && (
                    <AccordionContent
                      className="text-white"
                      style={{
                        padding: "0 22px 19px 22px",
                        fontFamily: "var(--font-outfit)",
                        fontWeight: 400,
                        fontSize: "15px",
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
