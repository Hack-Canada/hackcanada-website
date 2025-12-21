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

const firstAccordionItems: FAQItem[] = [
  {
    question: "What is Hack Canada?",
    answer:
      "Hack Canada is a nationwide hackathon that brings together students, developers, and innovators from across the country to build amazing projects, learn new skills, and connect with the tech community.",
  },
  {
    question: "What is a hackathon?",
    answer:
      "A hackathon is an event where participants collaborate intensively on software projects. It's a fun, creative environment where you can build anything you want, learn new technologies, and work with a team to bring your ideas to life.",
  },
  {
    question: "What if I've never been to a hackathon before?",
    answer:
      "No worries! Hack Canada welcomes participants of all experience levels. We'll have mentors, workshops, and resources to help you get started. Many first-time hackers have created amazing projects!",
  },
  {
    question: "What if I don't know how to code?",
    answer:
      "That's perfectly fine! Hackathons are great places to learn. We'll have workshops for beginners, and you can team up with more experienced developers. Many participants learn to code during their first hackathon.",
  },
  {
    question: "What if I don't have a team?",
    answer:
      "Don't worry! We'll have team formation activities at the beginning of the event. You can also join solo and find teammates, or work on your own project. Many great projects have been built by solo hackers!",
  },
];

const thirdAccordionItems: FAQItem[] = [
  {
    question: "Who can participate?",
    answer:
      "Hack Canada is open to all students, recent graduates, and anyone passionate about technology. Whether you're in high school, university, or just starting your tech journey, we welcome you to join us!",
  },
  {
    question: "When do hacker applications open?",
    answer:
      "Applications typically open a few months before the event. Keep an eye on our website and social media channels for announcements about application dates and deadlines.",
  },
  {
    question: "How do I register?",
    answer:
      "Registration will be available through our website once applications open. Simply fill out the application form with your information, and we'll notify you if you've been accepted to participate.",
  },
  {
    question: "How else can I contribute to Hack Canada?",
    answer:
      "Apart from joining as a hacker, we will also be looking for volunteers, mentors and judges! Keep an eye out for announcements on our social media pages. If you'd like to collaborate as a sponsor or a workshop host, react out to us at contact@hackcanada.org.",
  },
];

const secondAccordionLeft: FAQItem[] = [
  {
    question: "How much does it cost to attend Hack Canada?",
    answer:
      "Hack Canada is completely free to attend! We provide meals, snacks, swag, and all the resources you need. Just bring yourself, your laptop, and your enthusiasm!",
  },
  {
    question: "What documents do I need to apply?",
    answer:
      "You'll need to provide basic information like your name, email, school (if applicable), and a brief description of your interests. No special documents are required - just your enthusiasm to participate!",
  },
  {
    question: "Will food be provided?",
    answer:
      "Yes! We'll provide meals throughout the event, including breakfast, lunch, dinner, and plenty of snacks and drinks to keep you energized while you build your projects.",
  },
  {
    question: "What should I bring to the event?",
    answer:
      "Bring your laptop, charger, and any other devices you might need. We recommend bringing a water bottle, comfortable clothes, and a positive attitude. We'll provide everything else!",
  },
];

