import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12 space-y-12 font-sans">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-zari">
          OUR STORY & HERITAGE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-deep-charcoal">
          ABOUT BANAHATTI WEAVES
        </h1>
        <p className="text-sm text-gray-500 font-normal">
          Preserving centuries of Karnataka handloom heritage through direct pit-loom craftsmanship.
        </p>
      </div>

      {/* Main Content Box */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gold-zari/30 shadow-xl space-y-8">
        
        <div className="prose prose-stone max-w-none text-xs sm:text-sm text-gray-600 space-y-4 leading-relaxed">
          <p className="text-base text-deep-charcoal font-serif font-semibold">
            Banahatti Weaves is an online store showcasing beautiful handloom sarees direct from Banahatti, Karnataka.
          </p>

          <p>
            Nestled along the Krishna river in Bagalkot district, Banahatti is renowned across India for its distinctive pit-loom weaving techniques. Generations of artisan weaver families have dedicated their lives to mastering double-warp cottons and silk sarees decorated with iconic <em>Chikki Paras</em> borders and intricate <em>Kasuti</em> embroidery.
          </p>

          <p>
            Our mission is simple: bring high-quality, authentic handloom sarees directly from the weaver looms to your wardrobe without unnecessary middlemen, ensuring fair wages for master artisans while making online shopping convenient and transparent.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
          
          <div className="p-4 bg-cream/50 rounded-2xl border border-gold-zari/20 text-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-crimson mx-auto" />
            <h4 className="font-serif font-bold text-xs uppercase text-deep-charcoal">Traditional Craft</h4>
            <p className="text-[11px] text-gray-500">100% Pit-loom woven with authentic Chikki Paras borders.</p>
          </div>

          <div className="p-4 bg-cream/50 rounded-2xl border border-gold-zari/20 text-center space-y-2">
            <Award className="w-6 h-6 text-gold-zari mx-auto" />
            <h4 className="font-serif font-bold text-xs uppercase text-deep-charcoal">Unmatched Quality</h4>
            <p className="text-[11px] text-gray-500">Pure combed cottons and silk fabrics built to last generations.</p>
          </div>

          <div className="p-4 bg-cream/50 rounded-2xl border border-gold-zari/20 text-center space-y-2">
            <Sparkles className="w-6 h-6 text-crimson mx-auto" />
            <h4 className="font-serif font-bold text-xs uppercase text-deep-charcoal">Beautiful Sarees</h4>
            <p className="text-[11px] text-gray-500">Curated colors and traditional motifs for every occasion.</p>
          </div>

          <div className="p-4 bg-cream/50 rounded-2xl border border-gold-zari/20 text-center space-y-2">
            <Heart className="w-6 h-6 text-crimson mx-auto" />
            <h4 className="font-serif font-bold text-xs uppercase text-deep-charcoal">Simple Shopping</h4>
            <p className="text-[11px] text-gray-500">Hassle-free browsing, secure checkout, and fast shipping.</p>
          </div>

        </div>

        {/* CTA */}
        <div className="pt-4 text-center">
          <Link
            to="/collections"
            className="bg-crimson hover:bg-gold-zari text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg transition-colors inline-block"
          >
            Explore Our Saree Collection
          </Link>
        </div>

      </div>

    </div>
  );
}
