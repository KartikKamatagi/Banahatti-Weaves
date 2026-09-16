import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  Package, 
  LogOut, 
  Store, 
  ShieldCheck, 
  User 
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-deep-charcoal text-white flex flex-col justify-between border-r border-gold-zari/20 shadow-xl flex-shrink-0">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-gray-800">
            <Link to="/admin/dashboard" className="flex flex-col">
              <span className="font-serif text-xl font-extrabold text-cream tracking-wide">
                BANAHATTI <span className="text-gold-zari">ADMIN</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-0.5">
                Store Control Portal
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-bold uppercase tracking-wider">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-crimson text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4 text-gold-zari" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/sarees"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-crimson text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <ShoppingBag className="w-4 h-4 text-gold-zari" />
              <span>Sarees</span>
            </NavLink>

            <NavLink
              to="/admin/sarees/add"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-crimson text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <PlusCircle className="w-4 h-4 text-gold-zari" />
              <span>Add Saree</span>
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-crimson text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Package className="w-4 h-4 text-gold-zari" />
              <span>Orders</span>
            </NavLink>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 hover:bg-gold-zari hover:text-black text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider"
          >
            <Store className="w-4 h-4" />
            <span>View Customer Store</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-900/40 hover:bg-red-700 text-red-200 text-xs font-bold rounded-xl transition-all uppercase tracking-wider"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* Admin Content Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Admin Authentication Session Active</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="w-8 h-8 rounded-full bg-crimson text-white flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <strong className="block font-bold text-deep-charcoal text-xs">{currentUser?.name || 'Admin'}</strong>
              <span className="text-[10px] text-gold-zari font-bold uppercase">Store Owner</span>
            </div>
          </div>
        </header>

        {/* Dynamic Admin Page Outlet */}
        <main className="p-6 lg:p-8 flex-1">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