const secondAccordionRight: FAQItem[] = [
  {
    question: "What is the code of conduct?",
    answer:
      "Our code of conduct ensures a safe, inclusive, and respectful environment for all participants. We expect everyone to treat each other with respect, be inclusive, and help create a positive experience for all.",
  },
  {
    question: "Who can I contact for code of conduct concerns?",
    answer:
      "If you have any concerns or need to report an issue, please reach out to our organizers immediately. You can find our contact information at the event or email us at contact@hackcanada.org.",
  },
  {
    question: "How can I report a violation?",
    answer:
      "You can report violations by speaking directly to any organizer, using our anonymous reporting form, or emailing contact@hackcanada.org. All reports are taken seriously and handled confidentially.",
  },
  {
    question: "My parents are concerned—what should I tell them?",
    answer:
      "Hack Canada is a safe, supervised event with experienced organizers and mentors. We have security measures in place, provide meals, and ensure a supportive environment. Share our website and contact information with them so they can learn more!",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="w-full relative overflow-hidden"
      style={{ minHeight: "1256px" }}
    >
      {/* Background Image - Lighthouse scene with aurora */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://www.figma.com/api/mcp/asset/4888bd39-fece-4294-94eb-954b372af4da)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          left: "-103px",
          width: "1884px",
          height: "1256px",
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Purple Accordion Groups - Side by Side */}
        <div
          className="max-w-[976px] mx-auto flex flex-col md:flex-row gap-[14px] justify-center mb-12"
          style={{ marginTop: "100px" }}
        >
          {/* First Purple Group (Left) */}
          <Accordion
            type="multiple"
            className="w-[474px] max-w-full flex flex-col gap-[14px]"
          >
            {firstAccordionItems.map((item, index) => {
              const textWidths = [235, 230, 454.14, 436, 421];
              const value = `first-${index}`;

              return (
                <AccordionItem
                  key={index}
                  value={value}
                  className="border-none relative overflow-hidden"
                >
                  <AccordionTrigger
                    className={cn(
                      "relative w-full h-[56px] data-[state=open]:h-[166px] transition-all duration-300",
                      "bg-gradient-to-r from-[#5D2F47] to-[#2A222E]",
                      "border border-[#A2A2A2] rounded-[10px]",
                      "data-[state=open]:shadow-[0px_0px_6.1px_rgba(255,239,99,0.5)]",
                      "hover:no-underline",
                      "[&>svg]:hidden"
                    )}
                    style={{
                      padding: 0,
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      className="absolute text-white overflow-hidden"
                      style={{
                        width: `${textWidths[index]}px`,
                        maxWidth: "calc(100% - 60px)",
                        height: "16px",
                        left: index === 2 ? "19.86px" : "22px",
                        top: "19px",
                        fontFamily: "var(--font-baloo-chettan)",
                        fontWeight: 400,
                        fontSize: "17px",
                        lineHeight: "96%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.question}
                    </span>
                    <div
                      className="absolute flex items-center justify-center pointer-events-none"
                      style={{
                        left: index === 2 ? "445.97px" : "443px",
                        top: "22px",
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
                      className="text-white pt-0 pb-0 overflow-hidden"
                      style={{
                        position: "absolute",
                        width: "436px",
                        maxWidth: "calc(100% - 44px)",
                        height: "90px",
                        left: "22px",
                        top: "49px",
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

          {/* Third Purple Group (Right) */}
          <Accordion
            type="multiple"
            className="w-[474px] max-w-full flex flex-col gap-[14px]"
          >
            {thirdAccordionItems.map((item, index) => {
              const textWidths = [235, 421, 454.14, 436];
              const value = `third-${index}`;

              return (
                <AccordionItem
                  key={index}
                  value={value}
                  className="border-none relative overflow-hidden"
                >
                  <AccordionTrigger
                    className={cn(
                      "relative w-full h-[56px] data-[state=open]:h-[166px] transition-all duration-300",
                      "bg-gradient-to-r from-[#5D2F47] to-[#2A222E]",
                      "border border-[#A2A2A2] rounded-[10px]",
                      "data-[state=open]:shadow-[0px_0px_6.1px_rgba(255,239,99,0.5)]",
                      "hover:no-underline",
                      "[&>svg]:hidden"
                    )}
                    style={{
                      padding: 0,
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      className="absolute text-white overflow-hidden"
                      style={{
                        width: `${textWidths[index]}px`,
                        maxWidth: "calc(100% - 60px)",
                        height: "16px",
                        left: index === 2 ? "19.86px" : "22px",
                        top: "19px",
                        fontFamily: "var(--font-baloo-chettan)",
                        fontWeight: 400,
                        fontSize: "17px",
                        lineHeight: "96%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.question}
                    </span>
                    <div
                      className="absolute flex items-center justify-center pointer-events-none"
                      style={{
                        left: index === 2 ? "445.97px" : "443px",
                        top: "22px",
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
                      className="text-white pt-0 pb-0 overflow-hidden"
                      style={{
                        position: "absolute",
                        width: "436px",
                        maxWidth: "calc(100% - 44px)",
                        height: "90px",
                        left: "22px",
                        top: "49px",
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

        {/* Blue Accordion Group - Two Columns */}
        <div className="max-w-[976px] mx-auto flex flex-col md:flex-row gap-[14px] justify-center">
          {/* Left Column */}
          <Accordion
            type="multiple"
            className="w-[474px] max-w-full flex flex-col gap-[14px]"
          >
            {secondAccordionLeft.map((item, index) => {
              const textWidths = [424, 421, 454.14, 436];
              const value = `second-left-${index}`;

              return (
                <AccordionItem
                  key={index}
                  value={value}
                  className="border-none relative overflow-hidden"
                >
                  <AccordionTrigger
                    className={cn(
                      "relative w-full h-[56px] data-[state=open]:h-[166px] transition-all duration-300",
                      "bg-gradient-to-r from-[#2F395D] to-[#2A222E]",
                      "border-[0.5px] border-[#A2A2A2] rounded-[10px]",
                      "data-[state=open]:shadow-[0px_0px_6.1px_rgba(255,239,99,0.5)]",
                      "hover:no-underline",
                      "[&>svg]:hidden"
                    )}
                    style={{
                      padding: 0,
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      className="absolute text-white"
                      style={{
                        width: `${textWidths[index]}px`,
                        height: "16px",
                        left: "22px",
                        top: "19px",
                        fontFamily: "var(--font-baloo-chettan)",
                        fontWeight: 400,
                        fontSize: "17px",
                        lineHeight: "96%",
                      }}
                    >
                      {item.question}
                    </span>
                    <div
                      className="absolute flex items-center justify-center pointer-events-none"
                      style={{
                        left: "443px",
                        top: "22px",
                        width: "15px",
                        height: "15px",
                      }}
                    >
                      <Plus className="w-4 h-4 text-white stroke-[2] data-[state=open]:hidden" />
                      <X className="w-4 h-4 text-white stroke-[2] hidden data-[state=open]:block" />
                    </div>
                  </AccordionTrigger>
                  {item.answer && (
                    <AccordionContent
                      className="text-white pt-0 pb-0"
                      style={{
                        position: "absolute",
                        width: "436px",
                        height: "90px",
                        left: "calc(50% - 436px/2 + 3px)",
                        top: "30px",
                        fontFamily: "var(--font-outfit)",
                        fontWeight: 400,
                        fontSize: "15px",
                        lineHeight: "117%",
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
            {secondAccordionRight.map((item, index) => {
              const textWidths = [346, 421, 454.14, 436];
              const value = `second-right-${index}`;

              return (
                <AccordionItem
                  key={index}
                  value={value}
                  className="border-none relative overflow-hidden"
                >
                  <AccordionTrigger
                    className={cn(
                      "relative w-full h-[56px] data-[state=open]:h-[166px] transition-all duration-300",
                      "bg-gradient-to-r from-[#2F395D] to-[#2A222E]",
                      "border-[0.5px] border-[#A2A2A2] rounded-[10px]",
                      "data-[state=open]:shadow-[0px_0px_6.1px_rgba(255,239,99,0.5)]",
                      "hover:no-underline",
                      "[&>svg]:hidden"
                    )}
                    style={{
                      padding: 0,
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      className="absolute text-white"
                      style={{
                        width: `${textWidths[index]}px`,
                        height: "16px",
                        left: "22px",
                        top: "19px",
                        fontFamily: "var(--font-baloo-chettan)",
                        fontWeight: 400,
                        fontSize: "17px",
                        lineHeight: "96%",
                      }}
                    >
                      {item.question}
                    </span>
                    <div
                      className="absolute flex items-center justify-center pointer-events-none"
                      style={{
                        left: "443px",
                        top: "22px",
                        width: "15px",
                        height: "15px",
                      }}
                    >
                      <Plus className="w-4 h-4 text-white stroke-[2] data-[state=open]:hidden" />
                      <X className="w-4 h-4 text-white stroke-[2] hidden data-[state=open]:block" />
                    </div>
                  </AccordionTrigger>
                  {item.answer && (
                    <AccordionContent
                      className="text-white pt-0 pb-0"
                      style={{
                        position: "absolute",
                        width: "436px",
                        height: "90px",
                        left: "calc(50% - 436px/2 + 3px)",
                        top: "30px",
                        fontFamily: "var(--font-outfit)",
                        fontWeight: 400,
                        fontSize: "15px",
                        lineHeight: "117%",
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
