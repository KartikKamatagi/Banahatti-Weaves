import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SareeCard from '../components/SareeCard';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function Collections() {
  const { sarees } = useCart();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract query param if came from navbar search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q) {
      setSearchQuery(q);
    }
  }, [location.search]);

  const categories = ['ALL', 'COTTON', 'SILK', 'TRADITIONAL'];

  // Filtered list logic
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
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-deep-charcoal">
          OUR COLLECTION
        </h1>
        <p className="text-sm text-gray-600 font-normal">
          Explore our handpicked Banahatti handloom sarees.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-cream/50 p-4 rounded-2xl border border-gold-zari/20 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-crimson text-white shadow-md'
                  : 'bg-white text-deep-charcoal hover:border-gold-zari border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input 
            type="text"
            placeholder="Search by saree name, color..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-xs py-2.5 pl-9 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-crimson font-bold"
            >
              ✕
            </button>
          )}
        </div>

      </div>

      {/* Sarees Count Badge */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
        <span>Showing <strong>{filteredSarees.length}</strong> Banahatti Sarees</span>
        {(selectedCategory !== 'ALL' || searchQuery) && (
          <button 
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="text-crimson hover:underline flex items-center gap-1 font-bold"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filters
          </button>
        )}
      </div>

      {/* Product Cards Grid */}
      {filteredSarees.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 max-w-md mx-auto space-y-3">
          <p className="font-serif text-lg font-bold text-deep-charcoal">No Sarees Found</p>
          <p className="text-xs text-gray-500">
            We couldn't find any sarees matching "{searchQuery}". Try selecting a different category or clearing filters.
          </p>
          <button 
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="bg-crimson text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow"
          >
            Show All Sarees
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSarees.map((saree) => (
            <SareeCard key={saree.id} saree={saree} />
          ))}
        </div>
      )}

    </div>
  );
}
