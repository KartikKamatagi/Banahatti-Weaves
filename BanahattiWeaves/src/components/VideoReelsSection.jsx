import React, { useState } from 'react';
import { Play, Sparkles, ShoppingBag, Eye, Heart, Volume2, VolumeX } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function VideoReelsSection() {
  const { products, setQuickAddProduct, formatPrice } = useShop();
  const [activeReelIndex, setActiveReelIndex] = useState(null);

  const reels = [
    {
      id: 'reel-1',
      title: 'Grand Royal Wedding Drape',
      influencer: '@shreya_ethnic_style',
      likes: '14.2k',
      product: products[0] || products[0],
      videoPoster: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'reel-2',
      title: 'Lightweight Pure Cotton Daily Elegance',
      influencer: '@banahatti_vibes',
      likes: '9.8k',
      product: products[1] || products[0],
      videoPoster: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'reel-3',
      title: 'Authentic Peacock Blue Temple Border',
      influencer: '@weaving_stories_india',
      likes: '22.5k',
      product: products[2] || products[0],
      videoPoster: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'reel-4',
      title: 'Sunset Crimson Metallic Zari Special',
      influencer: '@saree_drape_diaries',
      likes: '18.1k',
      product: products[3] || products[0],
      videoPoster: 'https://images.unsplash.com/photo-1610030469668-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    }
  ];

  return (
    <section className="py-16 bg-[#F7F1E5]/60 dark:bg-[#1A1613] border-y border-gold-zari/20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="badge-gi inline-flex items-center gap-1 mb-2">
              <Sparkles className="w-3 h-3" /> AS SEEN ON LOOKBOOK REELS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-charcoal dark:text-cream">
              Shop The Look • Real Drape Stories
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Watch how our Banahatti sarees drape gracefully in motion. Click any reel to instantly purchase the exact look.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-crimson dark:text-gold-zari bg-white dark:bg-black/40 px-4 py-2 rounded-full border border-gold-zari/30 self-start md:self-auto">
            <span>✨ Tap "Shop Look" for Instant Checkout</span>
          </div>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel, idx) => (
            <div 
              key={reel.id}
              className="group relative h-[420px] rounded-2xl overflow-hidden shadow-xl border border-gold-zari/30 bg-black flex flex-col justify-between"
            >
              {/* Background Image / Video Poster */}
              <img 
                src={reel.videoPoster} 
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 group-hover:from-black/95 transition-all" />

              {/* Top Header: Influencer Handle & Likes */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20">
                  {reel.influencer}
                </span>
                <span className="bg-crimson/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-white" /> {reel.likes}
                </span>
              </div>

              {/* Middle Center Play Button Indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-14 h-14 rounded-full bg-gold-zari/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Bottom Drawer: Product Card preview */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="bg-white/95 dark:bg-[#1E1A17]/95 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-gold-zari/40 flex items-center gap-3">
                  <img 
                    src={reel.product?.images[0]} 
                    alt={reel.product?.name}
                    className="w-12 h-14 object-cover rounded-lg shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase font-bold text-gold-zari truncate">
                      {reel.product?.fabric}
                    </p>
                    <h4 className="font-serif text-xs font-bold text-deep-charcoal dark:text-cream truncate">
                      {reel.product?.name}
                    </h4>
                    <p className="text-xs font-serif font-extrabold text-crimson dark:text-gold-zari">
                      {formatPrice(reel.product?.price || 4999)}
                    </p>
                  </div>
                  <button
                    onClick={() => setQuickAddProduct(reel.product)}
                    className="bg-crimson hover:bg-gold-zari text-white p-2.5 rounded-lg shadow-md transition-colors flex items-center gap-1 text-[11px] font-bold whitespace-nowrap"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Shop Look
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
