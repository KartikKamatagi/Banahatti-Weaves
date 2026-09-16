import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-deep-charcoal text-white pt-16 pb-12 border-t border-gold-zari/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 font-sans">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-extrabold tracking-wider text-white">
                BANAHATTI <span className="text-gold-zari">WEAVES</span>
              </span>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-md font-light">
              Banahatti Weaves is an exclusive online handloom boutique bringing authentic pit-loom sarees direct from the master weavers of Banahatti, Karnataka to your doorstep.
            </p>

            <div className="flex items-center gap-2 text-xs text-gold-zari font-medium pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Certified Handloom Mark • GI Protected #84</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-zari">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/" className="hover:text-gold-zari transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-gold-zari transition-colors">Collections</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-zari transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-zari transition-colors">Contact</Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-zari">
              Contact Us
            </h4>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-crimson flex-shrink-0 mt-0.5" />
                <span>Handloom Weavers Colony, Main Road, Banahatti, Bagalkot District, Karnataka - 587311</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-crimson flex-shrink-0" />
                <span>+91 98765 43210 / +91 8353 220194</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-crimson flex-shrink-0" />
                <span>support@banahattiweaves.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Banahatti Weaves. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-crimson fill-crimson" /> in Banahatti, KA
          </p>
        </div>

      </div>
    </footer>
  );
}
