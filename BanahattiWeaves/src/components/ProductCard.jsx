import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import RatingStars from './RatingStars';
import { Heart, ShoppingBag, ShieldCheck, Sparkles, Eye, Zap } from 'lucide-react';

export default function ProductCard({ product }) {
  const { formatPrice, addToCart, wishlist, toggleWishlist, setQuickAddProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const secondaryImage = product.images && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 relative hover:shadow-2xl hover:border-gold-zari/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Product Image & Dual Image Hover Transition */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F1E5] dark:bg-[#1E1A17]">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          {/* Primary Image */}
          <img 
            src={product.images[0]} 
            alt={product.name}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          {/* Secondary Hover Image */}
          <img 
            src={secondaryImage} 
            alt={`${product.name} alternate view`}
            className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ease-in-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none z-10">
          <div className="flex flex-col gap-1.5 items-start">
            <span className="badge-gi flex items-center gap-1 shadow-sm text-[10px]">
              <ShieldCheck className="w-3 h-3" /> GI TAG #84
            </span>
            {product.isBestseller && (
              <span className="badge-gold flex items-center gap-1 shadow-sm text-[10px]">
                <Sparkles className="w-3 h-3" /> BESTSELLER
              </span>
            )}
            {product.discountPercent && (
              <span className="bg-crimson text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full glass-panel shadow-md transition-transform active:scale-90 pointer-events-auto ${
              isWishlisted ? 'text-crimson bg-white' : 'text-[#6B5E57] hover:text-crimson bg-white/80'
            }`}
            title="Add to Wishlist"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-crimson' : ''}`} />
          </button>
        </div>

        {/* Quick Add Overlay Drawer Button (MB Fashion Style) */}
        <div className="absolute bottom-10 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-10">
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickAddProduct(product);
              }}
              className="flex-1 bg-white/95 hover:bg-gold-zari hover:text-white text-deep-charcoal font-bold text-xs py-2.5 rounded-xl shadow-xl border border-gold-zari/30 backdrop-blur-md flex items-center justify-center gap-1.5 pointer-events-auto transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-gold-zari group-hover:text-white" />
              <span>Quick Add</span>
            </button>
            
            <Link 
              to={`/product/${product.id}`}
              className="bg-deep-charcoal/90 hover:bg-crimson text-white p-2.5 rounded-xl shadow-xl backdrop-blur-md pointer-events-auto transition-all flex items-center justify-center"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Weaver Signature Tag */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md text-white text-[11px] px-3 py-1 flex items-center justify-between z-10">
          <span className="truncate max-w-[170px] text-gray-200">
            Woven by {product.artisanName}
          </span>
          <span className="text-gold-zari font-semibold text-[10px]">
            {product.artisanGuild}
          </span>
        </div>

      </div>

      {/* Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-crimson dark:text-gold-zari">
              {product.fabric} • {product.color}
            </span>
            <RatingStars rating={product.rating} count={product.reviewsCount} />
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif font-bold text-base text-deep-charcoal dark:text-cream hover:text-crimson dark:hover:text-gold-zari transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Cart CTA */}
        <div className="pt-2 border-t border-gold-zari/10 dark:border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg font-extrabold text-crimson dark:text-gold-zari">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="bg-crimson hover:bg-gold-zari text-white p-2.5 rounded-xl transition-colors shadow-sm active:scale-95 flex items-center gap-1.5"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold pr-1 hidden sm:inline">Bag</span>
          </button>
        </div>

      </div>

    </div>
  );
}
