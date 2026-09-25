import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import InvoiceModal from '../components/InvoiceModal';
import './Orders.css';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock3, 
  MapPin, 
  FileText, 
  Repeat, 
  XCircle, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const Money = ({ value }) => <>₹{Number(value || 0).toLocaleString('en-IN')}</>;

export default function Orders() {
  const navigate = useNavigate();
  const { orders, cancelOrder, reorder } = useCart();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [filterTab, setFilterTab] = useState('ALL');
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState('Changed my mind');

  const filteredOrders = orders.filter((order) => {
    if (filterTab === 'ALL') return true;
    if (filterTab === 'ACTIVE') return order.status === 'Confirmed' || order.status === 'Pending' || order.status === 'Shipped';
    if (filterTab === 'DELIVERED') return order.status === 'Delivered';
    if (filterTab === 'CANCELLED') return order.status === 'Cancelled';
    return true;
  });

  const getStageNumber = (status) => {
    switch (status) {
      case 'Delivered': return 4;
      case 'Shipped': return 3;
      case 'Confirmed': return 2;
      case 'Pending': return 1;
      case 'Cancelled': return 0;
      default: return 1;
    }
  };

  const handleCancelSubmit = (orderId) => {
    cancelOrder(orderId, cancelReason);
    setCancellingOrderId(null);
  };

  const handleReorderClick = (orderId) => {
    const success = reorder(orderId);
    if (success) {
      navigate('/cart');
    }
  };

  if (!orders.length) {
    return (
      <main className="orders-page container-custom">
        <div className="orders-empty-state">
          <div className="empty-icon-wrap">
            <Package size={36} />
          </div>
          <span className="badge-gold inline-block mb-2">Artisan Handlooms</span>
          <h2>No orders placed yet</h2>
          <p>
            When you bring an authentic Banahatti pit-loom saree home, you can follow its weaving, dispatch, and delivery journey right here.
          </p>
          <Link to="/collections" className="button-primary inline-flex items-center gap-2">
            Explore Handloom Sarees <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page container-custom">
      {/* Page Header */}
      <header className="orders-hero">
        <div className="orders-title-group">
          <span className="eyebrow">Your Handloom Journey</span>
          <h1>My Orders & Trackers</h1>
          <p className="orders-subtitle">
            Follow every saree from our Banahatti pit-loom weavers right to your doorstep.
          </p>
        </div>

        <div className="orders-kpi-badge">
          <Package size={24} />
          <div>
            <strong>{orders.length}</strong>
            <span>{orders.length === 1 ? 'Total Order' : 'Total Orders'}</span>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="orders-tabs-bar">
        <button 
          onClick={() => setFilterTab('ALL')} 
          className={`tab-btn ${filterTab === 'ALL' ? 'active' : ''}`}
        >
          All Orders ({orders.length})
        </button>
        <button 
          onClick={() => setFilterTab('ACTIVE')} 
          className={`tab-btn ${filterTab === 'ACTIVE' ? 'active' : ''}`}
        >
          Active & In-Transit ({orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length})
        </button>
        <button 
          onClick={() => setFilterTab('DELIVERED')} 
          className={`tab-btn ${filterTab === 'DELIVERED' ? 'active' : ''}`}
        >
          Delivered ({orders.filter(o => o.status === 'Delivered').length})
        </button>
        <button 
          onClick={() => setFilterTab('CANCELLED')} 
          className={`tab-btn ${filterTab === 'CANCELLED' ? 'active' : ''}`}
        >
          Cancelled ({orders.filter(o => o.status === 'Cancelled').length})
        </button>
      </div>

      {/* Orders List */}
      <div className="orders-list-grid">
        {filteredOrders.map((order) => {
          const stage = getStageNumber(order.status);
          const isCancelled = order.status === 'Cancelled';
          const isDelivered = order.status === 'Delivered';
          const canCancel = order.status === 'Pending' || order.status === 'Confirmed';
          const trackingNumber = order.trackingNumber || `BD-8${Math.floor(100000 + Math.random() * 899999)}IN`;
          const carrier = order.carrier || 'BlueDart Express Handloom Freight';

          let badgeClass = 'badge-pending';
          if (isDelivered) badgeClass = 'badge-delivered';
          else if (order.status === 'Shipped') badgeClass = 'badge-shipped';
          else if (isCancelled) badgeClass = 'badge-cancelled';
          else if (order.status === 'Confirmed') badgeClass = 'badge-confirmed';

          return (
            <article className="order-card-enhanced" key={order.id}>
              
              {/* Card Top */}
              <header className="order-card-header">
                <div className="order-meta-info">
                  <div className="order-number-row">
                    <h2>{order.id}</h2>
                    <span className={`order-badge-pill ${badgeClass}`}>
                      {isDelivered && <CheckCircle2 size={13} />}
                      {order.status === 'Shipped' && <Truck size={13} />}
                      {order.status === 'Confirmed' && <Sparkles size={13} />}
                      {order.status === 'Pending' && <Clock3 size={13} />}
                      {isCancelled && <XCircle size={13} />}
                      {order.status}
                    </span>
                  </div>
                  <span className="order-date-text">
                    Ordered on {new Date(`${order.date}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {order.paymentMethod && ` · Paid via ${order.paymentMethod}`}
                  </span>
                </div>

                <div className="order-header-actions">
                  <div className="order-amount-display">
                    <span>Order Total</span>
                    <strong><Money value={order.totalAmount} /></strong>
                  </div>
                </div>
              </header>

              {/* Interactive Tracker Stepper (if not cancelled) */}
              {!isCancelled ? (
                <div className="order-tracking-card">
                  <div className="tracking-header-row">
                    <span className="tracking-title">
                      <Truck size={16} /> Live Shipment Tracking
                    </span>
                    <span className="tracking-courier-pill">
                      <strong>{carrier}:</strong> {trackingNumber}
                    </span>
                  </div>

                  <div className="tracking-stepper">
                    <div className="tracking-progress-bar">
                      <div 
                        className="tracking-progress-fill" 
                        style={{ width: stage === 1 ? '15%' : stage === 2 ? '45%' : stage === 3 ? '78%' : '100%' }}
                      />
                    </div>

                    {/* Step 1: Confirmed */}
                    <div className={`tracking-step ${stage >= 1 ? 'done' : ''} ${stage === 1 ? 'active' : ''}`}>
                      <div className="step-circle">1</div>
                      <span className="step-label">Order Confirmed</span>
                      <span className="step-desc">Order verified at loom</span>
                    </div>

                    {/* Step 2: Loom Quality & Pack */}
                    <div className={`tracking-step ${stage >= 2 ? 'done' : ''} ${stage === 2 ? 'active' : ''}`}>
                      <div className="step-circle">2</div>
                      <span className="step-label">Handloom Inspection</span>
                      <span className="step-desc">Inspected & potli packed</span>
                    </div>

                    {/* Step 3: Shipped */}
                    <div className={`tracking-step ${stage >= 3 ? 'done' : ''} ${stage === 3 ? 'active' : ''}`}>
                      <div className="step-circle">3</div>
                      <span className="step-label">Dispatched</span>
                      <span className="step-desc">In transit with BlueDart</span>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className={`tracking-step ${stage >= 4 ? 'done' : ''} ${stage === 4 ? 'active' : ''}`}>
                      <div className="step-circle">4</div>
                      <span className="step-label">Delivered</span>
                      <span className="step-desc">{isDelivered ? 'Handed over' : `Est. ${order.estimatedDelivery || 'in 3-4 days'}`}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border-b border-red-100 flex items-center gap-3 text-xs text-red-800">
                  <XCircle size={18} className="text-red-500 shrink-0" />
                  <div>
                    <strong>Order Cancelled:</strong> {order.cancellationReason || 'Cancelled upon customer request.'}
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="order-items-wrapper">
                {order.items.map((item, index) => (
                  <div className="order-item-row" key={`${item.sareeId}-${index}`}>
                    <div className="item-thumb-details">
                      <img 
                        src={item.image || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                        alt={item.name} 
                      />
                      <div className="item-info-text">
                        <h3>{item.name}</h3>
                        <p>
                          Quantity: <strong>{item.quantity}</strong> · Authentic Banahatti Handloom
                        </p>
                        <Link to={`/saree/${item.sareeId}`} className="view-saree-link">
                          View Saree Details <ChevronRight size={13} />
                        </Link>
                      </div>
                    </div>

                    <div className="item-price-col">
                      <strong><Money value={item.price * item.quantity} /></strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer Details & Actions */}
              <footer className="order-footer-details">
                <div className="shipping-address-snippet">
                  <MapPin size={16} />
                  <div>
                    <strong>Delivering To: </strong>
                    <span>{order.address}</span>
                  </div>
                </div>

                <div className="action-buttons-group">
                  {/* Tax Invoice Modal Trigger */}
                  <button 
                    onClick={() => setSelectedInvoiceOrder(order)} 
                    className="btn-invoice-action"
                    title="View & Print Official GST Tax Invoice"
                  >
                    <FileText size={14} /> Tax Invoice
                  </button>

                  {/* Buy Again Button */}
                  <button 
                    onClick={() => handleReorderClick(order.id)} 
                    className="btn-reorder-action"
                    title="Order these sarees again"
                  >
                    <Repeat size={14} /> Buy Again
                  </button>

                  {/* Cancel Button if eligible */}
                  {canCancel && (
                    <button 
                      onClick={() => setCancellingOrderId(order.id)} 
                      className="btn-cancel-action"
                      title="Cancel this order"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </footer>

              {/* Inline Cancellation Confirmation Modal */}
              {cancellingOrderId === order.id && (
                <div className="p-4 bg-orange-50 border-t border-orange-200 text-xs">
                  <p className="font-bold text-gray-800 mb-2">
                    Are you sure you want to cancel order #{order.id}?
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <select 
                      value={cancelReason} 
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-xs bg-white"
                    >
                      <option value="Changed my mind">Changed my mind</option>
                      <option value="Ordered by mistake">Ordered by mistake</option>
                      <option value="Need to change delivery address">Need to change delivery address</option>
                      <option value="Want to apply another coupon code">Want to apply another coupon code</option>
                    </select>
                    <button 
                      onClick={() => handleCancelSubmit(order.id)}
                      className="bg-red-700 hover:bg-red-800 text-white font-bold px-3 py-1 rounded"
                    >
                      Confirm Cancellation
                    </button>
                    <button 
                      onClick={() => setCancellingOrderId(null)}
                      className="text-gray-600 hover:underline"
                    >
                      Keep Order
                    </button>
                  </div>
                </div>
              )}

            </article>
          );
        })}
      </div>

      {/* Printable Invoice Modal Component */}
      {selectedInvoiceOrder && (
        <InvoiceModal 
          order={selectedInvoiceOrder} 
          onClose={() => setSelectedInvoiceOrder(null)} 
        />
      )}
    </main>
  );
}
