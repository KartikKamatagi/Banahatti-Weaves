import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Search, RefreshCw } from 'lucide-react';

const FABRICS = ['all', 'Pure Cotton', 'Silk Cotton', 'Mulberry Silk', 'Organic Linen'];
const COLORS = [
  { id: 'all', label: 'All Colors', hex: null },
  { id: 'Red', label: 'Crimson Red', hex: '#8B261D' },
  { id: 'Blue', label: 'Indigo Blue', hex: '#1E2952' },
  { id: 'Green', label: 'Emerald Green', hex: '#19583A' },
  { id: 'Yellow', label: 'Mustard Gold', hex: '#D49E2A' },
  { id: 'Pink', label: 'Lotus Pink', hex: '#E06B8B' },
  { id: 'Maroon', label: 'Deep Maroon', hex: '#801216' },
  { id: 'Black', label: 'Heritage Black', hex: '#1A1A1A' }
];

const COLLECTIONS = ['all', 'Banahatti Cotton', 'Traditional Sarees', 'Silk Sarees', 'Festive Collection', 'Bridal Collection', 'New Arrivals'];

export default function Shop() {
  const { 
    products, 
    searchTerm, 
    setSearchTerm,
    selectedCollection,
    setSelectedCollection,
    selectedFabric,
    setSelectedFabric,
    selectedColor,
    setSelectedColor,
    maxPriceFilter,
    setMaxPriceFilter,
    sortBy,
    setSortBy
  } = useShop();

  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      // Collection filter
      if (selectedCollection !== 'all' && item.collection !== selectedCollection) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== 'all' && item.fabric !== selectedFabric) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'all' && item.color !== selectedColor) {
        return false;
      }
      // Max price filter
      if (item.price > maxPriceFilter) {
        return false;
      }
      // Search term filter
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesFabric = item.fabric.toLowerCase().includes(query);
        const matchesColor = item.color.toLowerCase().includes(query);
        const matchesWeaver = item.artisanName.toLowerCase().includes(query);
        const matchesCollection = item.collection.toLowerCase().includes(query);
        if (!matchesName && !matchesFabric && !matchesColor && !matchesWeaver && !matchesCollection) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCollection, selectedFabric, selectedColor, maxPriceFilter, searchTerm, sortBy]);

  const resetFilters = () => {
    setSelectedCollection('all');
    setSelectedFabric('all');
    setSelectedColor('all');
    setMaxPriceFilter(15000);
    setSearchTerm('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#8B261D] dark:text-[#E5B33A] uppercase tracking-widest block">
          HANDLOOM SAREE VAULT
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#FDFBF7]">
          Shop Authentic Banahatti Sarees
        </h1>
        <p className="text-xs text-[#6B5E57] dark:text-[#B8ACA5]">
          Explore over 20 authentic pit-loom sarees woven by GI-tagged master artisan families in Bagalkot, Karnataka.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3 glass-panel p-5 rounded-2xl space-y-6 text-xs text-[#2C221E] dark:text-[#FDFBF7]">
          
          <div className="flex items-center justify-between border-b border-[#8B261D]/10 pb-3">
            <h3 className="font-heading font-bold text-sm text-[#8B261D] dark:text-[#E5B33A]">
              Filter Sarees
            </h3>
            {(selectedCollection !== 'all' || selectedFabric !== 'all' || selectedColor !== 'all' || maxPriceFilter < 15000 || searchTerm) && (
              <button 
                onClick={resetFilters}
                className="text-[10px] text-[#8B261D] dark:text-[#E5B33A] font-bold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="space-y-1.5">
            <label className="font-semibold block">Search Saree or Artisan:</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="e.g. Kasuti, Indigo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F7F1E5] dark:bg-[#12100E] text-xs py-2 pl-8 pr-3 rounded-xl border border-gray-300 dark:border-white/10"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold">
              <span>Max Price:</span>
              <strong className="text-[#8B261D] dark:text-[#E5B33A]">₹{maxPriceFilter.toLocaleString('en-IN')}</strong>
            </div>
            <input 
              type="range"
              min="3000"
              max="15000"
              step="500"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="w-full accent-[#8B261D]"
            />
          </div>

          {/* Collections Filter */}
          <div className="space-y-1.5">
            <label className="font-semibold block">Collection:</label>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="w-full bg-[#F7F1E5] dark:bg-[#12100E] text-xs p-2 rounded-xl border border-gray-300 dark:border-white/10"
            >
              {COLLECTIONS.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Collections' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Fabric Filter */}
          <div className="space-y-1.5">
            <label className="font-semibold block">Fabric Material:</label>
            <div className="flex flex-wrap gap-1.5">
              {FABRICS.map(fab => (
                <button
                  key={fab}
                  onClick={() => setSelectedFabric(fab)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    selectedFabric === fab
                      ? 'bg-[#8B261D] text-white shadow-xs'
                      : 'bg-[#F7F1E5] dark:bg-[#12100E] text-[#2C221E] dark:text-[#FDFBF7] hover:bg-[#8B261D]/10'
                  }`}
                >
                  {fab === 'all' ? 'All' : fab}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter Swatches */}
          <div className="space-y-1.5">
            <label className="font-semibold block">Color Shade:</label>
            <div className="grid grid-cols-4 gap-1.5">
              {COLORS.map(col => (
                <button
                  key={col.id}
                  onClick={() => setSelectedColor(col.id)}
                  className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    selectedColor === col.id 
                      ? 'border-[#8B261D] dark:border-[#E5B33A] bg-[#8B261D]/10 font-bold'
                      : 'border-transparent hover:bg-black/5'
                  }`}
                >
                  {col.hex ? (
                    <span 
                      className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                      style={{ backgroundColor: col.hex }}
                    />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-gray-400 bg-gray-200" />
                  )}
                  <span className="text-[9px] truncate max-w-[50px]">{col.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Main Products Display */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Sort & Count Bar */}
          <div className="glass-panel p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-bold text-[#8B261D] dark:text-[#E5B33A]">
              Showing {filteredProducts.length} authentic sarees
            </span>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F7F1E5] dark:bg-[#12100E] py-1.5 px-3 rounded-lg border border-gray-300 dark:border-white/10 font-semibold"
              >
                <option value="featured">Featured Weaves</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass-panel p-12 text-center rounded-3xl max-w-md mx-auto space-y-4 my-8">
              <h3 className="font-heading text-xl font-bold">No Sarees Match Your Filter</h3>
              <p className="text-xs text-gray-500">
                Try resetting your color or price filter to view our complete collection.
              </p>
              <button 
                onClick={resetFilters}
                className="bg-[#8B261D] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md hover:bg-[#0D4C53]"
              >
                Show All Sarees
              </button>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
