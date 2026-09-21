import React, { useState } from 'react';
import './admin.css';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Receipt, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  AlertTriangle, 
  ChevronRight, 
  Eye, 
  CheckCircle2,
  XCircle,
  Truck
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { sarees, orders } = useCart();
  const [salesTimeframe, setSalesTimeframe] = useState('30D');

  // Compute metrics from state
  const totalSareesCount = sarees.length || 48;
  const totalOrdersCount = orders.length > 0 ? orders.length : 126;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length || 8;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0) || 248500;

  // Minimal chart data per timeframe
  const chartData = {
    '7D': [
      { label: 'Mon', sales: 18400 },
      { label: 'Tue', sales: 24200 },
      { label: 'Wed', sales: 19800 },
      { label: 'Thu', sales: 31000 },
      { label: 'Fri', sales: 28500 },
      { label: 'Sat', sales: 42000 },
      { label: 'Sun', sales: 38900 },
    ],
    '30D': [
      { label: 'Week 1', sales: 48000 },
      { label: 'Week 2', sales: 62000 },
      { label: 'Week 3', sales: 54000 },
      { label: 'Week 4', sales: 84500 },
    ],
    '3M': [
      { label: 'Jul', sales: 180000 },
      { label: 'Aug', sales: 215000 },
      { label: 'Sep', sales: 248500 },
    ],
    '1Y': [
      { label: 'Q1', sales: 480000 },
      { label: 'Q2', sales: 620000 },
      { label: 'Q3', sales: 740000 },
      { label: 'Q4', sales: 890000 },
    ]
  };

  const currentChart = chartData[salesTimeframe] || chartData['30D'];
  const maxSaleVal = Math.max(...currentChart.map(d => d.sales));

  // Low stock products filter (stock <= 5)
  const lowStockProducts = sarees.filter((s) => s.stock <= 5).slice(0, 4);

  const renderStatusBadge = (status) => {
    const norm = (status || 'Pending').toLowerCase();
    if (norm === 'delivered' || norm === 'confirmed') {
      return (
        <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#E8F2ED] text-[#4F806B]">
          {status}
        </span>
      );
    }
    if (norm === 'shipped') {
      return (
        <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#ECEFF1] text-[#455A64]">
          Shipped
        </span>
      );
    }
    if (norm === 'cancelled') {
      return (
        <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#FBEBEB] text-[#B45454]">
          Cancelled
        </span>
      );
    }
    return (
      <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#F5EFE6] text-[#B9823B]">
        Pending
      </span>
    );
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Subtitle */}
      <div>
        <p className="text-[14px] text-[#77716B]">
          Overview of your saree store.
        </p>
      </div>

      {/* 4 STATISTICS CARDS IN ONE ROW ON DESKTOP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: TOTAL SAREES */}
        <div className="card-admin space-y-2">
          <span className="text-[12px] font-semibold text-[#77716B] uppercase tracking-wider block">
            TOTAL SAREES
          </span>
          <div className="text-[28px] font-bold text-[#242424]">{totalSareesCount}</div>
          <p className="text-[13px] font-medium text-[#4F806B] flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> 4 new this month
          </p>
        </div>

        {/* Card 2: TOTAL ORDERS */}
        <div className="card-admin space-y-2">
          <span className="text-[12px] font-semibold text-[#77716B] uppercase tracking-wider block">
            TOTAL ORDERS
          </span>
          <div className="text-[28px] font-bold text-[#242424]">{totalOrdersCount}</div>
          <p className="text-[13px] font-medium text-[#4F806B] flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> 12 new this month
          </p>
        </div>

        {/* Card 3: PENDING ORDERS */}
        <div className="card-admin space-y-2">
          <span className="text-[12px] font-semibold text-[#77716B] uppercase tracking-wider block">
            PENDING ORDERS
          </span>
          <div className="text-[28px] font-bold text-[#242424]">{pendingOrdersCount}</div>
          <p className="text-[13px] font-medium text-[#B9823B]">
            Requires fulfillment
          </p>
        </div>

        {/* Card 4: REVENUE */}
        <div className="card-admin space-y-2">
          <span className="text-[12px] font-semibold text-[#77716B] uppercase tracking-wider block">
            REVENUE
          </span>
          <div className="text-[28px] font-bold text-[#242424]">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-[13px] font-medium text-[#4F806B] flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +15.4% this month
          </p>
        </div>

      </div>

      {/* 2-COLUMN LAYOUT: LEFT SALES OVERVIEW, RIGHT LOW STOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: SALES OVERVIEW (2 Cols) */}
        <div className="lg:col-span-2 card-admin space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E0D9] pb-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#242424]">Sales Overview</h2>
              <p className="text-[13px] text-[#77716B]">Monthly revenue trends and order growth</p>
            </div>
            
            {/* Timeframe selector pills */}
            <div className="flex items-center bg-[#F7F5F1] p-1 rounded border border-[#E5E0D9]">
              {['7D', '30D', '3M', '1Y'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSalesTimeframe(tf)}
                  className={`px-3 py-1 text-[12px] font-medium rounded transition-all cursor-pointer ${
                    salesTimeframe === tf 
                      ? 'bg-[#1E2D29] text-white' 
                      : 'text-[#77716B] hover:text-[#242424]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Minimal Bar Chart */}
          <div className="pt-2 pb-1">
            <div className="h-44 flex items-end gap-6 sm:gap-10 px-4 border-b border-[#E5E0D9]">
              {currentChart.map((item, idx) => {
                const heightPercent = Math.round((item.sales / maxSaleVal) * 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E2D29] text-white text-[11px] py-0.5 px-2 rounded font-medium whitespace-nowrap">
                      ₹{item.sales.toLocaleString('en-IN')}
                    </div>
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-[#1E2D29] hover:bg-[#9A6863] transition-colors rounded-t cursor-pointer min-h-[12px]"
                    />
                    <span className="text-[12px] font-medium text-[#77716B] mt-1">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Orders Table inside Sales Overview */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[14px] font-semibold text-[#242424]">Recent Orders</h3>
              <button 
                onClick={() => navigate('/admin/orders')}
                className="text-[13px] font-medium text-[#9A6863] hover:underline"
              >
                View all orders &rarr;
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] text-[#242424]">
                <thead className="bg-[#F7F5F1] text-[12px] font-medium text-[#77716B] uppercase tracking-[0.05em] border-b border-[#E5E0D9]">
                  <tr>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D9]">
                  {orders.slice(0, 4).map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAF8F5] h-[52px]">
                      <td className="py-2 px-3 font-mono font-medium text-[#1E2D29]">{o.id}</td>
                      <td className="py-2 px-3">{o.customerName || 'Customer'}</td>
                      <td className="py-2 px-3 font-semibold">₹{(o.totalAmount || 3499).toLocaleString('en-IN')}</td>
                      <td className="py-2 px-3">{renderStatusBadge(o.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: LOW STOCK (1 Col) */}
        <div className="card-admin space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-[#E5E0D9] pb-4 mb-4">
              <h2 className="text-[18px] font-bold text-[#242424]">Low Stock Alert</h2>
              <p className="text-[13px] text-[#77716B]">Items running low in warehouse</p>
            </div>

            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded border border-[#E5E0D9] bg-[#FAF8F5]">
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={p.images?.[0] || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                      alt={p.name} 
                      className="w-[48px] h-[60px] object-cover rounded border border-[#E5E0D9]"
                    />
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-[#242424] truncate">{p.name}</p>
                      <span className="text-[12px] font-medium text-[#B9823B] block mt-0.5">
                        Only {p.stock} remaining
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E0D9]">
            <button
              onClick={() => navigate('/admin/inventory')}
              className="w-full btn-admin-primary"
            >
              Manage Inventory
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
