import React, { useState } from 'react';
import './admin.css';
import './AdminLayout.css';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  FolderTree,
  Receipt, 
  Users, 
  Package, 
  Mail, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Bell, 
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Sarees', path: '/admin/sarees', icon: ShoppingBag },
    { label: 'Add Saree', path: '/admin/sarees/add', icon: PlusCircle },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Orders', path: '/admin/orders', icon: Receipt },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Inventory', path: '/admin/inventory', icon: Package },
    { label: 'Messages', path: '/admin/messages', icon: Mail },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/sarees/add')) return 'Add New Saree';
    if (path.includes('/sarees/edit')) return 'Edit Saree';
    if (path.includes('/sarees')) return 'Sarees Inventory';
    if (path.includes('/categories')) return 'Product Categories';
    if (path.includes('/orders')) return 'Customer Orders';
    if (path.includes('/customers')) return 'Customer Management';
    if (path.includes('/inventory')) return 'Warehouse Inventory';
    if (path.includes('/messages')) return 'Customer Messages';
    if (path.includes('/settings')) return 'Store Settings';
    return 'Store Overview';
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#242424] font-sans antialiased">
      
      {/* MOBILE DRAWER BACKDROP (z-30) */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-xs"
        />
      )}

      {/* LEFT SIDEBAR (Desktop 240px, z-40) */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 w-[240px] bg-[#1E2D29] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#172320] shadow-xl ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header with Professional Logo Icon */}
          <div className="p-5 border-b border-[#2A3B37] flex items-center justify-between bg-[#162320]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8C3E43] to-[#9A6863] text-[#D8C38A] flex items-center justify-center shadow-md border border-[#D8C38A]/40 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-serif text-sm font-bold tracking-wider text-white uppercase leading-tight">
                  BANAHATTI
                </h1>
                <p className="text-[10px] text-[#D8C38A] font-semibold tracking-widest uppercase mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#D8C38A]" /> ADMIN PANEL
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden text-[#B0ACA8] hover:text-white p-1 rounded-md hover:bg-[#243430]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-190px)] admin-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin/dashboard'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3.5 h-[46px] rounded-lg text-[14px] font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#8C3E43] to-[#9A6863] text-white font-semibold shadow-md border-l-4 border-[#D8C38A]'
                        : 'text-[#B0ACA8] hover:bg-[#283834] hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-[#2A3B37] bg-[#162320] space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3.5 h-[42px] rounded-lg text-[13px] font-medium text-[#B0ACA8] hover:bg-[#283834] hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 h-[42px] rounded-lg text-[13px] font-bold text-[#E57373] hover:bg-[#B45454]/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN LAYOUT WRAPPER (Padded left 240px on desktop) */}
      <div className="md:pl-[240px] flex flex-col min-h-screen w-full">
        
        {/* TOP HEADER (Height: 72px, z-20) */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#E5E0D9] h-[72px] px-6 md:px-10 flex items-center justify-between w-full shadow-xs">
          
          {/* Left: Mobile Drawer Button & Page Title (28px) */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-[#1E2D29] p-2 rounded-lg border border-[#DCD6CE] hover:bg-[#F7F5F1] bg-white shadow-2xs cursor-pointer"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-[#1E2D29]" />
            </button>
            <h1 className="text-[26px] font-bold text-[#242424] font-sans tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right: Search Icon, Notification Icon, Admin Avatar & Name */}
          <div className="flex items-center gap-4">
            
            {/* Notification Icon */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2.5 text-[#77716B] hover:text-[#242424] rounded-lg hover:bg-[#F7F5F1] transition-colors cursor-pointer border border-[#E5E0D9] bg-white shadow-2xs"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8C3E43] rounded-full border border-white" />
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-[#E5E0D9] py-2 z-30 animate-fade-in text-xs">
                  <div className="px-4 py-2 border-b border-[#E5E0D9] font-semibold text-[#242424] flex items-center justify-between">
                    <span>Notifications</span>
                    <span className="text-[10px] bg-[#8C3E43] text-white px-2 py-0.5 rounded-full font-bold">1 New</span>
                  </div>
                  <div className="p-3 text-[#77716B] space-y-2">
                    <p className="text-[#242424] font-medium">New order #BW1005 placed by Ananya</p>
                    <p className="text-[11px] text-[#77716B]">10 minutes ago</p>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Avatar & Name */}
            <div className="flex items-center gap-3 border-l border-[#E5E0D9] pl-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E2D29] to-[#283834] text-[#D8C38A] flex items-center justify-center font-bold text-sm shadow-sm border border-[#1E2D29]">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <span className="hidden sm:inline-block text-[14px] font-semibold text-[#242424]">
                {currentUser?.name || 'Kartik Kamatagi'}
              </span>
            </div>

          </div>

        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:px-[40px] md:py-[32px]">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
