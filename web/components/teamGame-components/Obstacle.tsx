'use client';

import React, { forwardRef } from 'react';
import { TeamMember } from '@/lib/teamGameData';

interface ObstacleProps {
  member: TeamMember;
  x: number;
  size: number;
  groundOffsetPx?: number; 
}

const Obstacle = forwardRef<HTMLDivElement, ObstacleProps>(function Obstacle(
  { member, x, size, groundOffsetPx = 12 },
  ref
) {
  const bottom = Math.max(0, groundOffsetPx - 2);

  return (
    <div
      ref={ref}
      className="absolute z-20"
      style={{
        width: size,
        height: size,
        left: x,
        bottom,
      }}
    >
      
      <img
        src={member.photo}
        alt={member.name}
        className="w-full h-full object-cover rounded-lg"
        draggable={false}
      />
    </div>
  );
});

export default Obstacle;
