import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react';

const Money = ({ value }) => <>₹{value.toLocaleString('en-IN')}</>;
export default function Cart() {
  const navigate = useNavigate(); const { cart, updateCartQty, removeFromCart, cartSubtotal, deliveryFee, cartTotal, clearCart } = useCart();
  if (!cart.length) return <main className="purchase-page container-custom"><div className="empty-bag"><ShoppingBag size={40} /><p className="eyebrow">Your bag is waiting</p><h1>Nothing here just yet.</h1><p>Find a handloom piece you’ll love to wear and keep.</p><Link to="/collections" className="button-primary">Explore sarees <ArrowRight size={16} /></Link></div></main>;
  return <main className="cart-page container-custom">
    <header className="purchase-header"><div><p className="eyebrow">Your selection</p><h1>Shopping bag <span>({cart.length})</span></h1></div><Link className="purchase-back" to="/collections"><ArrowLeft size={16} /> Continue shopping</Link></header>
    <div className="cart-layout"><section className="cart-items">{cart.map(({ saree, quantity }) => <article key={saree.id} className="cart-item"><Link to={`/saree/${saree.id}`}><img src={saree.images[0]} alt={saree.name} /></Link><div className="cart-item-copy"><p>{saree.category} · {saree.fabric}</p><Link to={`/saree/${saree.id}`}><h2>{saree.name}</h2></Link><strong><Money value={saree.price} /></strong><div className="cart-item-bottom"><div className="cart-quantity"><button onClick={() => updateCartQty(saree.id, -1)} aria-label="Decrease quantity"><Minus size={14} /></button><span>{quantity}</span><button onClick={() => updateCartQty(saree.id, 1)} aria-label="Increase quantity"><Plus size={14} /></button></div><button onClick={() => removeFromCart(saree.id)} className="remove-item"><Trash2 size={15} /> Remove</button></div></div><div className="cart-line-price"><Money value={saree.price * quantity} /></div></article>)}</section>
      <aside className="order-summary"><p className="eyebrow">Order summary</p><h2>Your order</h2><div className="summary-lines"><p><span>Subtotal</span><strong><Money value={cartSubtotal} /></strong></p><p><span>Delivery</span>{deliveryFee === 0 ? <strong className="free-delivery">Complimentary</strong> : <strong><Money value={deliveryFee} /></strong>}</p></div><div className="summary-total"><span>Total</span><strong><Money value={cartTotal} /></strong></div><button onClick={() => navigate('/checkout')} className="button-primary summary-button">Secure checkout <ArrowRight size={16} /></button><p className="summary-note"><ShieldCheck size={15} /> A secure checkout, direct from the weaver.</p></aside>
    </div><div className="cart-footer-actions"><Link to="/collections"><ArrowLeft size={15} /> Continue shopping</Link><button onClick={clearCart}>Clear bag</button></div>
  </main>;
}
