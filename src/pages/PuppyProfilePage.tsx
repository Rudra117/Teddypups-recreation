import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { availablePuppies, getPuppyBySlug, puppies } from '../data/puppies';
import { Lightbox } from '../components/common/Lightbox';
import { MascotTeddy } from '../components/common/MascotTeddy';
import { PuppyCard } from '../components/puppy/PuppyCard';
import { CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck, MessageCircle } from 'lucide-react';

export const PuppyProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const puppy = getPuppyBySlug(slug || '');

  // Wrap-around Previous & Next Puppy Navigation
  const list = puppy?.status === 'gone_home' ? puppies : availablePuppies;
  const currentIndex = list.findIndex((p) => p.slug === slug || p.id === slug);
  const prevPuppy = currentIndex >= 0 ? list[(currentIndex - 1 + list.length) % list.length] : null;
  const nextPuppy = currentIndex >= 0 ? list[(currentIndex + 1) % list.length] : null;

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Enquiry form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    message: '',
  });

  if (!puppy) {
    return (
      <div className="pt-32 pb-24 text-center px-6 min-h-[60vh] flex flex-col items-center justify-center">
        <MascotTeddy variant="reading" className="w-28 h-20 mb-4" />
        <h1 className="font-serif text-3xl font-bold text-espresso-900 mb-2">
          Puppy not found
        </h1>
        <p className="text-espresso-600 mb-6">
          The puppy profile you are looking for does not exist or may have found a loving home.
        </p>
        <Link
          to="/puppies"
          className="px-6 py-3 rounded-full bg-espresso-800 text-white font-semibold text-sm hover:bg-espresso-900 transition-colors"
        >
          View all available puppies
        </Link>
      </div>
    );
  }

  const galleryImages = [puppy.image, ...(puppy.galleryImages || [])].filter(Boolean);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const msg = `Hi TeddyPups! I'm interested in ${puppy.name} (${puppy.breed}, ${puppy.gender}). Could you share more details?`;
    alert(`Safe Demo Mode: WhatsApp link pre-filled with:\n"${msg}"\n(Direct message dispatch disabled in demonstration mode)`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-cream-100 min-h-screen">
      {/* 1. TOP BREADCRUMBS & PREV/NEXT NAV */}
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16 pt-4 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-espresso-800/10">
          <nav aria-label="Breadcrumb" className="text-xs text-espresso-600 font-medium flex items-center gap-2">
            <Link to="/" className="hover:text-espresso-900">Home</Link>
            <span>/</span>
            <Link to={puppy.status === 'gone_home' ? '/gone-home' : '/puppies'} className="hover:text-espresso-900">
              {puppy.status === 'gone_home' ? 'Gone Home' : 'Available Puppies'}
            </Link>
            <span>/</span>
            <span className="text-espresso-900 font-semibold">{puppy.name}</span>
          </nav>

          {/* Wrap-around Prev / Next Controls */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            {prevPuppy && (
              <Link
                to={`/puppies/${prevPuppy.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-espresso-800/15 hover:bg-cream-200 text-espresso-800 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous: {prevPuppy.name}</span>
              </Link>
            )}
            {nextPuppy && (
              <Link
                to={`/puppies/${nextPuppy.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-espresso-800/15 hover:bg-cream-200 text-espresso-800 transition-colors"
              >
                <span>Next: {nextPuppy.name}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN PROFILE HERO STAGE */}
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Photo Gallery with Arched Frame */}
          <div className="lg:col-span-6 space-y-4">
            <button
              type="button"
              aria-label={`Open ${puppy.name} photo in lightbox`}
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              className="relative w-full aspect-[4/5] rounded-[36px] overflow-hidden bg-white border-2 border-espresso-800/15 shadow-paper cursor-pointer group text-left"
            >
              <img
                src={puppy.image}
                alt={puppy.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-espresso-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-espresso-900 text-xs font-semibold px-4 py-2 rounded-full shadow-md">
                  Click to enlarge photo
                </span>
              </div>

              {puppy.origin === 'Korean Teacup' && (
                <span className="absolute top-4 left-4 bg-terracotta text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                  Korean Teacup
                </span>
              )}
            </button>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxOpen(true);
                    }}
                    className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-espresso-800/20 hover:border-terracotta transition-colors shrink-0 bg-cream-200"
                  >
                    <img src={img} alt={`${puppy.name} photo ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Key Info, Specifications & Enquiry Action */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="font-handwriting text-xl text-terracotta">
                  {puppy.status === 'gone_home' ? 'happy adoption' : 'available pup'}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-espresso-900 tracking-tight mt-1">
                  {puppy.name}
                </h1>
                <p className="text-espresso-600 text-lg font-medium mt-1">
                  {puppy.breed} • {puppy.gender}
                </p>
              </div>

              {/* Badges Bar */}
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-cream-200 text-espresso-800 text-xs font-semibold">
                  Origin: {puppy.origin}
                </span>
                {puppy.age && (
                  <span className="px-3.5 py-1.5 rounded-full bg-cream-200 text-espresso-800 text-xs font-semibold">
                    Age: {puppy.age}
                  </span>
                )}
                <span className="px-3.5 py-1.5 rounded-full bg-cream-200 text-espresso-800 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-whatsapp" />
                  <span>Vaccinated &amp; Microchipped</span>
                </span>
              </div>

              {/* Bio & Description */}
              <p className="text-espresso-700 text-base md:text-lg leading-relaxed">
                {puppy.description}
              </p>

              {/* Health Guarantee Grid */}
              <div className="bg-white rounded-2xl p-5 border border-espresso-800/15 space-y-3">
                <h3 className="font-serif font-bold text-espresso-900 text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-terracotta" />
                  <span>Every Teddy Pup comes with:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-espresso-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Up-to-date vaccinations &amp; deworming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Veterinary health certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Registered international microchip</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>1-year health guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 pt-4 border-t border-espresso-800/10">
              <button
                onClick={handleWhatsApp}
                className="w-full h-14 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold text-base shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enquire about {puppy.name} on WhatsApp</span>
              </button>
              <a
                href="#enquiry-form"
                className="w-full h-12 rounded-full border-2 border-espresso-800 bg-white hover:bg-cream-100 text-espresso-800 font-semibold text-sm flex items-center justify-center transition-colors"
              >
                Send a letter about {puppy.name}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOUR-STEP IMPORT / ARRIVAL PROCESS */}
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="bg-white rounded-[32px] border-2 border-espresso-800/15 p-8 sm:p-12 shadow-paper">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-handwriting text-xl text-terracotta">care at every step</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 mt-1">
              Coming home from abroad
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-2">
              <span className="w-8 h-8 rounded-full bg-terracotta text-white font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h4 className="font-serif font-bold text-espresso-900 text-base">Reserve your puppy</h4>
              <p className="text-xs text-espresso-600 leading-relaxed">
                Choose {puppy.name} and confirm your interest with our adoption concierge.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-2">
              <span className="w-8 h-8 rounded-full bg-terracotta text-white font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h4 className="font-serif font-bold text-espresso-900 text-base">Personalized consultation</h4>
              <p className="text-xs text-espresso-600 leading-relaxed">
                Receive photos, video check-ins, and discuss care, feeding, and arrival scheduling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-2">
              <span className="w-8 h-8 rounded-full bg-terracotta text-white font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h4 className="font-serif font-bold text-espresso-900 text-base">Import and arrival</h4>
              <p className="text-xs text-espresso-600 leading-relaxed">
                Full veterinary clearance, travel logistics, and arrival into Dubai handled by specialists.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-2">
              <span className="w-8 h-8 rounded-full bg-terracotta text-white font-bold text-sm flex items-center justify-center">
                4
              </span>
              <h4 className="font-serif font-bold text-espresso-900 text-base">Welcome home</h4>
              <p className="text-xs text-espresso-600 leading-relaxed">
                Pick up from our Downtown Dubai showroom or enjoy safe white-glove home delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ENQUIRY FORM SECTION ("Ask about [Name]") */}
      <div id="enquiry-form" className="max-w-3xl mx-auto px-6 sm:px-10 py-10">
        <div className="bg-white rounded-[32px] border-2 border-espresso-800/15 p-8 sm:p-10 shadow-paper">
          <div className="text-center mb-8">
            <span className="font-handwriting text-xl text-terracotta">direct enquiry</span>
            <h2 className="font-serif text-3xl font-bold text-espresso-900 mt-1">
              Ask about {puppy.name}
            </h2>
            <p className="text-espresso-600 text-sm mt-2">
              Leave your details below and our team will get back to you with information, photos, and next steps.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-cream-100 border border-cream-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-whatsapp text-white mx-auto flex items-center justify-center text-xl">
                ✓
              </div>
              <h3 className="font-serif font-bold text-xl text-espresso-900">
                Thank you for your interest!
              </h3>
              <p className="text-xs text-espresso-600 leading-relaxed max-w-md mx-auto">
                Your enquiry regarding <span className="font-bold text-espresso-800">{puppy.name}</span> has been saved in your local demo session log. (Demo Mode: Inquiries are not dispatched to real external recipients).
              </p>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="mt-3 text-xs font-semibold text-terracotta underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-espresso-700 uppercase tracking-wider mb-1">
                  Your name *
                </label>
                <input
                  type="text"
                  required
                  aria-label="Your name"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-espresso-800/20 bg-cream-50 focus:bg-white focus:border-espresso-800 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-espresso-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    aria-label="Phone or WhatsApp number"
                    pattern="[+]?[0-9][0-9 ]{6,18}"
                    title="Enter a valid phone number, including country code if needed."
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-espresso-800/20 bg-cream-50 focus:bg-white focus:border-espresso-800 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-espresso-700 uppercase tracking-wider mb-1">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    aria-label="Email address (optional)"
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-espresso-800/20 bg-cream-50 focus:bg-white focus:border-espresso-800 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-espresso-700 uppercase tracking-wider mb-1">
                  Area / Emirate
                </label>
                <input
                  type="text"
                  aria-label="Area or Emirate"
                  placeholder="e.g. Dubai Marina / Downtown Dubai"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-espresso-800/20 bg-cream-50 focus:bg-white focus:border-espresso-800 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-espresso-700 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  aria-label="Message"
                  placeholder={`Hi, I'd like to ask about ${puppy.name}...`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-xl border border-espresso-800/20 bg-cream-50 focus:bg-white focus:border-espresso-800 text-sm outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-full bg-espresso-800 hover:bg-espresso-900 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                Send enquiry about {puppy.name}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 5. SIMILAR PUPPIES RECOMMENDATION */}
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16 pt-12">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 mb-6">
          Other puppies ready for a loving home
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {availablePuppies
            .filter((p) => p.slug !== puppy.slug)
            .slice(0, 4)
            .map((p) => (
              <PuppyCard key={p.id} puppy={p} />
            ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={galleryImages}
        currentIndex={lightboxIndex}
        title={`${puppy.name} (${puppy.breed})`}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
        onNext={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
      />
    </div>
  );
};
