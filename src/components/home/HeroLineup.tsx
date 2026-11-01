import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Puppy } from '../../types/puppy';

interface HeroLineupProps {
  puppies: Puppy[];
}

interface SeatConfig {
  x: string;
  w: string;
  peek: number;
  tilt: number;
}

const SEATS: SeatConfig[] = [
  { x: '8%', w: '8.4rem', peek: 0.62, tilt: -5 },
  { x: '21.5%', w: '10.2rem', peek: 0.8, tilt: 3 },
  { x: '34.5%', w: '9.2rem', peek: 0.7, tilt: -2 },
  // Center is Teddy Mascot (50%)
  { x: '65.5%', w: '9.4rem', peek: 0.74, tilt: 3 },
  { x: '78.5%', w: '10.4rem', peek: 0.82, tilt: -3 },
  { x: '91.5%', w: '8.4rem', peek: 0.6, tilt: 4 },
];

export const HeroLineup: React.FC<HeroLineupProps> = ({ puppies }) => {
  // We place 6 active puppy indexes for the 6 side seats
  const [activeIndices, setActiveIndices] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [changingSeat, setChangingSeat] = useState<number | null>(null);

  // Periodic smooth image swap across seats
  useEffect(() => {
    if (puppies.length <= 6) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let interval: ReturnType<typeof setInterval> | undefined;
    let changeTimer: ReturnType<typeof setTimeout> | undefined;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const stop = () => {
      if (interval) clearInterval(interval);
      if (changeTimer) clearTimeout(changeTimer);
      if (settleTimer) clearTimeout(settleTimer);
      interval = undefined;
      changeTimer = undefined;
      settleTimer = undefined;
    };

    const start = () => {
      if (motionPreference.matches || interval) return;

      interval = setInterval(() => {
        // Pick a random seat to change (0 to 5)
        const seatToChange = Math.floor(Math.random() * 6);
        setChangingSeat(seatToChange);

        changeTimer = setTimeout(() => {
          setActiveIndices((prev) => {
            const next = [...prev];
            // Pick a puppy index not currently shown
            const currentPuppies = new Set(prev);
            const availableIndices = puppies
              .map((_, idx) => idx)
              .filter((idx) => !currentPuppies.has(idx));

            if (availableIndices.length > 0) {
              const randomNew = availableIndices[Math.floor(Math.random() * availableIndices.length)];
              next[seatToChange] = randomNew;
            }
            return next;
          });

          settleTimer = setTimeout(() => {
            setChangingSeat(null);
          }, 300);
        }, 400);
      }, 2800);
    };

    const handleMotionPreferenceChange = () => {
      if (motionPreference.matches) {
        stop();
        setChangingSeat(null);
      } else {
        start();
      }
    };

    start();
    motionPreference.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      stop();
      motionPreference.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [puppies]);

  return (
    <div className="relative w-full overflow-hidden pt-12 select-none pointer-events-auto">
      {/* Container for Arched Puppy Seats */}
      <div className="relative max-w-[110rem] mx-auto h-[260px] sm:h-[300px] md:h-[340px] flex items-end justify-center">
        {/* Left 3 Seats */}
        {SEATS.slice(0, 3).map((seat, i) => {
          const pup = puppies[activeIndices[i]] || puppies[i % puppies.length];
          const isFading = changingSeat === i;

          return (
            <div
              key={`seat-${i}`}
              className="hidden lg:block absolute bottom-0 -translate-x-1/2 transition-all duration-500 will-change-transform z-10 group"
              style={{
                left: seat.x,
                width: seat.w,
                transform: `translateX(-50%) rotate(${seat.tilt}deg) translateY(${-(1 - seat.peek) * 40}px)`,
              }}
            >
              <Link
                to={`/puppies/${pup.slug}`}
                className="block relative rounded-t-full border-[3.5px] border-cocoa bg-cream-50 overflow-hidden shadow-paper hover:-translate-y-2 transition-transform duration-300"
                style={{ aspectRatio: '1 / 1.35' }}
                title={`Meet ${pup.name}`}
              >
                <img
                  src={pup.image}
                  alt={pup.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                  loading="eager"
                />
                {/* Speech Bubble Tag on hover */}
                <span className="absolute bottom-2 inset-x-2 text-center py-1 px-1.5 rounded-full bg-white/90 border border-cocoa text-[0.7rem] font-bold font-scrawl text-cocoa shadow-sm truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {pup.name}
                </span>
              </Link>
            </div>
          );
        })}

        {/* Center Seat (Mascot Teddy Peeking over the Quilt) */}
        <div
          className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 z-30 transition-transform duration-300 hover:scale-105 cursor-pointer"
          style={{ width: 'clamp(11rem, 22vw, 14rem)' }}
          title="Teddy peeking over the quilt!"
        >
          <div className="relative">
            <svg
              viewBox="0 0 300 240"
              className="w-full h-auto overflow-visible filter drop-shadow-sm"
              aria-label="Teddy peeking over the quilt"
            >
              <g>
                {/* Body peeking */}
                <ellipse cx="150" cy="220" rx="80" ry="10" fill="#2A170E" opacity="0.12" />
                {/* Head */}
                <circle cx="150" cy="110" r="54" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.6" />
                {/* Top Knot / Ears */}
                <circle cx="150" cy="46" r="22" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                <path d="M102 78 Q82 92 88 128 Q102 136 112 112 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.6" />
                <path d="M198 78 Q218 92 212 128 Q198 136 188 112 Z" fill="#E4A352" stroke="#2A170E" strokeWidth="3.6" />
                {/* Face Muzzle */}
                <ellipse cx="150" cy="126" rx="26" ry="18" fill="#FBE3B4" stroke="#2A170E" strokeWidth="2.8" />
                <ellipse cx="150" cy="116" rx="8" ry="6" fill="#2A170E" />
                <path d="M150 122 V128 M150 128 Q144 134 138 129 M150 128 Q156 134 162 129" stroke="#2A170E" strokeWidth="2.8" fill="none" />
                {/* Pink Tongue */}
                <path d="M144 131 Q150 142 156 131 Z" fill="#E98C8C" stroke="#2A170E" strokeWidth="2" />
                {/* Cheeks */}
                <circle cx="118" cy="120" r="8" fill="#F9B9A6" opacity="0.8" />
                <circle cx="182" cy="120" r="8" fill="#F9B9A6" opacity="0.8" />
                {/* Eyes */}
                <circle cx="132" cy="98" r="7" fill="#2A170E" />
                <circle cx="168" cy="98" r="7" fill="#2A170E" />
                <circle cx="134" cy="95" r="2.2" fill="#FFFFFF" />
                <circle cx="170" cy="95" r="2.2" fill="#FFFFFF" />
                {/* Resting Paws on Ledge */}
                <ellipse cx="120" cy="178" rx="16" ry="12" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                <ellipse cx="180" cy="178" rx="16" ry="12" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                <path d="M116 174 v5 M124 174 v5 M176 174 v5 M184 174 v5" stroke="#2A170E" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right 3 Seats */}
        {SEATS.slice(3, 6).map((seat, i) => {
          const seatIdx = i + 3;
          const pup = puppies[activeIndices[seatIdx]] || puppies[seatIdx % puppies.length];
          const isFading = changingSeat === seatIdx;

          return (
            <div
              key={`seat-${seatIdx}`}
              className="hidden lg:block absolute bottom-0 -translate-x-1/2 transition-all duration-500 will-change-transform z-10 group"
              style={{
                left: seat.x,
                width: seat.w,
                transform: `translateX(-50%) rotate(${seat.tilt}deg) translateY(${-(1 - seat.peek) * 40}px)`,
              }}
            >
              <Link
                to={`/puppies/${pup.slug}`}
                className="block relative rounded-t-full border-[3.5px] border-cocoa bg-cream-50 overflow-hidden shadow-paper hover:-translate-y-2 transition-transform duration-300"
                style={{ aspectRatio: '1 / 1.35' }}
                title={`Meet ${pup.name}`}
              >
                <img
                  src={pup.image}
                  alt={pup.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                  loading="eager"
                />
                {/* Speech Bubble Tag on hover */}
                <span className="absolute bottom-2 inset-x-2 text-center py-1 px-1.5 rounded-full bg-white/90 border border-cocoa text-[0.7rem] font-bold font-scrawl text-cocoa shadow-sm truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {pup.name}
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Quilted Waffle Pattern and Scalloped Border Boundary */}
      <div className="relative w-full z-20">
        {/* Scalloped Edge Cutout with Stitching Line */}
        <div className="w-full overflow-hidden leading-none h-[40px]">
          <svg className="w-full h-full block" preserveAspectRatio="none" viewBox="0 0 1000 40">
            <defs>
              <pattern id="tp-hero-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#FFF1D8" />
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
            <rect width="100%" height="40" fill="url(#tp-hero-scallop)" />
          </svg>
        </div>

        {/* Quilted Diamond Lattice Skirt */}
        <div className="tp-quilt-pattern w-full h-6 border-b border-cocoa/10" />
      </div>
    </div>
  );
};
