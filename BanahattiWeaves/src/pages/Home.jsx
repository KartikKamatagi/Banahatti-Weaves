import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SareeCard from '../components/SareeCard';
import HeroBannerSlider from '../components/HeroBannerSlider';
import { ShieldCheck, ShoppingBag, Headphones } from 'lucide-react';

export default function Home() {
  const { sarees } = useCart();

  const latestSarees = sarees.filter((s) => s.isLatest).slice(0, 4);
  const bestSellerSarees = sarees.filter((s) => s.isBestSeller || s.rating >= 4.9).slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16 font-sans">
      
      {/* ATTRACTIVE DYNAMIC CHANGING HERO BANNER SLIDER */}
      <HeroBannerSlider sarees={sarees} />

      {/* LATEST COLLECTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-crimson uppercase tracking-widest block mb-1">
              FRESH LOOM ARRIVALS
            </span>
            <h2 className="font-serif text-3xl font-extrabold text-deep-charcoal">
              LATEST COLLECTION
            </h2>
          </div>

          <Link 
            to="/collections" 
            className="text-xs font-bold text-crimson hover:text-gold-zari tracking-wider uppercase flex items-center gap-1 transition-colors"
          >
            View All Collection →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestSarees.map((saree) => (
            <SareeCard key={saree.id} saree={saree} />
          ))}
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      <section className="bg-cream/50 py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-gold-zari uppercase tracking-widest block mb-1">
                CUSTOMER FAVORITES
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-deep-charcoal">
                BEST SELLERS
              </h2>
            </div>

            <Link 
              to="/collections" 
              className="text-xs font-bold text-crimson hover:text-gold-zari tracking-wider uppercase flex items-center gap-1 transition-colors"
            >
              Shop Best Sellers →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellerSarees.map((saree) => (
              <SareeCard key={saree.id} saree={saree} />
            ))}
          </div>
        </div>
      </section>

      {/* THREE-FEATURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center space-y-3 hover:border-gold-zari transition-all">
            <div className="w-14 h-14 mx-auto rounded-full bg-crimson/10 text-crimson flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-deep-charcoal uppercase tracking-wide">
              AUTHENTIC HANDLOOM
            </h3>
            <p className="text-xs text-gray-500">
              Quality sarees woven direct from Banahatti, Karnataka pit-looms.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center space-y-3 hover:border-gold-zari transition-all">
            <div className="w-14 h-14 mx-auto rounded-full bg-gold-zari/10 text-gold-zari flex items-center justify-center">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-deep-charcoal uppercase tracking-wide">
              EASY SHOPPING
            </h3>
            <p className="text-xs text-gray-500">
              Simple, secure, and convenient online ordering process.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center space-y-3 hover:border-gold-zari transition-all">
            <div className="w-14 h-14 mx-auto rounded-full bg-teal/10 text-teal flex items-center justify-center">
              <Headphones className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-deep-charcoal uppercase tracking-wide">
              CUSTOMER SUPPORT
            </h3>
            <p className="text-xs text-gray-500">
              We're here to help you with your order and customization queries.
            </p>
          </div>

        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-deep-charcoal text-white rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden border border-gold-zari/30">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-zari">
              JOIN THE HANDLOOM LOVERS CLUB
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold">
              Subscribe for Fresh Weave Drops & Offers
            </h3>
            <p className="text-xs text-gray-400 font-light">
              Get notified when new Banahatti cotton and silk sarees come off the pit-looms.
            </p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to Banahatti Weaves newsletter!');
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white text-xs border border-gray-700 focus:outline-none focus:border-gold-zari placeholder:text-gray-400"
            />
            <button 
              type="submit"
              className="bg-crimson hover:bg-gold-zari text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
