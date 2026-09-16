import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SareeCard from '../components/SareeCard';
import { ShieldCheck, ShoppingBag, Headphones } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { sarees } = useCart();

  const latestSarees = sarees.filter((s) => s.isLatest || s.category === 'COTTON').slice(0, 4);
  const bestSellerSarees = sarees.filter((s) => s.isBestSeller || s.rating >= 4.8).slice(0, 4);

  return (
    <div className="space-y-0 font-sans bg-[#FAF8F5]">
      
      {/* 1. HERO SECTION */}
      <section className="container-custom pt-8 pb-12">
        <div className="bg-white border border-[#E5DED7] grid grid-cols-1 lg:grid-cols-2 min-h-[600px] overflow-hidden">
          
          {/* Left Side: Centered Content */}
          <div className="flex flex-col justify-center items-start text-left p-10 sm:p-14 lg:p-16 space-y-5 bg-white">
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#9A6863]">
              OUR BESTSELLER
            </span>

            <h1 className="font-serif text-[40px] sm:text-[48px] font-normal text-[#252525] leading-[1.1]">
              Handwoven Elegance <br />
              from Banahatti
            </h1>

            <p className="text-[16px] text-[#77716B] leading-[1.6] max-w-md font-normal">
              Discover timeless handloom sarees crafted with tradition and care.
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate('/collections')}
                className="bg-[#252525] hover:bg-[#9A6863] text-white text-[12px] font-bold uppercase tracking-[1.5px] px-[30px] py-[14px] transition-colors shadow-sm"
              >
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Right Side: Large Saree Image */}
          <div className="relative min-h-[400px] lg:min-h-[600px] bg-[#FAF8F5]">
            <img 
              src={sarees[0]?.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'} 
              alt="Banahatti Handloom Saree" 
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>

        </div>
      </section>

      {/* 2. LATEST COLLECTION SECTION */}
      <section className="container-custom py-12">
        
        {/* Section Heading */}
        <div className="text-center pt-[40px] pb-[35px] space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#252525] font-normal">
            LATEST COLLECTION
          </h2>
          <p className="text-[14px] text-[#77716B]">
            Discover our handpicked handloom sarees.
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="product-grid">
          {latestSarees.map((saree) => (
            <SareeCard key={saree.id} saree={saree} />
          ))}
        </div>

      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="container-custom py-12">
        
        {/* Section Heading */}
        <div className="text-center pt-[40px] pb-[35px] space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#252525] font-normal">
            BEST SELLERS
          </h2>
          <p className="text-[14px] text-[#77716B]">
            Our most popular and highly rated handloom saree designs.
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="product-grid">
          {bestSellerSarees.map((saree) => (
            <SareeCard key={saree.id} saree={saree} />
          ))}
        </div>

      </section>

      {/* 4. FEATURE SECTION (3 Equal Columns) */}
      <section className="bg-white border-t border-b border-[#E5DED7] py-[60px] my-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="space-y-3 p-4">
              <ShieldCheck className="w-8 h-8 mx-auto text-[#252525] stroke-[1.25]" />
              <h3 className="font-sans text-xs font-bold text-[#252525] uppercase tracking-[1.5px]">
                AUTHENTIC HANDLOOM
              </h3>
              <p className="text-xs text-[#77716B]">
                Beautiful handloom sarees from Banahatti.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <ShoppingBag className="w-8 h-8 mx-auto text-[#252525] stroke-[1.25]" />
              <h3 className="font-sans text-xs font-bold text-[#252525] uppercase tracking-[1.5px]">
                EASY ORDERING
              </h3>
              <p className="text-xs text-[#77716B]">
                Simple and convenient online shopping.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <Headphones className="w-8 h-8 mx-auto text-[#252525] stroke-[1.25]" />
              <h3 className="font-sans text-xs font-bold text-[#252525] uppercase tracking-[1.5px]">
                CUSTOMER SUPPORT
              </h3>
              <p className="text-xs text-[#77716B]">
                We're here to help.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER SECTION */}
      <section className="container-custom py-16 text-center space-y-3">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#252525]">
          Stay in the Weave
        </h3>
        <p className="text-xs text-[#77716B]">
          Get updates about our latest sarees and collections.
        </p>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing to Banahatti Weaves!');
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-0 max-w-md mx-auto pt-4"
        >
          <input 
            type="email" 
            placeholder="Enter your email" 
            required
            className="w-full sm:w-80 h-[48px] px-4 text-xs text-[#252525] border border-[#E5DED7] focus:outline-none focus:border-[#9A6863] bg-white"
          />
          <button 
            type="submit"
            className="w-full sm:w-auto h-[48px] bg-[#252525] hover:bg-[#9A6863] text-white font-bold text-xs uppercase tracking-[1.5px] px-[30px] transition-colors"
          >
            SUBSCRIBE
          </button>
        </form>
      </section>

    </div>
  );
}
