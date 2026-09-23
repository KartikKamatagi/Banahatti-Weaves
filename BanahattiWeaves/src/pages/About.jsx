import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import { 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Feather, 
  Users, 
  Compass,
  Star
} from 'lucide-react';

export default function About() {
  return (
    <div className="about-page">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="about-hero-section container-custom">
        <div className="about-hero-grid">
          
          {/* Left Text Column */}
          <div>
            <span className="about-eyebrow">
              <Sparkles className="w-3.5 h-3.5" /> HERITAGE OF BANAHATTI, KARNATAKA
            </span>
            <h1 className="about-hero-title">
              Centuries of Weaving Heritage, <em>Woven for Modern Elegance.</em>
            </h1>
            <p className="about-hero-description">
              Nestled along the serene Krishna river in Bagalkot district, Banahatti is world-renowned for its master pit-loom weavers who have passed down Karnataka’s double-warp cotton and silk weaving traditions across generations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/collections"
                className="button-primary flex items-center gap-2"
              >
                <span>Explore Saree Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#our-story"
                className="button-outline flex items-center gap-2"
              >
                <span>Read Our Journey</span>
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="about-hero-image-wrapper">
            <img 
              src="/images/banahatti_hero_portrait.jpg" 
              alt="Banahatti Pitloom Saree Weaver" 
            />
            
            {/* Stamp Overlay */}
            <div className="about-stamp-badge">
              <span>100% HANDWOVEN</span>
              <strong>PITLOOM CRAFT</strong>
            </div>
          </div>

        </div>
      </section>

      {/* 2. OUR STORY & NARRATIVE SECTION */}
      <section id="our-story" className="about-narrative-section">
        <div className="container-custom">
          <div className="about-narrative-grid">
            
            {/* Dual Image Collage */}
            <div className="about-collage-container">
              <div className="about-collage-img-1">
                <img 
                  src="/images/sarees/saree_model_maroon_1789668365104.png" 
                  alt="Banahatti Maroon Saree" 
                />
              </div>
              <div className="about-collage-img-2">
                <img 
                  src="/images/sarees/saree_model_emerald_green_1789755773551.jpg" 
                  alt="Banahatti Emerald Green Saree" 
                />
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-6">
              <span className="about-eyebrow">
                <Compass className="w-3.5 h-3.5" /> OUR SOUL & ORIGINS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#18362E] leading-tight">
                Empowering Artisan Families Directly From Loom to Wardrobe.
              </h2>
              
              <div className="space-y-4 text-sm text-[#55625B] leading-relaxed">
                <p className="text-base font-serif text-[#18362E] font-medium">
                  Banahatti handlooms are distinguished by their fine count combed cotton yarns, sturdy double-warp structure, and signature <em>Chikki Paras</em> and <em>Gomi Teni</em> border motifs.
                </p>
                <p>
                  For centuries, master weaver households in Banahatti worked on traditional pit looms built directly into earth floors—enabling precise humidity control required to weave high-density, soft cotton sarees that drape effortlessly.
                </p>
                <p>
                  Banahatti Weaves was founded to bridge the gap between discerning saree connoisseurs and rural artisan cooperatives. By eliminating middle traders, we ensure 100% fair artisan compensation while guaranteeing authentic, certified handloom quality delivered to your doorstep.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#DDD5C9]">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#8C3E43]">Pure Double Warp</h4>
                  <p className="text-xs text-[#77716B]">Unmatched strength, featherlight softness, and longevity.</p>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#8C3E43]">Kasuti Inspired</h4>
                  <p className="text-xs text-[#77716B]">Intricate geometric border embroidery patterns.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. FOUR CORE BRAND PILLARS */}
      <section className="py-20 container-custom space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="about-eyebrow justify-center">
            <Award className="w-3.5 h-3.5" /> WHY BANAHATTI WEAVES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#18362E]">
            Our Unwavering Commitment to Quality & Artisans
          </h2>
          <p className="text-sm text-[#6C766F]">
            Every saree we curate represents timeless technique, ethical production, and uncompromising craft perfection.
          </p>
        </div>

        <div className="about-pillars-grid">
          
          {/* Pillar 1 */}
          <div className="about-pillar-card">
            <div className="about-pillar-icon">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#18362E]">100% Pit-Loom Woven</h3>
            <p className="text-xs text-[#6C766F] leading-relaxed">
              Crafted manually on traditional pit looms to preserve the soft texture, breathability, and natural strength of fine combed cottons.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="about-pillar-card">
            <div className="about-pillar-icon">
              <Users className="w-6 h-6 text-[#C69B54]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#18362E]">Fair Artisan Wages</h3>
            <p className="text-xs text-[#6C766F] leading-relaxed">
              We work directly with weaver families, ensuring equitable pricing, sustained livelihoods, and community upliftment in Bagalkot.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="about-pillar-card">
            <div className="about-pillar-icon">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#18362E]">Signature Heritage Motifs</h3>
            <p className="text-xs text-[#6C766F] leading-relaxed">
              Adorned with iconic <em>Chikki Paras</em> temple borders, zari detailing, and traditional Karnataka color pairings.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="about-pillar-card">
            <div className="about-pillar-icon">
              <Feather className="w-6 h-6 text-[#4F806B]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#18362E]">Eco-Conscious Natural Fibers</h3>
            <p className="text-xs text-[#6C766F] leading-relaxed">
              Woven from pure organic cotton and Mulberry silk yarns using zero-emission manual weaving methods.
            </p>
          </div>

        </div>
      </section>

      {/* 4. THE CRAFTSMANSHIP JOURNEY TIMELINE */}
      <section className="py-16 bg-[#F3EEE6] border-y border-[#DDD5C9]">
        <div className="container-custom space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="about-eyebrow justify-center">
              <Sparkles className="w-3.5 h-3.5" /> THE WEAVER'S JOURNEY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#18362E]">
              From Raw Thread to Timeless Elegance
            </h2>
          </div>

          <div className="about-craft-grid">
            
            <div className="about-craft-card">
              <span className="about-craft-num">01</span>
              <h4 className="font-serif font-bold text-base text-[#18362E]">Yarn Dyeing & Spinning</h4>
              <p className="text-xs text-[#6C766F] leading-relaxed">
                Combed cotton yarns are dyed in rich fast colors and spun onto wooden bobbins.
              </p>
            </div>

            <div className="about-craft-card">
              <span className="about-craft-num">02</span>
              <h4 className="font-serif font-bold text-base text-[#18362E]">Warping & Reed Setup</h4>
              <p className="text-xs text-[#6C766F] leading-relaxed">
                Thousands of threads are hand-aligned on double warps for exact border motif weaving.
              </p>
            </div>

            <div className="about-craft-card">
              <span className="about-craft-num">03</span>
              <h4 className="font-serif font-bold text-base text-[#18362E]">Master Pit-Loom Weaving</h4>
              <p className="text-xs text-[#6C766F] leading-relaxed">
                Shuttles fly rhythmically as master artisans weave 6.3 meters with attached blouse pieces.
              </p>
            </div>

            <div className="about-craft-card">
              <span className="about-craft-num">04</span>
              <h4 className="font-serif font-bold text-base text-[#18362E]">Quality Audit & Delivery</h4>
              <p className="text-xs text-[#6C766F] leading-relaxed">
                Inspected for warp density, border perfection, and eco-friendly protective packaging.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. IMPACT & COMMUNITY STATS BANNER */}
      <section className="py-16 container-custom">
        <div className="about-stats-banner">
          <div className="about-stats-grid">
            
            <div>
              <div className="about-stat-number">350+</div>
              <div className="about-stat-label">Active Artisan Pit Looms</div>
            </div>

            <div>
              <div className="about-stat-number">100%</div>
              <div className="about-stat-label">Authentic Handloom Certified</div>
            </div>

            <div>
              <div className="about-stat-number">15,000+</div>
              <div className="about-stat-label">Sarees Shipped Nationwide</div>
            </div>

            <div>
              <div className="about-stat-number">4.9 ★</div>
              <div className="about-stat-label">Customer Satisfaction Rating</div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="pb-24 container-custom">
        <div className="bg-[#EADFCE] p-10 md:p-16 rounded-3xl text-center space-y-6 relative overflow-hidden">
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#18362E] max-w-2xl mx-auto">
            Experience the Soft Grace of Authentic Banahatti Sarees.
          </h2>
          <p className="text-sm text-[#6F665D] max-w-lg mx-auto">
            Discover our latest collection of cotton, silk, and traditional handlooms crafted directly by Karnataka’s master weavers.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/collections" className="button-primary">
              Shop Collections
            </Link>
            <Link to="/bestsellers" className="button-outline">
              View Bestsellers
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
