import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, Search, Heart, LogOut, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount, wishlist } = useCart();
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      
      {/* Top Banner Ticker */}
      <div className="bg-deep-charcoal text-cream text-[11px] py-1.5 px-4 font-sans border-b border-gold-zari/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="truncate">
            ✨ Authentic Banahatti Handloom Sarees Direct from Karnataka Weavers • 100% Guaranteed
          </span>
          <div className="flex items-center gap-4 hidden sm:flex">
            <span>Free Shipping on Orders &gt; ₹3,000</span>
            {isAdmin ? (
              <Link to="/admin/dashboard" className="text-gold-zari font-bold underline">
                Admin Panel
              </Link>
            ) : (
              <Link to="/admin/login" className="text-gray-400 hover:text-white transition">
                Admin Access
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Logo */}
        <Link to="/" className="flex flex-col group">
          <span className="font-serif text-2xl lg:text-3xl font-extrabold tracking-wider text-deep-charcoal group-hover:text-crimson transition-colors">
            BANAHATTI <span className="text-crimson">WEAVES</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-gold-zari font-bold -mt-1">
            Handloom Heritage • Est. 1952
          </span>
        </Link>

        {/* Center Menu Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs font-bold uppercase tracking-widest text-deep-charcoal">
          <NavLink 
            to="/" 
            className={({ isActive }) => `py-2 transition-colors border-b-2 ${isActive ? 'border-crimson text-crimson' : 'border-transparent hover:text-crimson'}`}
          >
            HOME
          </NavLink>
          <NavLink 
            to="/collections" 
            className={({ isActive }) => `py-2 transition-colors border-b-2 ${isActive ? 'border-crimson text-crimson' : 'border-transparent hover:text-crimson'}`}
          >
            COLLECTIONS
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `py-2 transition-colors border-b-2 ${isActive ? 'border-crimson text-crimson' : 'border-transparent hover:text-crimson'}`}
          >
            ABOUT
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `py-2 transition-colors border-b-2 ${isActive ? 'border-crimson text-crimson' : 'border-transparent hover:text-crimson'}`}
          >
            CONTACT
          </NavLink>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-4">

          {/* Search Trigger / Form */}
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="relative animate-fadeIn">
              <input 
                type="text" 
                placeholder="Search sarees..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-48 sm:w-64 text-xs py-1.5 px-3 rounded-full border border-gold-zari focus:outline-none bg-cream/50"
              />
              <button type="submit" className="absolute right-2 top-1.5 text-gray-500 hover:text-crimson">
                <Search className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-deep-charcoal hover:text-crimson transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* User / Profile Icon */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link 
                to={isAdmin ? "/admin/dashboard" : "/profile"} 
                className="flex items-center gap-1.5 p-2 rounded-full hover:bg-cream transition-colors text-deep-charcoal"
                title={currentUser.name}
              >
                <User className="w-5 h-5 text-crimson" />
                <span className="text-xs font-bold hidden lg:inline max-w-[100px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              </Link>
              <button 
                onClick={logout}
                className="p-2 text-gray-400 hover:text-crimson transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="p-2 text-deep-charcoal hover:text-crimson transition-colors"
              title="Login / Register"
            >
              <User className="w-5 h-5" />
            </Link>
          )}

          {/* Cart Icon with Item Count */}
          <Link 
            to="/cart"
            className="relative p-2.5 bg-crimson hover:bg-gold-zari text-white rounded-full transition-colors shadow-md flex items-center justify-center"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-zari text-black text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                {cartCount}
              </span>
            )}
          </Link>

        </div>

      </div>
    </header>
  );
}
