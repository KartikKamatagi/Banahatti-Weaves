import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Award,
} from 'lucide-react';

import heroImg from '../assets/sarees/saree_model_maroon_1789668365104.png';

export default function HeroBannerSlider({ sarees = [] }) {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | HERO SLIDES
  |--------------------------------------------------------------------------
  */

  const slides = [
    {
      id: 1,
      badge: 'Heritage Collection',
      title: 'Handwoven Elegance from Banahatti',
      subtitle:
        'Discover beautiful sarees woven with traditional craftsmanship and the timeless character of Karnataka handloom weaving.',
      primaryBtn: 'SHOP NOW',
      secondaryBtn: 'EXPLORE COLLECTION',
      image: sarees?.[0]?.images?.[0] || heroImg,
      sareeName:
        sarees?.[0]?.name || 'Crimson Red Chikki Paras Cotton Saree',
      sareePrice: sarees?.[0]?.price || 3499,
    },

    {
      id: 2,
      badge: 'Festive Collection',
      title: 'Silk Sarees for Grand Celebrations',
      subtitle:
        'Elegant silk sarees with beautiful borders and rich textures, created for weddings, festivals and unforgettable occasions.',
      primaryBtn: 'SHOP SILK',
      secondaryBtn: 'VIEW BESTSELLERS',
      image: sarees?.[2]?.images?.[0] || heroImg,
      sareeName:
        sarees?.[2]?.name || 'Mustard Gold Handwoven Silk Saree',
      sareePrice: sarees?.[2]?.price || 7999,
    },

    {
      id: 3,
      badge: 'Traditional Collection',
      title: 'The Art of Karnataka Weaving',
      subtitle:
        'Discover traditional designs, distinctive borders and beautiful colours inspired by the rich textile heritage of Karnataka.',
      primaryBtn: 'EXPLORE TRADITIONAL',
      secondaryBtn: 'SHOP COLLECTION',
      image: sarees?.[1]?.images?.[0] || heroImg,
      sareeName:
        sarees?.[1]?.name || 'Royal Blue Traditional Saree',
      sareePrice: sarees?.[1]?.price || 4899,
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | AUTO SLIDER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  /*
  |--------------------------------------------------------------------------
  | NEXT SLIDE
  |--------------------------------------------------------------------------
  */

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /*
  |--------------------------------------------------------------------------
  | PREVIOUS SLIDE
  |--------------------------------------------------------------------------
  */

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  /*
  |--------------------------------------------------------------------------
  | CURRENT SLIDE
  |--------------------------------------------------------------------------
  */

  const slide = slides[currentSlide];

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <section
      className="relative overflow-hidden bg-[#F4EFE7] border-b border-[#DED4C7]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ================================================================
          MAIN HERO
      ================================================================= */}

      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[680px] items-center">

          {/* ============================================================
              LEFT CONTENT
          ============================================================= */}

          <div className="py-16 lg:py-24 lg:pr-16">

            {/* Small heading */}
            <div className="flex items-center gap-3 mb-7">
              <span className="h-px w-10 bg-[#A65D4F]" />

              <span className="text-[11px] tracking-[0.25em] uppercase font-medium text-[#A65D4F]">
                {slide.badge}
              </span>
            </div>

            {/* Main heading */}
            <h1
              key={slide.id}
              className="
                font-serif
                text-[#29231F]
                text-5xl
                sm:text-6xl
                lg:text-[72px]
                leading-[1.03]
                font-medium
                tracking-[-0.02em]
                max-w-[680px]
                animate-fadeIn
              "
            >
              {slide.title}
            </h1>

            {/* Description */}
            <p
              key={`subtitle-${slide.id}`}
              className="
                mt-7
                max-w-[560px]
                text-[#756D65]
                text-base
                lg:text-lg
                leading-8
              "
            >
              {slide.subtitle}
            </p>

            {/* ==========================================================
                BUTTONS
            =========================================================== */}

            <div className="flex flex-wrap items-center gap-5 mt-9">

              {/* Primary */}
              <button
                onClick={() => navigate('/collections')}
                className="
                  group
                  inline-flex
                  items-center
                  gap-4
                  bg-[#4A332B]
                  text-white
                  px-7
                  py-4
                  text-[11px]
                  font-semibold
                  tracking-[0.18em]
                  uppercase
                  hover:bg-[#A65D4F]
                  transition-all
                  duration-300
                "
              >
                <span>{slide.primaryBtn}</span>

                <ArrowRight
                  className="
                    w-4
                    h-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

              {/* Secondary */}
              <button
                onClick={() => navigate('/collections')}
                className="
                  inline-flex
                  items-center
                  text-[#29231F]
                  border-b
                  border-[#29231F]
                  px-1
                  py-3
                  text-[11px]
                  font-semibold
                  tracking-[0.18em]
                  uppercase
                  hover:text-[#A65D4F]
                  hover:border-[#A65D4F]
                  transition-colors
                "
              >
                {slide.secondaryBtn}
              </button>

            </div>

            {/* ==========================================================
                TRUST INFORMATION
            =========================================================== */}

            <div
              className="
                mt-12
                pt-7
                border-t
                border-[#DED4C7]
                flex
                flex-wrap
                gap-x-8
                gap-y-3
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  uppercase
                  tracking-[0.08em]
                  text-[#756D65]
                "
              >
                <CheckCircle2
                  className="w-4 h-4 text-[#647A62]"
                />

                <span>Authentic Weaving</span>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  uppercase
                  tracking-[0.08em]
                  text-[#756D65]
                "
              >
                <Award
                  className="w-4 h-4 text-[#A65D4F]"
                />

                <span>Made in Karnataka</span>
              </div>

            </div>

          </div>

          {/* ============================================================
              RIGHT IMAGE
          ============================================================= */}

          <div className="relative py-10 lg:py-16">

            <div className="relative overflow-hidden bg-white">

              {/* --------------------------------------------------------
                  SAREE IMAGE
              --------------------------------------------------------- */}

              <img
                key={slide.image}
                src={slide.image}
                alt={slide.sareeName}
                className="
                  block
                  w-full
                  h-[520px]
                  sm:h-[600px]
                  lg:h-[650px]
                  object-cover
                  transition-transform
                  duration-[1200ms]
                  ease-out
                  hover:scale-[1.02]
                "
                onError={(e) => {
                  e.currentTarget.src = heroImg;
                }}
              />

              {/* --------------------------------------------------------
                  IMAGE OVERLAY PRODUCT INFORMATION
              --------------------------------------------------------- */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  bg-[#FFFDFC]/95
                  backdrop-blur-sm
                  border-t
                  border-[#DED4C7]
                  px-6
                  py-5
                  flex
                  items-center
                  justify-between
                  gap-5
                "
              >

                {/* Product name */}
                <div className="min-w-0">

                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.22em]
                      text-[#A65D4F]
                      mb-1
                    "
                  >
                    Featured Saree
                  </p>

                  <h3
                    className="
                      text-[#29231F]
                      font-serif
                      text-base
                      sm:text-lg
                      truncate
                    "
                  >
                    {slide.sareeName}
                  </h3>

                </div>

                {/* Price */}
                <div className="text-right shrink-0">

                  <p
                    className="
                      text-[#4A332B]
                      font-serif
                      text-xl
                      font-medium
                    "
                  >
                    ₹
                    {Number(slide.sareePrice).toLocaleString(
                      'en-IN'
                    )}
                  </p>

                  <Link
                    to="/collections"
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-[#A65D4F]
                      hover:text-[#4A332B]
                      transition-colors
                    "
                  >
                    Shop Look →
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ================================================================
          PREVIOUS BUTTON
      ================================================================= */}

      <button
        onClick={prevSlide}
        className="
          absolute
          left-4
          lg:left-7
          top-1/2
          -translate-y-1/2
          w-11
          h-11
          flex
          items-center
          justify-center
          bg-[#FFFDFC]/90
          border
          border-[#DED4C7]
          text-[#29231F]
          hover:bg-[#4A332B]
          hover:text-white
          transition-all
          duration-300
          z-20
        "
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* ================================================================
          NEXT BUTTON
      ================================================================= */}

      <button
        onClick={nextSlide}
        className="
          absolute
          right-4
          lg:right-7
          top-1/2
          -translate-y-1/2
          w-11
          h-11
          flex
          items-center
          justify-center
          bg-[#FFFDFC]/90
          border
          border-[#DED4C7]
          text-[#29231F]
          hover:bg-[#4A332B]
          hover:text-white
          transition-all
          duration-300
          z-20
        "
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ================================================================
          SLIDER INDICATORS
      ================================================================= */}

      <div
        className="
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-2
          z-20
        "
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              h-[2px]
              transition-all
              duration-500
              ${
                currentSlide === index
                  ? 'w-10 bg-[#4A332B]'
                  : 'w-5 bg-[#B8AEA3] hover:bg-[#A65D4F]'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}