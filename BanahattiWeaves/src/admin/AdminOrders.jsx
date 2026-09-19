import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  Eye, 
  X,
  Printer
} from 'lucide-react';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useCart();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusOptions = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Confirmed':
        return <span className="inline-block px-2.5 py-1 rounded text-[12px] font-medium bg-[#E8F2ED] text-[#4F806B]">{status}</span>;
      case 'Shipped':
        return <span className="inline-block px-2.5 py-1 rounded text-[12px] font-medium bg-[#ECEFF1] text-[#455A64]">Shipped</span>;
      case 'Cancelled':
        return <span className="inline-block px-2.5 py-1 rounded text-[12px] font-medium bg-[#FBEBEB] text-[#B45454]">Cancelled</span>;
      default:
        return <span className="inline-block px-2.5 py-1 rounded text-[12px] font-medium bg-[#F5EFE6] text-[#B9823B]">Pending</span>;
    }
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = filterStatus === 'ALL' || ord.status === filterStatus;
    const matchesSearch = 
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerPhone?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const confirmedCount = orders.filter(o => o.status === 'Confirmed').length;
  const shippedCount = orders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* STATISTICS AT TOP: All, Pending, Confirmed, Shipped, Delivered */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div 
          onClick={() => setFilterStatus('ALL')}
          className={`card-admin p-4 cursor-pointer transition-all ${filterStatus === 'ALL' ? 'border-[#1E2D29] bg-[#FAF8F5]' : ''}`}
        >
          <span className="text-[12px] font-semibold text-[#77716B] uppercase tracking-wider block">ALL ORDERS</span>
          <div className="text-[24px] font-bold text-[#242424] mt-1">{orders.length}</div>
        </div>

        <div 
          onClick={() => setFilterStatus('Pending')}
          className={`card-admin p-4 cursor-pointer transition-all ${filterStatus === 'Pending' ? 'border-[#B9823B] bg-[#F5EFE6]/50' : ''}`}
        >
          <span className="text-[12px] font-semibold text-[#77716B] uppercase tracking-wider block">PENDING</span>
          <div className="text-[24px] font-bold text-[#B9823B] mt-1">{pendingCount}</div>
        </div>

        <div 
          onClick={() => setFilterStatus('Confirmed')}
          className={`card-admin p-4 cursor-pointer transition-all ${filterStatus === 'Confirmed' ? 'border-[#4F806B] bg-[#E8F2ED]/50' : ''}`}
        >
          <span className="text-[12px] font-semibold text-[#77716B] uppercase tracking-wider block">CONFIRMED</span>
          <div className="text-[24px] font-bold text-[#4F806B] mt-1">{confirmedCount}</div>
        </div>

        <div 
          onClick={() => setFilterStatus('Shipped')}
          className={`card-admin p-4 cursor-pointer transition-all ${filterStatus === 'Shipped' ? 'border-[#455A64] bg-[#ECEFF1]/50' : ''}`}
        >
          <span className="text-[12px] font-semibold text-[#77716B] uppercase tracking-wider block">SHIPPED</span>
          <div className="text-[24px] font-bold text-[#455A64] mt-1">{shippedCount}</div>
        </div>

        <div 
          onClick={() => setFilterStatus('Delivered')}
          className={`card-admin p-4 cursor-pointer transition-all ${filterStatus === 'Delivered' ? 'border-[#4F806B] bg-[#E8F2ED]/50' : ''}`}
        >
          <span className="text-[12px] font-semibold text-[#77716B] uppercase tracking-wider block">DELIVERED</span>
          <div className="text-[24px] font-bold text-[#4F806B] mt-1">{deliveredCount}</div>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-[#E5E0D9] rounded-[6px]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77716B]" />
          <input 
            type="text" 
            placeholder="Search order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-admin w-full pl-9 h-[38px] text-[13px]"
          />
        </div>

        <span className="text-[13px] text-[#77716B]">
          Showing {filteredOrders.length} orders
        </span>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white border border-[#E5E0D9] rounded-[6px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-[#242424]">
            <thead className="bg-[#F7F5F1] text-[12px] font-semibold text-[#77716B] uppercase tracking-[0.05em] border-b border-[#E5E0D9]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Saree Items</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D9]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#77716B]">
                    No orders matching selected status.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF8F5] transition-colors h-[64px]">
                    
                    {/* Order ID */}
                    <td className="py-2 px-4 font-mono font-medium text-[#1E2D29]">
                      #{ord.id}
                    </td>

                    {/* Customer */}
                    <td className="py-2 px-4">
                      <p className="font-medium text-[#242424]">{ord.customerName}</p>
                      <p className="text-[12px] text-[#77716B]">{ord.customerPhone}</p>
                    </td>

                    {/* Date */}
                    <td className="py-2 px-4 text-[#77716B]">
                      {ord.date}
                    </td>

                    {/* Saree Items */}
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-2">
                        <img 
                          src={ord.items?.[0]?.image || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                          alt="saree" 
                          className="w-[36px] h-[45px] object-cover rounded border border-[#E5E0D9]" 
                        />
                        <span className="font-medium truncate max-w-[160px]">
                          {ord.items?.[0]?.name || 'Banahatti Saree'} {ord.items?.length > 1 && `+${ord.items.length - 1} more`}
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-2 px-4 font-semibold text-[#242424]">
                      ₹{(ord.totalAmount || 0).toLocaleString('en-IN')}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-2 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="input-admin h-[36px] text-[12px] py-0 px-2 cursor-pointer"
                      >
                        {statusOptions.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="text-[13px] font-medium text-[#77716B] hover:text-[#242424]"
                      >
                        Details
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[8px] border border-[#E5E0D9] shadow-lg w-full max-w-lg overflow-hidden text-sm">
            
            <div className="p-5 border-b border-[#E5E0D9] flex justify-between items-center bg-[#F7F5F1]">
              <div>
                <h3 className="font-semibold text-[16px] text-[#242424]">Order #{selectedOrder.id}</h3>
                <p className="text-[12px] text-[#77716B]">{selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#77716B] hover:text-[#242424]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-[#FAF8F5] rounded border border-[#E5E0D9] text-[13px] space-y-1">
                <p className="font-semibold text-[#242424]">{selectedOrder.customerName}</p>
                <p className="text-[#77716B]">{selectedOrder.customerPhone}</p>
                <p className="text-[#77716B]">{selectedOrder.address || 'Bengaluru, Karnataka'}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[12px] font-semibold text-[#77716B] uppercase tracking-wider block">ORDER ITEMS</span>
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 border-b border-[#E5E0D9]">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="saree" className="w-[36px] h-[45px] object-cover rounded border border-[#E5E0D9]" />
                      <span className="font-medium text-[13px]">{item.name} (x{item.quantity})</span>
                    </div>
                    <span className="font-semibold text-[13px]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 font-semibold text-[15px] text-[#242424]">
                <span>Total Amount:</span>
                <span>₹{(selectedOrder.totalAmount || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E0D9] bg-[#F7F5F1] flex justify-end gap-3">
              <button onClick={() => setSelectedOrder(null)} className="btn-admin-secondary h-[38px] text-[13px]">
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
