import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Puppy } from '../../types/puppy';

interface MeetThePupsDoorsProps {
  puppies: Puppy[];
}

const DOOR_COLORS = [
  '#8A5238',
  '#4A2A1A',
  '#5A3A28',
  '#D4893F',
  '#B8644A',
  '#7A4A2E',
  '#9E3A1D',
  '#68402B',
];

export const MeetThePupsDoors: React.FC<MeetThePupsDoorsProps> = ({ puppies }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [translateX, setTranslateX] = useState<number>(0);
  const [maxScrollDistance, setMaxScrollDistance] = useState<number>(0);
  const [openDoors, setOpenDoors] = useState<Set<number>>(new Set());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  // Recalculate max horizontal travel distance
  const updateDistance = useCallback(() => {
    if (typeof window === 'undefined') return;
    const desktop = window.innerWidth >= 768;
    setIsDesktop(desktop);

    if (trackRef.current) {
      // Distance needed to scroll all cards into view plus padding
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = Math.max(0, trackWidth - viewportWidth + 120);
      setMaxScrollDistance(distance);
    }
  }, []);

  useEffect(() => {
    updateDistance();
    window.addEventListener('resize', updateDistance);
    return () => window.removeEventListener('resize', updateDistance);
  }, [updateDistance, puppies.length]);

  // Scroll listener that drives horizontal translation from vertical scroll progress
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !isDesktop ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const onScroll = () => {
      const container = containerRef.current;
      if (!container || maxScrollDistance <= 0) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // When rect.top is between 0 and -totalScrollable, section is pinned
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      const currentX = progress * maxScrollDistance;
      setTranslateX(currentX);

      // Doors automatically swing open as they approach and cross the left 38% of viewport
      const threshold = 0.38 * window.innerWidth;
      const newOpen = new Set<number>();
      if (trackRef.current) {
        const children = trackRef.current.children;
        for (let i = 0; i < children.length - 1; i++) {
          const child = children[i] as HTMLElement;
          if (child.offsetLeft - currentX < threshold) {
            newOpen.add(i);
          }
        }
      }
      setOpenDoors(newOpen);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [maxScrollDistance, isDesktop]);

  // Container height on desktop provides vertical scroll travel for the horizontal animation
  const containerHeight = isDesktop && maxScrollDistance > 0 ? `${window.innerHeight + maxScrollDistance}px` : 'auto';

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight }}
      className="relative w-full bg-[#FBF3DF]"
    >
      {/* Pinned Sticky Section on Desktop */}
      <section
        aria-labelledby="meet-title"
        className={`${
          isDesktop
            ? 'sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 z-20'
            : 'relative w-full py-16 overflow-hidden'
        } bg-[#FBF3DF] select-none`}
      >
        {/* Section Header */}
        <div className="max-w-[110rem] w-full mx-auto px-6 sm:px-10 lg:px-16 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-scrawl text-xl text-toffee">from Teddy&apos;s nursery</span>
              <h2
                id="meet-title"
                className="font-plush text-3xl sm:text-4xl md:text-5xl font-black text-cocoa tracking-tight"
              >
                Meet the pups
              </h2>
              <p className="font-sans text-cocoa/75 text-sm sm:text-base mt-1 max-w-[48ch] leading-relaxed">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>

            <Link
              to="/puppies"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#9E3A1D] hover:bg-[#852E15] text-white font-bold text-xs sm:text-sm shadow-[0_4px_0_#2A170E] border-2 border-cocoa transition-all transform hover:-translate-y-0.5 active:translate-y-0.5 self-start sm:self-auto"
            >
              See all available puppies
            </Link>
          </div>
        </div>

        {/* Horizontal Track — Translated by scroll on desktop, native swipe on mobile */}
        <div className="relative w-full overflow-hidden flex-1 flex items-center">
          <div
            ref={trackRef}
            className={`inline-flex items-end gap-6 sm:gap-8 px-6 sm:px-16 ${
              isDesktop ? 'will-change-transform' : 'overflow-x-auto scrollbar-none w-full pb-4'
            }`}
            style={
              isDesktop
                ? {
                    transform: `translate3d(-${translateX}px, 0, 0)`,
                    transition: 'transform 0.05s linear',
                  }
                : undefined
            }
          >
            {puppies.map((puppy, idx) => {
              const doorColor = DOOR_COLORS[idx % DOOR_COLORS.length];
              const isOpen = hoveredIndex === idx || openDoors.has(idx);

              return (
                <div
                  key={puppy.id}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="w-[220px] sm:w-[250px] md:w-[270px] shrink-0 group flex flex-col items-center"
                >
                  {/* Door Header Plate */}
                  <div className="text-center mb-2.5 h-[52px] flex flex-col justify-end">
                    <h3 className="font-plush text-lg sm:text-xl font-black text-cocoa leading-tight truncate">
                      {puppy.name}
                    </h3>
                    <p className="font-sans text-[0.72rem] text-cocoa/70 font-semibold mt-0.5 truncate">
                      {puppy.breed} • {puppy.gender}
                      {puppy.age ? `, ${puppy.age}` : ''}
                    </p>
                  </div>

                  {/* Arched Door Frame & Opening Leaf */}
                  <Link
                    to={`/puppies/${puppy.slug}`}
                    className="block relative w-full aspect-[4/5] rounded-t-[140px] border-[3.5px] border-cocoa bg-[#3B2215] overflow-hidden shadow-paper tp-door-way"
                  >
                    {/* Inside Room: Puppy Photo */}
                    <div className="absolute inset-0 overflow-hidden rounded-t-[136px]">
                      <img
                        src={puppy.image}
                        alt={puppy.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* 3D Door Leaf (Swings Open via rotateY) */}
                    <div
                      className="tp-door-leaf absolute inset-0 rounded-t-[136px] border-r-[3px] border-cocoa pointer-events-none"
                      style={{
                        background: `repeating-linear-gradient(90deg, transparent 0 calc(25% - 1.5px), rgba(42, 23, 14, 0.15) calc(25% - 1.5px) 25%), ${doorColor}`,
                        transform: isOpen ? 'rotateY(-78deg) scale(0.96)' : 'rotateY(0deg)',
                      }}
                    >
                      {/* Inner Inset Panel Border */}
                      <div className="absolute inset-[10%_12%_6%] border-2 border-white/20 rounded-t-[120px] rounded-b-md pointer-events-none" />

                      {/* Engraved Paw Peephole */}
                      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-8 h-8 text-white/40 pointer-events-none">
                        <svg viewBox="0 0 64 64" fill="currentColor">
                          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                        </svg>
                      </div>

                      {/* Brass Door Knob */}
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#E5A93B] border border-cocoa shadow-sm" />
                    </div>

                    {/* "Available" Tilted Tag Pin */}
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-white/95 border-2 border-cocoa text-[0.68rem] font-bold font-scrawl text-cocoa shadow-sm transform rotate-6 z-20">
                      Available
                    </span>
                  </Link>
                </div>
              );
            })}

            {/* Final "Meet them all" Arched Destination Card */}
            <div className="w-[190px] sm:w-[210px] shrink-0 flex flex-col items-center">
              <div className="text-center mb-2.5 h-[52px]" />
              <Link
                to="/puppies"
                className="flex flex-col items-center justify-center w-full aspect-[4/5] rounded-t-[140px] border-4 border-dashed border-cocoa/40 hover:border-cocoa bg-cream-50/70 hover:bg-cream-100 transition-all text-center p-6 group"
              >
                <span className="font-plush text-2xl font-black text-cocoa underline decoration-toffee underline-offset-4 group-hover:scale-105 transition-transform">
                  Meet
                  <br />
                  them all
                </span>
                <span className="text-xs font-semibold text-cocoa/70 font-scrawl mt-2">
                  view catalogue →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Wooden Floorboard Platform Running Below the Doors */}
        <div className="relative w-full h-8 bg-[#D4A373] border-t-4 border-b-4 border-cocoa flex items-center justify-between px-8 shadow-inner mt-4">
          {/* Subtle woodgrain plank lines */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent_0_120px,#2A170E_120px_122px)]"
            style={isDesktop ? { transform: `translateX(${-translateX * 0.4}px)` } : undefined}
          />

          {/* Mascot Puppy Standing on the Wooden Floor */}
          <div className="relative -top-8 z-30 transition-transform duration-300 hover:scale-105">
            <svg
              viewBox="0 0 300 240"
              className="w-24 h-20 overflow-visible"
              aria-label="Teddy standing on the wooden floor"
            >
              <g>
                <ellipse cx="150" cy="226" rx="60" ry="6" fill="#2A170E" opacity="0.2" />
                <g style={{ animation: 'tp-runner-bob 0.2s ease-in-out infinite alternate' }}>
                  {/* Tail wagging */}
                  <g style={{ animation: 'tp-runner-wag 0.25s ease-in-out infinite alternate', transformOrigin: '84px 150px' }}>
                    <path d="M86 152 C80 146 76 140 74 136" stroke="#2A170E" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M86 152 C80 146 76 140 74 136" stroke="#F2BE6B" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <circle cx="70" cy="120" r="12" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3" />
                  </g>
                  {/* Legs */}
                  <ellipse cx="94" cy="204" rx="10" ry="14" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3" />
                  <ellipse cx="186" cy="204" rx="10" ry="14" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3" />
                  {/* Body */}
                  <path
                    d="M86 186 Q72 170 86 154 Q92 136 120 134 Q150 130 172 136 Q200 146 200 166 Q204 186 182 196 Q146 204 116 202 Z"
                    fill="#F2BE6B"
                    stroke="#2A170E"
                    strokeWidth="3.4"
                  />
                  {/* Head */}
                  <circle cx="212" cy="100" r="38" fill="#F2BE6B" stroke="#2A170E" strokeWidth="3.4" />
                  {/* Muzzle & Nose */}
                  <ellipse cx="212" cy="116" rx="20" ry="14" fill="#FBE3B4" stroke="#2A170E" strokeWidth="2.5" />
                  <ellipse cx="212" cy="110" rx="6" ry="4" fill="#2A170E" />
                  <circle cx="186" cy="112" r="6" fill="#F9B9A6" opacity="0.8" />
                  <circle cx="238" cy="112" r="6" fill="#F9B9A6" opacity="0.8" />
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
        </div>
      </section>
    </div>
  );
};
