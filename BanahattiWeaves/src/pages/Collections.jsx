import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SareeCard from '../components/SareeCard';
import { Search, X } from 'lucide-react';

export default function Collections() {
  const { sarees } = useCart();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q) {
      setSearchQuery(q);
    }
  }, [location.search]);

  const categories = ['ALL', 'COTTON', 'SILK', 'TRADITIONAL'];

  const getCategoryCount = (cat) => {
    if (cat === 'ALL') return sarees.length;
    return sarees.filter((s) => s.category === cat).length;
  };

  const filteredSarees = sarees.filter((saree) => {
    const matchesCategory = selectedCategory === 'ALL' || saree.category === selectedCategory;
    const matchesSearch = 
      !searchQuery.trim() ||
      saree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.color.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container-custom py-12 space-y-10 font-sans">
      
      {/* Title Header */}
      <div className="text-center space-y-2">
        <h1 className="font-serif text-4xl text-[#252525] font-normal">
          OUR COLLECTION
        </h1>
        <p className="text-xs text-[#77716B]">
          Explore our handpicked Banahatti handloom sarees.
        </p>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#E5DED7] pb-6">
        
        {/* Category Buttons with Counts */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-[1px] transition-colors border ${
                selectedCategory === cat
                  ? 'bg-[#252525] text-white border-[#252525] font-semibold'
                  : 'bg-white text-[#252525] border-[#E5DED7] hover:border-[#9A6863]'
              }`}
            >
              {cat} ({getCategoryCount(cat)})
            </button>
          ))}
        </div>

        {/* Search Input with Clear Button */}
        <div className="relative w-full md:w-64">
          <input 
            type="text"
            placeholder="Search sarees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs h-[40px] px-3 pr-8 border border-[#E5DED7] focus:outline-none focus:border-[#9A6863] bg-white text-[#252525]"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-[#77716B] hover:text-[#252525]"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Search className="w-4 h-4 text-[#77716B] absolute right-3 top-3" />
          )}
        </div>

      </div>

      {/* Product Grid */}
      {filteredSarees.length === 0 ? (
        <div className="bg-white p-12 text-center border border-[#E5DED7] max-w-md mx-auto space-y-3">
          <p className="font-serif text-lg text-[#252525]">No Sarees Found</p>
          <p className="text-xs text-[#77716B]">No sarees match your current search or category selection.</p>
          <button 
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="bg-[#252525] text-white px-6 py-2.5 text-xs uppercase font-bold tracking-wider hover:bg-[#9A6863] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredSarees.map((saree) => (
            <SareeCard key={saree.id} saree={saree} />
          ))}
        </div>
      )}

    </div>
  );
}
