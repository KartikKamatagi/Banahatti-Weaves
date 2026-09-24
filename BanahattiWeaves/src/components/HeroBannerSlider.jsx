import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Pause,
  Play,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

// Curated high-resolution Banahatti saree assets
import heroMaroonImg from '../assets/hero_professional.jpg';
import emeraldImg from '../assets/sarees/saree_model_emerald_green_1789755773551.jpg';
import blueImg from '../assets/sarees/saree_model_blue_1789668405492.png';
import purpleImg from '../assets/sarees/saree_model_purple_1789668387478.png';
import magentaImg from '../assets/sarees/saree_model_magenta_grid_1789755709147.jpg';

export const HERO_SLIDES = [
  {
    id: 'saree-banahatti-01',
    badge: 'Made by hand in Banahatti',
    season: 'The festive edit · 2026',
    titleMain: 'Woven with',
    titleAccent: 'stories',
    titleEnd: 'to be worn for life.',
    description:
      'Exceptional handloom sarees, shaped patiently by artisans and finished in the colours of Karnataka.',
    primaryBtn: 'Explore the collection',
    primaryLink: '/collections',
    secondaryBtn: 'Our craft',
    secondaryAction: 'craft',
    sareeName: 'Banahatti Maroon & White Check Saree',
    sareeSubtitle: 'Double warp pit-loom check with gold zari border',
    price: 4250,
    originalPrice: 4999,
    discount: '15% OFF',
    tag: '01 The Heirloom Collection',
    tabLabel: 'Maroon Zari',
    image: heroMaroonImg,
    fallbackImage: '/images/sarees/saree_model_maroon_1789668365104.png',
    stats: [
      { val: '30+', label: 'years of weaving' },
      { val: '100%', label: 'handloom made' },
      { val: '4.9/5', label: 'loved by customers' },
    ],
  },
  {
    id: 'saree-banahatti-05',
    badge: 'Royal Karnataka Heritage',
    season: 'Royal Emerald Edit · 2026',
    titleMain: 'Draped in',
    titleAccent: 'heritage,',
    titleEnd: 'crafted for royalty.',
    description:
      'Lush emerald green handloom cotton with subtle gold dashed grids and majestic purple central zari stripes.',
    primaryBtn: 'Shop Emerald Saree',
    primaryLink: '/saree/saree-banahatti-05',
    secondaryBtn: 'View Traditional Sarees',
    secondaryLink: '/collections?category=COTTON',
    sareeName: 'Banahatti Emerald Green Dashed Grid Saree',
    sareeSubtitle: '80s combed cotton with purple-gold zari border',
    price: 4950,
    originalPrice: 5800,
    discount: '15% OFF',
    tag: '02 The Royal Emerald Edit',
    tabLabel: 'Emerald Green',
    image: emeraldImg,
    fallbackImage: '/images/sarees/saree_model_emerald_green_1789755773551.jpg',
    stats: [
      { val: '80s', label: 'fine combed cotton' },
      { val: '14 Days', label: 'on the pit-loom' },
      { val: 'Guild #12', label: 'master artisans' },
    ],
  },
  {
    id: 'saree-banahatti-03',
    badge: 'Iconic Karnataka Weave',
    season: 'Traditional Pit-Loom · 2026',
    titleMain: 'The living art of',
    titleAccent: 'Karnataka',
    titleEnd: 'pit-looms.',
    description:
      'Traditional dual-warp check weave in royal indigo blue, accented by broad gold zari and sacred triangular temple (toperi) borders.',
    primaryBtn: 'Shop Indigo Check',
    primaryLink: '/saree/saree-banahatti-03',
    secondaryBtn: 'Explore All Sarees',
    secondaryLink: '/collections',
    sareeName: 'Banahatti Royal Indigo Blue Check Saree',
    sareeSubtitle: 'Dual warp check with red temple (toperi) motifs',
    price: 4450,
    originalPrice: 5200,
    discount: '14% OFF',
    tag: '03 The Indigo Check Edit',
    tabLabel: 'Indigo Blue',
    image: blueImg,
    fallbackImage: '/images/sarees/saree_model_blue_1789668405492.png',
    stats: [
      { val: 'Double Warp', label: 'handloom structure' },
      { val: 'Toperi', label: 'sacred temple border' },
      { val: '5.0★', label: 'customer favourite' },
    ],
  },
  {
    id: 'saree-banahatti-02',
    badge: '3-Shuttle Interlocking Weave',
    season: 'Puja & Ritual Edit · 2026',
    titleMain: 'Sacred temple',
    titleAccent: 'elegance',
    titleEnd: 'in every thread.',
    description:
      'Masterpiece Banahatti handloom saree in deep purple cotton featuring striking white triangular temple motifs and a shimmering golden-orange band.',
    primaryBtn: 'Shop Temple Saree',
    primaryLink: '/saree/saree-banahatti-02',
    secondaryBtn: 'Meet Our Artisans',
    secondaryLink: '/about',
    sareeName: 'Banahatti Deep Purple Temple Border Saree',
    sareeSubtitle: '3-shuttle interlocking temple weave by Ningappa Devanga',
    price: 4650,
    originalPrice: 5499,
    discount: '15% OFF',
    tag: '04 The Temple Toperi Edit',
    tabLabel: 'Royal Purple',
    image: purpleImg,
    fallbackImage: '/images/sarees/saree_model_purple_1789668387478.png',
    stats: [
      { val: '3-Shuttle', label: 'interlocking technique' },
      { val: '80s Count', label: 'fine combed yarn' },
      { val: '100%', label: 'pure pit-loom' },
    ],
  },
  {
    id: 'saree-banahatti-04',
    badge: 'Limited Artisan Batch',
    season: 'Festive Celebration · 2026',
    titleMain: 'Vibrant hues of',
    titleAccent: 'Banahatti',
    titleEnd: 'master weavers.',
    description:
      'Vivid magenta purple with delicate white and gold dashed grid lines, framed by a broad gold zari border and bright orange selvedge.',
    primaryBtn: 'Shop Festive Magenta',
    primaryLink: '/saree/saree-banahatti-04',
    secondaryBtn: 'Explore Collections',
    secondaryLink: '/collections',
    sareeName: 'Banahatti Magenta Purple Dashed Grid Saree',
    sareeSubtitle: 'Extra-weft dashed line weave by Kavitha Pattar',
    price: 4800,
    originalPrice: 5600,
    discount: '14% OFF',
    tag: '05 The Magenta Festive Edit',
    tabLabel: 'Festive Magenta',
    image: magentaImg,
    fallbackImage: '/images/sarees/saree_model_magenta_grid_1789755709147.jpg',
    stats: [
      { val: 'Extra Weft', label: 'dashed grid pattern' },
      { val: 'Pure Zari', label: 'gold border selvedge' },
      { val: '6.3 Mtrs', label: 'includes blouse piece' },
    ],
  },
];

