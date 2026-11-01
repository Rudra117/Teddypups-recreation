import React from 'react';
import { Link } from 'react-router-dom';
import { goneHomePuppies } from '../data/puppies';
import { TicketCard } from '../components/puppy/TicketCard';
import { MascotTeddy } from '../components/common/MascotTeddy';

export const GoneHomePage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <span className="font-handwriting text-xl text-terracotta">
              happy tails &amp; forever homes
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-espresso-900 tracking-tight mt-1">
              Gone home
            </h1>
            <p className="text-espresso-700 text-base md:text-lg mt-3 leading-relaxed">
              Every ticket below represents a joyful journey: a precious puppy who found their forever family in the United Arab Emirates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              to="/puppies"
              className="h-12 px-6 rounded-full bg-espresso-800 hover:bg-espresso-900 text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <span>See available puppies</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Boarding Pass / Ticket Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {goneHomePuppies.map((puppy, idx) => (
            <TicketCard key={puppy.id} puppy={puppy} index={idx} />
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-[32px] bg-white border-2 border-espresso-800/15 shadow-paper text-center max-w-3xl mx-auto space-y-4">
          <MascotTeddy variant="sitting" className="w-24 h-20 mx-auto" />
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-espresso-900">
            Looking for your own teacup companion?
          </h2>
          <p className="text-espresso-600 text-sm max-w-md mx-auto">
            Browse our nursery of available puppies or contact our concierge team to find your dream puppy.
          </p>
          <div className="pt-2">
            <Link
              to="/puppies"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-espresso-800 text-white font-semibold text-sm hover:bg-espresso-900 transition-colors shadow-sm"
            >
              <span>Explore available puppies</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
