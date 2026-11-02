import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { availablePuppies, goneHomePuppies } from '../data/puppies';
import { PuppyOrigin } from '../types/puppy';
import { PuppyCard } from '../components/puppy/PuppyCard';
import { PuppyFilters } from '../components/puppy/PuppyFilters';
import { MascotTeddy } from '../components/common/MascotTeddy';
import { Heart } from 'lucide-react';

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

  const previewGoneHome = goneHomePuppies.slice(0, 5);

  return (
    <div className="pt-28 pb-24 bg-milk min-h-screen">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header with Title and Teddy Mascot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <p className="font-scrawl text-xl text-toffee">
              from Teddy&apos;s sketchbook
            </p>
            <div className="relative inline-block">
              <h1 className="font-plush text-4xl sm:text-5xl md:text-6xl font-bold text-cocoa tracking-tight mt-1">
                Available puppies
              </h1>
              {/* Whimsical underline curve */}
              <svg
                viewBox="0 0 300 20"
                className="w-full h-3.5 text-toffee stroke-current fill-none stroke-[2.5]"
                aria-hidden="true"
              >
                <path d="M4 15 C44 6 74 20 116 13 S186 4 228 13 S272 21 296 15" />
              </svg>
            </div>
            <p className="text-cocoa/80 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
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
          <div className="bg-white rounded-[28px] border-2 border-cocoa/15 p-12 text-center max-w-lg mx-auto shadow-sm my-12">
            <MascotTeddy variant="reading" className="w-24 h-20 mx-auto mb-4" />
            <h3 className="font-plush font-bold text-2xl text-cocoa mb-2">
              No puppies found
            </h3>
            <p className="text-cocoa/75 text-sm mb-6">
              We couldn&apos;t find any puppies matching your exact combination of filters. Try clearing your filters to see all available puppies.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-cocoa text-milk font-semibold text-sm hover:bg-cocoa-light transition-colors shadow-sm"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* ==============================================================
            Priority 4: Missing Secondary Destination on Puppies Page
            "Already gone home" section leading to /gone-home
           ============================================================== */}
        <section aria-labelledby="gone-title" className="tp-gone-strip mt-24 pt-16 border-t-2 border-cocoa/10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10">
            {/* Left 1/3: Title, lede, and direct button to /gone-home */}
            <div className="lg:w-1/3 space-y-4">
              <span className="font-scrawl text-xl text-toffee block">
                happy alumni
              </span>
              <h2 id="gone-title" className="font-plush text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa">
                Already gone home
              </h2>
              <p className="text-cocoa/75 text-base sm:text-lg leading-relaxed">
                These puppies have found their families in Dubai and across the UAE.
              </p>
              <div className="pt-2">
                <Link
                  to="/gone-home"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-cocoa text-milk font-semibold text-sm hover:bg-cocoa-light transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>See the puppies who&apos;ve gone home</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right 2/3: Row of gone-home puppy cards (No extra scrollbar, clean 4-card layout) */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {previewGoneHome.slice(0, 4).map((pup, idx) => (
                  <Link
                    key={pup.id}
                    to={`/puppies/${pup.slug}`}
                    className="w-full bg-white rounded-3xl p-3 border-2 border-cocoa/15 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group text-center"
                    style={{ transform: `rotate(${idx % 2 === 0 ? '-1.5deg' : '1.5deg'})` }}
                  >
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-cream-200 border border-cocoa/10 relative">
                      <img
                        src={pup.image}
                        alt={pup.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 inset-x-2 py-1 px-2 rounded-full bg-cocoa/90 backdrop-blur-xs text-milk text-[0.68rem] font-bold font-scrawl flex items-center justify-center gap-1 shadow-sm">
                        <Heart className="w-3 h-3 text-toffee fill-toffee" />
                        <span>gone home ♥</span>
                      </span>
                    </div>
                    <div className="pt-3 pb-1">
                      <h4 className="font-plush font-bold text-cocoa text-base group-hover:text-toffee transition-colors truncate">
                        {pup.name}
                      </h4>
                      <p className="text-xs text-cocoa/70 truncate">{pup.breed}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
