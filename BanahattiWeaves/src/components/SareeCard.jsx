import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Heart, Check } from 'lucide-react';

export default function SareeCard({ saree }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const { isAuthenticated, setReturnUrl } = useAuth();
  const [isJustAdded, setIsJustAdded] = useState(false);

  const isWishlisted = wishlist.includes(saree.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      setReturnUrl(`/saree/${saree.id}`);
      navigate('/login');
    } else {
      addToCart(saree, 1);
      setIsJustAdded(true);
      setTimeout(() => setIsJustAdded(false), 1200);
    }
  };

  return (
    <div className="group flex flex-col font-sans text-left transition-all">
      
      {/* Product Image Container (3/4 Aspect Ratio) */}
      <div className="relative aspect-[3/4] bg-[#F5F2EC] overflow-hidden mb-3">
        <Link to={`/saree/${saree.id}`} className="block w-full h-full">
          <img 
            src={saree.images[0]} 
            alt={saree.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Wishlist Heart Icon Top Right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(saree.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all active:scale-90 ${
            isWishlisted ? 'text-[#9A6863]' : 'text-[#77716B] hover:text-[#9A6863]'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#9A6863]' : ''}`} />
        </button>
      </div>

      {/* Product Information */}
      <div className="space-y-1">
        <Link to={`/saree/${saree.id}`} className="block">
          <h3 className="text-[14px] font-medium text-[#252525] line-clamp-1 leading-snug hover:text-[#9A6863] transition-colors">
            {saree.name}
          </h3>
        </Link>

        <div className="text-[14px] font-semibold text-[#555]">
          ₹{saree.price.toLocaleString('en-IN')}
        </div>

        {/* Minimal Border Button with instant state feedback */}
        <div className="pt-2">
          <button
            onClick={handleAddToCart}
            className={`w-full border text-[12px] font-semibold uppercase tracking-[1px] py-2.5 transition-colors flex items-center justify-center gap-1.5 ${
              isJustAdded
                ? 'bg-[#9A6863] text-white border-[#9A6863]'
                : 'border-[#252525] bg-transparent text-[#252525] hover:bg-[#252525] hover:text-white'
            }`}
          >
            {isJustAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> ADDED
              </>
            ) : (
              'ADD TO CART'
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
