"use client";

import Image from "next/image";
import MeteorShower from "@/components/effects/MeteorShower";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const beaverWrapRef = useRef<HTMLDivElement | null>(null);
  const collageRef = useRef<HTMLDivElement | null>(null);
  const candleRef = useRef<HTMLImageElement | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [isInCollage, setIsInCollage] = useState(false);

  // Candle follows mouse within collage area - using ref for instant updates
  useEffect(() => {
    const collage = collageRef.current;
    const candle = candleRef.current;
    if (!collage || !candle) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = collage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Direct DOM manipulation for instant cursor tracking
      candle.style.left = `${x - 20}px`;
      candle.style.top = `${y - 60}px`;
    };

    const onMouseEnter = () => setIsInCollage(true);
    const onMouseLeave = () => setIsInCollage(false);

    collage.addEventListener("mousemove", onMouseMove);
    collage.addEventListener("mouseenter", onMouseEnter);
    collage.addEventListener("mouseleave", onMouseLeave);
    return () => {
      collage.removeEventListener("mousemove", onMouseMove);
      collage.removeEventListener("mouseenter", onMouseEnter);
      collage.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // Beaver drops while scrolling through About (stays INSIDE About)
  useEffect(() => {
    const section = sectionRef.current;
    const beaverWrap = beaverWrapRef.current;
    if (!section || !beaverWrap) return;

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = clamp(
        (window.innerHeight - rect.top) / (rect.height + window.innerHeight),
        0,
        1
      );

      const maxDrop = 740; // keep drop inside About
      beaverWrap.style.transform = `translateY(${progress * maxDrop}px)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden text-white -mt-28 pt-28"
      style={{ backgroundColor: "#0B1030" }}
    >
      {/* Background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/rect-387.svg"
        alt=""
        className="absolute inset-0 -z-30 h-full w-full object-cover object-top"
      />

      {/* ✅ Meteors (behind content, above background) */}
      <MeteorShower className="absolute inset-0 z-0" count={14} />

      {/* Blend with previous section */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 -z-10 bg-gradient-to-b from-black/40 to-transparent" />
      {/* Fill bottom so no seams */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#0B1030]" />

      {/* Beaver (facing RIGHT) */}
      <div
        ref={beaverWrapRef}
        className="pointer-events-none absolute right-[-40px] top-2 z-50 will-change-transform"
      >
        <Image
          src="/beaver.svg"
          alt="Cartoon character"
          width={272}
          height={419}
          className="h-[419px] w-[272px] scale-x-[-1]"
          priority
        />
      </div>

      {/* Stars scattered around - small and subtle */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/star-10.svg"
        alt=""
        className="pointer-events-none absolute left-[100px] top-[180px] w-3 opacity-60"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/star-16.svg"
        alt=""
        className="pointer-events-none absolute left-[200px] top-[350px] w-4 opacity-50"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/star-17.svg"
        alt=""
        className="pointer-events-none absolute right-[200px] top-[420px] w-5 opacity-45"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/star-10.svg"
        alt=""
        className="pointer-events-none absolute left-[620px] top-[520px] w-3 opacity-55"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/star-16.svg"
        alt=""
        className="pointer-events-none absolute right-[320px] top-[600px] w-4 opacity-50"
      />

      {/* Shooting lines / dashes - small subtle streaks */}
      {/* Top area */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/rect-408.svg"
        alt=""
        className="pointer-events-none absolute left-[80px] top-[280px] w-10 opacity-40"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/rect-409.svg"
        alt=""
        className="pointer-events-none absolute left-[95px] top-[300px] w-8 opacity-35"
      />

      {/* Middle left */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/rect-410.svg"
        alt=""
        className="pointer-events-none absolute left-[60px] top-[550px] w-10 opacity-40"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/rect-408.svg"
        alt=""
        className="pointer-events-none absolute left-[75px] top-[570px] w-8 opacity-35"
      />

      {/* Bottom right */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/rect-409.svg"
        alt=""
        className="pointer-events-none absolute right-[180px] top-[680px] w-10 opacity-40"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/rect-410.svg"
        alt=""
        className="pointer-events-none absolute right-[165px] top-[700px] w-8 opacity-35"
      />

      <div className="container mx-auto px-4">
        {/* Keep About self-contained so images don't overlap next section */}
        <div className="relative min-h-[940px] pt-24 pb-28">
          {/* Left title + paragraph */}
          <div className="absolute left-[103px] top-[100px] max-w-[640px]">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
              About Hack Canada
            </h2>

            <p className="mt-6 max-w-[620px] text-base md:text-lg leading-relaxed text-white/80">
              Join us at Hack Canada this February, where innovators from around
              the world will come together to create and connect in a dynamic
              and supportive environment. Experience hands-on workshops, expert
              mentorship, and exciting activities designed to fuel your
              creativity and enhance your skills.
            </p>
          </div>

          {/* Right paragraph (same spot) */}
          <div className="absolute right-20 top-[390px] max-w-[420px] text-white/80 leading-relaxed">
            <p className="text-base md:text-lg">
              We are a Canadian-focused hackathon, aiming to solve national
              problems using the amazing hacker minds to help and focus on
              changing Canada&apos;s future in many ways. Join us in shaping a
              brighter future for Canada through innovation and collaboration.
            </p>
          </div>

          {/* Constellation line decoration - right side */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Vector 99.svg"
            alt=""
            className="pointer-events-none absolute right-[200px] top-[580px] w-[450px] h-auto opacity-50"
          />

          {/* ===== Collage with candle cursor effect ===== */}
          <div 
            ref={collageRef}
            className="absolute left-[20px] top-[320px] w-[750px] h-[620px] cursor-none z-10"
          >
            {/* TOP IMAGE (rect-403.svg) - top center */}
            <div 
              className="absolute left-[120px] top-[0px] w-[360px] h-[280px] rotate-[2deg] z-10"
              onMouseEnter={() => setHoveredImage(0)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              {/* Postcard frame */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/clip-path-group.svg"
                alt=""
                className="w-full h-full"
              />
              {/* Photo inside the frame - centered with padding */}
              <Image
                src="/rect-403.svg"
                alt="Hack Canada photo"
                width={240}
                height={165}
                className={`absolute top-[58px] left-[60px] w-[240px] h-[165px] transition-all duration-400 ease-out
                  ${hoveredImage === 0 ? 'blur-0 opacity-100 scale-[1.02]' : 'blur-[2px] opacity-60'}`}
              />
            </div>

            {/* LEFT IMAGE (hackc-1071.svg) - bottom left */}
            <div 
              className="absolute left-[0px] top-[220px] w-[380px] h-[295px] rotate-[-5deg] z-20"
              onMouseEnter={() => setHoveredImage(1)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              {/* Postcard frame */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/clip-path-group.svg"
                alt=""
                className="w-full h-full"
              />
              {/* Photo inside the frame */}
              <Image
                src="/hackc-1071.svg"
                alt="Hack Canada photo"
                width={260}
                height={180}
                className={`absolute top-[58px] left-[60px] w-[260px] h-[180px] transition-all duration-400 ease-out
                  ${hoveredImage === 1 ? 'blur-0 opacity-100 scale-[1.02]' : 'blur-[2px] opacity-70'}`}
              />
            </div>

            {/* RIGHT IMAGE (hackc-1078.svg) - bottom right */}
            <div 
              className="absolute left-[340px] top-[280px] w-[360px] h-[280px] rotate-[4deg] z-30"
              onMouseEnter={() => setHoveredImage(2)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              {/* Postcard frame */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/clip-path-group.svg"
                alt=""
                className="w-full h-full"
              />
              {/* Photo inside the frame */}
              <Image
                src="/hackc-1078.svg"
                alt="Hack Canada photo"
                width={240}
                height={165}
                className={`absolute top-[58px] left-[60px] w-[240px] h-[165px] transition-all duration-400 ease-out
                  ${hoveredImage === 2 ? 'blur-0 opacity-100 scale-[1.02]' : 'blur-[2px] opacity-70'}`}
              />
            </div>

            {/* Candle cursor - follows mouse instantly */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={candleRef}
              src="/group-66.svg"
              alt="candle cursor"
              className={`pointer-events-none absolute w-20 h-auto z-[9999] transition-opacity duration-150 ${
                isInCollage ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{ left: '200px', top: '200px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
