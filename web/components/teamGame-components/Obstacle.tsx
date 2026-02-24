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
            className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] filter drop-shadow-[0_0_5px_rgba(255,255,0,1)] fill-yellow-200 stroke-yellow-200"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M12 2.5l2.45 5.51 6.05.54-4.59 4l1.37 5.95L12 15.3l-5.28 3.2 1.37-5.95-4.59-4 6.05-.54L12 2.5z" />
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
