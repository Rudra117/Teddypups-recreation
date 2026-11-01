import React from 'react';
import { Link } from 'react-router-dom';
import { Puppy } from '../../types/puppy';

interface TicketCardProps {
  puppy: Puppy;
  index: number;
}

export const TicketCard: React.FC<TicketCardProps> = ({ puppy, index }) => {
  return (
    <div
      className="group relative transition-all duration-300 hover:-translate-y-1.5"
      style={{
        transform: puppy.tilt ? `rotate(${puppy.tilt})` : undefined,
      }}
    >
      <Link
        to={`/puppies/${puppy.slug}`}
        className="relative flex items-stretch bg-white rounded-ticket border-2 border-espresso-800 shadow-paper overflow-hidden hover:shadow-xl transition-shadow"
      >
        {/* Left / Main Ticket Body */}
        <div className="flex-1 p-3.5 sm:p-4 flex items-center gap-3.5 sm:gap-4 border-r-2 border-dashed border-espresso-800/20 relative">
          {/* Circular Cutouts (Ticket notches) */}
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-cream-100 border-b-2 border-espresso-800 z-10" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-cream-100 border-t-2 border-espresso-800 z-10" />

          {/* Puppy Photo Thumbnail */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-cream-200 border border-espresso-800/15 shrink-0">
            <img
              src={puppy.image || '/brand/logo.png'}
              alt={puppy.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Ticket Information */}
          <div className="flex-1 min-w-0">
            <span className="font-handwriting text-terracotta text-sm block leading-none mb-1">
              one ticket home
            </span>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-espresso-900 group-hover:text-terracotta transition-colors truncate">
              {puppy.name}
            </h3>
            <p className="text-xs text-espresso-600 font-medium truncate">
              {puppy.breed}, {puppy.gender.toLowerCase()}
            </p>

            {/* Flight / Route Visual */}
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-espresso-700">
              <span className="text-[0.7rem] uppercase tracking-wider text-espresso-500">TeddyPups</span>
              <svg viewBox="0 0 40 10" className="w-6 h-2 stroke-espresso-800 stroke-[1.5] fill-none" aria-hidden="true">
                <path d="M0 5h32 M28 2l4 3-4 3" />
              </svg>
              <span className="text-terracotta">home ♥</span>
            </div>
          </div>
        </div>

        {/* Right Stub ("Admit One") */}
        <div className="w-14 sm:w-16 bg-cream-50 flex items-center justify-center p-2 text-center border-l border-cream-200">
          <span className="font-serif text-[0.65rem] sm:text-xs font-bold text-espresso-600 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
            admit one • #{String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </Link>
    </div>
  );
};
