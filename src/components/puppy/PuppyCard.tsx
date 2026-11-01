import React from 'react';
import { Link } from 'react-router-dom';
import { Puppy } from '../../types/puppy';

interface PuppyCardProps {
  puppy: Puppy;
}

export const PuppyCard: React.FC<PuppyCardProps> = ({ puppy }) => {
  return (
    <Link
      to={`/puppies/${puppy.slug}`}
      className="group relative block transition-all duration-300 hover:-translate-y-2 focus:outline-none"
      aria-label={`${puppy.name}, ${puppy.breed}, ${puppy.gender}, ${puppy.age || ''}, ${puppy.status}`}
      style={{
        transform: puppy.tilt ? `rotate(${puppy.tilt})` : undefined,
      }}
    >
      {/* Decorative Watercolor Wash Background */}
      <div
        className="absolute inset-0 rounded-[32px] opacity-25 group-hover:opacity-40 transition-opacity blur-md"
        style={{ backgroundColor: puppy.washColor || '#f2be6b' }}
      />

      {/* Main Card Container */}
      <div className="relative bg-white rounded-[28px] border-2 border-espresso-800/10 p-4 sm:p-5 shadow-sm group-hover:shadow-xl group-hover:border-espresso-800/30 transition-all overflow-hidden flex flex-col justify-between h-full">
        {/* Photo Stage with Arched / Rounded Frame */}
        <div className="relative w-full aspect-[4/5] rounded-[22px] overflow-hidden bg-cream-200 border border-espresso-800/10">
          <img
            src={puppy.image || '/brand/logo.png'}
            alt={`${puppy.name} - ${puppy.breed}`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Origin Badge */}
          {puppy.origin === 'Korean Teacup' && (
            <span className="absolute top-3 left-3 bg-terracotta text-white text-[0.7rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
              Korean Teacup
            </span>
          )}

          {/* Gender Tag */}
          <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-espresso-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${
                puppy.gender === 'Boy' ? 'bg-blue-500' : 'bg-pink-400'
              }`}
            />
            <span>{puppy.gender}</span>
          </span>
        </div>

        {/* Card Metadata */}
        <div className="pt-4 pb-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif font-bold text-xl md:text-2xl text-espresso-900 group-hover:text-terracotta transition-colors truncate">
              {puppy.name}
            </h3>
            {puppy.age && (
              <span className="text-xs text-espresso-500 font-medium whitespace-nowrap">
                {puppy.age}
              </span>
            )}
          </div>

          <p className="text-sm text-espresso-600 font-medium mt-0.5 truncate">
            {puppy.breed}
          </p>

          {/* Bottom Action Hint */}
          <div className="mt-4 pt-3 border-t border-espresso-800/10 flex items-center justify-between text-xs font-semibold text-espresso-700">
            <span className="text-terracotta group-hover:underline">Meet {puppy.name}</span>
            <span className="text-espresso-400">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
