import React, { useState, useMemo } from 'react';
import { availablePuppies } from '../data/puppies';
import { PuppyOrigin } from '../types/puppy';
import { PuppyCard } from '../components/puppy/PuppyCard';
import { PuppyFilters } from '../components/puppy/PuppyFilters';
import { MascotTeddy } from '../components/common/MascotTeddy';

export const PuppiesPage: React.FC = () => {
  const [origin, setOrigin] = useState<PuppyOrigin>('Everywhere');
  const [selectedBreed, setSelectedBreed] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');

  const filteredPuppies = useMemo(() => {
    return availablePuppies.filter((p) => {
      // 1. Origin filter
      if (origin !== 'Everywhere' && p.origin !== origin) {
        return false;
      }

      // 2. Breed filter
      if (selectedBreed !== 'All') {
        const pBreed = p.breed.toLowerCase();
        const pCat = (p.breedCategory || '').toLowerCase();
        const target = selectedBreed.toLowerCase();
        if (!pBreed.includes(target) && !pCat.includes(target)) {
          return false;
        }
      }

      // 3. Gender filter
      if (selectedGender !== 'All' && p.gender !== selectedGender) {
        return false;
      }

      return true;
    });
  }, [origin, selectedBreed, selectedGender]);

  const handleReset = () => {
    setOrigin('Everywhere');
    setSelectedBreed('All');
    setSelectedGender('All');
  };

  return (
    <div className="pt-28 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header with Title and Teddy Mascot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <p className="font-handwriting text-xl text-terracotta">
              from Teddy&apos;s sketchbook
            </p>
            <div className="relative inline-block">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-espresso-900 tracking-tight mt-1">
                Available puppies
              </h1>
              {/* Whimsical underline curve */}
              <svg
                viewBox="0 0 300 20"
                className="w-full h-3.5 text-terracotta stroke-current fill-none stroke-[2.5]"
                aria-hidden="true"
              >
                <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8" />
              </svg>
            </div>
            <p className="text-espresso-700 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
              Every listing shows real photos of the actual puppy. Open a profile to see all details, health certification, and enquire directly on WhatsApp.
            </p>
          </div>

          <div className="hidden md:block">
            <MascotTeddy variant="sitting" facing="left" className="w-32 h-24" />
          </div>
        </div>

        {/* Filter Bar */}
        <PuppyFilters
          origin={origin}
          onOriginChange={setOrigin}
          selectedBreed={selectedBreed}
          onBreedChange={setSelectedBreed}
          selectedGender={selectedGender}
          onGenderChange={setSelectedGender}
          availableCount={filteredPuppies.length}
          onReset={handleReset}
        />

        {/* Puppy Grid */}
        {filteredPuppies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredPuppies.map((puppy) => (
              <PuppyCard key={puppy.id} puppy={puppy} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-[28px] border-2 border-espresso-800/15 p-12 text-center max-w-lg mx-auto shadow-sm my-12">
            <MascotTeddy variant="reading" className="w-24 h-20 mx-auto mb-4" />
            <h3 className="font-serif font-bold text-2xl text-espresso-900 mb-2">
              No puppies found
            </h3>
            <p className="text-espresso-600 text-sm mb-6">
              We couldn&apos;t find any puppies matching your exact combination of filters. Try clearing your filters to see all available puppies.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-espresso-800 text-white font-semibold text-sm hover:bg-espresso-900 transition-colors shadow-sm"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
