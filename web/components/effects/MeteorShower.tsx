"use client";

import { useEffect, useMemo, useState } from "react";

type Meteor = {
  left: string;
  top: string;
  dur: string;
  delay: string;
  scale: number;
  alpha: number;
};

export default function MeteorShower({
  className = "",
  count = 14,
}: {
  className?: string;
  count?: number;
}) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  // Generate meteors only after mount -> prevents hydration mismatch
  useEffect(() => {
    const make = (): Meteor[] =>
      Array.from({ length: count }).map(() => {
        // start mostly from right side/top so they travel top-right -> bottom-left
        const left = 70 + Math.random() * 50; // vw (70..120)
        const top = -25 + Math.random() * 90; // vh (-25..65)

        const dur = (4.8 + Math.random() * 4.5).toFixed(2) + "s"; // 4.8..9.3s
        const delay = (Math.random() * 6.0).toFixed(2) + "s"; // 0..6s
        const scale = Number((0.7 + Math.random() * 0.9).toFixed(2)); // 0.7..1.6
        const alpha = Number((0.22 + Math.random() * 0.55).toFixed(2)); // 0.22..0.77

        return {
          left: `${left}vw`,
          top: `${top}vh`,
          dur,
          delay,
          scale,
          alpha,
        };
      });

    setMeteors(make());
  }, [count]);

  return (
    <div className={`meteor-field ${className}`}>
      {meteors.map((m, i) => (
        <span
          key={i}
          className="meteor"
          style={
            {
              left: m.left,
              top: m.top,
              "--dur": m.dur,
              "--delay": m.delay,
              "--scale": m.scale,
              "--alpha": m.alpha,
            } as React.CSSProperties
          }
        />
      ))}

      <style jsx>{`
        .meteor-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .meteor {
          position: absolute;
          width: 160px;
          height: 2px;
          border-radius: 999px;
          opacity: 0;

          /* A soft glowing streak */
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, var(--alpha, 0.5))
          );

          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.25));
          transform: translate3d(0, 0, 0) rotate(-35deg) scale(var(--scale, 1));

          animation: meteor-fall var(--dur, 6s) linear infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes meteor-fall {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(-35deg)
              scale(var(--scale, 1));
          }
          8% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            /* move down-left */
            transform: translate3d(-140vw, 140vh, 0) rotate(-35deg)
              scale(var(--scale, 1));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .meteor {
            animation: none;
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
