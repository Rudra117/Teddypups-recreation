import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const WalkingPuppyMascot: React.FC = () => {
  const { pathname } = useLocation();

  // Strictly restricted to homepage only (Priority 2)
  if (pathname !== '/') {
    return null;
  }

  const [scrollY, setScrollY] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [facing, setFacing] = useState<'right' | 'left'>('right');
  const lastScrollY = useRef(0);
  const walkTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) > 2) {
        setIsWalking(true);
        setFacing(delta > 0 ? 'right' : 'left');

        if (walkTimeout.current) clearTimeout(walkTimeout.current);
        walkTimeout.current = setTimeout(() => {
          setIsWalking(false);
        }, 250);
      }

      setScrollY(currentY);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (walkTimeout.current) clearTimeout(walkTimeout.current);
    };
  }, []);

  // Compute scroll progress (0 to 1) along the document
  const docHeight = typeof document !== 'undefined' ? document.documentElement.scrollHeight - window.innerHeight : 5000;
  const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

  // Horizontal position sways naturally as user scrolls down the page
  const xPercent = 12 + Math.sin(progress * Math.PI * 3.5) * 8; // gently moves between 4% and 20% on the left rail

  return (
    <div
      aria-hidden="true"
      className="hidden md:block pointer-events-none fixed z-[45] will-change-transform"
      style={{
        bottom: '2.5rem',
        left: `${xPercent}%`,
        transform: `scaleX(${facing === 'right' ? 1 : -1})`,
        transition: 'left 0.4s ease-out, transform 0.2s ease',
      }}
    >
      <div className="relative">
        {/* Soft shadow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-3 bg-cocoa/15 rounded-full filter blur-[1px]" />

        {/* Mascot SVG with animated legs while walking */}
        <svg
          viewBox="0 0 300 240"
          className="w-20 h-16 overflow-visible filter drop-shadow-sm"
          aria-label="Walking puppy mascot"
        >
          <g>
            {/* Body */}
            <g style={{ animation: isWalking ? 'tp-runner-bob 0.18s ease-in-out infinite alternate' : 'none' }}>
              {/* Wagging tail */}
              <g style={{ animation: 'tp-runner-wag 0.25s ease-in-out infinite alternate', transformOrigin: '84px 150px' }}>
                <path d="M86 152 C80 146 76 140 74 136" stroke="#2A170E" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M86 152 C80 146 76 140 74 136" stroke="#F2BE6B" strokeWidth="4" fill="none" strokeLinecap="round" />
                <circle cx="70" cy="120" r="12" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3" />
              </g>

              {/* Back Legs (walk cycle when scrolling) */}
              <g
                style={{
                  animation: isWalking ? 'tp-runner-leg-a 0.3s ease-in-out infinite alternate' : 'none',
                  transformOrigin: '94px 192px',
                }}
              >
                <path d="M80 180 C80 196 82 210 94 210 C106 210 108 196 108 180 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.2" />
              </g>

              {/* Front Legs (walk cycle when scrolling) */}
              <g
                style={{
                  animation: isWalking ? 'tp-runner-leg-b 0.3s ease-in-out infinite alternate' : 'none',
                  transformOrigin: '186px 194px',
                }}
              >
                <path d="M174 182 C174 198 176 212 188 212 C200 212 202 198 202 182 Z" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.2" />
              </g>

              {/* Puppy Body Torso */}
              <path
                d="M86 186 Q72 170 86 154 Q92 136 120 134 Q150 130 172 136 Q200 146 200 166 Q204 186 182 196 Q146 204 116 202 Z"
                fill="#F2BE6B"
                stroke="#2A170E"
                strokeWidth="3.4"
              />

              {/* Puppy Head */}
              <circle cx="212" cy="100" r="38" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
              {/* Ears */}
              <path d="M178 78 Q160 90 166 120 Q178 126 186 106 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.4" />
              <path d="M246 78 Q264 90 258 120 Q246 126 238 106 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.4" />

              {/* Muzzle */}
              <ellipse cx="212" cy="116" rx="20" ry="14" fill="#FBE3B4" stroke="#2A170E" strokeWidth="2.5" />
              <ellipse cx="212" cy="110" rx="6" ry="4" fill="#2A170E" />
              <path d="M212 116 v4 M212 120 Q208 124 204 121 M212 120 Q216 124 220 121" stroke="#2A170E" strokeWidth="2.2" fill="none" />
              {/* Cheeks */}
              <circle cx="186" cy="112" r="6" fill="#F9B9A6" opacity="0.8" />
              <circle cx="238" cy="112" r="6" fill="#F9B9A6" opacity="0.8" />
              {/* Eyes */}
              <circle cx="196" cy="94" r="5" fill="#2A170E" />
              <circle cx="228" cy="94" r="5" fill="#2A170E" />
              <circle cx="198" cy="92" r="1.5" fill="#FFFFFF" />
              <circle cx="230" cy="92" r="1.5" fill="#FFFFFF" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
