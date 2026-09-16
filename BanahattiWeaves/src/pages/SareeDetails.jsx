import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SareeCard from '../components/SareeCard';
import { Star, Heart, ArrowLeft } from 'lucide-react';

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
      <div className="container-custom py-12 text-center">
        <h2>Saree not found</h2>
        <Link to="/collections">Back to Collections</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(saree.id);
  const relatedSarees = sarees.filter((s) => s.id !== saree.id && s.category === saree.category).slice(0, 4);

  const handleAction = (actionType) => {
    if (!isAuthenticated) {
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
    <div className="container-custom py-10 space-y-12 font-sans">
      
      {/* Back Link */}
      <div>
        <Link 
          to="/collections"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#77716B] hover:text-[#252525] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Collections
        </Link>
      </div>

      {/* Desktop 60% / 40% Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left 60% Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] bg-white overflow-hidden border border-[#E5DED7]">
            <img 
              src={saree.images[selectedImgIndex] || saree.images[0]} 
              alt={saree.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto">
            {saree.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIndex(idx)}
                className={`w-20 h-24 overflow-hidden border transition-all flex-shrink-0 ${
                  selectedImgIndex === idx 
                    ? 'border-[#252525] opacity-100' 
                    : 'border-[#E5DED7] opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right 40% Product Information */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          <div>
            <span className="text-[11px] uppercase font-bold tracking-[2px] text-[#9A6863]">
              Banahatti Handloom Saree
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#252525] mt-1">
              {saree.name}
            </h1>

            {/* Wishlist toggle */}
            <div className="flex items-center justify-between mt-3 pb-3 border-b border-[#E5DED7]">
              <div className="flex items-center gap-1.5 text-amber-600 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
                <span className="font-bold text-[#252525] ml-1">{saree.rating || 5.0}</span>
              </div>

              <button
                onClick={() => toggleWishlist(saree.id)}
                className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                  isWishlisted ? 'text-[#9A6863]' : 'text-[#77716B] hover:text-[#9A6863]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#9A6863]' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-[#252525]">
              ₹{saree.price.toLocaleString('en-IN')}
            </span>
            {saree.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{saree.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#77716B] leading-relaxed">
            {saree.description}
          </p>

          {/* Specs Details */}
          <div className="bg-white p-4 border border-[#E5DED7] space-y-2 text-xs">
            <div className="flex justify-between border-b border-gray-100 pb-1.5">
              <span className="text-[#77716B] font-medium">Fabric:</span>
              <span className="font-bold text-[#252525]">{saree.fabric}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-1.5">
              <span className="text-[#77716B] font-medium">Color:</span>
              <span className="font-bold text-[#252525]">{saree.color}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-1.5">
              <span className="text-[#77716B] font-medium">Dimensions:</span>
              <span className="font-bold text-[#252525]">{saree.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#77716B] font-medium">Stock:</span>
              <span className={`font-bold ${saree.stock > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                {saree.stock > 0 ? `In Stock (${saree.stock} available)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase font-bold text-[#252525]">Quantity:</span>
            <div className="flex items-center border border-[#E5DED7] bg-white">
              <button 
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-gray-600 font-bold hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 text-xs font-bold text-[#252525]">{quantity}</span>
              <button 
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-gray-600 font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons: BUY NOW (Primary) & ADD TO CART (Secondary) */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleAction('BUY_NOW')}
              className="w-full bg-[#252525] hover:bg-[#9A6863] text-white font-bold text-xs uppercase tracking-[1.5px] py-4 transition-colors shadow-sm"
            >
              BUY NOW
            </button>

            <button
              onClick={() => handleAction('ADD_TO_CART')}
              className="w-full bg-transparent border border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white font-bold text-xs uppercase tracking-[1.5px] py-4 transition-colors"
            >
              ADD TO CART
            </button>
          </div>

        </div>

      </div>

      {/* YOU MAY ALSO LIKE SECTION */}
      <div className="pt-12 border-t border-[#E5DED7] space-y-6">
        <h3 className="font-serif text-2xl text-[#252525] text-center">
          You May Also Like
        </h3>
        <div className="product-grid">
          {relatedSarees.map((relSaree) => (
            <SareeCard key={relSaree.id} saree={relSaree} />
          ))}
        </div>
      </div>

    </div>
  );
}
