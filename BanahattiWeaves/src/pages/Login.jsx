import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, returnUrl, setReturnUrl } = useAuth();

  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      const dest = returnUrl || '/collections';
      setReturnUrl(null);
      navigate(dest);
    } else {
      setErrorMsg(res.error || 'Failed to login. Please check email and password.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-cream/30 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gold-zari/30 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold-zari">
            BANAHATTI WEAVES
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-deep-charcoal">
            WELCOME BACK
          </h2>
          <p className="text-xs text-gray-500">
            Sign in to continue browsing and purchasing handloom sarees.
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
              Email Address
            </label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="uppercase font-bold text-deep-charcoal">
                Password
              </label>
              <button 
                type="button"
                onClick={() => alert('Password reset link sent to your registered email.')}
                className="text-[11px] text-gold-zari hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-crimson hover:bg-gold-zari text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-crimson/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? 'SIGNING IN...' : 'LOGIN'}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="pt-4 border-t border-gray-100 text-center space-y-3">
          <p className="text-xs text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-crimson hover:underline">
              REGISTER
            </Link>
          </p>

          <div className="pt-2">
            <Link 
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gold-zari font-bold underline"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Login Portal
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
