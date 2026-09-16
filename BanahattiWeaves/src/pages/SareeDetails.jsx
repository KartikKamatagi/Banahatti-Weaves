import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SareeCard from '../components/SareeCard';
import { ArrowLeft, Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';

export default function SareeDetails() {
  const { id } = useParams(); const navigate = useNavigate();
  const { sarees, addToCart, wishlist, toggleWishlist } = useCart();
  const { isAuthenticated, setReturnUrl } = useAuth();
  const saree = sarees.find((item) => item.id === id) || sarees[0];
  const [selectedImage, setSelectedImage] = useState(0); const [quantity, setQuantity] = useState(1);
  if (!saree) return <div className="container-custom purchase-empty"><h2>Saree not found</h2><Link className="button-outline" to="/collections">Back to collections</Link></div>;
  const saved = wishlist.includes(saree.id);
  const related = sarees.filter((item) => item.id !== saree.id && item.category === saree.category).slice(0, 4);
  const handleAction = (buyNow = false) => { if (!isAuthenticated) { setReturnUrl(`/saree/${saree.id}`); navigate('/login'); return; } addToCart(saree, quantity); if (buyNow) navigate('/cart'); };
  return <main className="purchase-page container-custom">
    <Link to="/collections" className="purchase-back"><ArrowLeft size={16} /> Continue browsing</Link>
    <div className="product-view">
      <section className="product-gallery"><div className="product-main-image"><img src={saree.images[selectedImage] || saree.images[0]} alt={saree.name} /><span>Handwoven in Banahatti</span></div><div className="product-thumbnails">{saree.images.map((image, index) => <button key={image} onClick={() => setSelectedImage(index)} className={selectedImage === index ? 'selected' : ''}><img src={image} alt={`View ${index + 1} of ${saree.name}`} /></button>)}</div></section>
      <section className="product-purchase">
        <p className="eyebrow">{saree.category} handloom · limited weave</p>
        <div className="product-name-row"><h1>{saree.name}</h1><button onClick={() => toggleWishlist(saree.id)} className={saved ? 'detail-wishlist saved' : 'detail-wishlist'} aria-label="Save this saree"><Heart size={19} fill={saved ? 'currentColor' : 'none'} /></button></div>
        <div className="product-rating"><span>{[0,1,2,3,4].map((star) => <Star key={star} size={14} fill="currentColor" />)}</span><strong>{saree.rating || '5.0'}</strong><span>({saree.reviewsCount || 0} customer reviews)</span></div>
        <div className="detail-price"><strong>₹{saree.price.toLocaleString('en-IN')}</strong>{saree.originalPrice && <del>₹{saree.originalPrice.toLocaleString('en-IN')}</del>}<span>Inclusive of all taxes</span></div>
        <p className="product-description">{saree.description}</p>
        <dl className="product-specs"><div><dt>Fabric</dt><dd>{saree.fabric}</dd></div><div><dt>Colour</dt><dd>{saree.color}</dd></div><div><dt>Length</dt><dd>{saree.length}</dd></div><div><dt>Availability</dt><dd className="in-stock"><Check size={14} /> {saree.stock} pieces available</dd></div></dl>
        <div className="detail-quantity"><span>Quantity</span><div><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><strong>{quantity}</strong><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus size={15} /></button></div></div>
        <div className="detail-actions"><button onClick={() => handleAction(true)} className="button-primary">Buy now</button><button onClick={() => handleAction()} className="button-outline"><ShoppingBag size={16} /> Add to bag</button></div>
        <div className="detail-assurances"><span><ShieldCheck size={17} /> Authentic handloom</span><span><Truck size={17} /> Free delivery over ₹3,000</span></div>
      </section>
    </div>
    {related.length > 0 && <section className="related-products"><div><p className="eyebrow">Continue exploring</p><h2>You may also like.</h2></div><div className="product-grid">{related.map((item) => <SareeCard key={item.id} saree={item} />)}</div></section>}
  </main>;
}
