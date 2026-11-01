import React from 'react';
import { Link } from 'react-router-dom';
import { MascotTeddy } from '../components/common/MascotTeddy';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-36 pb-24 text-center px-6 min-h-[70vh] flex flex-col items-center justify-center bg-cream-100">
      <MascotTeddy variant="reading" className="w-32 h-24 mb-6" />
      <span className="font-handwriting text-2xl text-terracotta">oops!</span>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-espresso-900 mt-1 mb-3">
        Page not found
      </h1>
      <p className="text-espresso-600 text-base max-w-md mx-auto mb-8 leading-relaxed">
        The page you are looking for has wandered off like an adventurous puppy. Let&apos;s get you back home!
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 rounded-full bg-espresso-800 text-white font-semibold text-sm hover:bg-espresso-900 transition-colors shadow-sm"
      >
        Return to homepage
      </Link>
    </div>
  );
};
