import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rot: number;
  opacity: number;
}

interface StopInfo {
  id: string;
  pose: 'peek' | 'walk' | 'stand' | 'sit' | 'basket';
  facing: 'left' | 'right';
  bubbleText?: string;
  // Fractional screen position when stopped [xPercent (0-1), yPercent (0-1)]
  screenX: number;
  screenY: number;
  scale: number;
}

export const PupScrollJourney: React.FC = () => {
  const { pathname } = useLocation();

  // Strictly homepage only
  if (pathname !== '/') {
    return null;
  }

  const [pos, setPos] = useState({ x: 0, y: 0, scale: 0.55, facing: 'right' as 'left' | 'right' });
  const [pose, setPose] = useState<'peek' | 'walk' | 'stand' | 'sit' | 'basket'>('peek');
  const [isWalking, setIsWalking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [prints, setPrints] = useState<PawPrint[]>([]);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const walkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const distanceSincePrint = useRef(0);
  const nextPrintId = useRef(0);
  const nextHeartId = useRef(0);

  // Set html[data-pup="live"] so static mascot placeholders are hidden seamlessly
  useEffect(() => {
    document.documentElement.dataset.pup = 'live';
    return () => {
      delete document.documentElement.dataset.pup;
    };
  }, []);

  // Compute positions of stops dynamically based on actual viewport and document elements
  const getStops = useCallback((): { startY: number; endY: number; stop: StopInfo }[] => {
    if (typeof window === 'undefined') return [];

    const w = window.innerWidth;
    const h = window.innerHeight;
    const docH = Math.max(
      document.documentElement.scrollHeight - h,
      document.body.scrollHeight - h,
      4000
    );

    const getElY = (id: string, fallback: number) => {
      const el = document.getElementById(id);
      if (!el) return fallback;
      return el.getBoundingClientRect().top + window.scrollY;
    };
    const getElH = (id: string, fallback: number) => {
      const el = document.getElementById(id);
      return el ? el.offsetHeight : fallback;
    };

    // Stop 0: Hero lineup center arch
    const heroCenterEl = document.getElementById('hero-mascot-center');
    const heroCenterRect = heroCenterEl?.getBoundingClientRect();
    const heroX = heroCenterRect ? (heroCenterRect.left + heroCenterRect.width / 2) / w : 0.5;
    const heroY = heroCenterRect ? heroCenterRect.bottom / h : 0.75;
    const s0: StopInfo = {
      id: 'hero',
      pose: 'peek',
      facing: 'right',
      bubbleText: 'hm?',
      screenX: heroX,
      screenY: heroY,
      scale: w < 640 ? 0.44 : 0.56,
    };

    // Stop 1: Meet the pups (Standing on top of wooden floorboard, left rail)
    const meetTop = getElY('section-meet', h * 0.9);
    const meetHeight = getElH('section-meet', h * 1.8);
    const platformEl = document.getElementById('meet-wooden-platform');
    const platformY = platformEl ? platformEl.getBoundingClientRect().top : h - 64;
    const s1: StopInfo = {
      id: 'meet',
      pose: 'stand',
      facing: 'right',
      bubbleText: 'meet the pups!',
      screenX: w < 768 ? 0.22 : 0.16,
      screenY: platformY / h,
      scale: w < 640 ? 0.42 : 0.52,
    };

    // Stop 2: Two Ways to meet your puppy (Center by signpost)
    const waysTop = getElY('section-two-ways', meetTop + meetHeight);
    const s2: StopInfo = {
      id: 'ways',
      pose: 'stand',
      facing: 'right',
      bubbleText: 'which way?',
      screenX: 0.5,
      screenY: 0.46,
      scale: w < 640 ? 0.42 : 0.5,
    };

    // Stop 3: Guided Adoption / WhatsApp Chat (Left side of phone)
    const chatTop = getElY('section-guided-adoption', waysTop + 900);
    const s3: StopInfo = {
      id: 'chat',
      pose: 'sit',
      facing: 'right',
      bubbleText: 'say hello!',
      screenX: w < 1024 ? 0.48 : 0.41,
      screenY: 0.54,
      scale: w < 640 ? 0.4 : 0.48,
    };

    // Stop 4: Happy Families (Near photowall)
    const famTop = getElY('section-happy-families', chatTop + 900);
    const s4: StopInfo = {
      id: 'families',
      pose: 'sit',
      facing: 'right',
      bubbleText: 'so cute!',
      screenX: w < 768 ? 0.55 : 0.62,
      screenY: 0.62,
      scale: w < 640 ? 0.42 : 0.5,
    };

    // Stop 5: Cozy Porch / Welcome Home
    const porchTop = getElY('section-porch', famTop + 1000);
    const s5: StopInfo = {
      id: 'porch',
      pose: 'stand',
      facing: 'right',
      bubbleText: 'welcome home!',
      screenX: w < 768 ? 0.36 : 0.38,
      screenY: 0.64,
      scale: w < 640 ? 0.42 : 0.5,
    };

    // Stop 6: Footer (Inside basket under moon)
    const s6: StopInfo = {
      id: 'footer',
      pose: 'basket',
      facing: 'right',
      bubbleText: 'sweet dreams ♥',
      screenX: w < 768 ? 0.22 : 0.16,
      screenY: (h - 95) / h,
      scale: w < 640 ? 0.44 : 0.54,
    };

    return [
      { startY: 0, endY: 150, stop: s0 },
      { startY: meetTop + 50, endY: meetTop + meetHeight - h * 0.4, stop: s1 },
      { startY: waysTop - 80, endY: waysTop + 240, stop: s2 },
      { startY: chatTop - 60, endY: chatTop + 320, stop: s3 },
      { startY: famTop - 60, endY: famTop + 300, stop: s4 },
      { startY: porchTop - 80, endY: porchTop + 260, stop: s5 },
      { startY: docH - 180, endY: docH + 200, stop: s6 },
    ];
  }, []);

  // Main scroll loop using requestAnimationFrame
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updatePuppyPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    const updatePuppyPosition = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const stops = getStops();
      if (!stops.length) return;

      // Detect if moving
      if (Math.abs(scrollDelta) > 1.5) {
        setIsWalking(true);
        if (walkTimer.current) clearTimeout(walkTimer.current);
        walkTimer.current = setTimeout(() => {
          setIsWalking(false);
        }, 220);
      }

      // Find current waypoint bracket
      let currentIdx = 0;
      let inPauseRange = false;
      let targetX = w * stops[0].stop.screenX;
      let targetY = h * stops[0].stop.screenY;
      let targetScale = stops[0].stop.scale;
      let targetPose = stops[0].stop.pose;
      let activeBubble = stops[0].stop.bubbleText || null;

      // 1. Check if inside any stop's paused rest range
      for (let i = 0; i < stops.length; i++) {
        const item = stops[i];
        if (currentScrollY >= item.startY && currentScrollY <= item.endY) {
          currentIdx = i;
          inPauseRange = true;
          targetX = w * item.stop.screenX;
          targetY = h * item.stop.screenY;
          targetScale = item.stop.scale;
          targetPose = item.stop.pose;
          activeBubble = item.stop.bubbleText || null;
          break;
        }
      }

      // 2. If between two stops, interpolate smoothly along a curved Bézier path!
      if (!inPauseRange) {
        if (currentScrollY < stops[0].startY) {
          const first = stops[0].stop;
          targetX = w * first.screenX;
          targetY = h * first.screenY;
          targetScale = first.scale;
          targetPose = first.pose;
          activeBubble = first.bubbleText || null;
        } else if (currentScrollY > stops[stops.length - 1].endY) {
          const last = stops[stops.length - 1].stop;
          targetX = w * last.screenX;
          targetY = h * last.screenY;
          targetScale = last.scale;
          targetPose = last.pose;
          activeBubble = last.bubbleText || null;
        } else {
          for (let i = 0; i < stops.length - 1; i++) {
            if (currentScrollY >= stops[i].endY && currentScrollY <= stops[i + 1].startY) {
              const fromStop = stops[i];
              const toStop = stops[i + 1];
              const range = Math.max(1, toStop.startY - fromStop.endY);
              const rawT = Math.min(1, Math.max(0, (currentScrollY - fromStop.endY) / range));
              // Smooth easeInOut cubic
              const t = rawT < 0.5 ? 4 * rawT * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

              const p0X = w * fromStop.stop.screenX;
              const p0Y = h * fromStop.stop.screenY;
              const p1X = w * toStop.stop.screenX;
              const p1Y = h * toStop.stop.screenY;

              // Gentle natural sway offset between stops
              const sway = Math.sin(t * Math.PI) * (w * 0.08) * (i % 2 === 0 ? -1 : 1);

              targetX = p0X + (p1X - p0X) * t + sway;
              targetY = p0Y + (p1Y - p0Y) * t;
              targetScale = fromStop.stop.scale + (toStop.stop.scale - fromStop.stop.scale) * t;
              targetPose = 'walk';
              activeBubble = null;
              break;
            }
          }
        }
      }

      // Determine facing direction
      const dx = targetX - lastPos.current.x;
      let facing: 'left' | 'right' = 'right';
      if (Math.abs(dx) > 1) {
        facing = dx >= 0 ? 'right' : 'left';
      }

      // Drop paw prints along travel path
      const moveDist = Math.hypot(targetX - lastPos.current.x, targetY - lastPos.current.y);
      distanceSincePrint.current += moveDist;

      if (distanceSincePrint.current > 38 && !inPauseRange && currentScrollY >= 80) {
        distanceSincePrint.current = 0;
        const printAngle = Math.atan2(targetY - lastPos.current.y, targetX - lastPos.current.x) * (180 / Math.PI);
        const newPrint: PawPrint = {
          id: nextPrintId.current++,
          x: targetX,
          y: targetY, // ground & feet level
          rot: printAngle + 90,
          opacity: 0.55,
        };
        setPrints((prev) => [...prev.slice(-18), newPrint]);
      }

      // Update state
      setIsVisible(currentScrollY >= 80);
      setPos({ x: targetX, y: targetY, scale: targetScale, facing });
      setPose(targetPose);

      if (activeBubble && currentScrollY >= 80) {
        setBubble(activeBubble);
      } else if (Math.abs(scrollDelta) > 10 || currentScrollY < 80) {
        setBubble(null);
      }

      lastPos.current = { x: targetX, y: targetY };
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // Initial run
    updatePuppyPosition();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (walkTimer.current) clearTimeout(walkTimer.current);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    };
  }, [getStops]);

  // Gradually fade and clean old paw prints
  useEffect(() => {
    if (prints.length === 0) return;
    const cleanup = setInterval(() => {
      setPrints((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.08 }))
          .filter((p) => p.opacity > 0.04)
      );
    }, 400);
    return () => clearInterval(cleanup);
  }, [prints.length]);

  // Click interaction: hop, bark, and show hearts!
  const handlePuppyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sounds = ['woof!', 'yip!', '♥', 'boing!'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    setBubble(randomSound);

    // Spawn floating heart
    const newHeart = { id: nextHeartId.current++, x: pos.x, y: pos.y - 30 };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => {
      setBubble(null);
    }, 1800);
  };

  return (
    <>
      {/* 1. Paw Prints Canvas / Trail dropped along the journey */}
      <div className="pup-prints fixed inset-0 pointer-events-none z-20 overflow-clip" aria-hidden="true">
        {prints.map((p) => (
          <svg
            key={p.id}
            viewBox="0 0 64 64"
            className="absolute w-4 h-4 pointer-events-none transition-opacity duration-300"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
              opacity: p.opacity,
            }}
          >
            <path
              d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"
              fill="#c2622b"
            />
          </svg>
        ))}
      </div>

      {/* 2. Floating Heart Sparks on Tap */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="fixed pointer-events-none z-50 animate-bounce text-xl text-toffee font-bold"
          style={{ left: `${h.x}px`, top: `${h.y}px`, transform: 'translate(-50%, -50%)' }}
        >
          ♥
        </div>
      ))}

      {/* 3. The One Traveling Mascot Puppy */}
      <div
        className="pup-layer fixed inset-0 pointer-events-none z-30 overflow-clip"
        aria-label="Teddy Mascot scroll journey"
      >
        <div
          className="pup-actor absolute top-0 left-0 will-change-transform"
          style={{
            transform: `translate3d(${pos.x - 150}px, ${pos.y - (120 + 100 * pos.scale)}px, 0)`,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? 'auto' : 'none',
            transition: 'transform 0.075s ease-out, opacity 0.3s ease',
          }}
          onClick={handlePuppyClick}
        >
          {/* Speech Bubble */}
          {bubble && (
            <div
              className="absolute -top-9 left-1/2 -translate-x-1/2 z-40 px-3 py-1 rounded-full bg-white border-2 border-cocoa text-cocoa text-xs font-bold font-scrawl shadow-md whitespace-nowrap animate-bounce pointer-events-none"
            >
              {bubble}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-cocoa rotate-45" />
            </div>
          )}

          {/* Scaled & Flipped Mascot Body */}
          <div
            className="origin-center transition-transform duration-200"
            style={{
              transform: `scale(${pos.scale}) scaleX(${pos.facing === 'right' ? 1 : -1})`,
            }}
          >
            {/* If in Footer Basket pose */}
            {pose === 'basket' ? (
              <div className="relative w-[300px] h-[240px]">
                {/* Woven Basket Outer */}
                <svg viewBox="0 0 300 240" className="w-full h-full overflow-visible">
                  {/* Back hollow */}
                  <ellipse cx="150" cy="180" rx="90" ry="24" fill="#5D3519" stroke="#2A170E" strokeWidth="4" />
                </svg>

                {/* Puppy nestled inside basket */}
                <div className="absolute inset-0">
                  <svg viewBox="0 0 300 240" className="w-full h-full overflow-visible">
                    <g transform="translate(0, 10)">
                      {/* Head */}
                      <circle cx="150" cy="120" r="48" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                      {/* Ears nestled */}
                      <path d="M106 94 Q90 108 96 138 Q108 144 116 124 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.4" />
                      <path d="M194 94 Q210 108 204 138 Q192 144 184 124 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.4" />
                      {/* Muzzle */}
                      <ellipse cx="150" cy="134" rx="22" ry="15" fill="#FBE3B4" stroke="#2A170E" strokeWidth="2.6" />
                      <ellipse cx="150" cy="126" rx="7" ry="5" fill="#2A170E" />
                      {/* Sleeping / Happy Eyes */}
                      <path d="M130 114 Q138 106 146 114 M154 114 Q162 106 170 114" stroke="#2A170E" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                      {/* Rosy cheeks */}
                      <circle cx="124" cy="130" r="7" fill="#F9B9A6" opacity="0.8" />
                      <circle cx="176" cy="130" r="7" fill="#F9B9A6" opacity="0.8" />
                      {/* Resting paws on rim */}
                      <ellipse cx="126" cy="168" rx="14" ry="10" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3" />
                      <ellipse cx="174" cy="168" rx="14" ry="10" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3" />
                    </g>
                  </svg>
                </div>

                {/* Basket Front Weave */}
                <svg viewBox="0 0 300 240" className="w-full h-full overflow-visible absolute inset-0 pointer-events-none">
                  <path
                    d="M60 178 Q150 196 240 178 L220 226 Q150 238 80 226 Z"
                    fill="#D9A05A"
                    stroke="#2A170E"
                    strokeWidth="3.4"
                  />
                  {/* Rim line */}
                  <path d="M55 178 Q150 198 245 178" stroke="#2A170E" strokeWidth="9" fill="none" strokeLinecap="round" />
                  <path d="M55 178 Q150 198 245 178" stroke="#E8B46C" strokeWidth="5" fill="none" strokeLinecap="round" />
                  {/* Cross weave lines */}
                  <path d="M90 185 L105 228 M130 188 L140 231 M170 188 L160 231 M210 185 L195 228" stroke="#2A170E" strokeWidth="2.4" strokeLinecap="round" opacity="0.35" />
                </svg>
              </div>
            ) : pose === 'peek' ? (
              /* Peeking pose in Hero center */
              <div className="relative w-[300px] h-[240px]">
                <svg viewBox="0 0 300 240" className="w-full h-full overflow-visible">
                  <g>
                    {/* Head */}
                    <circle cx="150" cy="116" r="50" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.6" />
                    {/* Top Knot / Ears */}
                    <circle cx="150" cy="56" r="20" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                    <path d="M106 88 Q88 102 94 134 Q106 142 116 120 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.6" />
                    <path d="M194 88 Q212 102 206 134 Q194 142 184 120 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.6" />
                    {/* Face Muzzle */}
                    <ellipse cx="150" cy="132" rx="25" ry="17" fill="#FBE3B4" stroke="#2A170E" strokeWidth="2.8" />
                    <ellipse cx="150" cy="122" rx="7.5" ry="5.5" fill="#2A170E" />
                    <path d="M150 128 V133 M150 133 Q144 138 139 134 M150 133 Q156 138 161 134" stroke="#2A170E" strokeWidth="2.6" fill="none" />
                    <path d="M145 136 Q150 146 155 136 Z" fill="#E98C8C" stroke="#2A170E" strokeWidth="2" />
                    {/* Cheeks */}
                    <circle cx="120" cy="126" r="7.5" fill="#F9B9A6" opacity="0.8" />
                    <circle cx="180" cy="126" r="7.5" fill="#F9B9A6" opacity="0.8" />
                    {/* Big Eyes */}
                    <circle cx="134" cy="106" r="6.5" fill="#2A170E" />
                    <circle cx="166" cy="106" r="6.5" fill="#2A170E" />
                    <circle cx="136" cy="103" r="2.2" fill="#FFFFFF" />
                    <circle cx="168" cy="103" r="2.2" fill="#FFFFFF" />
                    {/* Paws resting on ledge */}
                    <ellipse cx="122" cy="176" rx="15" ry="11" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                    <ellipse cx="178" cy="176" rx="15" ry="11" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                    <path d="M118 172 v5 M125 172 v5 M175 172 v5 M182 172 v5" stroke="#2A170E" strokeWidth="2.2" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            ) : (
              /* Full Standing / Walking / Sitting Mascot */
              <div className="relative w-[300px] h-[240px]">
                {/* Soft ground shadow */}
                <ellipse cx="150" cy="226" rx="64" ry="7" fill="#2A170E" opacity="0.18" />

                <svg viewBox="0 0 300 240" className="w-full h-full overflow-visible">
                  <g style={{ animation: isWalking ? 'tp-runner-bob 0.18s ease-in-out infinite alternate' : 'none' }}>
                    {/* Tail Wag */}
                    <g style={{ animation: 'tp-runner-wag 0.25s ease-in-out infinite alternate', transformOrigin: '84px 150px' }}>
                      <path d="M86 152 C80 146 76 140 74 136" stroke="#2A170E" strokeWidth="8" strokeLinecap="round" fill="none" />
                      <path d="M86 152 C80 146 76 140 74 136" stroke="#F2BE6B" strokeWidth="4" fill="none" strokeLinecap="round" />
                      <circle cx="70" cy="120" r="12" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.2" />
                    </g>

                    {/* Back Legs */}
                    <g
                      style={{
                        animation: isWalking ? 'tp-runner-leg-a 0.28s ease-in-out infinite alternate' : 'none',
                        transformOrigin: '94px 190px',
                      }}
                    >
                      <path d="M82 180 C82 196 84 210 94 210 C104 210 106 196 106 180 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.2" />
                    </g>

                    {/* Front Legs */}
                    <g
                      style={{
                        animation: isWalking ? 'tp-runner-leg-b 0.28s ease-in-out infinite alternate' : 'none',
                        transformOrigin: '170px 190px',
                      }}
                    >
                      <path d="M160 180 C160 196 162 210 172 210 C182 210 184 196 184 180 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.2" />
                    </g>

                    {/* Fluffy Body */}
                    <path
                      d="M86 186 Q72 170 86 154 Q92 136 120 134 Q150 130 172 136 Q200 146 200 166 Q204 186 182 196 Q146 204 116 202 Z"
                      fill="#F2BE6B"
                      stroke="#2A170E"
                      strokeWidth="3.4"
                    />

                    {/* Near Forelegs */}
                    <ellipse cx="112" cy="198" rx="10" ry="14" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3" />
                    <ellipse cx="186" cy="198" rx="10" ry="14" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3" />

                    {/* Collar & Heart Tag */}
                    <path d="M174 136 Q192 146 210 136" stroke="#A24A1A" strokeWidth="6" strokeLinecap="round" fill="none" />
                    <circle cx="192" cy="144" r="4.5" fill="#FBE3B4" stroke="#2A170E" strokeWidth="1.5" />

                    {/* Head */}
                    <circle cx="212" cy="100" r="38" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                    <circle cx="212" cy="58" r="14" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3" />

                    {/* Muzzle */}
                    <ellipse cx="212" cy="114" rx="19" ry="13" fill="#FBE3B4" stroke="#2A170E" strokeWidth="2.5" />
                    <ellipse cx="212" cy="108" rx="6" ry="4" fill="#2A170E" />
                    <path d="M212 112 V116 M212 116 Q207 120 203 117 M212 116 Q217 120 221 117" stroke="#2A170E" strokeWidth="2.2" fill="none" />
                    <path d="M208 118 Q212 126 216 118 Z" fill="#E98C8C" stroke="#2A170E" strokeWidth="1.5" />

                    {/* Cheeks */}
                    <circle cx="188" cy="110" r="6" fill="#F9B9A6" opacity="0.8" />
                    <circle cx="236" cy="110" r="6" fill="#F9B9A6" opacity="0.8" />

                    {/* Eyes */}
                    <circle cx="196" cy="94" r="5" fill="#2A170E" />
                    <circle cx="228" cy="94" r="5" fill="#2A170E" />
                    <circle cx="198" cy="92" r="1.6" fill="#FFFFFF" />
                    <circle cx="230" cy="92" r="1.6" fill="#FFFFFF" />

                    {/* Ears */}
                    <path d="M178 78 Q162 90 166 118 Q178 124 186 104 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.4" />
                    <path d="M246 78 Q262 90 258 118 Q246 124 238 104 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.4" />
                  </g>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
