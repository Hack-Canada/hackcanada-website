'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { teamMembers, TeamMember } from '@/lib/teamGameData';
import Beaver from './Beaver';
import Obstacle from './Obstacle';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

interface GameState {
  isPlaying: boolean;
  isGameOver: boolean;
  score: number;
  highScore: number;
  speed: number;
}

type ObstacleState = {
  id: string;
  member: TeamMember;
  x: number;
};

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
}

// Memoized MetBar component to prevent unnecessary re-renders
const MetBar = React.memo(({ 
  metMembers, 
  teamMembers, 
  isMobile, 
  openMemberModal,
  hoveredMember,
  setHoveredMember 
}: {
  metMembers: string[];
  teamMembers: TeamMember[];
  isMobile: boolean;
  openMemberModal: (id: string) => void;
  hoveredMember: string | null;
  setHoveredMember: (id: string | null) => void;
}) => (
  <div className="overflow-x-auto overflow-y-visible scrollbar-hide" style={{
    height: isMobile ? 96 : 112,
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 34,
    paddingRight: 22,
  }}>
    <div className="flex flex-nowrap gap-3 items-center">
      {teamMembers.map((member, idx) => {
        const isMet = metMembers.includes(member.id);
        const isHovered = hoveredMember === member.id;

        return (
          <div
            key={member.id}
            className="relative flex-shrink-0"
            style={{ marginLeft: idx === 0 ? 6 : 0 }}
            onMouseEnter={() => setHoveredMember(member.id)}
            onMouseLeave={() => setHoveredMember(null)}
            onClick={e => {
              e.stopPropagation();
              openMemberModal(member.id);
            }}
          >
            <img
              src={member.photo}
              alt={isMet ? member.name : 'Unknown'}
              draggable={false}
              className={[
                'w-10 h-10 rounded-full border-2 transition-all select-none',
                isMet
                  ? 'border-white grayscale-0 cursor-pointer hover:scale-110 hover:shadow-[0_0_18px_rgba(255,255,255,0.55)]'
                  : 'border-gray-600 grayscale opacity-30 cursor-not-allowed',
                isMet && isHovered ? 'shadow-[0_0_22px_rgba(255,255,255,0.75)]' : '',
              ].join(' ')}
            />
          </div>
        );
      })}
    </div>
  </div>
));

MetBar.displayName = 'MetBar';

