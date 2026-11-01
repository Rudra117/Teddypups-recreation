import React from 'react';
import { PuppyOrigin } from '../../types/puppy';

interface PuppyFiltersProps {
  origin: PuppyOrigin;
  onOriginChange: (origin: PuppyOrigin) => void;
  selectedBreed: string;
  onBreedChange: (breed: string) => void;
  selectedGender: string;
  onGenderChange: (gender: string) => void;
  availableCount: number;
  onReset: () => void;
}

export const PuppyFilters: React.FC<PuppyFiltersProps> = ({
  origin,
  onOriginChange,
  selectedBreed,
  onBreedChange,
  selectedGender,
  onGenderChange,
  availableCount,
  onReset,
}) => {
  const breeds = ['All', 'Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];
  const origins: PuppyOrigin[] = ['Everywhere', 'Imported', 'Korean Teacup'];
  const genders = [
    { label: 'All', value: 'All' },
    { label: 'Boys', value: 'Boy' },
    { label: 'Girls', value: 'Girl' },
  ];

  const hasActiveFilters =
    origin !== 'Everywhere' || selectedBreed !== 'All' || selectedGender !== 'All';

  return (
    <div className="bg-white rounded-[24px] border-2 border-espresso-800/15 p-5 sm:p-6 shadow-sm mb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Filters Grid */}
        <div className="space-y-4 flex-1">
          {/* Group 1: Where */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-espresso-500 uppercase tracking-wider w-16">
              Where
            </span>
            <div className="flex flex-wrap gap-1.5">
              {origins.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => onOriginChange(o)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    origin === o
                      ? 'bg-espresso-800 text-cream-100 shadow-sm'
                      : 'bg-cream-100 text-espresso-700 hover:bg-cream-200'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Group 2: Breed */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-espresso-500 uppercase tracking-wider w-16">
              Breed
            </span>
            <div className="flex flex-wrap gap-1.5">
              {breeds.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => onBreedChange(b)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedBreed === b
                      ? 'bg-espresso-800 text-cream-100 shadow-sm'
                      : 'bg-cream-100 text-espresso-700 hover:bg-cream-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Group 3: Gender */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-espresso-500 uppercase tracking-wider w-16">
              Gender
            </span>
            <div className="flex flex-wrap gap-1.5">
              {genders.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => onGenderChange(g.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedGender === g.value
                      ? 'bg-espresso-800 text-cream-100 shadow-sm'
                      : 'bg-cream-100 text-espresso-700 hover:bg-cream-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Count and Reset */}
        <div className="flex items-center justify-between lg:flex-col lg:items-end gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-espresso-800/10">
          <p className="font-handwriting text-xl text-espresso-700">
            {availableCount} {availableCount === 1 ? 'puppy' : 'puppies'} ready for you
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-semibold text-terracotta hover:underline transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
