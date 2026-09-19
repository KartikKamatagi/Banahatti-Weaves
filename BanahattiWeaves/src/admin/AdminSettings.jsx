import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Settings, 
  Store, 
  Truck, 
  ShieldCheck, 
  Save, 
  CheckCircle, 
  User, 
  Lock, 
  CreditCard 
} from 'lucide-react';

export default function AdminSettings() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('STORE');
  const [saveSuccess, setSaveSuccess] = useState('');

  const [storeInfo, setStoreInfo] = useState({
    storeName: 'Banahatti Weaves',
    tagline: 'Authentic Handloom Saree Weavers of Karnataka',
    contactEmail: 'support@banahattiweaves.com',
    contactPhone: '+91 98450 12345',
    address: 'Main Weavers Guild Road, Banahatti, Rabkavi Banhatti, Bagalkot, Karnataka - 587311',
    gstin: '29AAAAA0000A1Z5',
    weaverRegId: 'HW-KA-BAG-2024-88'
  });

  const [shippingInfo, setShippingInfo] = useState({
    shippingFee: 0,
    freeShippingThreshold: 1999,
    taxPercentage: 5,
    enableCOD: true,
    enableRazorpay: true
  });

  const [accountInfo, setAccountInfo] = useState({
    name: currentUser?.name || 'Kartik Kamatagi',
    email: currentUser?.email || 'admin@banahattiweaves.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveStore = (e) => {
    e.preventDefault();
    setSaveSuccess('Store Settings saved successfully!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSaveShipping = (e) => {
    e.preventDefault();
    setSaveSuccess('Delivery & Tax Settings saved successfully!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (accountInfo.newPassword && accountInfo.newPassword !== accountInfo.confirmPassword) {
      alert('New Passwords do not match!');
      return;
    }
    setSaveSuccess('Admin Profile & Credentials updated successfully!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  return (
    <div className="space-y-6 font-sans max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#242424]">Store Settings</h1>
          <p className="text-xs text-[#77716B] mt-0.5">Manage store profile, tax configuration, shipping parameters, and admin security</p>
        </div>
      </div>

      {/* Toast Notification */}
      {saveSuccess && (
        <div className="p-4 bg-[#3D8065]/10 border border-[#3D8065]/30 text-[#3D8065] rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#E5E1DB] space-x-4">
        <button
          onClick={() => setActiveTab('STORE')}
          className={`pb-3 text-xs font-semibold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'STORE'
              ? 'border-[#9A6863] text-[#9A6863]'
              : 'border-transparent text-[#77716B] hover:text-[#242424]'
          }`}
        >
          <Store className="w-4 h-4" /> Store Information
        </button>

        <button
          onClick={() => setActiveTab('SHIPPING')}
          className={`pb-3 text-xs font-semibold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'SHIPPING'
              ? 'border-[#9A6863] text-[#9A6863]'
              : 'border-transparent text-[#77716B] hover:text-[#242424]'
          }`}
        >
          <Truck className="w-4 h-4" /> Shipping & Taxes
        </button>

        <button
          onClick={() => setActiveTab('ACCOUNT')}
          className={`pb-3 text-xs font-semibold flex items-center gap-2 transition-all border-b-2 ${
            activeTab === 'ACCOUNT'
              ? 'border-[#9A6863] text-[#9A6863]'
              : 'border-transparent text-[#77716B] hover:text-[#242424]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Admin Account
        </button>
      </div>

      {/* STORE INFORMATION FORM */}
      {activeTab === 'STORE' && (
        <form onSubmit={handleSaveStore} className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs space-y-4">
          <h2 className="font-serif text-base font-bold text-[#242424] border-b border-[#E5E1DB] pb-3">
            Business & Handloom Registration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">STORE BRAND NAME</label>
              <input
                type="text"
                value={storeInfo.storeName}
                onChange={(e) => setStoreInfo({ ...storeInfo, storeName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">BRAND TAGLINE</label>
              <input
                type="text"
                value={storeInfo.tagline}
                onChange={(e) => setStoreInfo({ ...storeInfo, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">SUPPORT EMAIL</label>
              <input
                type="email"
                value={storeInfo.contactEmail}
                onChange={(e) => setStoreInfo({ ...storeInfo, contactEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">SUPPORT PHONE</label>
              <input
                type="text"
                value={storeInfo.contactPhone}
                onChange={(e) => setStoreInfo({ ...storeInfo, contactPhone: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">GSTIN REGISTRATION NUMBER</label>
              <input
                type="text"
                value={storeInfo.gstin}
                onChange={(e) => setStoreInfo({ ...storeInfo, gstin: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg font-mono text-[#242424]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">WEAVER GUILD LICENCE ID</label>
              <input
                type="text"
                value={storeInfo.weaverRegId}
                onChange={(e) => setStoreInfo({ ...storeInfo, weaverRegId: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg font-mono text-[#242424]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#77716B] mb-1">WAREHOUSE / STUDIO ADDRESS</label>
              <textarea
                rows="2"
                value={storeInfo.address}
                onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                className="w-full p-3 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E5E1DB]">
            <button
              type="submit"
              className="px-5 py-2 bg-[#1F2926] text-white rounded-lg text-xs font-semibold hover:bg-[#2A3733] flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE STORE INFO</span>
            </button>
          </div>
        </form>
      )}

      {/* SHIPPING & TAXES FORM */}
      {activeTab === 'SHIPPING' && (
        <form onSubmit={handleSaveShipping} className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs space-y-4">
          <h2 className="font-serif text-base font-bold text-[#242424] border-b border-[#E5E1DB] pb-3">
            Shipping & Payment Gateway Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">STANDARD SHIPPING CHARGE (₹)</label>
              <input
                type="number"
                value={shippingInfo.shippingFee}
                onChange={(e) => setShippingInfo({ ...shippingInfo, shippingFee: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">FREE SHIPPING MINIMUM ORDER (₹)</label>
              <input
                type="number"
                value={shippingInfo.freeShippingThreshold}
                onChange={(e) => setShippingInfo({ ...shippingInfo, freeShippingThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">HANDLOOM GST TAX RATE (%)</label>
              <input
                type="number"
                value={shippingInfo.taxPercentage}
                onChange={(e) => setShippingInfo({ ...shippingInfo, taxPercentage: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <span className="text-[11px] font-semibold text-[#77716B] uppercase tracking-wider block">
              PAYMENT METHOD SWITCHES
            </span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#242424] cursor-pointer">
                <input
                  type="checkbox"
                  checked={shippingInfo.enableCOD}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, enableCOD: e.target.checked })}
                  className="w-4 h-4 accent-[#1F2926]"
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#242424] cursor-pointer">
                <input
                  type="checkbox"
                  checked={shippingInfo.enableRazorpay}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, enableRazorpay: e.target.checked })}
                  className="w-4 h-4 accent-[#1F2926]"
                />
                Razorpay / UPI / Cards
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E5E1DB]">
            <button
              type="submit"
              className="px-5 py-2 bg-[#1F2926] text-white rounded-lg text-xs font-semibold hover:bg-[#2A3733] flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE CONFIGURATION</span>
            </button>
          </div>
        </form>
      )}

      {/* ADMIN ACCOUNT FORM */}
      {activeTab === 'ACCOUNT' && (
        <form onSubmit={handleSaveAccount} className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs space-y-4">
          <h2 className="font-serif text-base font-bold text-[#242424] border-b border-[#E5E1DB] pb-3">
            Administrator Credentials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">ADMIN FULL NAME</label>
              <input
                type="text"
                value={accountInfo.name}
                onChange={(e) => setAccountInfo({ ...accountInfo, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">ADMIN LOGIN EMAIL</label>
              <input
                type="email"
                value={accountInfo.email}
                onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">NEW PASSWORD (OPTIONAL)</label>
              <input
                type="password"
                placeholder="Leave blank to keep unchanged"
                value={accountInfo.newPassword}
                onChange={(e) => setAccountInfo({ ...accountInfo, newPassword: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">CONFIRM NEW PASSWORD</label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={accountInfo.confirmPassword}
                onChange={(e) => setAccountInfo({ ...accountInfo, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E5E1DB]">
            <button
              type="submit"
              className="px-5 py-2 bg-[#1F2926] text-white rounded-lg text-xs font-semibold hover:bg-[#2A3733] flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>UPDATE PROFILE</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
