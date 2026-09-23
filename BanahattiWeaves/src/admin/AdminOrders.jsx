import React, { useState } from 'react';
import './admin.css';
import './AdminOrders.css';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  X
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
        return <span className="badge-admin badge-admin-delivered">{status}</span>;
      case 'Shipped':
        return <span className="badge-admin badge-admin-shipped">Shipped</span>;
      case 'Cancelled':
        return <span className="badge-admin badge-admin-cancelled">Cancelled</span>;
      default:
        return <span className="badge-admin badge-admin-pending">Pending</span>;
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
      <div className="order-kpi-grid">
        <div 
          onClick={() => setFilterStatus('ALL')}
          className={`order-kpi-card ${filterStatus === 'ALL' ? 'active-all' : ''}`}
        >
          <span className="text-[11px] font-bold text-[#77716B] uppercase tracking-wider block">ALL ORDERS</span>
          <div className="text-[24px] font-extrabold text-[#242424] mt-1">{orders.length}</div>
        </div>

        <div 
          onClick={() => setFilterStatus('Pending')}
          className={`order-kpi-card ${filterStatus === 'Pending' ? 'active-pending' : ''}`}
        >
          <span className="text-[11px] font-bold text-[#77716B] uppercase tracking-wider block">PENDING</span>
          <div className="text-[24px] font-extrabold text-[#B9823B] mt-1">{pendingCount}</div>
        </div>

        <div 
          onClick={() => setFilterStatus('Confirmed')}
          className={`order-kpi-card ${filterStatus === 'Confirmed' ? 'active-confirmed' : ''}`}
        >
          <span className="text-[11px] font-bold text-[#77716B] uppercase tracking-wider block">CONFIRMED</span>
          <div className="text-[24px] font-extrabold text-[#3E725E] mt-1">{confirmedCount}</div>
        </div>

        <div 
          onClick={() => setFilterStatus('Shipped')}
          className={`order-kpi-card ${filterStatus === 'Shipped' ? 'active-shipped' : ''}`}
        >
          <span className="text-[11px] font-bold text-[#77716B] uppercase tracking-wider block">SHIPPED</span>
          <div className="text-[24px] font-extrabold text-[#3E5463] mt-1">{shippedCount}</div>
        </div>

        <div 
          onClick={() => setFilterStatus('Delivered')}
          className={`order-kpi-card ${filterStatus === 'Delivered' ? 'active-delivered' : ''}`}
        >
          <span className="text-[11px] font-bold text-[#77716B] uppercase tracking-wider block">DELIVERED</span>
          <div className="text-[24px] font-extrabold text-[#3E725E] mt-1">{deliveredCount}</div>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-[#E5E0D9] rounded-[8px]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77716B]" />
          <input 
            type="text" 
            placeholder="Search order ID or customer name/phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-admin w-full pl-9 h-[38px] text-[13px]"
          />
        </div>

        <span className="text-[13px] font-semibold text-[#77716B]">
          Showing {filteredOrders.length} orders
        </span>
      </div>

      {/* ORDERS TABLE */}
      <div className="admin-table-container">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Saree Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
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
                    <td className="font-mono font-bold text-[#1E2D29]">
                      #{ord.id}
                    </td>

                    {/* Customer */}
                    <td>
                      <p className="font-semibold text-[#242424]">{ord.customerName}</p>
                      <p className="text-[12px] text-[#77716B]">{ord.customerPhone}</p>
                    </td>

                    {/* Date */}
                    <td className="text-[#77716B] font-medium">
                      {ord.date}
                    </td>

                    {/* Saree Items */}
                    <td>
                      <div className="flex items-center gap-2">
                        <img 
                          src={ord.items?.[0]?.image || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                          alt="saree" 
                          className="order-item-thumb" 
                        />
                        <span className="font-medium truncate max-w-[160px]">
                          {ord.items?.[0]?.name || 'Banahatti Saree'} {ord.items?.length > 1 && `+${ord.items.length - 1} more`}
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="font-bold text-[#242424]">
                      ₹{(ord.totalAmount || 0).toLocaleString('en-IN')}
                    </td>

                    {/* Status Dropdown */}
                    <td>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="input-admin h-[36px] text-[12px] py-0 px-2 cursor-pointer font-semibold"
                      >
                        {statusOptions.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="btn-admin-primary h-[34px] px-3 text-[12px]"
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
        <div className="admin-modal-overlay animate-fade-in">
          <div className="admin-modal-container max-w-lg">
            
            <div className="p-5 border-b border-[#E5E0D9] flex justify-between items-center bg-[#FAF8F5]">
              <div>
                <h3 className="font-bold text-[16px] text-[#242424]">Order #{selectedOrder.id}</h3>
                <p className="text-[12px] text-[#77716B]">{selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#77716B] hover:text-[#242424] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
              <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5E0D9] text-[13px] space-y-1">
                <p className="font-bold text-[#242424]">{selectedOrder.customerName}</p>
                <p className="text-[#77716B]">{selectedOrder.customerPhone}</p>
                <p className="text-[#77716B]">{selectedOrder.address || 'Bengaluru, Karnataka'}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#77716B] uppercase tracking-wider block">ORDER ITEMS</span>
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 border-b border-[#E5E0D9]">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="saree" className="order-item-thumb" />
                      <span className="font-semibold text-[13px]">{item.name} (x{item.quantity})</span>
                    </div>
                    <span className="font-bold text-[13px] text-[#8C3E43]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 font-bold text-[16px] text-[#242424] border-t border-[#E5E0D9]">
                <span>Total Amount:</span>
                <span className="text-[#8C3E43]">₹{(selectedOrder.totalAmount || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E0D9] bg-[#FAF8F5] flex justify-end gap-3">
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
