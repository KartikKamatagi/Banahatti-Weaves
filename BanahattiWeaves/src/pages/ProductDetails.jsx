import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import RatingStars from '../components/RatingStars';
import ProductCard from '../components/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Award, 
  Plus, 
  Minus, 
  MapPin,
  UserCheck
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, formatPrice, wishlist, toggleWishlist } = useShop();

  const product = products.find(p => p.id === id) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [blouseStitching, setBlouseStitching] = useState(false);
  const [stitchingSize, setStitchingSize] = useState('38 (Medium-Large)');

  const isWishlisted = wishlist.includes(product.id);
  const relatedSarees = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      blouseStitching,
      stitchingSize: blouseStitching ? stitchingSize : 'Unstitched'
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, {
      blouseStitching,
      stitchingSize: blouseStitching ? stitchingSize : 'Unstitched'
    });
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-16">
      
      {/* Top Product Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="md:col-span-6 space-y-4">
          
          <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#C69214]/30 shadow-xl bg-[#F7F1E5] dark:bg-[#12100E] relative">
            <img 
              src={product.images[selectedImageIndex] || product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-500"
            />

            <span className="badge-gi absolute top-4 left-4 flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5" /> GI TAG #84 CERTIFIED
            </span>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx ? 'border-[#8B261D] scale-105 shadow-md' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Saree Details & Specs */}
        <div className="md:col-span-6 space-y-6 text-xs text-[#2C221E] dark:text-[#FDFBF7]">
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="uppercase font-bold tracking-widest text-[11px] text-[#8B261D] dark:text-[#E5B33A]">
                {product.collection} • {product.fabric}
              </span>
              <RatingStars rating={product.rating} count={product.reviewsCount} />
            </div>

            <h1 className="font-heading text-3xl font-extrabold text-[#2C221E] dark:text-[#FDFBF7] leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Price Box */}
          <div className="p-4 bg-[#F7F1E5] dark:bg-[#1E1A17] rounded-2xl border border-[#8B261D]/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#6B5E57] dark:text-[#B8ACA5] block">Direct Artisan Price</span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-extrabold text-[#8B261D] dark:text-[#E5B33A]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <span className="bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300 font-bold px-3 py-1 rounded-full text-xs">
              ✓ Ready for Dispatch
            </span>
          </div>

          {/* Saree Description */}
          <p className="text-xs text-[#6B5E57] dark:text-[#B8ACA5] leading-relaxed">
            {product.description}
          </p>

          {/* Key Specifications Grid */}
          <div className="glass-panel p-4 rounded-2xl space-y-2 border border-[#8B261D]/15">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#8B261D] dark:text-[#E5B33A]">
              Handloom Specifications
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><strong className="text-gray-500">Fabric:</strong> {product.fabric}</div>
              <div><strong className="text-gray-500">Color Shade:</strong> {product.color}</div>
              <div><strong className="text-gray-500">Saree Length:</strong> {product.length}</div>
              <div><strong className="text-gray-500">Weave Type:</strong> {product.weaveType}</div>
              <div><strong className="text-gray-500">Yarn Count:</strong> {product.yarnCount}</div>
              <div><strong className="text-gray-500">Blouse Status:</strong> {product.blouseInfo}</div>
            </div>
          </div>

          {/* Custom Blouse Stitching Add-on */}
          <div className="p-4 rounded-2xl border border-[#C69214]/40 bg-[#C69214]/5 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox"
                checked={blouseStitching}
                onChange={(e) => setBlouseStitching(e.target.checked)}
                className="mt-0.5 accent-[#8B261D] w-4 h-4"
              />
              <div>
                <span className="font-bold text-xs text-[#2C221E] dark:text-[#FDFBF7] block">
                  Add Custom Blouse Stitching (+₹499)
                </span>
                <p className="text-[10px] text-[#6B5E57] dark:text-[#B8ACA5]">
                  Hand-tailored by Banahatti artisan tailors using traditional border pattern layouts.
                </p>
              </div>
            </label>

            {blouseStitching && (
              <div className="flex items-center gap-3 pt-2">
                <span className="font-semibold text-xs">Select Bust Size:</span>
                <select
                  value={stitchingSize}
                  onChange={(e) => setStitchingSize(e.target.value)}
                  className="bg-white dark:bg-[#12100E] border p-1.5 rounded-lg text-xs"
                >
                  <option value="34 (Small)">34 (Small)</option>
                  <option value="36 (Medium)">36 (Medium)</option>
                  <option value="38 (Medium-Large)">38 (Medium-Large)</option>
                  <option value="40 (Large)">40 (Large)</option>
                  <option value="42 (XL)">42 (XL)</option>
                </select>
              </div>
            )}
          </div>

          {/* Quantity Controls & Action Buttons */}
          <div className="space-y-3 pt-2">
            
            <div className="flex items-center gap-4">
              <span className="font-bold text-xs">Quantity:</span>
              <div className="flex items-center gap-2 bg-[#F7F1E5] dark:bg-[#1E1A17] rounded-xl p-1 border border-gray-300 dark:border-white/10">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-black/10 rounded"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-xs w-6 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-black/10 rounded"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#8B261D] hover:bg-[#0D4C53] text-white py-3.5 rounded-2xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-[#C69214] to-[#E5B33A] text-black py-3.5 rounded-2xl font-bold text-xs shadow-md hover:opacity-95 transition-transform active:scale-95"
              >
                Buy Now
              </button>

              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-2xl border transition-colors ${
                  isWishlisted ? 'bg-[#8B261D] text-white border-[#8B261D]' : 'border-gray-300 dark:border-white/20 hover:border-[#8B261D]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

          </div>

          {/* Guarantees */}
          <div className="flex items-center justify-around text-[10px] text-[#6B5E57] dark:text-[#B8ACA5] pt-2 border-t border-gray-200 dark:border-white/10">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#0D4C53]" /> Free Express India Shipping
            </span>
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 text-[#8B261D]" /> 7-Day Easy Return Guarantee
            </span>
          </div>

        </div>

      </div>

      {/* KNOW YOUR SAREE SECTION */}
      <section className="glass-panel p-8 rounded-3xl border border-[#C69214]/40 bg-gradient-to-r from-[#8B261D]/10 via-[#F7F1E5] to-[#0D4C53]/10 dark:from-[#1E1A17] dark:to-[#12100E] space-y-6">
        <div className="flex items-center gap-2 text-[#8B261D] dark:text-[#E5B33A] font-bold text-xs uppercase tracking-widest">
          <UserCheck className="w-4 h-4" /> KNOW YOUR SAREE & ARTISAN
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <h3 className="font-heading text-2xl font-extrabold text-[#2C221E] dark:text-[#FDFBF7]">
              Woven by Master Artisan {product.artisanName}
            </h3>
            <p className="text-xs text-[#6B5E57] dark:text-[#B8ACA5] leading-relaxed">
              Crafted in <strong>{product.artisanLocation}</strong> under <strong>{product.artisanGuild}</strong>. Woven on traditional pit-looms using double-warp strength techniques honed across generations.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold pt-2">
              <span className="flex items-center gap-1 text-[#0D4C53] dark:text-[#52C0CA]">
                <MapPin className="w-4 h-4" /> Weaving Hub: Banahatti, Bagalkot (KA)
              </span>
              <span className="flex items-center gap-1 text-[#8B261D] dark:text-[#E5B33A]">
                <Award className="w-4 h-4" /> 100% Handloom Certified
              </span>
            </div>
          </div>

          <div className="md:col-span-4 text-right">
            <Link 
              to="/weavers"
              className="bg-[#8B261D] text-white px-6 py-3 rounded-full text-xs font-bold shadow-md hover:bg-[#0D4C53] transition-colors inline-block"
            >
              Meet All Banahatti Weavers →
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED SAREES */}
      {relatedSarees.length > 0 && (
        <section className="space-y-6">
          <h3 className="font-heading text-2xl font-extrabold text-[#2C221E] dark:text-[#FDFBF7]">
            Related Handloom Sarees
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedSarees.map(s => (
              <ProductCard key={s.id} product={s} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
