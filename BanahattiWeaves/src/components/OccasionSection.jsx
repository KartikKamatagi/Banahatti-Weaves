import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function OccasionSection() {
  const navigate = useNavigate();
  const { setSelectedCollection } = useShop();

  const occasions = [
    {
      id: 'wedding',
      name: 'Bridal & Grand Wedding',
      subtitle: 'Heavy Gold Zari Borders & Festive Silk',
      tag: 'Royalty Pick',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      itemCount: '8 Styles'
    },
    {
      id: 'festive',
      name: 'Pooja & Cultural Festivals',
      subtitle: 'Temple Motifs in Peacock Blue & Maroons',
      tag: 'Trending',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      itemCount: '12 Styles'
    },
    {
      id: 'office',
      name: 'Heritage Office Luxe',
      subtitle: 'Lightweight Pure Breathable Banahatti Cotton',
      tag: 'Daily Comfort',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      itemCount: '6 Styles'
    },
    {
      id: 'reception',
      name: 'Evening Soiree & Gifting',
      subtitle: 'Tissue Silk & Metallic Soft Weaves',
      tag: 'Bestselling Gift',
      image: 'https://images.unsplash.com/photo-1610030469668-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      itemCount: '10 Styles'
    }
  ];

  const handleSelectOccasion = (occId) => {
    setSelectedCollection(occId);
    navigate('/shop');
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="badge-gold inline-flex items-center gap-1 mb-2">
          <Sparkles className="w-3 h-3" /> CURATED BY OCCASION
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-charcoal dark:text-cream">
          Curated Saree Wardrobe
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-sans">
          Discover the perfect weave tailored for grand Indian weddings, festive celebrations, or elegant workwear.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {occasions.map((occ) => (
          <div
            key={occ.id}
            onClick={() => handleSelectOccasion(occ.id)}
            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-gold-zari/20"
          >
            {/* Background Image */}
            <img 
              src={occ.image} 
              alt={occ.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 transition-all" />

            {/* Floating Tag */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-md text-crimson text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow">
                {occ.tag}
              </span>
            </div>

            {/* Content Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end">
              <span className="text-xs text-gold-zari font-semibold uppercase tracking-widest mb-1">
                {occ.itemCount}
              </span>
              <h3 className="font-serif text-xl font-bold mb-1 text-cream group-hover:text-gold-zari transition-colors">
                {occ.name}
              </h3>
              <p className="text-xs text-gray-300 line-clamp-2 mb-4 font-sans font-light">
                {occ.subtitle}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cream group-hover:text-gold-zari transition-colors">
                <span>Explore Wardrobe</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
