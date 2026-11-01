import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteCurtainProps {
  initialDelay?: number;
}

export const RouteCurtain: React.FC<RouteCurtainProps> = () => {
  const location = useLocation();
  const [curtainState, setCurtainState] = useState<'idle' | 'covering' | 'covered' | 'lifting'>('idle');
  const prevPathRef = useRef<string>(location.pathname);
  const isFirstMount = useRef<boolean>(true);

  // Trigger curtain on initial load and route changes
  useEffect(() => {
    // Respect reduced motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    if (isFirstMount.current) {
      isFirstMount.current = false;
      // Show short welcoming curtain on initial load
      setCurtainState('covered');
      const timer = setTimeout(() => {
        setCurtainState('lifting');
        setTimeout(() => setCurtainState('idle'), 460);
      }, 550);
      return () => clearTimeout(timer);
    }

    // On subsequent route transitions
    if (location.pathname !== prevPathRef.current) {
      prevPathRef.current = location.pathname;
      setCurtainState('covering');

      const coverTimer = setTimeout(() => {
        setCurtainState('covered');
        // Smooth lift
        const liftTimer = setTimeout(() => {
          setCurtainState('lifting');
          const idleTimer = setTimeout(() => {
            setCurtainState('idle');
          }, 460);
          return () => clearTimeout(idleTimer);
        }, 320);
        return () => clearTimeout(liftTimer);
      }, 280);

      return () => clearTimeout(coverTimer);
    }
  }, [location.pathname]);

  if (curtainState === 'idle') {
    return null;
  }

  const isCovering = curtainState === 'covering';
  const isLifting = curtainState === 'lifting';
  const isCovered = curtainState === 'covered';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[95] pointer-events-none overflow-hidden"
      data-state={curtainState}
    >
      {/* Quilted Warm Cream Curtain Blanket */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-500 will-change-transform"
        style={{
          background:
            'repeating-linear-gradient(45deg, transparent 0 46px, rgba(42, 23, 14, 0.07) 46px 48px), repeating-linear-gradient(-45deg, transparent 0 46px, rgba(42, 23, 14, 0.07) 46px 48px), radial-gradient(circle at 50% 46%, #FFFDF8 0, transparent 60%), #FCE2B8',
          transform: isCovering
            ? 'translateY(0)'
            : isCovered
            ? 'translateY(0)'
            : isLifting
            ? 'translateY(calc(-100% - 44px))'
            : 'translateY(calc(100% + 44px))',
          transitionTimingFunction: isCovering
            ? 'cubic-bezier(0.22, 1, 0.36, 1)'
            : 'cubic-bezier(0.65, 0, 0.3, 1)',
        }}
      >
        {/* Top Scalloped Decorative Rim */}
        <div className="absolute -top-[38px] left-0 right-0 h-[40px] overflow-hidden leading-none">
          <svg className="w-full h-full block" preserveAspectRatio="none" viewBox="0 0 1000 40">
            <defs>
              <pattern id="tp-curtain-scallop-top" width="76" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#FCE2B8" />
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2A170E" strokeWidth="3" />
                <path
                  d="M11 33A27 19 0 0 1 65 33"
                  fill="none"
                  stroke="#2A170E"
                  strokeWidth="1.6"
                  strokeDasharray="3.5 5.5"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="40" fill="url(#tp-curtain-scallop-top)" />
          </svg>
        </div>

        {/* Bottom Scalloped Decorative Rim */}
        <div className="absolute -bottom-[38px] left-0 right-0 h-[40px] overflow-hidden leading-none transform scale-y-[-1]">
          <svg className="w-full h-full block" preserveAspectRatio="none" viewBox="0 0 1000 40">
            <rect width="100%" height="40" fill="url(#tp-curtain-scallop-top)" />
          </svg>
        </div>

        {/* Central Animated Runner Stage */}
        <div className="relative w-full max-w-[44rem] h-[12rem] px-6 flex flex-col items-center justify-center">
          {/* Paw Prints Track */}
          <div className="absolute inset-x-8 bottom-[3.2rem] h-[2rem] flex items-center justify-around pointer-events-none opacity-40">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <svg
                key={idx}
                viewBox="0 0 64 64"
                className="w-5 h-5 text-toffee transform rotate-12 animate-pulse"
                fill="currentColor"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            ))}
          </div>

          {/* Trotting Mascot Puppy */}
          <div className="relative mb-2">
            <svg
              viewBox="0 0 300 240"
              className="w-28 h-24 overflow-visible"
              aria-label="Teddy trotting"
            >
              <g>
                <ellipse cx="150" cy="224" rx="70" ry="6" fill="#2A170E" opacity="0.15" />
                {/* Bobbing Body */}
                <g style={{ animation: 'tp-runner-bob 0.16s ease-in-out infinite alternate' }}>
                  {/* Tail wagging */}
                  <g style={{ animation: 'tp-runner-wag 0.22s ease-in-out infinite alternate', transformOrigin: '84px 150px' }}>
                    <path d="M86 152 C80 146 76 140 74 136" stroke="#2A170E" strokeWidth="9" strokeLinecap="round" fill="none" />
                    <path d="M86 152 C80 146 76 140 74 136" stroke="#F2BE6B" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <circle cx="70" cy="120" r="14" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                  </g>
                  {/* Back Leg A */}
                  <g style={{ animation: 'tp-runner-leg-a 0.32s ease-in-out infinite alternate', transformOrigin: '94px 192px' }}>
                    <path d="M80 178 C80 196 82 210 94 210 C106 210 108 196 108 178 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.4" />
                  </g>
                  {/* Front Leg B */}
                  <g style={{ animation: 'tp-runner-leg-b 0.32s ease-in-out infinite alternate', transformOrigin: '186px 194px' }}>
                    <path d="M174 180 C174 198 176 212 188 212 C200 212 202 198 202 180 Z" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                  </g>
                  {/* Puppy Body */}
                  <path
                    d="M86 186 Q72 170 86 154 Q92 136 120 134 Q150 130 172 136 Q200 146 200 166 Q204 186 182 196 Q146 204 116 202 Z"
                    fill="#F2BE6B"
                    stroke="#2A170E"
                    strokeWidth="3.4"
                  />
                  {/* Puppy Head */}
                  <circle cx="212" cy="100" r="38" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                  {/* Muzzle */}
                  <ellipse cx="212" cy="116" rx="20" ry="14" fill="#FBE3B4" stroke="#2A170E" strokeWidth="2.5" />
                  <ellipse cx="212" cy="110" rx="6" ry="4" fill="#2A170E" />
                  {/* Cheeks */}
                  <circle cx="186" cy="112" r="6" fill="#F9B9A6" opacity="0.8" />
                  <circle cx="238" cy="112" r="6" fill="#F9B9A6" opacity="0.8" />
                  {/* Eyes */}
                  <circle cx="196" cy="94" r="5" fill="#2A170E" />
                  <circle cx="228" cy="94" r="5" fill="#2A170E" />
                  <circle cx="198" cy="92" r="1.5" fill="#FFFFFF" />
                  <circle cx="230" cy="92" r="1.5" fill="#FFFFFF" />
                  {/* Ears */}
                  <path d="M178 78 Q160 90 166 120 Q178 126 186 106 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.4" />
                  <path d="M246 78 Q264 90 258 120 Q246 126 238 106 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.4" />
                </g>
              </g>
            </svg>
          </div>

          {/* Scrawl Note */}
          <span className="font-scrawl text-2xl md:text-3xl font-bold text-cocoa tracking-wide">
            every puppy is family ♥
          </span>
        </div>
      </div>
    </div>
  );
};
