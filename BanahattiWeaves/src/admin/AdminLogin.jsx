import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, loginAsAdmin } = useAuth();

  const [email, setEmail] = useState('admin@banahattiweaves.com');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success && res.user.role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else {
      setErrorMsg('Invalid admin credentials. (Try demo admin button below)');
    }
  };

  const handleDemoAdmin = () => {
    loginAsAdmin();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-charcoal px-4 py-12 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gold-zari shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-crimson/10 text-crimson flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-extrabold text-deep-charcoal">
            ADMIN PORTAL
          </h2>
          <p className="text-xs text-gray-500">
            Banahatti Weaves Store Management System
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Admin Email
            </label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Password
            </label>
            <div className="relative">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-crimson hover:bg-gold-zari text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? 'VERIFYING...' : 'LOGIN TO DASHBOARD'}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* 1-Click Demo Admin Button for effortless testing */}
        <div className="pt-4 border-t border-gray-100 text-center space-y-3">
          <p className="text-[11px] text-gray-400">Default Demo Credentials: admin@banahattiweaves.com / admin123</p>
          <button
            onClick={handleDemoAdmin}
            className="w-full bg-gold-zari/15 hover:bg-gold-zari text-gold-zari hover:text-black font-bold text-xs py-2.5 rounded-xl border border-gold-zari/40 transition-colors uppercase tracking-wider"
          >
            ⚡ 1-Click Quick Admin Demo Login
          </button>
        </div>

      </div>
    </div>
  );
}
