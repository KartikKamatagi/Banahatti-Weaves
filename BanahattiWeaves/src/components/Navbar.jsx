import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Search, User, ShoppingBag, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5] border-b border-[#E5DED7] transition-all">
      <div className="container-custom h-[75px] flex items-center justify-between gap-6">
        
        {/* Mobile Hamburger Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#252525]"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-serif text-[22px] font-semibold tracking-[1px] text-[#252525]">
            BANAHATTI <span className="text-[#9A6863]">WEAVES</span>
          </span>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-[13px] tracking-[0.5px] uppercase font-medium">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `py-1.5 transition-colors text-[#252525] hover:text-[#9A6863] ${isActive ? 'border-b-2 border-[#9A6863] text-[#9A6863] font-semibold' : 'border-b-2 border-transparent'}`
            }
          >
            HOME
          </NavLink>
          <NavLink 
            to="/collections" 
            className={({ isActive }) => 
              `py-1.5 transition-colors text-[#252525] hover:text-[#9A6863] ${isActive ? 'border-b-2 border-[#9A6863] text-[#9A6863] font-semibold' : 'border-b-2 border-transparent'}`
            }
          >
            COLLECTIONS
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `py-1.5 transition-colors text-[#252525] hover:text-[#9A6863] ${isActive ? 'border-b-2 border-[#9A6863] text-[#9A6863] font-semibold' : 'border-b-2 border-transparent'}`
            }
          >
            ABOUT
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `py-1.5 transition-colors text-[#252525] hover:text-[#9A6863] ${isActive ? 'border-b-2 border-[#9A6863] text-[#9A6863] font-semibold' : 'border-b-2 border-transparent'}`
            }
          >
            CONTACT
          </NavLink>
        </nav>

        {/* Right Actions: Search, User, Cart */}
        <div className="flex items-center gap-4 text-[#252525]">

          {/* Search Bar */}
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-36 sm:w-48 text-xs py-1 px-3 border-b border-[#252525] focus:outline-none bg-transparent"
              />
              <button type="submit" className="p-1 text-[#252525]">
                <Search className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-[#9A6863] transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
          )}

          {/* User Icon */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link 
                to={isAdmin ? "/admin/dashboard" : "/profile"} 
                className="p-1.5 hover:text-[#9A6863] transition-colors flex items-center gap-1"
                title={currentUser.name}
              >
                <User className="w-5 h-5 stroke-[1.5]" />
                <span className="text-[12px] font-medium hidden lg:inline max-w-[90px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              </Link>
              <button 
                onClick={logout}
                className="p-1.5 text-[#77716B] hover:text-[#9A6863] transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="p-1.5 hover:text-[#9A6863] transition-colors"
              title="Login"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>
          )}

          {/* Cart Icon with Item Counter Badge */}
          <Link 
            to="/cart"
            className="relative p-1.5 hover:text-[#9A6863] transition-colors"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute -top-1 -right-1 bg-[#9A6863] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {/* Hidden Admin Trigger */}
          <Link
            to={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className="text-[10px] font-bold uppercase text-[#77716B] hover:text-[#9A6863] hidden xl:inline ml-2"
          >
            {isAdmin ? '[Admin]' : '[Admin]'}
          </Link>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E5DED7] px-6 py-4 space-y-3 font-sans text-xs uppercase font-medium">
          <NavLink 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#252525] border-b border-gray-100"
          >
            HOME
          </NavLink>
          <NavLink 
            to="/collections" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#252525] border-b border-gray-100"
          >
            COLLECTIONS
          </NavLink>
          <NavLink 
            to="/about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#252525] border-b border-gray-100"
          >
            ABOUT
          </NavLink>
          <NavLink 
            to="/contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#252525]"
          >
            CONTACT
          </NavLink>
        </div>
      )}
    </header>
  );
}
