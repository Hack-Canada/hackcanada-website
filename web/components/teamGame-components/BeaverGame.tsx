// BeaverGame.tsx
'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { teamMembers, TeamMember } from '@/lib/teamGameData';
import Beaver from './Beaver';
import Obstacle from './Obstacle';
import Leaderboard from './Leaderboard';
import { ToastContainer } from '@/components/ui/Toast';
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
  <div
    className="overflow-x-auto overflow-y-visible scrollbar-hide w-full max-w-full"
    style={{
      height: isMobile ? 80 : 140,
      paddingTop: isMobile ? 8 : 18,
      paddingBottom: isMobile ? 8 : 18,
      WebkitOverflowScrolling: 'touch',
    }}
  >
    <div
      className="grid grid-flow-col grid-rows-2 items-center w-max mx-auto px-4"
      style={{
        gridAutoColumns: isMobile ? 36 : 56,
        gap: isMobile ? 8 : 16,
      }}
    >
      {teamMembers.map((member) => {
        const isMet = metMembers.includes(member.id);
        const isHovered = hoveredMember === member.id;

        return (
          <div
            key={member.id}
            className="relative flex-shrink-0"
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
                'rounded-full border-2 transition-all select-none',
                isMet
                  ? 'border-white grayscale-0 cursor-pointer hover:scale-110 hover:shadow-[0_0_18px_rgba(255,255,255,0.55)]'
                  : 'border-gray-600 grayscale opacity-30 cursor-not-allowed',
                isMet && isHovered ? 'shadow-[0_0_22px_rgba(255,255,255,0.75)]' : '',
              ].join(' ')}
              style={{
                width: isMobile ? 32 : 48,
                height: isMobile ? 32 : 48,
              }}
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
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type?: 'success' | 'error' | 'info' }>>([]);
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [pendingScore, setPendingScore] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const beaverRef = useRef<HTMLDivElement | null>(null);
  const laneRef = useRef<HTMLDivElement | null>(null);
  const obstacleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const metBarRef = useRef<HTMLDivElement | null>(null);

  const isPlayingRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const scoreAccRef = useRef(0);
  const speedScaleRef = useRef(1);
  const currentScoreRef = useRef(0);

  const yRef = useRef(0);
  const vyRef = useRef(0);
  const jumpingRef = useRef(false);

  const obstaclesRef = useRef<ObstacleState[]>([]);
  const nextWaveRef = useRef(0);
  const pendingClusterRef = useRef(0);
  const nextInClusterRef = useRef(0);

  const padX = isMobile ? '5vw' : '14vw';
  const laneTop = isMobile ? '38%' : '34%';
  const laneHeightPx = isMobile ? 200 : 240;
  const groundH = 12;

  const obstacleSize = isMobile ? 52 : 70;
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
    const savedUsername = localStorage.getItem('gameUsername');
    if (savedUsername) {
      setUsername(savedUsername);
    }
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

  // Keep score ref in sync with state
  useEffect(() => {
    currentScoreRef.current = gameState.score;
  }, [gameState.score]);

  const markMet = useCallback((memberId: string) => {
    setMetMembers(prev => {
      if (prev.includes(memberId)) return prev;
      const updated = [...prev, memberId];
      localStorage.setItem('metMembers', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const submitScore = useCallback(async (username: string, score: number) => {
    console.log('submitScore called with:', { username, score });
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          score: score,
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit score');
        }
        throw new Error('Failed to submit score');
      }

      const data = await response.json();
      
      // Check if score wasn't updated because it's lower than existing
      if (data.scoreNotUpdated) {
        addToast(`💪 Your best score is ${data.existingScore}. Try again to beat it!`, 'info');
      } else {
        // Show success toast
        if (data.rank && data.rank <= 10) {
          addToast(`🎉 New High Score! You're ranked #${data.rank}!`, 'success');
        } else {
          addToast('Score submitted successfully!', 'success');
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error submitting score:', error);
      addToast(error instanceof Error ? error.message : 'Failed to submit score', 'error');
      throw error;
    }
  }, [addToast]);

  const endGame = useCallback(
    async (member: TeamMember) => {
      if (!isPlayingRef.current) return;

      isPlayingRef.current = false;
      markMet(member.id);

      // Check if this is a new high score before updating state
      // Use ref to get the most current score value
      const currentScore = currentScoreRef.current || gameState.score;
      const currentHighScore = gameState.highScore;
      const isNewHighScore = currentScore > currentHighScore;

      setGameState(prev => {
        const newHighScore = Math.max(prev.score, prev.highScore);
        localStorage.setItem('highScore', newHighScore.toString());
        return { ...prev, isPlaying: false, isGameOver: true, highScore: newHighScore };
      });

      // Show toast if new high score achieved
      if (isNewHighScore) {
        setTimeout(() => {
          addToast(`🏆 New Personal Best: ${currentScore} points!`, 'success');
        }, 500);
      }

      setHitMember(member);

      jumpingRef.current = false;
      vyRef.current = 0;
      setIsJumping(false);
      setYVelocity(0);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;

      // Check if username exists, if not prompt for it
      const savedUsername = localStorage.getItem('gameUsername');
      console.log('Game ended. Score from ref:', currentScoreRef.current, 'Score from state:', gameState.score, 'Using:', currentScore, 'Username:', savedUsername);
      if (savedUsername && savedUsername.trim()) {
        // Username exists, automatically submit score
        try {
          console.log('Submitting score:', currentScore, 'for user:', savedUsername.trim());
          await submitScore(savedUsername.trim(), currentScore);
          setShowLeaderboard(true);
        } catch (error) {
          console.error('Auto-submit failed:', error);
          setShowLeaderboard(true);
        }
      } else {
        // New user - prompt for username
        console.log('New user, prompting for username. Score:', currentScore);
        setPendingScore(currentScore);
        setShowUsernamePrompt(true);
      }
    },
    [markMet, submitScore, addToast]
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
          currentScoreRef.current = nextScore; // Keep ref in sync
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
      if (e.key === 'Escape') {
        // Don't close username prompt - username is required
        if (showUsernamePrompt) return;
        setSelectedMember(null);
        setShowLeaderboard(false);
      }
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [showUsernamePrompt]);

  const startGame = useCallback(() => {
    if (!laneWidth) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    resetSim();
    setHitMember(null);
    setSelectedMember(null);

    isPlayingRef.current = true;
    currentScoreRef.current = 0; // Reset score ref

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

  const openMemberModal = useCallback((id: string) => {
    setMetMembers(currentMet => {
      if (!currentMet.includes(id)) return currentMet;

      const member = teamMembers.find(m => m.id === id) || null;
      setSelectedMember(member);

      return currentMet;
    });
  }, []);

  return (
    <div className="relative w-full overflow-visible">
      <img
        src="/teamGame-assets/mountain-like.svg"
        alt=""
        draggable={false}
        className="absolute left-0 top-0 w-full h-auto pointer-events-none select-none z-[60] -translate-y-[85%]"
      />

      <div className="relative w-screen sm:w-screen h-[80vh] sm:h-screen bg-black overflow-hidden font-rubik">
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
                      <DrawerDescription className="text-sm">Team {selectedMember.team}</DrawerDescription>
                    </div>
                  </div>
                </DrawerHeader>

                <div className="px-4 pb-6">
                  <div className="mb-4 text-sm text-gray-700 italic">"{selectedMember.oneLiner}"</div>

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
                    <button className="w-full py-2 bg-black text-white rounded-lg hover:bg-black/80">Close</button>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}

        {selectedMember && !isMobile && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 animate-in fade-in duration-200"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="w-full max-w-[520px] rounded-2xl bg-white text-black shadow-2xl p-8 animate-in slide-in-from-bottom-4 duration-300"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-5 min-w-0">
                  <img
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    className="w-24 h-24 rounded-xl object-cover border border-black/10 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-2xl font-semibold truncate">{selectedMember.name}</div>
                    <div className="text-base text-gray-600 truncate">Team {selectedMember.team}</div>
                  </div>
                </div>

                <button
                  className="rounded-lg px-4 py-2 text-base bg-black text-white hover:bg-black/80 flex-shrink-0"
                  onClick={() => setSelectedMember(null)}
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 text-base text-gray-700 italic">"{selectedMember.oneLiner}"</div>

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

        <div className="absolute z-30 left-0 right-0 top-0 px-4 sm:px-12 pt-10 sm:pt-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {!gameState.isGameOver ? (
                <>
                  <h1
                    className="text-[28px] leading-[0.95] sm:text-6xl sm:leading-none text-white font-luckiest whitespace-normal"
                    style={{ maxWidth: isMobile ? '72vw' : 'none' }}
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

                  <p className="sm:hidden text-xs text-white/80 mt-2">Tap/click to jump</p>
                </>
              ) : (
                <>
                  <h1
                    className="text-[28px] leading-[0.95] sm:text-6xl sm:leading-none text-white font-luckiest whitespace-normal"
                    style={{ maxWidth: isMobile ? '72vw' : 'none' }}
                  >
                    YOU HIT {hitMember?.name.toUpperCase()}!
                  </h1>
                  <p className="text-sm sm:text-xl text-white/90 mt-2">Team {hitMember?.team}</p>
                  <p className="text-[10px] sm:text-base text-white/75 italic mt-0.5 sm:mt-1 max-w-[55vw] sm:max-w-none">
                    "{hitMember?.oneLiner}"
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="shrink-0 text-white font-mono text-lg sm:text-2xl whitespace-nowrap">
                <span className="opacity-80 mr-4">HI {displayHigh}</span>
                <span className="tracking-wider">{displayScore}</span>
              </div>
              <button
                onClick={() => setShowLeaderboard(true)}
                className="shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm sm:text-base font-semibold transition-colors backdrop-blur-sm"
              >
                🏆 Leaderboard
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-30 pointer-events-none">
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

        <div className="absolute left-0 w-full z-0" style={{ top: laneTop, height: `${laneHeightPx}px` }}>
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

        <div
          ref={metBarRef}
          className="absolute z-50 text-white pointer-events-auto left-0 right-0 bottom-0 sm:bottom-8 flex flex-col items-center pb-2"
        >
          <div className="text-sm sm:text-xl mb-2 sm:mb-3 mt-2">
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

      {/* Username Prompt Modal */}
      {showUsernamePrompt && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 px-4 animate-in fade-in duration-200"
          onClick={(e) => {
            // Don't close on backdrop click - username is required
            e.stopPropagation();
          }}
        >
          <div
            className="w-full max-w-[400px] rounded-2xl bg-white text-black shadow-2xl p-6 sm:p-8 animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Enter Your Username</h2>
            <p className="text-sm text-gray-600 mb-4">
              Your score: <span className="font-bold text-lg">{pendingScore}</span>
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Enter a username to submit your score to the leaderboard.
            </p>
            <input
              type="text"
              id="username-input"
              placeholder="Your username"
              maxLength={20}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  const input = e.currentTarget;
                  const username = input.value.trim();
                  if (username.length === 0) return;
                  
                  // Sanitize username
                  const sanitized = username.slice(0, 20).replace(/[^a-zA-Z0-9\s\-_]/g, '');
                  if (sanitized.length === 0) {
                    addToast('Invalid username format', 'error');
                    return;
                  }
                  
                  // Save username
                  localStorage.setItem('gameUsername', sanitized);
                  setUsername(sanitized);
                  
                  // Submit score
                  try {
                    await submitScore(sanitized, pendingScore || 0);
                    setShowUsernamePrompt(false);
                    setPendingScore(null);
                    setShowLeaderboard(true);
                  } catch (error) {
                    console.error('Failed to submit score:', error);
                    // Still close prompt and show leaderboard
                    setShowUsernamePrompt(false);
                    setPendingScore(null);
                    setShowLeaderboard(true);
                  }
                }
              }}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  const input = document.getElementById('username-input') as HTMLInputElement;
                  const username = input?.value.trim() || '';
                  if (username.length === 0) {
                    addToast('Please enter a username', 'error');
                    return;
                  }
                  
                  // Sanitize username
                  const sanitized = username.slice(0, 20).replace(/[^a-zA-Z0-9\s\-_]/g, '');
                  if (sanitized.length === 0) {
                    addToast('Invalid username format', 'error');
                    return;
                  }
                  
                  // Save username
                  localStorage.setItem('gameUsername', sanitized);
                  setUsername(sanitized);
                  
                  // Submit score
                  try {
                    await submitScore(sanitized, pendingScore || 0);
                    setShowUsernamePrompt(false);
                    setPendingScore(null);
                    setShowLeaderboard(true);
                  } catch (error) {
                    console.error('Failed to submit score:', error);
                    // Still close prompt and show leaderboard
                    setShowUsernamePrompt(false);
                    setPendingScore(null);
                    setShowLeaderboard(true);
                  }
                }}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Submit Score
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              This username will be saved for future games
            </p>
          </div>
        </div>
      )}

      <Leaderboard
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        username={username}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
