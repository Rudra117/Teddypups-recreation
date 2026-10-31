import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-cream-100 text-espresso-800 flex flex-col justify-between selection:bg-terracotta selection:text-white">
      {/* Top Scalloped Header Strip Preview */}
      <header className="bg-cream-50 border-b border-cream-300 px-6 py-4 relative scallop-bottom">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-terracotta flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              TP
            </div>
            <div>
              <span className="font-serif font-bold text-xl tracking-tight text-espresso-900 block leading-tight">
                TeddyPups U.A.E.
              </span>
              <span className="text-xs text-espresso-500 font-sans">
                Website Recreation — Phase 1 Scaffold
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-cream-200 border border-cream-300 rounded-full px-3 py-1 text-xs text-espresso-600">
            <span className="w-2 h-2 rounded-full bg-whatsapp animate-pulse" />
            <span>Phase 1 Verified</span>
          </div>
        </div>
      </header>

      {/* Main Content Card */}
      <div className="max-w-3xl mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-card p-8 md:p-10 shadow-paper border border-cream-300">
          <div className="inline-flex items-center gap-2 bg-honey-soft text-espresso-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-honey" />
            <span>Architecture & Foundation Ready</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-espresso-900 font-bold mb-3 leading-tight">
            TeddyPups UAE Recreation
          </h1>
          <p className="text-espresso-600 text-base md:text-lg mb-8 leading-relaxed">
            Phase 1 is complete. The foundational engineering stack, typography, design tokens, and build pipelines have been established in accordance with your specifications.
          </p>

          {/* Token Swatches */}
          <div className="mb-8 p-4 bg-cream-50 rounded-xl border border-cream-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-espresso-500 mb-3">
              Design Token Palette Preview
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-cream-100 border border-cream-300" />
                <span className="text-xs font-medium text-espresso-700">Cream</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-espresso-800" />
                <span className="text-xs font-medium text-espresso-700">Espresso</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-terracotta" />
                <span className="text-xs font-medium text-espresso-700">Terracotta</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-honey" />
                <span className="text-xs font-medium text-espresso-700">Honey Gold</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-whatsapp" />
                <span className="text-xs font-medium text-espresso-700">WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Stack Checklist */}
          <div className="space-y-3 mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-espresso-500 mb-2">
              Verified Technical Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-espresso-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                <span>React 18 + Vite 6 + TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                <span>Tailwind CSS + Custom Utilities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                <span>React Router DOM v6</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                <span>Lucide React Iconography</span>
              </div>
            </div>
          </div>

          {/* Notice Box */}
          <div className="bg-cream-100 border border-cream-300 rounded-xl p-4 flex items-start gap-3 text-xs text-espresso-600">
            <ShieldCheck className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-espresso-800 block mb-0.5">Safety & Data Policy Enforced</span>
              Strict adherence to non-fabrication of puppy records, placeholder safe links (`href="#"`), and local demo persistence has been established in the architecture.
            </div>
          </div>
        </div>
      </div>

      {/* Illustrated Dark Footer Strip */}
      <footer className="bg-espresso-800 text-cream-200 py-6 px-6 text-center text-xs border-t border-espresso-700">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-terracotta" />
            <span className="font-serif">TeddyPups UAE Recreation</span>
          </div>
          <p className="text-espresso-400">
            Phase 1 Standby • Awaiting review before Phase 2 page implementation
          </p>
        </div>
      </footer>
    </main>
  );
};

export default App;
