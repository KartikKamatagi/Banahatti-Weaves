import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowUpRight, Check, Heart, ShoppingBag } from 'lucide-react';

export default function SareeCard({ saree }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const { isAuthenticated, setReturnUrl } = useAuth();
  const [isJustAdded, setIsJustAdded] = useState(false);
  const isWishlisted = wishlist.includes(saree.id);
  const handleAddToCart = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!isAuthenticated) { setReturnUrl(`/saree/${saree.id}`); navigate('/login'); return; }
    addToCart(saree, 1); setIsJustAdded(true); setTimeout(() => setIsJustAdded(false), 1200);
  };
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/saree/${saree.id}`} className="product-image-link"><img src={saree.images[0]} alt={saree.name} /></Link>
        {saree.isLatest && <span className="product-tag">New arrival</span>}
        <button onClick={() => toggleWishlist(saree.id)} className={`wishlist-button ${isWishlisted ? 'is-active' : ''}`} aria-label="Add to wishlist"><Heart size={17} fill={isWishlisted ? 'currentColor' : 'none'} /></button>
        <button onClick={handleAddToCart} className={`quick-add ${isJustAdded ? 'is-added' : ''}`} aria-label="Add to cart">{isJustAdded ? <Check size={17} /> : <ShoppingBag size={17} />}<span>{isJustAdded ? 'Added' : 'Quick add'}</span></button>
      </div>
      <div className="product-details">
        <div className="product-category">{saree.category} · {saree.fabric.split(' ').slice(0, 2).join(' ')}</div>
        <div className="product-title-row"><Link to={`/saree/${saree.id}`}><h3>{saree.name}</h3></Link><Link to={`/saree/${saree.id}`} aria-label={`View ${saree.name}`}><ArrowUpRight size={17} /></Link></div>
        <div className="product-price"><strong>₹{saree.price.toLocaleString('en-IN')}</strong>{saree.originalPrice && <del>₹{saree.originalPrice.toLocaleString('en-IN')}</del>}</div>
      </div>
    </article>
  );
}