const SLIDE_DURATION = 5500; // 5.5 seconds per slide for a relaxed luxury feel
const PROGRESS_STEP = 50; // update interval ms

export default function HeroBannerSlider() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const totalSlides = HERO_SLIDES.length;
  const current = HERO_SLIDES[currentSlide];

  // Advance to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // Back to previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // Jump to specific slide
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  // Smooth progress bar and automatic changing interval
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextVal = prev + (PROGRESS_STEP / SLIDE_DURATION) * 100;
        if (nextVal >= 100) {
          nextSlide();
          return 0;
        }
        return nextVal;
      });
    }, PROGRESS_STEP);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation when user is on the slider
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section
      className="hero-section container-custom select-none"
      aria-label="Banahatti Weaves Featured Sarees Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="hero-card hero-slider-card">
        {/* ============================================================
            LEFT COLUMN: TYPOGRAPHY, BRAND EDITORIAL & CTAs
        ============================================================= */}
        <div className="hero-copy relative z-10">
          {/* Eyebrow & Live Slide Pill */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="eyebrow">
              <Sparkles size={14} className="text-[#e2b78c]" />
              <span>{current.badge}</span>
            </div>

            {/* Auto-play status pill */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold bg-white/10 hover:bg-white/20 text-[#e2b78c] border border-white/15 transition-all"
              title={isPaused ? 'Resume auto-slider' : 'Pause auto-slider'}
              aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            >
              {isPaused ? <Play size={10} /> : <Pause size={10} />}
              <span className="hidden sm:inline">
                {isPaused ? 'Paused' : 'Auto Playing'}
              </span>
            </button>
          </div>

          {/* Season Tag */}
          <p className="hero-season tracking-widest">{current.season}</p>

          {/* Main Editorial Heading with Animated Transition */}
          <h1
            key={`title-${currentSlide}`}
            className="hero-animated-text"
          >
            {current.titleMain}{' '}
            <em className="text-[#e7b982] not-italic font-normal">
              {current.titleAccent}
            </em>
            <br />
            {current.titleEnd}
          </h1>

          {/* Story Description */}
          <p
            key={`desc-${currentSlide}`}
            className="hero-description hero-animated-desc"
          >
            {current.description}
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <button
              onClick={() => navigate(current.primaryLink)}
              className="button-primary group shadow-lg shadow-[#8c3e43]/30"
            >
              <span>{current.primaryBtn}</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {current.secondaryAction === 'craft' ? (
              <button
                onClick={() =>
                  document
                    .getElementById('craft')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="button-text cursor-pointer"
              >
                <span>{current.secondaryBtn}</span>
                <span className="text-sm">↓</span>
              </button>
            ) : (
              <button
                onClick={() => navigate(current.secondaryLink || '/collections')}
                className="button-text cursor-pointer"
              >
                <span>{current.secondaryBtn}</span>
                <span className="text-sm">→</span>
              </button>
            )}
          </div>

          {/* Saree Craft Proof / Metrics */}
          <div
            key={`stats-${currentSlide}`}
            className="hero-proof hero-animated-stats"
          >
            {current.stats.map((stat, idx) => (
              <div key={idx}>
                <strong>{stat.val}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            RIGHT COLUMN: BEAUTIFUL SAREE VISUAL WITH SMOOTH CROSSFADE
        ============================================================= */}
        <div className="hero-visual relative overflow-hidden">
          {/* Layered Saree Images with Ken Burns Zoom & Smooth Dissolve */}
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ease-out ${
                  isActive
                    ? 'opacity-100 scale-100 z-1 pointer-events-auto'
                    : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.sareeName}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    if (slide.fallbackImage && e.currentTarget.src !== slide.fallbackImage) {
                      e.currentTarget.src = slide.fallbackImage;
                    } else {
                      e.currentTarget.src = heroMaroonImg;
                    }
                  }}
                />
              </div>
            );
          })}

          {/* Authentic Rotating Stamp */}
          <div className="hero-stamp animate-stamp">
            <span>Authentically</span>
            <strong>HANDWOVEN</strong>
            <span>in Banahatti</span>
          </div>

          {/* Slide Tag / Caption */}
          <div className="hero-caption">
            <span>{`0${currentSlide + 1}`}</span>
            <div>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-white/90">
                {current.tag}
              </p>
              <p className="text-[8px] text-[#e2b78c] tracking-widest uppercase">
                Artisan Guild Certified
              </p>
            </div>
          </div>

          {/* Floating Luxury Saree Product Glassmorphism Tag */}
          <div className="hero-saree-tag">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="hero-saree-tag-badge">
                  {current.discount} · Handloom
                </span>
                <h4 className="text-white text-xs sm:text-sm font-serif font-medium truncate mt-1">
                  {current.sareeName}
                </h4>
                <p className="text-[#c7d3cd] text-[10px] truncate">
                  {current.sareeSubtitle}
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm sm:text-base font-serif font-bold text-[#e7b982]">
                  ₹{current.price.toLocaleString('en-IN')}
                </div>
                {current.originalPrice && (
                  <del className="text-[10px] text-white/60 block">
                    ₹{current.originalPrice.toLocaleString('en-IN')}
                  </del>
                )}
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between">
              <Link
                to={`/saree/${current.id}`}
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-white hover:text-[#e7b982] uppercase tracking-wider transition-colors"
              >
                <span>View Saree Details</span>
                <ArrowRight size={12} />
              </Link>

              <span className="text-[9px] text-[#b9c4bd] tracking-wider uppercase">
                Slide {currentSlide + 1} of {totalSlides}
              </span>
            </div>
          </div>

          {/* Left & Right Arrow Buttons on Image */}
          <div className="hero-nav-arrows">
            <button
              onClick={prevSlide}
              aria-label="Previous Saree Slide"
              className="hero-arrow-btn"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Saree Slide"
              className="hero-arrow-btn"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ============================================================
            BOTTOM BAR: INTERACTIVE SLIDE TABS & LIVE PROGRESS TRACKER
        ============================================================= */}
        <div className="hero-slider-footer">
          <div className="hero-tabs-wrap">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`hero-tab-item ${
                    isActive ? 'is-active' : 'opacity-65 hover:opacity-100'
                  }`}
                  aria-label={`Jump to slide ${index + 1}: ${slide.tabLabel}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#e7b982]">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-white truncate">
                      {slide.tabLabel}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="hero-tab-progress-track">
                    <div
                      className="hero-tab-progress-bar"
                      style={{
                        width: isActive
                          ? `${progress}%`
                          : index < currentSlide
                          ? '100%'
                          : '0%',
                        transition:
                          isActive && !isPaused ? 'width 50ms linear' : 'none',
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}