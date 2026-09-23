import React, { useState } from 'react';
import './admin.css';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Receipt, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  AlertTriangle
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
        <span className="badge-admin badge-admin-delivered">
          {status}
        </span>
      );
    }
    if (norm === 'shipped') {
      return (
        <span className="badge-admin badge-admin-shipped">
          Shipped
        </span>
      );
    }
    if (norm === 'cancelled') {
      return (
        <span className="badge-admin badge-admin-cancelled">
          Cancelled
        </span>
      );
    }
    return (
      <span className="badge-admin badge-admin-pending">
        Pending
      </span>
    );
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Subtitle */}
      <div>
        <p className="text-[14px] text-[#77716B]">
          Overview & analytics for Banahatti Weaves saree store.
        </p>
      </div>

      {/* 4 STATISTICS CARDS IN ONE ROW ON DESKTOP */}
      <div className="dashboard-stat-grid">
        
        {/* Card 1: TOTAL SAREES */}
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <span className="dashboard-stat-label">TOTAL SAREES</span>
            <div className="dashboard-stat-icon">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="dashboard-stat-value">{totalSareesCount}</div>
          <p className="dashboard-stat-trend positive">
            <ArrowUpRight className="w-4 h-4" /> 4 new this month
          </p>
        </div>

        {/* Card 2: TOTAL ORDERS */}
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <span className="dashboard-stat-label">TOTAL ORDERS</span>
            <div className="dashboard-stat-icon">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="dashboard-stat-value">{totalOrdersCount}</div>
          <p className="dashboard-stat-trend positive">
            <ArrowUpRight className="w-4 h-4" /> 12 new this month
          </p>
        </div>

        {/* Card 3: PENDING ORDERS */}
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <span className="dashboard-stat-label">PENDING ORDERS</span>
            <div className="dashboard-stat-icon">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="dashboard-stat-value">{pendingOrdersCount}</div>
          <p className="dashboard-stat-trend warning">
            Requires fulfillment
          </p>
        </div>

        {/* Card 4: REVENUE */}
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-header">
            <span className="dashboard-stat-label">REVENUE</span>
            <div className="dashboard-stat-icon">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="dashboard-stat-value">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <p className="dashboard-stat-trend positive">
            <ArrowUpRight className="w-4 h-4" /> +15.4% this month
          </p>
        </div>

      </div>

      {/* 2-COLUMN LAYOUT: LEFT SALES OVERVIEW, RIGHT LOW STOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: SALES OVERVIEW (2 Cols) */}
        <div className="lg:col-span-2 sales-chart-wrapper space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E0D9] pb-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#242424]">Sales Overview</h2>
              <p className="text-[13px] text-[#77716B]">Monthly revenue trends and order growth</p>
            </div>
            
            {/* Timeframe selector pills */}
            <div className="timeframe-pill-container">
              {['7D', '30D', '3M', '1Y'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSalesTimeframe(tf)}
                  className={`timeframe-pill ${salesTimeframe === tf ? 'active' : ''}`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Minimal Bar Chart */}
          <div className="pt-2 pb-1">
            <div className="chart-bar-container">
              {currentChart.map((item, idx) => {
                const heightPercent = Math.round((item.sales / maxSaleVal) * 100);
                return (
                  <div key={idx} className="chart-bar-column group">
                    <div className="chart-bar-tooltip">
                      ₹{item.sales.toLocaleString('en-IN')}
                    </div>
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className="chart-bar-fill"
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
                className="text-[13px] font-medium text-[#8C3E43] hover:underline"
              >
                View all orders &rarr;
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 4).map((o) => (
                    <tr key={o.id}>
                      <td className="font-mono font-medium text-[#1E2D29]">#{o.id}</td>
                      <td>{o.customerName || 'Customer'}</td>
                      <td className="font-semibold">₹{(o.totalAmount || 3499).toLocaleString('en-IN')}</td>
                      <td>{renderStatusBadge(o.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: LOW STOCK (1 Col) */}
        <div className="low-stock-card space-y-4">
          <div>
            <div className="border-b border-[#E5E0D9] pb-4 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-bold text-[#242424]">Low Stock Alert</h2>
                <p className="text-[13px] text-[#77716B]">Items running low in warehouse</p>
              </div>
              <AlertTriangle className="w-5 h-5 text-[#B9823B]" />
            </div>

            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="low-stock-item">
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={p.images?.[0] || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                      alt={p.name} 
                      className="saree-thumb-48x60"
                    />
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-[#242424] truncate">{p.name}</p>
                      <span className="low-stock-badge mt-0.5 inline-block">
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
