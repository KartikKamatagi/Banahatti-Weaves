import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { X, Lock, Mail } from 'lucide-react';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useAuth();
  const { showToast } = useShop();

  const [email, setEmail] = useState('kartik.gowda@example.com');
  const [password, setPassword] = useState('password123');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    showToast('👋 Welcome back to Banahatti Weaves!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      
      <div className="relative w-full max-w-md bg-[#FDFBF7] dark:bg-[#1E1A17] rounded-3xl border border-[#C69214] shadow-2xl overflow-hidden p-6 space-y-6 text-xs text-[#2C221E] dark:text-[#FDFBF7]">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#8B261D]/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="badge-gi">HANDLOOM MEMBER</span>
            <h3 className="font-heading text-lg font-bold text-[#8B261D] dark:text-[#E5B33A]">
              Member Sign In
            </h3>
          </div>

          <button 
            onClick={() => setIsLoginModalOpen(false)}
            className="p-1 rounded-full hover:bg-black/10 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="font-bold block">Email Address:</label>
            <div className="relative">
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F7F1E5] dark:bg-[#12100E] p-2.5 pl-9 rounded-xl border border-gray-300 dark:border-white/10"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold block">Password:</label>
            <div className="relative">
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F7F1E5] dark:bg-[#12100E] p-2.5 pl-9 rounded-xl border border-gray-300 dark:border-white/10"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#8B261D] to-[#0D4C53] text-white py-3 rounded-2xl font-bold text-xs shadow-md hover:opacity-95 transition-transform active:scale-95"
          >
            Sign In & Access Profile
          </button>

        </form>

        <div className="text-center text-[10px] text-gray-500 pt-2 border-t border-gray-200 dark:border-white/10">
          🔒 Secure authentication • Handloom Artisan Welfare Supported
        </div>

      </div>

    </div>
  );
}
