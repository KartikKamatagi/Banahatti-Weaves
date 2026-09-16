import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { 
    cart, 
    updateCartQty, 
    removeFromCart, 
    cartSubtotal, 
    deliveryFee, 
    cartTotal,
    clearCart 
  } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-deep-charcoal">
            Shopping Cart
          </h1>
          <p className="text-xs text-gray-500">
            Review your selected sarees before proceeding to checkout.
          </p>
        </div>

        <span className="badge-gi flex items-center gap-1 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-zari" /> 100% Handloom Mark Guaranteed
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white p-16 text-center rounded-2xl border border-gray-200 max-w-md mx-auto space-y-4 my-8">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-deep-charcoal">Your Cart is Empty</h3>
          <p className="text-xs text-gray-500">
            Explore our collection of authentic Banahatti cotton and silk sarees to add to your bag.
          </p>
          <Link 
            to="/collections"
            className="bg-crimson text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-gold-zari transition-colors inline-block"
          >
            Explore Sarees Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.saree.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-5 items-center justify-between"
              >
                <Link to={`/saree/${item.saree.id}`}>
                  <img 
                    src={item.saree.images[0]} 
                    alt={item.saree.name}
                    className="w-20 h-24 object-cover rounded-xl border border-gray-100 flex-shrink-0"
                  />
                </Link>

                <div className="flex-1 space-y-1 text-center sm:text-left text-xs">
                  <Link to={`/saree/${item.saree.id}`}>
                    <h3 className="font-serif font-bold text-base text-deep-charcoal hover:text-crimson transition-colors">
                      {item.saree.name}
                    </h3>
                  </Link>

                  <p className="text-gray-500">
                    {item.saree.fabric} • {item.saree.color}
                  </p>

                  <div className="font-serif font-bold text-sm text-crimson pt-1">
                    ₹{item.saree.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-cream/50">
                    <button 
                      onClick={() => updateCartQty(item.saree.id, -1)}
                      className="p-1.5 hover:bg-gray-200 text-deep-charcoal font-bold"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-xs w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQty(item.saree.id, 1)}
                      className="p-1.5 hover:bg-gray-200 text-deep-charcoal font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.saree.id)}
                    className="text-gray-400 hover:text-red-600 p-2 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}

            <div className="flex justify-between items-center text-xs pt-2">
              <Link to="/collections" className="text-crimson font-bold hover:underline">
                ← Continue Shopping
              </Link>
              <button 
                onClick={clearCart} 
                className="text-gray-400 hover:text-red-600 text-xs font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gold-zari/30 shadow-lg space-y-6">
            <h3 className="font-serif font-bold text-xl text-deep-charcoal border-b border-gray-100 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs border-b border-gray-100 pb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-deep-charcoal">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-gray-600 items-center">
                <span>Delivery Charge</span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                    FREE (Orders &gt; ₹3,000)
                  </span>
                ) : (
                  <span className="font-semibold text-deep-charcoal">₹{deliveryFee}</span>
                )}
              </div>

              <div className="flex justify-between items-center font-bold text-lg text-crimson pt-3 border-t border-gray-100">
                <span>Total</span>
                <span className="font-serif text-xl">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-crimson hover:bg-gold-zari text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-crimson/20 transition-all flex items-center justify-center gap-2"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
