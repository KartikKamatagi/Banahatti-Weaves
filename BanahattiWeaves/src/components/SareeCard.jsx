import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

export default function SareeCard({ saree }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const { isAuthenticated, setReturnUrl } = useAuth();

  const isWishlisted = wishlist.includes(saree.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      setReturnUrl(`/saree/${saree.id}`);
      navigate('/login');
    } else {
      addToCart(saree, 1);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
      
      {/* Saree Image Container */}
      <div className="relative aspect-[4/5] bg-cream/50 overflow-hidden">
        <Link to={`/saree/${saree.id}`} className="block w-full h-full">
          <img 
            src={saree.images[0]} 
            alt={saree.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Top Badges & Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none z-10">
          <span className="bg-white/90 backdrop-blur-md text-crimson text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-sm">
            {saree.category}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(saree.id);
            }}
            className={`p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md transition-all active:scale-90 pointer-events-auto ${
              isWishlisted ? 'text-crimson' : 'text-gray-400 hover:text-crimson'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-crimson' : ''}`} />
          </button>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-crimson hover:bg-gold-zari text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add To Cart</span>
          </button>

          <Link
            to={`/saree/${saree.id}`}
            className="bg-white hover:bg-deep-charcoal hover:text-white text-deep-charcoal p-2.5 rounded-lg shadow-lg flex items-center justify-center transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Saree Info */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-1">
            {saree.fabric} • {saree.color}
          </span>

          <Link to={`/saree/${saree.id}`}>
            <h3 className="font-serif font-bold text-base text-deep-charcoal hover:text-crimson transition-colors line-clamp-1">
              {saree.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-crimson">
              ₹{saree.price.toLocaleString('en-IN')}
            </span>
            {saree.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{saree.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <Link 
            to={`/saree/${saree.id}`}
            className="text-xs font-bold uppercase text-gold-zari hover:text-crimson tracking-wider transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>

    </div>
  );
}
