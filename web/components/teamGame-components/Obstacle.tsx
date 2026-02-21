'use client';

import React, { forwardRef } from 'react';
import { TeamMember } from '@/lib/teamGameData';

interface ObstacleProps {
  member?: TeamMember;
  isStar?: boolean;
  x: number;
  size: number;
  groundOffsetPx?: number;
}

const Obstacle = forwardRef<HTMLDivElement, ObstacleProps>(function Obstacle(
  { member, isStar, x, size, groundOffsetPx = 12 },
  ref
) {
  const bottom = Math.max(0, groundOffsetPx - 2);

  return (
    <div
      ref={ref}
      className={`absolute z-20 ${isStar ? 'animate-pulse' : ''}`}
      style={{
        width: size,
        height: size,
        left: x,
        bottom: isStar ? bottom + 10 : bottom, // Float star slightly higher
      }}
    >
      {isStar ? (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full drop-shadow-[0_0_8px_rgba(255,223,0,0.8)] fill-yellow-400"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ) : (
        member && (
          <img
            src={member.obstaclePhoto}
            alt={member.name}
            className="w-full h-full object-cover rounded-lg"
            draggable={false}
          />
        )
      )}
    </div>
  );
});

export default Obstacle;
