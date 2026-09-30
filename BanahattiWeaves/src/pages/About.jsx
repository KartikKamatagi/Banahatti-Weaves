import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import {
  ShieldCheck,
  Sparkles,
  Award,
  ArrowRight,
  Feather,
  Users,
  Compass
} from 'lucide-react';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero-section container-custom">
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <span className="about-eyebrow">
              <Sparkles className="w-3.5 h-3.5" /> Heritage of Banahatti, Karnataka
            </span>
            <h1 className="about-hero-title">
              Centuries of weaving heritage, <em>woven for modern elegance.</em>
            </h1>
            <p className="about-hero-description">
              Nestled along the serene Krishna river in Bagalkot district, Banahatti is world-renowned for its master pit-loom weavers who have passed down Karnataka’s double-warp cotton and silk weaving traditions across generations.
            </p>

            <div className="about-hero-actions">
              <Link to="/collections" className="button-primary">
                <span>Explore Saree Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#our-story" className="button-outline">
                <span>Read Our Journey</span>
              </a>
            </div>
          </div>

          <div className="about-hero-image-wrapper">
            <img
              src="/images/banahatti_hero_portrait.jpg"
              alt="Banahatti Pitloom Saree Weaver"
            />
            <div className="about-stamp-badge">
              <span>100% Handwoven</span>
              <strong>Pitloom Craft</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="our-story" className="about-narrative-section">
        <div className="container-custom">
          <div className="about-narrative-grid">
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

            <div className="about-story-copy">
              <span className="about-eyebrow">
                <Compass className="w-3.5 h-3.5" /> Our soul & origins
              </span>
              <h2 className="about-story-title">
                Empowering artisan families directly from loom to wardrobe.
              </h2>

              <div className="about-story-text">
                <p className="about-story-lead">
                  Banahatti handlooms are distinguished by their fine count combed cotton yarns, sturdy double-warp structure, and signature <em>Chikki Paras</em> and <em>Gomi Teni</em> border motifs.
                </p>
                <p>
                  For centuries, master weaver households in Banahatti worked on traditional pit looms built directly into earth floors—enabling precise humidity control required to weave high-density, soft cotton sarees that drape effortlessly.
                </p>
                <p>
                  Banahatti Weaves was founded to bridge the gap between discerning saree connoisseurs and rural artisan cooperatives. By eliminating middle traders, we ensure 100% fair artisan compensation while guaranteeing authentic, certified handloom quality delivered to your doorstep.
                </p>
              </div>

              <div className="about-story-feature-grid">
                <div className="about-story-feature-box">
                  <h4>Pure Double Warp</h4>
                  <p>Unmatched strength, featherlight softness, and longevity.</p>
                </div>
                <div className="about-story-feature-box">
                  <h4>Kasuti Inspired</h4>
                  <p>Intricate geometric border embroidery patterns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-pillars-section container-custom">
        <div className="about-section-heading">
          <span className="about-eyebrow">
            <Award className="w-3.5 h-3.5" /> Why Banahatti Weaves
          </span>
          <h2>Our unwavering commitment to quality & artisans</h2>
          <p>
            Every saree we curate represents timeless technique, ethical production, and uncompromising craft perfection.
          </p>
        </div>

        <div className="about-pillars-grid">
          <div className="about-pillar-card">
            <div className="about-pillar-icon">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3>100% Pit-Loom Woven</h3>
            <p>
              Crafted manually on traditional pit looms to preserve the soft texture, breathability, and natural strength of fine combed cottons.
            </p>
          </div>

          <div className="about-pillar-card">
            <div className="about-pillar-icon">
              <Users className="w-6 h-6" />
            </div>
            <h3>Fair Artisan Wages</h3>
            <p>
              We work directly with weaver families, ensuring equitable pricing, sustained livelihoods, and community upliftment in Bagalkot.
            </p>
          </div>

          <div className="about-pillar-card">
            <div className="about-pillar-icon">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3>Signature Heritage Motifs</h3>
            <p>
              Adorned with iconic <em>Chikki Paras</em> temple borders, zari detailing, and traditional Karnataka color pairings.
            </p>
          </div>

          <div className="about-pillar-card">
            <div className="about-pillar-icon">
              <Feather className="w-6 h-6" />
            </div>
            <h3>Eco-Conscious Natural Fibers</h3>
            <p>
              Woven from pure organic cotton and Mulberry silk yarns using zero-emission manual weaving methods.
            </p>
          </div>
        </div>
      </section>

      <section className="about-craft-section">
        <div className="container-custom">
          <div className="about-section-heading">
            <span className="about-eyebrow">
              <Sparkles className="w-3.5 h-3.5" /> The weaver’s journey
            </span>
            <h2>From raw thread to timeless elegance</h2>
          </div>

          <div className="about-craft-grid">
            <div className="about-craft-card">
              <span className="about-craft-num">01</span>
              <h4>Yarn Dyeing & Spinning</h4>
              <p>
                Combed cotton yarns are dyed in rich fast colors and spun onto wooden bobbins.
              </p>
            </div>

            <div className="about-craft-card">
              <span className="about-craft-num">02</span>
              <h4>Warping & Reed Setup</h4>
              <p>
                Thousands of threads are hand-aligned on double warps for exact border motif weaving.
              </p>
            </div>

            <div className="about-craft-card">
              <span className="about-craft-num">03</span>
              <h4>Master Pit-Loom Weaving</h4>
              <p>
                Shuttles fly rhythmically as master artisans weave 6.3 meters with attached blouse pieces.
              </p>
            </div>

            <div className="about-craft-card">
              <span className="about-craft-num">04</span>
              <h4>Quality Audit & Delivery</h4>
              <p>
                Inspected for warp density, border perfection, and eco-friendly protective packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

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

      <section className="about-cta-section container-custom">
        <div className="about-cta-panel">
          <h2>Experience the soft grace of authentic Banahatti sarees.</h2>
          <p>
            Discover our latest collection of cotton, silk, and traditional handlooms crafted directly by Karnataka’s master weavers.
          </p>
          <div className="about-cta-actions">
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

