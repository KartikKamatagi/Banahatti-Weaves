import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Clock3, MapPin, Package, ShoppingBag, Truck } from 'lucide-react';

const Money = ({ value }) => <>₹{value.toLocaleString('en-IN')}</>;
const statusMeta = {
  Delivered: { icon: CheckCircle2, copy: 'Delivered', stage: 3 },
  Shipped: { icon: Truck, copy: 'On its way', stage: 2 },
  Confirmed: { icon: CheckCircle2, copy: 'Order confirmed', stage: 1 },
  Pending: { icon: Clock3, copy: 'Being prepared', stage: 1 },
  Cancelled: { icon: Clock3, copy: 'Cancelled', stage: 0 },
};

export default function Orders() {
  const { orders } = useCart();
  if (!orders.length) return <main className="orders-page container-custom"><div className="empty-bag"><Package size={40} /><p className="eyebrow">Your story starts here</p><h1>No orders yet.</h1><p>When you bring a Banahatti weave home, you’ll be able to follow it here.</p><Link to="/collections" className="button-primary">Browse sarees</Link></div></main>;
  return <main className="orders-page container-custom">
    <header className="orders-header"><div><p className="eyebrow">Your handloom journey</p><h1>My orders.</h1><p>Keep track of every piece, from our loom to your doorstep.</p></div><div className="orders-count"><Package size={18} /><strong>{orders.length}</strong><span>{orders.length === 1 ? 'order placed' : 'orders placed'}</span></div></header>
    <div className="orders-list">{orders.map((order) => { const meta = statusMeta[order.status] || statusMeta.Pending; const StatusIcon = meta.icon; return <article className="order-card" key={order.id}>
      <header className="order-card-head"><div><p>Order no.</p><h2>{order.id}</h2><span>Placed on {new Date(`${order.date}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div><div className={`order-status ${order.status.toLowerCase()}`}><StatusIcon size={15} /><span>{meta.copy}</span></div><strong className="order-total"><small>Total</small><Money value={order.totalAmount} /></strong></header>
      <div className="order-card-body"><div className="order-products">{order.items.map((item, index) => <div className="order-product" key={`${item.sareeId}-${index}`}><img src={item.image} alt={item.name} /><div><h3>{item.name}</h3><p>Quantity {item.quantity}</p><Link to={`/saree/${item.sareeId}`}>View saree →</Link></div><strong><Money value={item.price * item.quantity} /></strong></div>)}</div>
        {order.status !== 'Cancelled' && <div className="order-tracker"><div className="tracker-labels"><span className={meta.stage >= 1 ? 'active' : ''}>Confirmed</span><span className={meta.stage >= 2 ? 'active' : ''}>Shipped</span><span className={meta.stage >= 3 ? 'active' : ''}>Delivered</span></div><div className="tracker-line"><i className={meta.stage >= 1 ? 'active' : ''} /><i className={meta.stage >= 2 ? 'active' : ''} /><i className={meta.stage >= 3 ? 'active' : ''} /></div></div>}
      </div>
      <footer className="order-card-footer"><p><MapPin size={15} /><span><strong>Delivering to</strong>{order.address}</span></p><span className="order-certified"><CheckCircle2 size={15} /> Handloom verified</span></footer>
    </article>; })}</div>
  </main>;
}
