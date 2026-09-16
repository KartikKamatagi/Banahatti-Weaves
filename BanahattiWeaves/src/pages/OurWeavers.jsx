import React from 'react';
import { useShop } from '../context/ShopContext';
import { weaversData } from '../data/weaversData';
import ProductCard from '../components/ProductCard';
import { Award, ShieldCheck, Users, MapPin } from 'lucide-react';

export default function OurWeavers() {
  const { products } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-[#8B261D]/10 text-[#8B261D] dark:bg-[#C69214]/15 dark:text-[#E5B33A] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          <Users className="w-3.5 h-3.5" /> THE MASTER ARTISANS OF BAGALKOT
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#FDFBF7]">
          Our Master Weavers & Guild Families
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5E57] dark:text-[#B8ACA5] leading-relaxed">
          Behind every double-warp check, Gomi border, and Kasuti motif is a family legacy passed down over two centuries in Banahatti & Rabkavi, Karnataka. By buying directly from Banahatti Weaves, <strong>82% of all proceeds go straight into weaver wages with zero middlemen</strong>.
        </p>
      </div>

      {/* Weavers List */}
      <div className="space-y-12">
        {weaversData.map((weaver) => {
          const createdSarees = products.filter(p => weaver.sareesCreated?.includes(p.id));

          return (
            <div 
              key={weaver.id}
              className="glass-panel p-6 lg:p-8 rounded-3xl border border-[#C69214]/40 space-y-6"
            >
              {/* Weaver Profile Header */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-[#8B261D]/10 pb-6">
                
                <div className="md:col-span-3 text-center md:text-left">
                  <div className="relative w-28 h-28 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-[#C69214] shadow-lg">
                    <img src={weaver.photo} alt={weaver.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="md:col-span-9 space-y-2">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <h2 className="font-heading font-extrabold text-2xl text-[#8B261D] dark:text-[#E5B33A]">
                        {weaver.name}
                      </h2>
                      <span className="text-xs font-semibold text-[#0D4C53] dark:text-[#52C0CA]">
                        {weaver.title} • {weaver.guild}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="badge-gi flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> GI TAG VERIFIED
                      </span>
                      <span className="badge-handloom">
                        {weaver.yearsExperience} YRS MASTER
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B5E57] dark:text-[#B8ACA5] leading-relaxed italic">
                    "{weaver.story}"
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <span className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-[#8B261D]" /> {weaver.location}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#0D4C53] dark:text-[#52C0CA]">
                      <Award className="w-4 h-4" /> {weaver.awards.join(' • ')}
                    </span>
                  </div>
                </div>

              </div>

              {/* Sarees Created by This Weaver */}
              {createdSarees.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-sm text-[#2C221E] dark:text-[#FDFBF7]">
                    Sarees Hand-Woven by {weaver.name}:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {createdSarees.map(saree => (
                      <ProductCard key={saree.id} product={saree} />
                    ))}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
