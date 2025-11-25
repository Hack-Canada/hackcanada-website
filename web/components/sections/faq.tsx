'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer?: string;
}

const firstAccordionItems: FAQItem[] = [
  { question: 'What is Hack Canada?' },
  { question: 'What is a hackathon?' },
  { question: 'What if I\'ve never been to a hackathon before?' },
  { question: 'What if I don\'t know how to code?' },
  { question: 'What if I don\'t have a team?' },
];

const secondAccordionLeft: FAQItem[] = [
  { question: 'How much does it cost to attend Hack Canada?' },
  { question: 'What documents do I need to apply?' },
  { question: 'Will food be provided?' },
  { question: 'What should I bring to the event?' },
];

const secondAccordionRight: FAQItem[] = [
  { question: 'What is the code of conduct?' },
  { question: 'Who can I contact for code of conduct concerns?' },
  { question: 'How can I report a violation?' },
  { question: 'My parents are concerned—what should I tell them?' },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (index: number, group: 'first' | 'second-left' | 'second-right') => {
    const key = `${group}-${index}`;
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const isOpen = (index: number, group: 'first' | 'second-left' | 'second-right') => {
    return openItems.has(`${group}-${index}`);
  };

  return (
    <section 
      id="faq" 
      className="w-full relative overflow-hidden"
      style={{ minHeight: '1256px' }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/faq/background.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          left: '-103px',
        }}
      />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* First Accordion Group */}
        <div className="max-w-[474px] mx-auto mb-12" style={{ marginTop: '100px' }}>
          <div className="flex flex-col gap-[14px]">
            {firstAccordionItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                style={{
                  width: '474px',
                  height: '56px',
                  maxWidth: '100%',
                }}
              >
                <button
                  onClick={() => toggleItem(index, 'first')}
                  className="w-full h-full flex items-center justify-between px-4 relative"
                  style={{
                    background: 'linear-gradient(270deg, #5D2F47 0%, #2A222E 100%)',
                    border: '1px solid #A2A2A2',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-baloo-chettan)',
                      fontWeight: 400,
                      fontSize: '17px',
                      lineHeight: '96%',
                      color: '#FFFFFF',
                      textAlign: 'left',
                    }}
                  >
                    {item.question}
                  </span>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      position: 'absolute',
                      left: '93.46%',
                      right: '3.38%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '16px',
                      height: '16px',
                      border: '2px solid #FFFFFF',
                      borderRadius: '2px',
                    }}
                  >
                    {isOpen(index, 'first') ? (
                      <ChevronUp className="w-3 h-3 text-white" />
                    ) : (
                      <ChevronDown className="w-3 h-3 text-white" />
                    )}
                  </div>
                </button>
                {isOpen(index, 'first') && item.answer && (
                  <div className="mt-2 p-4 bg-white/10 rounded text-white">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Second Accordion Group - Two Columns */}
        <div className="max-w-[976px] mx-auto flex flex-col md:flex-row gap-[14px] justify-center">
          {/* Left Column */}
          <div className="flex flex-col gap-[14px]" style={{ width: '474px', maxWidth: '100%' }}>
            {secondAccordionLeft.map((item, index) => (
              <div
                key={index}
                className="relative"
                style={{
                  width: '474px',
                  height: '56px',
                  maxWidth: '100%',
                }}
              >
                <button
                  onClick={() => toggleItem(index, 'second-left')}
                  className="w-full h-full flex items-center justify-between px-4 relative"
                  style={{
                    background: 'linear-gradient(270deg, #2F395D 0%, #2A222E 100%)',
                    border: '0.5px solid #A2A2A2',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-baloo-chettan)',
                      fontWeight: 400,
                      fontSize: '17px',
                      lineHeight: '96%',
                      color: '#FFFFFF',
                      textAlign: 'left',
                    }}
                  >
                    {item.question}
                  </span>
                  <div
                    style={{
                      position: 'absolute',
                      left: '93.46%',
                      right: '3.38%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {isOpen(index, 'second-left') ? (
                      <ChevronUp className="w-4 h-4 text-white" style={{ border: '2px solid #FFFFFF' }} />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white" style={{ border: '2px solid #FFFFFF' }} />
                    )}
                  </div>
                </button>
                {isOpen(index, 'second-left') && item.answer && (
                  <div className="mt-2 p-4 bg-white/10 rounded text-white">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[14px]" style={{ width: '474px', maxWidth: '100%' }}>
            {secondAccordionRight.map((item, index) => (
              <div
                key={index}
                className="relative"
                style={{
                  width: '474px',
                  height: '56px',
                  maxWidth: '100%',
                }}
              >
                <button
                  onClick={() => toggleItem(index, 'second-right')}
                  className="w-full h-full flex items-center justify-between px-4 relative"
                  style={{
                    background: 'linear-gradient(270deg, #2F395D 0%, #2A222E 100%)',
                    border: '0.5px solid #A2A2A2',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-baloo-chettan)',
                      fontWeight: 400,
                      fontSize: '17px',
                      lineHeight: '96%',
                      color: '#FFFFFF',
                      textAlign: 'left',
                    }}
                  >
                    {item.question}
                  </span>
                  <div
                    style={{
                      position: 'absolute',
                      left: '93.46%',
                      right: '3.38%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {isOpen(index, 'second-right') ? (
                      <ChevronUp className="w-4 h-4 text-white" style={{ border: '2px solid #FFFFFF' }} />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white" style={{ border: '2px solid #FFFFFF' }} />
                    )}
                  </div>
                </button>
                {isOpen(index, 'second-right') && item.answer && (
                  <div className="mt-2 p-4 bg-white/10 rounded text-white">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
