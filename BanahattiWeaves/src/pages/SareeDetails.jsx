import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SareeCard from '../components/SareeCard';
import { Star, ShoppingBag, Zap, ShieldCheck, Heart, ArrowLeft, Check, Truck } from 'lucide-react';

export default function SareeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sarees, addToCart, wishlist, toggleWishlist } = useCart();
  const { isAuthenticated, setReturnUrl } = useAuth();

  const saree = sarees.find((s) => s.id === id) || sarees[0];
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!saree) {
    return (
      <div className="p-12 text-center">
        <h2>Saree not found</h2>
        <Link to="/collections">Back to Collections</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(saree.id);
  const relatedSarees = sarees.filter((s) => s.id !== saree.id && s.category === saree.category).slice(0, 4);

  const handleAction = (actionType) => {
    if (!isAuthenticated) {
      // Save intended return url so after login user comes right back
      setReturnUrl(`/saree/${saree.id}`);
      navigate('/login');
    } else {
      addToCart(saree, quantity);
      if (actionType === 'BUY_NOW') {
        navigate('/cart');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-12 font-sans">
      
      {/* Back Button */}
      <div>
        <Link 
          to="/collections"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-crimson transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Collections
        </Link>
      </div>

      {/* Main Saree Product Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Gallery (Main Photo + Thumbnails) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/5] bg-cream rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            <img 
              src={saree.images[selectedImgIndex] || saree.images[0]} 
              alt={saree.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <span className="absolute top-4 left-4 badge-gi shadow-sm text-xs font-bold">
              {saree.category}
            </span>
          </div>

          {/* Thumbnails underneath */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {saree.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIndex(idx)}
                className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                  selectedImgIndex === idx 
                    ? 'border-crimson shadow-md scale-105' 
                    : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Specifications & CTA Buttons */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-gold-zari">
              Banahatti Pit-Loom Handwoven
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-deep-charcoal mt-1">
              {saree.name}
            </h1>

            {/* Rating & Wishlist */}
            <div className="flex items-center justify-between mt-3 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-deep-charcoal">{saree.rating || 5.0}</span>
                <span className="text-xs text-gray-400">({saree.reviewsCount || 24} Verified Reviews)</span>
              </div>

              <button
                onClick={() => toggleWishlist(saree.id)}
                className={`flex items-center gap-1 text-xs font-bold transition-colors ${
                  isWishlisted ? 'text-crimson' : 'text-gray-400 hover:text-crimson'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-crimson' : ''}`} />
                <span>{isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl font-extrabold text-crimson">
              ₹{saree.price.toLocaleString('en-IN')}
            </span>
            {saree.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{saree.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Direct Weaver Price
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {saree.description}
          </p>

          {/* Specifications Table Grid */}
          <div className="bg-cream/40 rounded-xl p-4 border border-gold-zari/20 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-400 uppercase font-bold text-[10px] block">Fabric</span>
              <strong className="text-deep-charcoal font-semibold">{saree.fabric}</strong>
            </div>
            <div>
              <span className="text-gray-400 uppercase font-bold text-[10px] block">Color</span>
              <strong className="text-deep-charcoal font-semibold">{saree.color}</strong>
            </div>
            <div>
              <span className="text-gray-400 uppercase font-bold text-[10px] block">Dimensions</span>
              <strong className="text-deep-charcoal font-semibold">{saree.length}</strong>
            </div>
            <div>
              <span className="text-gray-400 uppercase font-bold text-[10px] block">Stock Availability</span>
              <strong className={`font-semibold ${saree.stock > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                {saree.stock > 0 ? `In Stock (${saree.stock} units available)` : 'Out of Stock'}
              </strong>
            </div>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase font-bold tracking-wider text-deep-charcoal">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <button 
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-gray-600 font-bold hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 text-xs font-bold text-deep-charcoal">{quantity}</span>
              <button 
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-gray-600 font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons: ADD TO CART & BUY NOW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => handleAction('ADD_TO_CART')}
              className="bg-white hover:bg-cream text-crimson border-2 border-crimson font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO CART</span>
            </button>

            <button
              onClick={() => handleAction('BUY_NOW')}
              className="bg-crimson hover:bg-gold-zari text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-xl shadow-crimson/20 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>BUY NOW</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Handloom Mark Certified with QR traceability</span>
            </p>
            <p className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-crimson" />
              <span>Dispatched direct from Banahatti, Karnataka within 24 hours</span>
            </p>
          </div>

        </div>

      </div>

      {/* YOU MAY ALSO LIKE SECTION */}
      <div className="pt-12 border-t border-gray-200">
        <h3 className="font-serif text-2xl font-bold text-deep-charcoal mb-6">
          You May Also Like
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedSarees.map((relSaree) => (
            <SareeCard key={relSaree.id} saree={relSaree} />
          ))}
        </div>
      </div>

    </div>
  );
}
