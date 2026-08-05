"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Parallax from "parallax-js";

export default function Hero() {
  const [sectionHeight, setSectionHeight] = useState(1400);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const backgroundImgRef = useRef<HTMLImageElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<Parallax | null>(null);

  const handleMailingListSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("https://app.hackcanada.org/api/mailing-list", {
        // const res = await fetch("http://localhost:3001/api/mailing-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data.message || "Something went wrong, please try again."
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  const handleImageLoad = () => {
    if (backgroundImgRef.current)
      setSectionHeight(backgroundImgRef.current.offsetHeight);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (backgroundImgRef.current)
        setSectionHeight(backgroundImgRef.current.offsetHeight);
    };
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    parallaxRef.current = new Parallax(scene, {
      relativeInput: true,
      hoverOnly: true,
      pointerEvents: true,
      limitX: 35,
      limitY: 35,
      scalarX: 12,
      scalarY: 12,
    });
    return () => {
      parallaxRef.current?.destroy();
      parallaxRef.current = null;
    };
  }, []);

  return (
    <section
      id="hero"
      className="w-full flex items-start justify-center relative lg:pt-[25%]"
      style={{ height: `${sectionHeight + 350}px` }}
    >
      <div ref={sceneRef} className="absolute inset-0 overflow-hidden z-0">
        <div
          data-depth="0.05"
          className="absolute inset-0 z-0 overflow-visible flex justify-center items-start"
        >
          <div className="relative left-1/2 -translate-x-1/2 min-w-[1920px] w-screen flex justify-center">
            <Image
              ref={backgroundImgRef}
              src="/background.webp"
              alt="Background"
              width={1920}
              height={1080}
              className="object-top w-full h-auto origin-top"
              priority
              sizes="100vw"
              quality={80}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div
          data-depth="0.2"
          className="absolute inset-0 z-10 lg:z-30 overflow-visible flex justify-center items-start pt-[20vh]"
        >
          <div className="relative left-1/2 -translate-x-1/2 min-w-[1920px] w-screen">
            <Image
              src="/foreground.webp"
              alt="Foreground"
              width={1920}
              height={1080}
              className="object-top w-full h-auto scale-105"
              priority
              sizes="100vw"
              quality={80}
            />
          </div>
        </div>
      </div>
      <div className="z-20 flex flex-col items-center text-center px-4 mt-[12vh] lg:ml-[50vw] lg:-mt-24 backdrop-blur-md mx-10 bg-white/20 rounded-lg py-6 lg:backdrop-blur-none lg:bg-transparent lg:py-0">
        <h1 className="text-6xl lg:text-8xl text-[#441E0A] font-luckiest">
          Hack Canada
        </h1>
        <p className="text-[#441E0A] text lg:text-2xl mt-2 lg:mt-0 font-rubik">
          Sign up for our mailing list to hear what&apos;s next!
        </p>
        <div className="mt-4 lg:mt-6 flex flex-col items-center w-full max-w-md">
          {status === "success" ? (
            <p className="bg-[#441E0A] text-white px-8 lg:px-10 py-3 rounded-lg font-semibold text-lg font-rubik">
              You&apos;re on the list! We&apos;ll be in touch.
            </p>
          ) : (
            <form
              onSubmit={handleMailingListSubmit}
              className="flex w-full flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                disabled={status === "loading"}
                className="flex-1 px-4 py-2 lg:py-3 rounded-lg border-2 border-[#441E0A] bg-white/80 text-[#441E0A] font-rubik placeholder:text-[#441E0A]/60 focus:outline-none focus:ring-2 focus:ring-[#EC294D]"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#441E0A] text-white px-6 lg:px-8 py-2 lg:py-3 rounded-lg font-bold text-lg font-rubik hover:bg-[#5C2E0F] transition disabled:opacity-60"
              >
                {status === "loading" ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-[#EC294D] text-sm font-rubik font-semibold">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
