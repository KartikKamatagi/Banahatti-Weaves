import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Package, LogOut, Edit2, ShieldCheck, Check } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || 'Handloom Customer',
    email: currentUser?.email || 'customer@example.com',
    phone: currentUser?.phone || '+91 98765 43210'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Page Title */}
      <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-deep-charcoal">
            My Account Profile
          </h1>
          <p className="text-xs text-gray-500">
            Manage your personal profile and account settings.
          </p>
        </div>

        <span className="badge-gi flex items-center gap-1 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-zari" /> Verified Handloom Customer
        </span>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gold-zari/30 shadow-lg space-y-6">
        
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-16 h-16 rounded-full bg-crimson text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            {profileData.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-deep-charcoal">{profileData.name}</h2>
            <p className="text-xs text-gold-zari font-semibold uppercase tracking-wider">Banahatti Member</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block uppercase font-bold text-deep-charcoal mb-1">Full Name</label>
              <input 
                type="text" 
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
            </div>

            <div>
              <label className="block uppercase font-bold text-deep-charcoal mb-1">Email</label>
              <input 
                type="email" 
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
            </div>

            <div>
              <label className="block uppercase font-bold text-deep-charcoal mb-1">Phone</label>
              <input 
                type="text" 
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="submit"
                className="bg-crimson text-white px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs"
              >
                Save Changes
              </button>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-xs text-deep-charcoal">
            <div className="flex items-center gap-3 p-3 bg-cream/50 rounded-xl border border-gold-zari/20">
              <User className="w-4 h-4 text-crimson" />
              <div>
                <span className="text-[10px] uppercase text-gray-400 font-bold block">Full Name</span>
                <span className="font-semibold text-sm">{profileData.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-cream/50 rounded-xl border border-gold-zari/20">
              <Mail className="w-4 h-4 text-crimson" />
              <div>
                <span className="text-[10px] uppercase text-gray-400 font-bold block">Email Address</span>
                <span className="font-semibold text-sm">{profileData.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-cream/50 rounded-xl border border-gold-zari/20">
              <Phone className="w-4 h-4 text-crimson" />
              <div>
                <span className="text-[10px] uppercase text-gray-400 font-bold block">Phone Number</span>
                <span className="font-semibold text-sm">{profileData.phone}</span>
              </div>
            </div>
          </div>
        )}

        {/* Buttons: Edit Profile, My Orders, Logout */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white border border-gray-300 hover:border-crimson text-deep-charcoal px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
          >
            <Edit2 className="w-4 h-4 text-gold-zari" />
            <span>Edit Profile</span>
          </button>

          <Link
            to="/orders"
            className="bg-crimson hover:bg-gold-zari text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md"
          >
            <Package className="w-4 h-4" />
            <span>My Orders</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors ml-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </div>

    </div>
  );
}
