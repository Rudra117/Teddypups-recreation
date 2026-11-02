import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { StickyBottomBar } from './components/common/StickyBottomBar';
import { PawTrailCursor } from './components/common/PawTrailCursor';
import { RouteCurtain } from './components/common/RouteCurtain';
import { PupScrollJourney } from './components/common/PupScrollJourney';

// Pages
import { HomePage } from './pages/HomePage';
import { PuppiesPage } from './pages/PuppiesPage';
import { PuppyProfilePage } from './pages/PuppyProfilePage';
import { HappyFamiliesPage } from './pages/HappyFamiliesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { GoneHomePage } from './pages/GoneHomePage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-milk text-cocoa font-sans selection:bg-toffee selection:text-white relative">
      {/* Priority 2: Custom paw-print cursor canvas trail */}
      <PawTrailCursor />
      {/* Priority 6: Page transition & reload quilted curtain */}
      <RouteCurtain />
      {/* Scroll-driven Mascot Journey on Homepage */}
      {location.pathname === '/' && <PupScrollJourney />}
      <ScrollToTop />

      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/puppies" element={<PuppiesPage />} />
          <Route path="/puppies/:slug" element={<PuppyProfilePage />} />
          <Route path="/puppy/:slug" element={<PuppyProfilePage />} />
          <Route path="/happy-families" element={<HappyFamiliesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gone-home" element={<GoneHomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <StickyBottomBar />
    </div>
  );
};

export default App;
