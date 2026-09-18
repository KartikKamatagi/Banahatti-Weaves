import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Award, Heart } from 'lucide-react';

export default function HeroBannerSlider({ sarees }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      badge: '✨ Heritage Collection • 100% Pit-Loom',
      title: 'Handwoven Elegance from Banahatti',
      subtitle: 'Discover beautiful handloom cotton sarees woven with century-old Chikki Paras borders by Bagalkot master artisans.',
      primaryBtn: 'SHOP NOW',
      secondaryBtn: 'EXPLORE COTTONS',
      image: sarees[0]?.images[0] || '/images/sarees/saree_model_maroon_1789668365104.png',
      sareeName: sarees[0]?.name || 'Crimson Red Chikki Paras Cotton Saree',
      sareePrice: sarees[0]?.price || 3499,
      bgGradient: 'from-[#FAF8F5] via-[#FFF] to-[#F5F2EB]'
    },
    {
      id: 2,
      badge: '👑 Royal Festive Silk • Gold Zari Weave',
      title: 'Bridal & Grand Festive Silk Sarees',
      subtitle: 'Adorn yourself in heavy gold zari borders and lustrous mulberry silk drapes handcrafted for lifetime celebrations.',
      primaryBtn: 'SHOP BRIDAL SILK',
      secondaryBtn: 'VIEW BESTSELLERS',
      image: sarees[2]?.images[0] || '/images/sarees/saree_model_purple_1789668387478.png',
      sareeName: sarees[2]?.name || 'Mustard Gold Handwoven Silk Saree',
      sareePrice: sarees[2]?.price || 7999,
      bgGradient: 'from-[#FDFBF7] via-[#FFF] to-[#FAF6ED]'
    },
    {
      id: 3,
      badge: '🌟 Traditional Kasuti Embroidery Art',
      title: 'Ancient Kasuti Motif Collection',
      subtitle: 'Experience intricate hand-embroidered Karnataka temple chariots, peacocks, and lotus motifs in vivid jewel tones.',
      primaryBtn: 'EXPLORE KASUTI',
      secondaryBtn: 'SHOP TRADITIONAL',
      image: sarees[1]?.images[0] || '/images/sarees/saree_model_blue_1789668405492.png',
      sareeName: sarees[1]?.name || 'Royal Peacock Blue Kasuti Motif Saree',
      sareePrice: sarees[1]?.price || 4899,
      bgGradient: 'from-[#F5F8F8] via-[#FFF] to-[#EBF2F3]'
    }
  ];

  // Auto Rotation every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative overflow-hidden border-b border-gray-200 transition-colors duration-700"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background slide container */}
      <div className={`py-12 lg:py-20 bg-gradient-to-r ${slide.bgGradient} transition-all duration-700`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-left animate-fadeIn">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-crimson/10 text-crimson font-bold text-xs px-3.5 py-1.5 rounded-full border border-crimson/20 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-zari" />
                <span>{slide.badge}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-deep-charcoal leading-[1.12] transition-all duration-500">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-lg">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => navigate('/collections')}
                  className="bg-crimson hover:bg-gold-zari text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-crimson/20 hover:shadow-2xl transition-all flex items-center gap-3 transform hover:-translate-y-0.5"
                >
                  <span>{slide.primaryBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/collections')}
                  className="bg-white hover:bg-cream text-deep-charcoal border border-gray-300 hover:border-crimson font-bold text-xs uppercase tracking-widest px-7 py-4 rounded-xl shadow-sm transition-all"
                >
                  <span>{slide.secondaryBtn}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center gap-6 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5 text-deep-charcoal">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Handloom Certified
                </span>
                <span className="flex items-center gap-1.5 text-deep-charcoal">
                  <Award className="w-4 h-4 text-gold-zari" /> GI Tag Protected #84
                </span>
              </div>

            </div>

            {/* Right Column - Slide Featured Image Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-[450px] lg:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Price Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gold-zari/30 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold-zari tracking-widest block">
                      Featured Saree
                    </span>
                    <h3 className="font-serif font-bold text-sm text-deep-charcoal truncate max-w-[240px]">
                      {slide.sareeName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-extrabold text-lg text-crimson block">
                      ₹{slide.sareePrice.toLocaleString('en-IN')}
                    </span>
                    <Link to="/collections" className="text-[10px] font-bold text-gold-zari hover:underline">
                      Shop Look →
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Slider Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-crimson hover:text-white text-deep-charcoal shadow-xl backdrop-blur-md transition-all z-20 border border-gray-200"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-crimson hover:text-white text-deep-charcoal shadow-xl backdrop-blur-md transition-all z-20 border border-gray-200"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 shadow-md">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-8 bg-crimson' : 'w-2.5 bg-gray-300 hover:bg-gold-zari'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
