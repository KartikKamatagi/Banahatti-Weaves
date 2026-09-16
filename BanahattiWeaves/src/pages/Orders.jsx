import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Package, Clock, CheckCircle2, Truck, AlertCircle, ShoppingBag } from 'lucide-react';

export default function Orders() {
  const { orders } = useCart();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</span>;
      case 'Shipped':
        return <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Shipped</span>;
      case 'Confirmed':
        return <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmed</span>;
      case 'Cancelled':
        return <span className="bg-red-100 text-red-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Cancelled</span>;
      default:
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pending</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="font-serif text-3xl font-extrabold text-deep-charcoal">
          My Orders
        </h1>
        <p className="text-xs text-gray-500">
          Track and review your previous Banahatti handloom saree orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 max-w-md mx-auto space-y-4 my-8">
          <Package className="w-16 h-16 text-gray-300 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-deep-charcoal">No Orders Placed Yet</h3>
          <p className="text-xs text-gray-500">You haven't placed any saree orders yet.</p>
          <Link 
            to="/collections"
            className="bg-crimson text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-block shadow"
          >
            Start Browsing Sarees
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-cream/50 p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-gray-400 font-bold uppercase block text-[10px]">Order ID</span>
                  <span className="font-mono font-bold text-deep-charcoal text-sm">{order.id}</span>
                </div>

                <div>
                  <span className="text-gray-400 font-bold uppercase block text-[10px]">Order Date</span>
                  <span className="font-semibold text-deep-charcoal">{order.date}</span>
                </div>

                <div>
                  <span className="text-gray-400 font-bold uppercase block text-[10px]">Total Amount</span>
                  <span className="font-serif font-bold text-crimson text-sm">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div>
                  {getStatusBadge(order.status)}
                </div>
              </div>

              {/* Order Items List */}
              <div className="p-4 sm:p-6 space-y-4 divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between text-xs gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-14 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0" 
                      />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-deep-charcoal">{item.name}</h4>
                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>

                    <span className="font-serif font-bold text-deep-charcoal">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Address footer */}
              <div className="bg-gray-50/70 p-4 text-[11px] text-gray-500 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-2">
                <span><strong>Delivery Address:</strong> {order.address}</span>
                <span className="text-emerald-700 font-semibold">100% Handloom Mark Verified Order</span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
