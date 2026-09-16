import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Package, Search, Filter, ShieldCheck } from 'lucide-react';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useCart();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const statusOptions = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = filterStatus === 'ALL' || ord.status === filterStatus;
    const matchesSearch = 
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-deep-charcoal">
          Customer Orders Management
        </h1>
        <p className="text-xs text-gray-500">
          Review customer order details and update shipping/fulfillment statuses.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
              filterStatus === 'ALL' ? 'bg-crimson text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Orders ({orders.length})
          </button>
          {statusOptions.map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                filterStatus === st ? 'bg-crimson text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search Order ID or Customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs p-2.5 pl-9 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-deep-charcoal">
            <thead className="bg-gray-50 uppercase font-bold text-[10px] tracking-wider text-gray-500 border-b border-gray-200">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Products & Qty</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    No orders matching selected filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-cream/30 transition-colors">
                    
                    {/* Order ID */}
                    <td className="p-4 font-mono font-bold text-crimson text-sm">
                      {ord.id}
                    </td>

                    {/* Customer */}
                    <td className="p-4">
                      <strong className="font-serif font-bold text-sm block text-deep-charcoal">{ord.customerName}</strong>
                      <span className="text-[11px] text-gray-500 block">{ord.customerPhone}</span>
                      <span className="text-[10px] text-gray-400 truncate max-w-[200px] block">{ord.address}</span>
                    </td>

                    {/* Products */}
                    <td className="p-4 space-y-1">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <img src={item.image} alt={item.name} className="w-8 h-10 object-cover rounded border border-gray-200" />
                          <span className="font-medium text-xs truncate max-w-[180px]">
                            {item.name} <strong className="text-crimson">(x{item.quantity})</strong>
                          </span>
                        </div>
                      ))}
                    </td>

                    {/* Amount */}
                    <td className="p-4 font-serif font-bold text-crimson text-sm">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-gray-500 font-medium">
                      {ord.date}
                    </td>

                    {/* Status Dropdown selector */}
                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                          ord.status === 'Shipped' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                          ord.status === 'Confirmed' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                          ord.status === 'Cancelled' ? 'bg-red-50 text-red-800 border-red-300' :
                          'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
