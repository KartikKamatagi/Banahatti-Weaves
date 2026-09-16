import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CheckCircle2, Lock, CreditCard } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, deliveryFee, cartTotal, createOrder } = useCart();
  const { currentUser } = useAuth();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    paymentMethod: 'COD'
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-deep-charcoal">Your cart is empty</h2>
        <p className="text-xs text-gray-500">Please add sarees to your cart before proceeding to checkout.</p>
        <button 
          onClick={() => navigate('/collections')}
          className="bg-crimson text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Return to Collections
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shippingInfo.address || !shippingInfo.phone) {
      alert('Please complete all required address fields.');
      return;
    }

    createOrder(shippingInfo);
    navigate('/orders');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-serif text-3xl font-extrabold text-deep-charcoal">
          Checkout
        </h1>
        <p className="text-xs text-gray-500">
          Complete your delivery details to finalize your Banahatti handloom order.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Customer Information Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-deep-charcoal border-b border-gray-100 pb-3">
            Shipping Information
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block uppercase font-bold text-deep-charcoal mb-1">
                Full Name *
              </label>
              <input 
                type="text" 
                required
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                placeholder="Enter recipient full name"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase font-bold text-deep-charcoal mb-1">
                  Phone Number *
                </label>
                <input 
                  type="tel" 
                  required
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-deep-charcoal mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase font-bold text-deep-charcoal mb-1">
                Street Address *
              </label>
              <textarea 
                required
                rows={2}
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                placeholder="House/Flat No., Colony, Landmark"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block uppercase font-bold text-deep-charcoal mb-1">
                  City *
                </label>
                <input 
                  type="text" 
                  required
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-deep-charcoal mb-1">
                  State *
                </label>
                <input 
                  type="text" 
                  required
                  value={shippingInfo.state}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-deep-charcoal mb-1">
                  Pincode *
                </label>
                <input 
                  type="text" 
                  required
                  value={shippingInfo.pincode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
                />
              </div>
            </div>

          </div>

          {/* Payment Method Selector (UI Ready for Gateway integration) */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <label className="block font-serif font-bold text-sm text-deep-charcoal">
              Payment Options
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label 
                className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                  shippingInfo.paymentMethod === 'COD' 
                    ? 'border-crimson bg-crimson/5 text-crimson font-bold' 
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={shippingInfo.paymentMethod === 'COD'}
                  onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'COD' })}
                  className="accent-crimson"
                />
                <span>Cash on Delivery (COD)</span>
              </label>

              <label 
                className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                  shippingInfo.paymentMethod === 'ONLINE' 
                    ? 'border-crimson bg-crimson/5 text-crimson font-bold' 
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={shippingInfo.paymentMethod === 'ONLINE'}
                  onChange={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'ONLINE' })}
                  className="accent-crimson"
                />
                <span className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4 text-gold-zari" /> Online Payment / UPI
                </span>
              </label>
            </div>
          </div>

        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gold-zari/30 shadow-lg space-y-6">
          <h3 className="font-serif font-bold text-xl text-deep-charcoal border-b border-gray-100 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.saree.id} className="flex gap-3 items-center text-xs">
                <img 
                  src={item.saree.images[0]} 
                  alt={item.saree.name}
                  className="w-12 h-14 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-deep-charcoal truncate">{item.saree.name}</h4>
                  <p className="text-gray-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-serif font-bold text-crimson">
                  ₹{(item.saree.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-xs border-t border-b border-gray-100 py-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-deep-charcoal">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-gray-600 items-center">
              <span>Delivery</span>
              {deliveryFee === 0 ? (
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                  FREE
                </span>
              ) : (
                <span className="font-semibold text-deep-charcoal">₹{deliveryFee}</span>
              )}
            </div>
            <div className="flex justify-between items-center font-bold text-lg text-crimson pt-3 border-t border-gray-100">
              <span>Total Payable</span>
              <span className="font-serif text-xl">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-crimson hover:bg-gold-zari text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-crimson/20 transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>PLACE ORDER</span>
          </button>

          <p className="text-[10px] text-center text-gray-400">
            🔒 256-Bit Encrypted Secure Checkout
          </p>
        </div>

      </form>

    </div>
  );
}
