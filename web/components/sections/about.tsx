"use client";

import Image from "next/image";
import MeteorShower from "@/components/effects/MeteorShower";
import { useEffect, useRef, useState, useCallback } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const beaverWrapRef = useRef<HTMLDivElement | null>(null);
  const collageRef = useRef<HTMLDivElement | null>(null);
  const candleRef = useRef<HTMLImageElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const rightTextRef = useRef<HTMLDivElement | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [isInSection, setIsInSection] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth interpolation for beaver position - both start at 0 (top)
  const currentBeaverPos = useRef(0);
  const targetBeaverPos = useRef(0);
  const beaverInitialized = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  // Intersection observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: "-50px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Candle follows mouse within entire section - smooth tracking
  useEffect(() => {
    const section = sectionRef.current;
    const candle = candleRef.current;
    if (!section || !candle) return;

    let targetX = 200;
    let targetY = 200;
    let currentX = 200;
    let currentY = 200;
    let rafId: number;
    let isMouseInSection = false;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      // Smooth interpolation - higher value = more responsive
      currentX = lerp(currentX, targetX, 0.35);
      currentY = lerp(currentY, targetY, 0.35);

      candle.style.transform = `translate3d(${currentX - 20}px, ${currentY - 60}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    const checkMouseInSection = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const isInBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInBounds && !isMouseInSection) {
        isMouseInSection = true;
        setIsInSection(true);
      } else if (!isInBounds && isMouseInSection) {
        isMouseInSection = false;
        setIsInSection(false);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      // Calculate position relative to section
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      // Check if mouse is still in section bounds
      checkMouseInSection(e);
    };

    const onMouseEnter = () => {
      isMouseInSection = true;
      setIsInSection(true);
    };

    const onMouseLeave = () => {
      isMouseInSection = false;
      setIsInSection(false);
    };

    // Also check on scroll to handle cases where mouse doesn't move but section scrolls
    const onScroll = () => {
      if (isMouseInSection) {
        // Re-check if mouse is still in section after scroll
        // We can't get mouse position from scroll event, so we'll rely on next mousemove
      }
    };

    rafId = requestAnimationFrame(animate);
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Smooth beaver animation with interpolation
  const animateBeaver = useCallback(() => {
    const beaverWrap = beaverWrapRef.current;
    if (!beaverWrap) return;

    // On first frame, snap to initial position (no lerp delay)
    if (!beaverInitialized.current) {
      currentBeaverPos.current = targetBeaverPos.current;
      beaverInitialized.current = true;
    } else {
      // Smooth lerp towards target - 0.01 = slow and gentle
      const diff = targetBeaverPos.current - currentBeaverPos.current;
      currentBeaverPos.current += diff * 0.05;
    }

    beaverWrap.style.transform = `translate3d(0, ${currentBeaverPos.current}px, 0)`;
    animationFrameRef.current = requestAnimationFrame(animateBeaver);
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
      // Start animation only when section enters viewport
      const rawProgress =
        (window.innerHeight - rect.top) / (rect.height + window.innerHeight);
      const progress = clamp(rawProgress, 0, 1);

      // Linear progress - no easing so it starts at true 0
      const maxDrop = 740;
      targetBeaverPos.current = progress * maxDrop;
    };

    onScroll();
    animationFrameRef.current = requestAnimationFrame(animateBeaver);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateBeaver]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden text-white -mt-[60px] pt-[120px]"
      style={{ backgroundColor: "transparent", cursor: "none" }}
    >
      {/* Dark blue background - starts below the wavy edge */}
      <div
        className="absolute top-[100px] left-0 right-0 bottom-0 -z-40"
        style={{ backgroundColor: "#0B1030" }}
      />

      {/* Background wavy pattern - positioned to show the edge */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/rect-387.svg"
        alt=""
        className="absolute top-0 left-0 w-full h-auto -z-30 object-cover object-top"
        style={{ minHeight: "100%" }}
      />

      {/* ✅ Meteors (behind content, above background) */}
      <MeteorShower className="absolute inset-0 z-0" count={14} />

      {/* Fill bottom so no seams */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#0B1030]" />

      {/* Beaver (facing RIGHT) - GPU accelerated */}
      <div
        ref={beaverWrapRef}
        className="pointer-events-none absolute right-[250px] -top-12 z-50"
        style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
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
        <div className="relative lg:min-h-[940px] pt-24 pb-28 flex flex-col gap-10 lg:block">
          {/* Left title + paragraph - with scroll reveal */}
          <div
            ref={titleRef}
            className={`static mx-auto max-w-[640px] lg:mx-0 lg:absolute lg:left-[120px] lg:top-[80px] xl:left-[160px] xl:top-[120px] transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight font-luckiest">
              About Hack Canada
            </h2>

            <p
              className={`mt-6 max-w-[620px] text-base md:text-lg leading-relaxed text-white/80 transition-all duration-700 ease-out font-rubik
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                transitionDelay: "150ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Hack Canada is built around tackling real Canadian challenges.
              This year, we're extending that mission beyond the weekend with a
              30-day building period—giving teams 1 on 1 access to sponsors and
              funding to transform prototypes into lasting side projects or
              startups.
            </p>
          </div>

          {/* Right paragraph - with staggered scroll reveal */}
          <div
            ref={rightTextRef}
            className={`static mx-auto max-w-[520px] text-white/80 leading-relaxed lg:mx-0 lg:absolute lg:right-[120px] xl:right-[160px] lg:top-[340px] transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              transitionDelay: "300ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p className="text-base md:text-lg font-rubik">
              Expect workshops, mentorship, late night coding sessions, and the
              kind of energy that turns wild ideas into real products. You'll
              meet sponsors who aren't just here to watch they want to see you
              build with their tools and support your project beyond the
              weekend. VCs will be in the room looking for the next big thing.
              Whether you're here to learn, ship, or launch something real, it's
              going to be a blast.
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
            className="relative mx-auto flex w-full max-w-[560px] flex-col gap-6 cursor-none z-10 lg:block lg:max-w-none lg:gap-0 lg:absolute lg:left-[20px] lg:top-[320px] lg:w-[750px] lg:h-[620px]"
          >
            {/* TOP IMAGE (rect-403.svg) - top center */}
            <div
              className={`relative mx-auto w-[320px] h-[250px] rotate-[2deg] z-10 transition-all duration-500 sm:w-[360px] sm:h-[280px] lg:absolute lg:left-[120px] lg:top-[0px]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                transitionDelay: "400ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
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
                src="/8Q3A2207.JPG.jpg"
                alt="Hack Canada photo"
                width={240}
                height={165}
                className="absolute top-[58px] left-[60px] w-[240px] h-[165px]"
                style={{
                  filter: hoveredImage === 0 ? "blur(0px)" : "blur(2px)",
                  opacity: hoveredImage === 0 ? 1 : 0.6,
                  transform: hoveredImage === 0 ? "scale(1.02)" : "scale(1)",
                  transition:
                    "filter 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>

            {/* LEFT IMAGE (hackc-1071.svg) - bottom left */}
            <div
              className={`relative mx-auto w-[320px] h-[250px] rotate-[-5deg] z-20 transition-all duration-500 sm:w-[380px] sm:h-[295px] lg:absolute lg:left-[0px] lg:top-[220px]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                transitionDelay: "550ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
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
                src="/HackC_399.JPG.jpg"
                alt="Hack Canada photo"
                width={257}
                height={175}
                className="absolute top-[58px] left-[60px] w-[257px] h-[175px]"
                style={{
                  filter: hoveredImage === 1 ? "blur(0px)" : "blur(2px)",
                  opacity: hoveredImage === 1 ? 1 : 0.7,
                  transform: hoveredImage === 1 ? "scale(1.02)" : "scale(1)",
                  transition:
                    "filter 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>

            {/* RIGHT IMAGE (hackc-1078.svg) - bottom right */}
            <div
              className={`relative mx-auto w-[320px] h-[250px] rotate-[4deg] z-30 transition-all duration-500 sm:w-[360px] sm:h-[280px] lg:absolute lg:left-[340px] lg:top-[280px]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                transitionDelay: "700ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
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
                src="/HackC_573.JPG.jpg"
                alt="Hack Canada photo"
                width={240}
                height={165}
                className="absolute top-[58px] left-[60px] w-[240px] h-[165px]"
                style={{
                  filter: hoveredImage === 2 ? "blur(0px)" : "blur(2px)",
                  opacity: hoveredImage === 2 ? 1 : 0.7,
                  transform: hoveredImage === 2 ? "scale(1.02)" : "scale(1)",
                  transition:
                    "filter 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
          </div>

          {/* Candle cursor - smooth following with GPU acceleration - for entire section */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={candleRef}
            src="/group-66.svg"
            alt="candle cursor"
            className="pointer-events-none absolute w-20 h-auto z-[9999]"
            style={{
              left: 0,
              top: 0,
              opacity: isInSection ? 1 : 0,
              transition: "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, opacity",
            }}
          />
        </div>
      </div>
    </section>
  );
}
