import React from 'react';
import { useShop } from '../context/ShopContext';
import { PackageCheck, ShieldCheck, Clock, MapPin, CheckCircle2, Truck } from 'lucide-react';

export default function MyOrders() {
  const { orders, formatPrice } = useShop();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">⚙ WEAVER ALLOCATED</span>;
      case 'DISPATCHED':
        return <span className="bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> DISPATCHED</span>;
      case 'DELIVERED':
        return <span className="bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> DELIVERED</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-[#8B261D]/10 pb-4">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-[#2C221E] dark:text-[#FDFBF7]">
            My Saree Orders & Craft History
          </h1>
          <p className="text-xs text-[#6B5E57] dark:text-[#B8ACA5]">
            Track your authentic Banahatti handloom orders, weaving progress, and dispatch details.
          </p>
        </div>

        <span className="badge-gi flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> GI TAG #84 CERTIFIED ORDERS
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-3xl max-w-md mx-auto space-y-4 my-8">
          <PackageCheck className="w-16 h-16 text-gray-400 mx-auto" />
          <h3 className="font-heading text-2xl font-bold">No Past Orders Found</h3>
          <p className="text-xs text-[#6B5E57] dark:text-[#B8ACA5]">
            When you place an order, your handloom tracking details and GI Tag craft certificates will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="glass-card rounded-3xl p-6 border border-[#8B261D]/15 space-y-6"
            >
              
              {/* Order Card Header */}
              <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#8B261D]/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="font-mono text-base text-[#8B261D] dark:text-[#E5B33A]">
                      {order.id}
                    </strong>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-xs text-[#6B5E57] dark:text-[#B8ACA5] mt-0.5">
                    Order Date: {order.date} • Tracking: <span className="font-mono">{order.trackingId}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#6B5E57] dark:text-[#B8ACA5] block">Total Amount Paid</span>
                  <strong className="font-heading text-2xl font-extrabold text-[#8B261D] dark:text-[#E5B33A]">
                    {formatPrice(order.totalAmount)}
                  </strong>
                </div>
              </div>

              {/* Order Items Grid */}
              <div className="space-y-3 text-xs text-[#2C221E] dark:text-[#FDFBF7]">
                <h4 className="font-bold text-xs uppercase text-[#8B261D] dark:text-[#E5B33A]">
                  Ordered Handloom Sarees:
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-[#F7F1E5] dark:bg-[#12100E] rounded-2xl flex items-center gap-3 border border-gray-200 dark:border-white/10">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-14 h-16 object-cover rounded-xl border"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-heading font-bold text-xs truncate text-[#2C221E] dark:text-[#FDFBF7]">
                          {item.product.name}
                        </h5>
                        <p className="text-[10px] text-[#6B5E57] dark:text-[#B8ACA5]">
                          Woven by {item.product.artisanName} ({item.product.artisanGuild})
                        </p>
                        <span className="text-[10px] text-green-700 font-semibold">
                          Qty: {item.quantity} {item.blouseStitching && '• Custom Blouse Stitched (+₹499)'}
                        </span>
                      </div>
                      <strong className="text-xs text-[#8B261D] dark:text-[#E5B33A]">
                        {formatPrice((item.product.price + (item.blouseStitching ? 499 : 0)) * item.quantity)}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address & Status Timeline */}
              <div className="pt-4 border-t border-[#8B261D]/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#6B5E57] dark:text-[#B8ACA5]">
                <div className="space-y-1">
                  <span className="font-bold text-xs text-[#2C221E] dark:text-[#FDFBF7] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8B261D]" /> Shipping Destination:
                  </span>
                  <p className="text-xs">
                    {order.shippingAddress.name} • {order.shippingAddress.phone}<br />
                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                </div>

                <div className="space-y-1 md:text-right">
                  <span className="font-bold text-xs text-[#0D4C53] dark:text-[#52C0CA] flex items-center gap-1 md:justify-end">
                    <Clock className="w-3.5 h-3.5" /> Delivery Estimate:
                  </span>
                  <p className="text-xs font-semibold text-[#2C221E] dark:text-[#FDFBF7]">
                    Expected Delivery: {order.estimatedDelivery}
                  </p>
                  <span className="text-[10px] text-green-700 dark:text-green-400 font-bold block">
                    ✓ Handloom Mark Tag #84 Verified
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
