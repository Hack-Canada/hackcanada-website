"use client";

import { useState, useEffect } from "react";

export default function MLHBadge() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth >= 1024) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <a
      id="mlh-trust-badge"
      style={{
        maxWidth: "100px",
        minWidth: "60px",
        position: "fixed",
        right: "100px",
        top: "0",
        width: "10%",
        zIndex: "10000",
      }}
      className={`hidden min-[1650px]:block transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-[200%]"}`}
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
      target="_blank"
    >
      <img
        src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
        alt="Major League Hacking 2026 Hackathon Season"
        style={{ width: "100%" }}
      />
    </a>
  );
}
