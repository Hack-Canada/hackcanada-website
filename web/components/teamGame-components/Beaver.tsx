'use client';

import React, { forwardRef, useEffect, useState } from 'react';

interface BeaverProps {
  bottom: number;
  isJumping: boolean;
  yVelocity: number;
  isGameOver: boolean;
}

const Beaver = forwardRef<HTMLDivElement, BeaverProps>(function Beaver(
  { bottom, isJumping, yVelocity, isGameOver },
  ref
) {
  const [beaverSize, setBeaverSize] = useState(100);
  const [beaverX, setBeaverX] = useState(110);

  useEffect(() => {
    const updatePosition = () => {
      const isMobile = window.innerWidth < 640;
      setBeaverX(isMobile ? 18 : 110);
      setBeaverSize(isMobile ? 70 : 100);
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const [walkFrame, setWalkFrame] = useState<1 | 2>(1);

  useEffect(() => {
    if (isGameOver) return;
    if (isJumping) return;

    const id = window.setInterval(() => {
      setWalkFrame(prev => (prev === 1 ? 2 : 1));
    }, 140);

    return () => window.clearInterval(id);
  }, [isGameOver, isJumping]);

  let frame: string;

  if (isJumping) {
    frame = yVelocity > 0 ? '/teamGame-assets/beaver-jump2.png' : '/teamGame-assets/beaver-jump1.png';
  } else {
    frame = walkFrame === 1 ? '/teamGame-assets/beaver-walk1.png' : '/teamGame-assets/beaver-walk2.png';
  }

  return (
    <div
      ref={ref}
      className="absolute z-30"
      style={{ left: beaverX, width: beaverSize, height: beaverSize, bottom }}
    >
      <img src={frame} alt="Beaver" className="w-full h-full object-contain" draggable={false} />
    </div>
  );
});

export default Beaver;
