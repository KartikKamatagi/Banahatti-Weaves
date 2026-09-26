import React, { useState } from 'react';
import { X, ShoppingBag, Ruler, Check, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function QuickAddModal() {
  const { 
    quickAddProduct, 
    setQuickAddProduct, 
    addToCart, 
    formatPrice, 
    setIsSizeChartOpen 

  } = useShop();

  const [blouseStitching, setBlouseStitching] = useState(false);
  const [selectedSize, setSelectedSize] = useState('38 (L)');
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickAddProduct) return null;

  //hi
  const sizes = ['32 (XS)', '34 (S)', '36 (M)', '38 (L)', '40 (XL)', '42 (2XL)'];

  const handleAddToCart = () => {
    addToCart(quickAddProduct, qty, {
      blouseStitching,
      stitchingSize: blouseStitching ? selectedSize : 'Unstitched Blouse Piece (0.8m)'
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickAddProduct(null);
    }, 1200);
  };

  const finalPrice = quickAddProduct.price + (blouseStitching ? 499 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#FDFBF7] w-full max-w-lg rounded-2xl shadow-2xl border border-gold-zari/30 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={() => setQuickAddProduct(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-cream text-crimson hover:bg-gold-zari hover:text-white transition-all z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header info */}
          <div className="flex gap-4 mb-6">
            <div className="w-24 h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-cream">
              <img 
                src={quickAddProduct.images ? quickAddProduct.images[0] : quickAddProduct.image} 
                alt={quickAddProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-zari">
                {quickAddProduct.fabric} • Handcrafted
              </span>
              <h3 className="font-serif text-xl text-deep-charcoal font-bold mt-1 line-clamp-2">
                {quickAddProduct.name}
              </h3>
              
              <div className="flex items-center gap-3 mt-2">
                <span className="font-serif text-2xl font-bold text-crimson">
                  {formatPrice(finalPrice)}
                </span>
                {quickAddProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(quickAddProduct.originalPrice)}
                  </span>
                )}
                {quickAddProduct.discountPercent && (
                  <span className="text-xs bg-red-100 text-crimson px-2 py-0.5 rounded font-bold">
                    {quickAddProduct.discountPercent}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-emerald-700 mt-2 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Handloom Mark Certified Authentic</span>
              </div>
            </div>
          </div>

          <hr className="border-gold-zari/20 mb-6" />

          {/* Blouse Option */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs uppercase tracking-wider font-bold text-deep-charcoal">
                Blouse Customization
              </label>
              <button
                type="button"
                onClick={() => setIsSizeChartOpen(true)}
                className="text-xs text-gold-zari hover:text-crimson font-medium flex items-center gap-1 underline underline-offset-4"
              >
                <Ruler className="w-3.5 h-3.5" /> Size Chart Guide
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBlouseStitching(false)}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  !blouseStitching 
                    ? 'border-crimson bg-crimson/5 text-crimson shadow-sm' 
                    : 'border-gray-200 hover:border-gold-zari text-deep-charcoal'
                }`}
              >
                <div>Unstitched Piece</div>
                <div className="text-[10px] text-gray-500 font-normal mt-0.5">Included in Saree (0.8m)</div>
              </button>

              <button
                type="button"
                onClick={() => setBlouseStitching(true)}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  blouseStitching 
                    ? 'border-crimson bg-crimson/5 text-crimson shadow-sm' 
                    : 'border-gray-200 hover:border-gold-zari text-deep-charcoal'
                }`}
              >
                <div>Tailored Stitching (+₹499)</div>
                <div className="text-[10px] text-gray-500 font-normal mt-0.5">Custom Bust & Sleeve Fit</div>
              </button>
            </div>
          </div>

          {/* Size Options if Stitching selected */}
          {blouseStitching && (
            <div className="mb-6 animate-fadeIn">
              <label className="text-xs uppercase tracking-wider font-bold text-deep-charcoal block mb-2">
                Select Bust Size (Inches)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 px-3 text-xs rounded-lg font-medium border transition-all ${
                      selectedSize === sz
                        ? 'bg-crimson text-white border-crimson shadow'
                        : 'bg-white border-gray-200 text-deep-charcoal hover:border-gold-zari'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-wider font-bold text-deep-charcoal">
              Quantity
            </span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <button 
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-1.5 hover:bg-gray-100 font-bold text-gray-600 transition"
              >
                -
              </button>
              <span className="px-4 py-1.5 font-bold text-xs text-deep-charcoal">{qty}</span>
              <button 
                onClick={() => setQty(q => q + 1)}
                className="px-3 py-1.5 hover:bg-gray-100 font-bold text-gray-600 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
              isAdded 
                ? 'bg-emerald-600 text-white' 
                : 'bg-crimson hover:bg-maroon-dark text-white shadow-crimson/20 hover:shadow-xl'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5 animate-bounce" /> Added to Your Bag!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag • {formatPrice(finalPrice * qty)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
