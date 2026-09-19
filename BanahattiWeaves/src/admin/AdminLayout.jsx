import React, { useState } from 'react';
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
  ChevronDown, 
  User, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  const notifications = [
    { id: 1, text: 'New order #BW1005 placed by Ananya', time: '10 min ago', unread: true },
    { id: 2, text: 'Low stock alert: Banahatti Purple Saree (2 left)', time: '45 min ago', unread: true },
    { id: 3, text: 'New customer registered: Priya Deshmukh', time: '2 hours ago', unread: false },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Generate breadcrumb text based on current location
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('/sarees/add')) return 'Dashboard / Sarees / Add Saree';
    if (path.includes('/sarees/edit')) return 'Dashboard / Sarees / Edit Saree';
    if (path.includes('/sarees')) return 'Dashboard / Sarees';
    if (path.includes('/categories')) return 'Dashboard / Categories';
    if (path.includes('/orders')) return 'Dashboard / Orders';
    if (path.includes('/customers')) return 'Dashboard / Customers';
    if (path.includes('/inventory')) return 'Dashboard / Inventory';
    if (path.includes('/messages')) return 'Dashboard / Messages';
    if (path.includes('/settings')) return 'Dashboard / Settings';
    return 'Dashboard';
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/sarees/add')) return 'Add New Saree';
    if (path.includes('/sarees/edit')) return 'Edit Saree';
    if (path.includes('/sarees')) return 'Sarees Management';
    if (path.includes('/categories')) return 'Product Categories';
    if (path.includes('/orders')) return 'Store Orders';
    if (path.includes('/customers')) return 'Customer Directory';
    if (path.includes('/inventory')) return 'Inventory Stock';
    if (path.includes('/messages')) return 'Customer Messages';
    if (path.includes('/settings')) return 'Store Settings';
    return 'Store Dashboard';
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#242424] font-sans flex flex-col md:flex-row antialiased">
      
      {/* MOBILE DRAWER BACKDROP */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* LEFT SIDEBAR (Desktop 250px, Mobile Drawer) */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-[250px] bg-[#1F2926] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[#1F2926] ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-6 border-b border-[#2D3C38] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#9A6863] flex items-center justify-center font-serif text-white font-bold text-lg shadow-xs">
                B
              </div>
              <div>
                <h1 className="font-serif text-sm font-semibold tracking-wider text-white uppercase">
                  Banahatti Weaves
                </h1>
                <p className="text-[10px] text-[#9A6863] font-medium tracking-widest uppercase mt-0.5">
                  ADMIN PANEL
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden text-[#77716B] hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)] admin-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin/dashboard'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#9A6863] text-white shadow-xs font-semibold'
                        : 'text-[#B0ACA5] hover:bg-[#2A3733] hover:text-white'
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
        <div className="p-4 border-t border-[#2D3C38] space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#B0ACA5] hover:bg-[#2A3733] hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-[#B84A4A] hover:bg-[#B84A4A]/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 md:ml-[250px] flex flex-col min-h-screen">
        
        {/* TOP HEADER */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E5E1DB] px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
          
          {/* Left: Mobile Toggle & Page Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-[#1F2926] p-1.5 rounded-lg border border-[#E5E1DB] hover:bg-[#F7F6F3]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="text-[11px] font-medium text-[#77716B] tracking-wide">
                {getBreadcrumb()}
              </p>
              <h2 className="text-base font-semibold text-[#242424] font-serif tracking-tight">
                {getPageTitle()}
              </h2>
            </div>
          </div>

          {/* Right: Search, Notifications & Profile */}
          <div className="flex items-center gap-3 md:gap-5">
            
            {/* Search Bar */}
            <div className="relative hidden sm:block w-48 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77716B]" />
              <input
                type="text"
                placeholder="Search store..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] placeholder-[#77716B] focus:outline-none focus:border-[#1F2926]"
              />
            </div>

            {/* Notification Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsProfileOpen(false);
                }}
                className="relative p-2 rounded-lg border border-[#E5E1DB] text-[#1F2926] hover:bg-[#F7F6F3] transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#9A6863] rounded-full" />
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E5E1DB] py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-[#E5E1DB] flex justify-between items-center">
                    <span className="text-xs font-semibold text-[#242424]">Notifications</span>
                    <span className="text-[10px] bg-[#9A6863]/10 text-[#9A6863] font-bold px-2 py-0.5 rounded-full">
                      2 Unread
                    </span>
                  </div>
                  <div className="divide-y divide-[#E5E1DB] max-h-64 overflow-y-auto admin-scrollbar">
                    {notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={`p-3 text-xs hover:bg-[#F7F6F3] transition-colors ${n.unread ? 'bg-[#9A6863]/5' : ''}`}
                      >
                        <p className="text-[#242424] font-medium leading-snug">{n.text}</p>
                        <span className="text-[10px] text-[#77716B] mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-[#E5E1DB] text-center">
                    <button 
                      onClick={() => {
                        setIsNotificationOpen(false);
                        navigate('/admin/orders');
                      }}
                      className="text-[11px] font-semibold text-[#9A6863] hover:underline"
                    >
                      View All Orders
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationOpen(false);
                }}
                className="flex items-center gap-2 p-1 md:pr-3 rounded-lg border border-[#E5E1DB] hover:bg-[#F7F6F3] transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-md bg-[#1F2926] text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-[#242424] leading-none">
                    {currentUser?.name || 'Admin'}
                  </p>
                  <p className="text-[10px] text-[#77716B] leading-tight mt-0.5">
                    Administrator
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#77716B] hidden md:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E5E1DB] py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2.5 border-b border-[#E5E1DB]">
                    <p className="text-xs font-semibold text-[#242424]">{currentUser?.name || 'Admin'}</p>
                    <p className="text-[11px] text-[#77716B] truncate">{currentUser?.email || 'admin@banahattiweaves.com'}</p>
                    <span className="inline-block mt-1 text-[9px] font-bold bg-[#3D8065]/10 text-[#3D8065] px-2 py-0.5 rounded">
                      ROLE: {currentUser?.role || 'ADMIN'}
                    </span>
                  </div>
                  <div className="py-1 border-b border-[#E5E1DB]">
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/admin/settings');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#242424] hover:bg-[#F7F6F3] flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-[#77716B]" /> Edit Profile
                    </button>
                    <button 
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/admin/settings');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#242424] hover:bg-[#F7F6F3] flex items-center gap-2"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#77716B]" /> Account Settings
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#B84A4A] hover:bg-[#B84A4A]/10 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* MAIN PAGE OUTLET */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