export default function BeaverGame() {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isGameOver: false,
    score: 0,
    highScore: 0,
    speed: 6,
  });

  const isMobile = useIsMobile(640);

  const [hitMember, setHitMember] = useState<TeamMember | null>(null);
  const [metMembers, setMetMembers] = useState<string[]>([]);
  const [laneWidth, setLaneWidth] = useState(0);

  const [obstacles, setObstacles] = useState<ObstacleState[]>([]);
  const [beaverBottom, setBeaverBottom] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [yVelocity, setYVelocity] = useState(0);
  const [groundOffset, setGroundOffset] = useState(0);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const beaverRef = useRef<HTMLDivElement | null>(null);
  const laneRef = useRef<HTMLDivElement | null>(null);
  const obstacleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const metBarRef = useRef<HTMLDivElement | null>(null);

  const isPlayingRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const scoreAccRef = useRef(0);
  const speedScaleRef = useRef(1);

  const yRef = useRef(0);
  const vyRef = useRef(0);
  const jumpingRef = useRef(false);

  const obstaclesRef = useRef<ObstacleState[]>([]);
  const nextWaveRef = useRef(0);
  const pendingClusterRef = useRef(0);
  const nextInClusterRef = useRef(0);

  // Responsive numeric layout values
  const padX = isMobile ? '5vw' : '14vw';
  const laneTop = isMobile ? '38%' : '34%';
  const laneHeightPx = isMobile ? 200 : 240;
  const groundH = 12;

  const obstacleSize = isMobile ? 52 : 55;
  const spawnPad = 120;

  const BASE_SPEED_PX_PER_MS = 0.45;
  const JUMP_SPEED = 0.62;
  const GRAVITY = 0.00255;

  const randBetween = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const resetSim = useCallback(() => {
    lastTimeRef.current = null;
    scoreAccRef.current = 0;
    speedScaleRef.current = 1;

    yRef.current = 0;
    vyRef.current = 0;
    jumpingRef.current = false;

    obstaclesRef.current = [];
    setObstacles([]);

    setBeaverBottom(0);
    setYVelocity(0);
    setIsJumping(false);

    setGroundOffset(0);

    nextWaveRef.current = 600;
    pendingClusterRef.current = 0;
    nextInClusterRef.current = 0;
  }, []);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('highScore');
    const savedMetMembers = localStorage.getItem('metMembers');
    if (savedHighScore) setGameState(prev => ({ ...prev, highScore: parseInt(savedHighScore) }));
    if (savedMetMembers) setMetMembers(JSON.parse(savedMetMembers));
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!laneRef.current) return;
      setLaneWidth(laneRef.current.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  useEffect(() => {
    isPlayingRef.current = gameState.isPlaying;
  }, [gameState.isPlaying]);

  const markMet = useCallback((memberId: string) => {
    setMetMembers(prev => {
      if (prev.includes(memberId)) return prev;
      const updated = [...prev, memberId];
      localStorage.setItem('metMembers', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const endGame = useCallback(
    (member: TeamMember) => {
      if (!isPlayingRef.current) return;

      isPlayingRef.current = false;
      markMet(member.id);

      setGameState(prev => {
        const newHighScore = Math.max(prev.score, prev.highScore);
        localStorage.setItem('highScore', newHighScore.toString());
        return { ...prev, isPlaying: false, isGameOver: true, highScore: newHighScore };
      });

      setHitMember(member);

      jumpingRef.current = false;
      vyRef.current = 0;
      setIsJumping(false);
      setYVelocity(0);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    },
    [markMet]
  );

  const boxesOverlap = (a: DOMRect, b: DOMRect) =>
    a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

  const checkCollision = useCallback(() => {
    if (jumpingRef.current) return;

    const beaverEl = beaverRef.current;
    if (!beaverEl) return;

    const b0 = beaverEl.getBoundingClientRect();
    const shrink = 14;

    const b = new DOMRect(
      b0.x + shrink,
      b0.y + shrink,
      Math.max(0, b0.width - shrink * 2),
      Math.max(0, b0.height - shrink * 2)
    );

    for (const obs of obstaclesRef.current) {
      const el = obstacleRefs.current[obs.id];
      if (!el) continue;
      const o0 = el.getBoundingClientRect();
      if (boxesOverlap(b, o0)) {
        endGame(obs.member);
        return;
      }
    }
  }, [endGame]);

  const spawnOne = useCallback(() => {
    const member = teamMembers[Math.floor(Math.random() * teamMembers.length)];
    const id = `${Date.now()}-${Math.random()}`;
    const startX = laneWidth + spawnPad;

    const next = [...obstaclesRef.current, { id, member, x: startX }];
    obstaclesRef.current = next;
    setObstacles(next);
  }, [laneWidth]);

  const updateLoop = useCallback(
    (time: number) => {
      if (!isPlayingRef.current) return;

      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const delta = Math.min(40, time - lastTimeRef.current);
      lastTimeRef.current = time;

      const speedScale = speedScaleRef.current;
      const speedPxPerMs = BASE_SPEED_PX_PER_MS * speedScale;

      scoreAccRef.current += delta;
      if (scoreAccRef.current >= 120) {
        const steps = Math.floor(scoreAccRef.current / 120);
        scoreAccRef.current -= steps * 120;

        setGameState(prev => {
          const nextScore = prev.score + steps;
          const nextSpeed = Math.min(18, 6 + Math.floor(nextScore / 140));
          speedScaleRef.current = 1 + (nextSpeed - 6) * 0.06;
          return { ...prev, score: nextScore, speed: nextSpeed };
        });
      }

      setGroundOffset(prev => prev + speedPxPerMs * delta);

      if (jumpingRef.current) {
        yRef.current += vyRef.current * delta;
        vyRef.current -= GRAVITY * delta;

        if (yRef.current <= 0) {
          yRef.current = 0;
          vyRef.current = 0;
          jumpingRef.current = false;
        }

        setBeaverBottom(yRef.current);
        setYVelocity(vyRef.current);
        setIsJumping(jumpingRef.current);
      }

      const obs = obstaclesRef.current;
      if (obs.length) {
        const moved = obs
          .map(o => ({ ...o, x: o.x - speedPxPerMs * delta }))
          .filter(o => o.x > -obstacleSize - 200);

        if (moved.length !== obs.length) {
          for (const old of obs) {
            if (!moved.find(n => n.id === old.id)) delete obstacleRefs.current[old.id];
          }
        }

        obstaclesRef.current = moved;
        setObstacles(moved);
      }

      if (pendingClusterRef.current > 0) {
        nextInClusterRef.current -= delta;
        if (nextInClusterRef.current <= 0) {
          spawnOne();
          pendingClusterRef.current -= 1;

          const jumpableGapPx = Math.max(160, 210 - (speedScale - 1) * 40);
          const gapMs = jumpableGapPx / speedPxPerMs;
          nextInClusterRef.current = gapMs;
        }
      } else {
        nextWaveRef.current -= delta;
        if (nextWaveRef.current <= 0) {
          const roll = Math.random();
          const clusterSize = roll < 0.35 ? 2 : 1;

          pendingClusterRef.current = clusterSize;
          nextInClusterRef.current = 0;

          const waveMin = 700;
          const waveMax = 1500;
          nextWaveRef.current = randBetween(waveMin, waveMax) / Math.max(1, speedScale);
        }
      }

      checkCollision();
      rafRef.current = requestAnimationFrame(updateLoop);
    },
    [checkCollision, spawnOne, obstacleSize]
  );

  const jump = useCallback(() => {
    if (!isPlayingRef.current) return;
    if (jumpingRef.current) return;

    jumpingRef.current = true;
    vyRef.current = JUMP_SPEED;
    setIsJumping(true);
    setYVelocity(vyRef.current);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space' && e.key !== ' ') return;
      e.preventDefault();
      jump();
    };

    const onClick = (e: MouseEvent) => {
      if (!isPlayingRef.current) return;

      const target = e.target as Node | null;

      // don't jump when interacting with met bar or modal
      if (metBarRef.current && target && metBarRef.current.contains(target)) return;
      if (selectedMember) return;

      jump();
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick);
    };
  }, [jump, selectedMember]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  const startGame = useCallback(() => {
    if (!laneWidth) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    resetSim();
    setHitMember(null);
    setSelectedMember(null);

    isPlayingRef.current = true;

    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isGameOver: false,
      score: 0,
      speed: 6,
      highScore: prev.highScore,
    }));

    rafRef.current = requestAnimationFrame(updateLoop);
  }, [laneWidth, resetSim, updateLoop]);

  const displayHigh = useMemo(() => gameState.highScore.toString().padStart(5, '0'), [gameState.highScore]);
  const displayScore = useMemo(() => gameState.score.toString().padStart(5, '0'), [gameState.score]);

  const groundStyle = useMemo(() => {
    const x = -(groundOffset % 100000);
    return {
      backgroundImage: 'url(/teamGame-assets/ground.png)',
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto 100%',
      backgroundPositionX: `${x}px`,
      backgroundPositionY: '0px',
    } as React.CSSProperties;
  }, [groundOffset]);

  const openMemberModal = useCallback(
    (id: string) => {
      // Read metMembers from state directly instead of closure
      setMetMembers(currentMet => {
        if (!currentMet.includes(id)) return currentMet; // Don't open if not met
        
        const member = teamMembers.find(m => m.id === id) || null;
        setSelectedMember(member);
        
        return currentMet; // Return unchanged
      });
    },
    [] // Empty deps - no re-renders!
  );

  return (
    <div className="relative w-full h-[80vh] bg-black overflow-hidden font-rubik">
      {/* Mobile Drawer */}
      {selectedMember && isMobile && (
        <Drawer open={true} onOpenChange={() => setSelectedMember(null)}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    className="w-16 h-16 rounded-xl object-cover border border-black/10"
                  />
                  <div>
                    <DrawerTitle className="text-xl">{selectedMember.name}</DrawerTitle>
                    <DrawerDescription className="text-sm">
                      Team {selectedMember.team}
                    </DrawerDescription>
                  </div>
                </div>
              </DrawerHeader>

              <div className="px-4 pb-6">
                <div className="mb-4 text-sm text-gray-700 italic">
                  "{selectedMember.oneLiner}"
                </div>

                {/* Social media icons - only show if available */}
                {selectedMember.socials && (
                  <div className="flex gap-3 mb-4">
                    {selectedMember.socials.linkedin && (
                      <a
                        href={selectedMember.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faLinkedin} className="text-lg text-gray-700" />
                      </a>
                    )}
                    
                    {selectedMember.socials.instagram && (
                      <a
                        href={selectedMember.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <FontAwesomeIcon icon={faInstagram} className="text-lg text-gray-700" />
                      </a>
                    )}
                  </div>
                )}

                <DrawerClose asChild>
                  <button className="w-full py-2 bg-black text-white rounded-lg hover:bg-black/80">
                    Close
                  </button>
                </DrawerClose>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}

      {/* Desktop Modal */}
      {selectedMember && !isMobile && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="w-full max-w-[420px] rounded-2xl bg-white text-black shadow-2xl p-6 animate-in slide-in-from-bottom-4 duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  className="w-16 h-16 rounded-xl object-cover border border-black/10 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-lg font-semibold truncate">{selectedMember.name}</div>
                  <div className="text-sm text-gray-600 truncate">Team {selectedMember.team}</div>
                </div>
              </div>

              <button
                className="rounded-lg px-3 py-1 text-sm bg-black text-white hover:bg-black/80 flex-shrink-0"
                onClick={() => setSelectedMember(null)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-700 italic">
              "{selectedMember.oneLiner}"
            </div>

            {/* Social media icons - only show if available */}
            {selectedMember.socials && (
              <div className="mt-5 flex gap-4">
                {selectedMember.socials.linkedin && (
                  <a
                    href={selectedMember.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-lg text-gray-700" />
                  </a>
                )}
                
                {selectedMember.socials.instagram && (
                  <a
                    href={selectedMember.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-lg text-gray-700" />
                  </a>
                )}
              </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
              Press <span className="font-semibold">Esc</span> or click outside to close.
            </div>
          </div>
        </div>
      )}

      {/* Header (responsive) */}
      <div className="absolute z-30 left-0 right-0 top-0 px-4 sm:px-12 pt-4 sm:pt-10">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {!gameState.isGameOver ? (
              <>
                <h1
                  className="
                    text-[28px] leading-[0.95] sm:text-6xl sm:leading-none
                    text-white font-luckiest
                    whitespace-normal
                  "
                  style={{
                    maxWidth: isMobile ? '72vw' : 'none',
                  }}
                >
                  Meet our Team
                </h1>

                <p className="hidden sm:block text-xl text-white mt-2">
                  Made with 💗 by{' '}
                  <a
                    href="https://www.instagram.com/hackcanada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @hackcanada
                  </a>
                  {' '}/{' '}
                  <a
                    href="https://www.instagram.com/hackathoncanada/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @hackathoncanada
                  </a>
                </p>

                <p className="sm:hidden text-xs text-white/80 mt-2">
                  Tap/click to jump
                </p>
              </>
            ) : (
              <>
                <h1
                  className="
                    text-[28px] leading-[0.95] sm:text-6xl sm:leading-none
                    text-white font-luckiest
                    whitespace-normal
                  "
                  style={{ maxWidth: isMobile ? '72vw' : 'none' }}
                >
                  YOU HIT {hitMember?.name.toUpperCase()}!
                </h1>
                <p className="text-sm sm:text-xl text-white/90 mt-2">
                  Team {hitMember?.team}
                </p>
                <p className="text-[10px] sm:text-base text-white/75 italic mt-0.5 sm:mt-1 max-w-[55vw] sm:max-w-none">
                  "{hitMember?.oneLiner}"
                </p>
              </>
            )}
          </div>

          {/* Score */}
          <div className="shrink-0 text-white font-mono text-lg sm:text-2xl whitespace-nowrap">
            <span className="opacity-80 mr-4">HI {displayHigh}</span>
            <span className="tracking-wider">{displayScore}</span>
          </div>
        </div>
      </div>

      {/* Start / Restart */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* MOBILE */}
        <div className="sm:hidden">
          {!gameState.isPlaying && !gameState.isGameOver && (
            <div className="mt-[22vh] px-4">
              <button
                onClick={startGame}
                className="w-full px-6 py-3 bg-white text-black text-xl font-bold rounded-xl hover:bg-gray-200 transition-colors pointer-events-auto"
              >
                TAP TO START
              </button>
            </div>
          )}

          {gameState.isGameOver && (
            <div className="mt-[26vh] px-4">
              <button
                onClick={startGame}
                className="w-full max-w-[520px] mx-auto px-6 py-3 bg-white text-black text-xl font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 pointer-events-auto"
              >
                <span className="text-2xl">↻</span>
                RESTART
              </button>
            </div>
          )}
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:flex absolute inset-0 items-center justify-center">
          {!gameState.isPlaying && !gameState.isGameOver && (
            <button
              onClick={startGame}
              className="px-8 py-4 bg-white text-black text-2xl font-bold rounded-xl hover:bg-gray-200 transition-colors pointer-events-auto"
            >
              TAP TO START
            </button>
          )}

          {gameState.isGameOver && (
            <button
              onClick={startGame}
              className="px-10 py-5 bg-white text-black text-2xl font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-3 pointer-events-auto"
            >
              <span className="text-3xl">↻</span>
              RESTART
            </button>
          )}
        </div>
      </div>

      {/* Lane */}
      <div className="absolute left-0 w-full z-10" style={{ top: laneTop, height: `${laneHeightPx}px` }}>
        <div
          ref={laneRef}
          className="relative h-full"
          style={{
            width: `calc(100% - (${padX} * 2))`,
            marginLeft: padX,
            marginRight: padX,
            overflow: 'hidden',
          }}
        >
          {(gameState.isPlaying || gameState.isGameOver) && (
            <Beaver
              ref={beaverRef as any}
              bottom={beaverBottom}
              isJumping={isJumping}
              yVelocity={yVelocity}
              isGameOver={gameState.isGameOver}
            />
          )}

          {obstacles.map(o => (
            <Obstacle
              key={o.id}
              ref={el => {
                obstacleRefs.current[o.id] = el;
              }}
              member={o.member}
              x={o.x}
              size={obstacleSize}
              groundOffsetPx={groundH}
            />
          ))}

          <div className="absolute left-0 bottom-0 w-full" style={{ height: `${groundH}px` }}>
            <div className="absolute top-0 left-0 w-full h-full" style={groundStyle} />
          </div>
        </div>
      </div>

      {/* Met bar with memoized component */}
      <div
        ref={metBarRef}
        className="absolute z-50 text-white pointer-events-auto left-4 right-4 bottom-2 sm:left-12 sm:right-12 sm:bottom-8"
      >
        <div className="text-sm sm:text-xl mb-2 sm:mb-3">
          Team Members Met: {metMembers.length}/{teamMembers.length}
        </div>

        <MetBar 
          metMembers={metMembers}
          teamMembers={teamMembers}
          isMobile={isMobile}
          openMemberModal={openMemberModal}
          hoveredMember={hoveredMember}
          setHoveredMember={setHoveredMember}
        />
      </div>
    </div>
  );
}