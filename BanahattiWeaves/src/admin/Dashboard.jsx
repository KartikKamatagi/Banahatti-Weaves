import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Package, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { sarees, orders } = useCart();

  const totalSarees = sarees.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const uniqueCustomersCount = new Set(orders.map((o) => o.customerEmail || o.customerName)).size || 4;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-deep-charcoal">
          Admin Dashboard
        </h1>
        <p className="text-xs text-gray-500">
          Overview of stock inventory, customer orders, and sales performance.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Sarees */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              TOTAL SAREES
            </span>
            <span className="font-serif text-3xl font-extrabold text-deep-charcoal">{totalSarees}</span>
            <span className="text-[11px] text-emerald-600 block mt-1">In Catalog</span>
          </div>
          <div className="p-4 rounded-2xl bg-crimson/10 text-crimson">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              TOTAL ORDERS
            </span>
            <span className="font-serif text-3xl font-extrabold text-deep-charcoal">{totalOrders}</span>
            <span className="text-[11px] text-emerald-600 block mt-1">All Time</span>
          </div>
          <div className="p-4 rounded-2xl bg-gold-zari/10 text-gold-zari">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              PENDING ORDERS
            </span>
            <span className="font-serif text-3xl font-extrabold text-amber-600">{pendingOrders}</span>
            <span className="text-[11px] text-amber-600 block mt-1">Needs Processing</span>
          </div>
          <div className="p-4 rounded-2xl bg-amber-100 text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              CUSTOMERS
            </span>
            <span className="font-serif text-3xl font-extrabold text-deep-charcoal">{uniqueCustomersCount}</span>
            <span className="text-[11px] text-emerald-600 block mt-1">Active Accounts</span>
          </div>
          <div className="p-4 rounded-2xl bg-teal/10 text-teal">
            <Users className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-deep-charcoal">Recent Orders</h3>
            <p className="text-xs text-gray-500">Latest orders placed by customers.</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-crimson hover:underline flex items-center gap-1"
          >
            Manage All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-deep-charcoal">
            <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Items</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-cream/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-crimson">{ord.id}</td>
                  <td className="p-3 font-semibold">{ord.customerName}</td>
                  <td className="p-3 text-gray-500">{ord.date}</td>
                  <td className="p-3 text-gray-600 max-w-[200px] truncate">
                    {ord.items.map((i) => i.name).join(', ')}
                  </td>
                  <td className="p-3 font-serif font-bold text-deep-charcoal">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      ord.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
