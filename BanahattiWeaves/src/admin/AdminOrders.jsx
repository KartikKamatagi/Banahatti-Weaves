import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Receipt, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Truck, 
  Clock, 
  XCircle, 
  Package, 
  Calendar, 
  Phone, 
  MapPin, 
  User, 
  X,
  CreditCard,
  Printer
} from 'lucide-react';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useCart();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusOptions = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#3D8065]/10 text-[#3D8065] px-2.5 py-1 rounded-full"><CheckCircle2 className="w-3 h-3" /> Delivered</span>;
      case 'Shipped':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#2A3733]/10 text-[#1F2926] px-2.5 py-1 rounded-full"><Truck className="w-3 h-3" /> Shipped</span>;
      case 'Confirmed':
      case 'Processing':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#9A6863]/10 text-[#9A6863] px-2.5 py-1 rounded-full"><Package className="w-3 h-3" /> Processing</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#B84A4A]/10 text-[#B84A4A] px-2.5 py-1 rounded-full"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#C58A3A]/10 text-[#C58A3A] px-2.5 py-1 rounded-full"><Clock className="w-3 h-3" /> Pending</span>;
    }
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = filterStatus === 'ALL' || ord.status === filterStatus;
    const matchesSearch = 
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerPhone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.address?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const shippedCount = orders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#242424]">Store Orders</h1>
          <p className="text-xs text-[#77716B] mt-0.5">Manage customer purchases, order status updates, and dispatch tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-[#77716B] font-semibold tracking-wider uppercase">NET REVENUE</p>
            <p className="font-serif text-lg font-bold text-[#3D8065]">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">Total Orders</span>
          <p className="text-2xl font-bold text-[#242424] font-serif mt-1">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">Pending Orders</span>
          <p className="text-2xl font-bold text-[#C58A3A] font-serif mt-1">{pendingCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">In Transit</span>
          <p className="text-2xl font-bold text-[#1F2926] font-serif mt-1">{shippedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">Delivered</span>
          <p className="text-2xl font-bold text-[#3D8065] font-serif mt-1">{deliveredCount}</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {['ALL', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === st 
                  ? 'bg-[#1F2926] text-white shadow-xs' 
                  : 'bg-[#F7F6F3] text-[#77716B] hover:text-[#242424] hover:bg-[#E5E1DB]/50'
              }`}
            >
              {st === 'ALL' ? `All (${orders.length})` : st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#77716B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search Order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] placeholder-[#77716B] focus:outline-none focus:border-[#1F2926]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-[#E5E1DB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#242424]">
            <thead className="bg-[#F7F6F3] border-b border-[#E5E1DB] text-[10px] font-bold text-[#77716B] uppercase tracking-wider">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Saree Items</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1DB]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#77716B]">
                    No orders matching selected criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F7F6F3]/50 transition-colors">
                    
                    {/* Order ID */}
                    <td className="p-4 font-mono font-bold text-[#9A6863]">
                      #{ord.id}
                    </td>

                    {/* Customer */}
                    <td className="p-4">
                      <p className="font-semibold text-[#242424]">{ord.customerName}</p>
                      <p className="text-[11px] text-[#77716B]">{ord.customerPhone}</p>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-[#77716B] whitespace-nowrap">
                      {ord.date}
                    </td>

                    {/* Saree Items */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {ord.items && ord.items.length > 0 ? (
                          <>
                            <img 
                              src={ord.items[0].image || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                              alt="saree" 
                              className="w-7 h-9 object-cover rounded border border-[#E5E1DB]" 
                            />
                            <span className="font-medium truncate max-w-[160px]">
                              {ord.items[0].name} {ord.items.length > 1 && `+${ord.items.length - 1} more`}
                            </span>
                          </>
                        ) : (
                          <span className="text-[#77716B]">Banahatti Handloom Saree</span>
                        )}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="p-4 font-serif font-bold text-[#242424]">
                      ₹{(ord.totalAmount || 0).toLocaleString('en-IN')}
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="px-2.5 py-1 text-xs font-semibold bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] focus:outline-none cursor-pointer"
                      >
                        {statusOptions.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3 py-1.5 bg-white border border-[#E5E1DB] rounded-lg text-xs font-semibold text-[#1F2926] hover:bg-[#F7F6F3] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAILS & INTERACTIVE TIMELINE MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl border border-[#E5E1DB] shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E5E1DB] flex justify-between items-center bg-[#F7F6F3]">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-lg font-bold text-[#242424]">Order #{selectedOrder.id}</h2>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <p className="text-xs text-[#77716B] mt-0.5">Placed on {selectedOrder.date}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-[#77716B] hover:text-[#242424] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto admin-scrollbar">
              
              {/* INTERACTIVE TIMELINE */}
              <div className="bg-[#F7F6F3] p-4 rounded-xl border border-[#E5E1DB]">
                <span className="text-[11px] font-semibold text-[#77716B] uppercase tracking-wider block mb-3">
                  ORDER FULFILLMENT TIMELINE
                </span>
                
                <div className="grid grid-cols-4 gap-2 text-center relative">
                  {['Pending', 'Confirmed', 'Shipped', 'Delivered'].map((step, idx) => {
                    const steps = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
                    const currentIdx = steps.indexOf(selectedOrder.status);
                    const isPassed = currentIdx >= idx;
                    const isCurrent = currentIdx === idx;

                    return (
                      <div key={step} className="flex flex-col items-center space-y-1 z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-all ${
                          isPassed 
                            ? 'bg-[#1F2926] text-white' 
                            : 'bg-white border border-[#E5E1DB] text-[#77716B]'
                        }`}>
                          {idx + 1}
                        </div>
                        <span className={`text-[11px] font-semibold ${isCurrent ? 'text-[#9A6863]' : 'text-[#77716B]'}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[#E5E1DB] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#77716B]">
                    <User className="w-4 h-4 text-[#9A6863]" /> CUSTOMER INFORMATION
                  </div>
                  <p className="font-semibold text-xs text-[#242424]">{selectedOrder.customerName}</p>
                  <p className="text-xs text-[#77716B] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> {selectedOrder.customerPhone || '+91 98765 43210'}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#E5E1DB] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#77716B]">
                    <MapPin className="w-4 h-4 text-[#9A6863]" /> SHIPPING ADDRESS
                  </div>
                  <p className="text-xs text-[#242424] leading-relaxed">
                    {selectedOrder.address || 'Flat 402, Royal Palms, MG Road, Bengaluru, Karnataka - 560001'}
                  </p>
                </div>
              </div>

              {/* Order Items Table */}
              <div>
                <span className="text-[11px] font-semibold text-[#77716B] uppercase tracking-wider block mb-2">
                  ORDERED ITEMS ({selectedOrder.items?.length || 1})
                </span>
                <div className="border border-[#E5E1DB] rounded-xl overflow-hidden divide-y divide-[#E5E1DB]">
                  {(selectedOrder.items || [{ name: 'Banahatti Handloom Saree', quantity: 1, price: selectedOrder.totalAmount, image: '/images/sarees/saree_model_maroon_1789668365104.png' }]).map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-12 object-cover rounded border border-[#E5E1DB]" />
                        <div>
                          <p className="text-xs font-semibold text-[#242424]">{item.name}</p>
                          <p className="text-[11px] text-[#77716B]">Qty: {item.quantity || 1} x ₹{(item.price || 0).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      <p className="font-serif font-bold text-xs text-[#242424]">
                        ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoice Total */}
              <div className="p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E1DB] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#77716B]">
                  <span>Subtotal</span>
                  <span>₹{(selectedOrder.totalAmount || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#77716B]">
                  <span>Shipping (Handloom Express)</span>
                  <span className="text-[#3D8065] font-semibold">FREE</span>
                </div>
                <div className="border-t border-[#E5E1DB] pt-2 flex justify-between text-sm font-bold text-[#242424]">
                  <span>Total Amount Paid</span>
                  <span className="font-serif text-[#9A6863]">₹{(selectedOrder.totalAmount || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E5E1DB] bg-[#F7F6F3] flex items-center justify-between">
              <button 
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-white border border-[#E5E1DB] text-[#77716B] hover:text-[#242424] rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print Invoice
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#1F2926] text-white rounded-lg text-xs font-semibold hover:bg-[#2A3733]"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
