import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
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
  ExternalLink 
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
    if (path.includes('/sarees')) return 'Sarees';
    if (path.includes('/categories')) return 'Categories';
    if (path.includes('/orders')) return 'Orders';
    if (path.includes('/customers')) return 'Customers';
    if (path.includes('/inventory')) return 'Inventory';
    if (path.includes('/messages')) return 'Messages';
    if (path.includes('/settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#242424] font-sans flex flex-col md:flex-row antialiased">
      
      {/* MOBILE DRAWER BACKDROP */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* LEFT SIDEBAR (Desktop 240px, Mobile Drawer) */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-[240px] bg-[#1E2D29] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#1E2D29] ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#2A3B37] flex items-center justify-between">
            <div>
              <h1 className="font-serif text-base font-bold tracking-wider text-white uppercase leading-tight">
                BANAHATTI WEAVES
              </h1>
              <p className="text-[10px] text-[#9A6863] font-semibold tracking-widest uppercase mt-0.5">
                ADMIN PANEL
              </p>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden text-[#B0ACA8] hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items (44-48px height each) */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)] admin-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin/dashboard'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3.5 h-[46px] rounded-md text-[14px] font-medium transition-all ${
                      isActive
                        ? 'bg-[#9A6863]/20 text-white font-semibold before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:bg-[#9A6863] before:rounded-r'
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
        <div className="p-4 border-t border-[#2A3B37] space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3.5 h-[42px] rounded-md text-[13px] font-medium text-[#B0ACA8] hover:bg-[#283834] hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 h-[42px] rounded-md text-[13px] font-medium text-[#B45454] hover:bg-[#B45454]/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen">
        
        {/* TOP HEADER (Height: 72px) */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E5E0D9] h-[72px] px-6 md:px-10 flex items-center justify-between">
          
          {/* Left: Mobile Drawer Button & Page Title (28px) */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-[#1E2D29] p-1.5 rounded border border-[#E5E0D9] hover:bg-[#F7F5F1]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-[28px] font-bold text-[#242424] font-sans tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right: Search Icon, Notification Icon, Admin Avatar & Name */}
          <div className="flex items-center gap-4">
            
            {/* Search Icon */}
            <button className="p-2 text-[#77716B] hover:text-[#242424] rounded-md hover:bg-[#F7F5F1] transition-colors">
              <Search className="w-4 h-4" />
            </button>

            {/* Notification Icon */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-[#77716B] hover:text-[#242424] rounded-md hover:bg-[#F7F5F1] transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#9A6863] rounded-full" />
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-[#E5E0D9] py-2 z-50 animate-fade-in text-xs">
                  <div className="px-4 py-2 border-b border-[#E5E0D9] font-semibold text-[#242424]">
                    Notifications
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
              <div className="w-8 h-8 rounded-full bg-[#1E2D29] text-white flex items-center justify-center font-bold text-xs">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <span className="hidden sm:inline-block text-[14px] font-medium text-[#242424]">
                {currentUser?.name || 'Kartik Kamatagi'}
              </span>
            </div>

          </div>

        </header>

        {/* MAIN CONTENT (Max Width 1400px, Padding 32px 40px) */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:px-[40px] md:py-[32px]">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
