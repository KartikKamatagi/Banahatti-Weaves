import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#242424] text-white pt-16 pb-8 border-t border-[#333] font-sans">
      <div className="container-custom space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <span className="font-serif text-xl font-bold tracking-wider text-white">
                BANAHATTI <span className="text-[#9A6863]">WEAVES</span>
              </span>
            </Link>
            <p className="text-[#C9C4BE] text-xs leading-relaxed font-light">
              Banahatti Weaves is an online saree boutique showcasing authentic pit-loom handloom sarees directly from Banahatti weavers.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-[1px] text-white">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-[#C9C4BE]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-white transition-colors">Collections</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Links */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-[1px] text-white">
              CUSTOMER
            </h4>
            <ul className="space-y-2 text-[#C9C4BE]">
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">My Account</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">My Orders</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-[1px] text-white">
              CONTACT
            </h4>
            <div className="space-y-2 text-[#C9C4BE]">
              <p>+91 98765 43210</p>
              <p>support@banahattiweaves.com</p>
              <p className="text-gray-400 text-[11px] pt-1">Main Road, Banahatti, Bagalkot, KA - 587311</p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#333] text-center text-[11px] text-[#C9C4BE] font-light">
          © {new Date().getFullYear()} Banahatti Weaves · All rights reserved
        </div>

      </div>
    </footer>
  );
}
