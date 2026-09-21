import React, { useState } from 'react';
import './admin.css';
import './AdminSettings.css';
import { useAuth } from '../context/AuthContext';
import { 
  Store, 
  Truck, 
  ShieldCheck, 
  CheckCircle 
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
    address: 'Main Weavers Guild Road, Banahatti, Bagalkot, Karnataka - 587311',
    gstin: '29AAAAA0000A1Z5'
  });

  const [shippingInfo, setShippingInfo] = useState({
    shippingFee: 0,
    freeShippingThreshold: 1999,
    taxPercentage: 5,
    enableCOD: true
  });

  const [accountInfo, setAccountInfo] = useState({
    name: currentUser?.name || 'Kartik Kamatagi',
    email: currentUser?.email || 'admin@banahattiweaves.com',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveStore = (e) => {
    e.preventDefault();
    setSaveSuccess('Store Information saved.');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSaveShipping = (e) => {
    e.preventDefault();
    setSaveSuccess('Order Settings saved.');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    setSaveSuccess('Account Profile updated.');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast Notification */}
      {saveSuccess && (
        <div className="p-3 bg-[#E8F2ED] border border-[#4F806B]/30 text-[#4F806B] rounded text-[13px] font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* LEFT SETTINGS NAV & RIGHT SETTINGS FORM LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* LEFT: SETTINGS NAVIGATION */}
        <div className="card-admin p-3 h-fit space-y-1">
          <button
            onClick={() => setActiveTab('STORE')}
            className={`w-full text-left px-3.5 h-[42px] rounded text-[14px] font-medium transition-all flex items-center gap-3 ${
              activeTab === 'STORE'
                ? 'bg-[#1E2D29] text-white font-semibold'
                : 'text-[#77716B] hover:bg-[#FAF8F5] hover:text-[#242424]'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Store Information</span>
          </button>

          <button
            onClick={() => setActiveTab('SHIPPING')}
            className={`w-full text-left px-3.5 h-[42px] rounded text-[14px] font-medium transition-all flex items-center gap-3 ${
              activeTab === 'SHIPPING'
                ? 'bg-[#1E2D29] text-white font-semibold'
                : 'text-[#77716B] hover:bg-[#FAF8F5] hover:text-[#242424]'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Order Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('ACCOUNT')}
            className={`w-full text-left px-3.5 h-[42px] rounded text-[14px] font-medium transition-all flex items-center gap-3 ${
              activeTab === 'ACCOUNT'
                ? 'bg-[#1E2D29] text-white font-semibold'
                : 'text-[#77716B] hover:bg-[#FAF8F5] hover:text-[#242424]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Account</span>
          </button>
        </div>

        {/* RIGHT: SETTINGS FORM */}
        <div className="md:col-span-3">
          
          {/* STORE INFORMATION FORM */}
          {activeTab === 'STORE' && (
            <form onSubmit={handleSaveStore} className="card-admin space-y-4">
              <h2 className="text-[18px] font-bold text-[#242424] border-b border-[#E5E0D9] pb-3">
                Store Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">Store Name</label>
                  <input
                    type="text"
                    value={storeInfo.storeName}
                    onChange={(e) => setStoreInfo({ ...storeInfo, storeName: e.target.value })}
                    className="input-admin w-full"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={storeInfo.tagline}
                    onChange={(e) => setStoreInfo({ ...storeInfo, tagline: e.target.value })}
                    className="input-admin w-full"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={storeInfo.contactEmail}
                    onChange={(e) => setStoreInfo({ ...storeInfo, contactEmail: e.target.value })}
                    className="input-admin w-full"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={storeInfo.contactPhone}
                    onChange={(e) => setStoreInfo({ ...storeInfo, contactPhone: e.target.value })}
                    className="input-admin w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={storeInfo.gstin}
                    onChange={(e) => setStoreInfo({ ...storeInfo, gstin: e.target.value })}
                    className="input-admin w-full font-mono"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">Studio Address</label>
                  <textarea
                    rows="2"
                    value={storeInfo.address}
                    onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                    className="textarea-admin w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E5E0D9]">
                <button type="submit" className="btn-admin-primary">
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* ORDER SETTINGS FORM */}
          {activeTab === 'SHIPPING' && (
            <form onSubmit={handleSaveShipping} className="card-admin space-y-4">
              <h2 className="text-[18px] font-bold text-[#242424] border-b border-[#E5E0D9] pb-3">
                Order Settings
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">Standard Shipping Fee (₹)</label>
                  <input
                    type="number"
                    value={shippingInfo.shippingFee}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, shippingFee: Number(e.target.value) })}
                    className="input-admin w-full"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">Free Shipping Minimum (₹)</label>
                  <input
                    type="number"
                    value={shippingInfo.freeShippingThreshold}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, freeShippingThreshold: Number(e.target.value) })}
                    className="input-admin w-full"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">GST Tax Rate (%)</label>
                  <input
                    type="number"
                    value={shippingInfo.taxPercentage}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, taxPercentage: Number(e.target.value) })}
                    className="input-admin w-full"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-[14px] font-medium text-[#242424] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shippingInfo.enableCOD}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, enableCOD: e.target.checked })}
                    className="w-4 h-4 accent-[#1E2D29]"
                  />
                  Enable Cash on Delivery (COD)
                </label>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E5E0D9]">
                <button type="submit" className="btn-admin-primary">
                  Save Order Settings
                </button>
              </div>
            </form>
          )}

          {/* ACCOUNT FORM */}
          {activeTab === 'ACCOUNT' && (
            <form onSubmit={handleSaveAccount} className="card-admin space-y-4">
              <h2 className="text-[18px] font-bold text-[#242424] border-b border-[#E5E0D9] pb-3">
                Account Profile
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">Admin Full Name</label>
                  <input
                    type="text"
                    value={accountInfo.name}
                    onChange={(e) => setAccountInfo({ ...accountInfo, name: e.target.value })}
                    className="input-admin w-full"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">Admin Email</label>
                  <input
                    type="email"
                    value={accountInfo.email}
                    onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
                    className="input-admin w-full"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current"
                    value={accountInfo.newPassword}
                    onChange={(e) => setAccountInfo({ ...accountInfo, newPassword: e.target.value })}
                    className="input-admin w-full"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#242424] mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={accountInfo.confirmPassword}
                    onChange={(e) => setAccountInfo({ ...accountInfo, confirmPassword: e.target.value })}
                    className="input-admin w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E5E0D9]">
                <button type="submit" className="btn-admin-primary">
                  Update Account
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
