import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, UserCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginAsAdmin, returnUrl, setReturnUrl } = useAuth();

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

  const handleDemoCustomer = async () => {
    setIsLoading(true);
    const res = await login('customer@example.com', 'password123');
    setIsLoading(false);
    if (res.success) {
      const dest = returnUrl || '/collections';
      setReturnUrl(null);
      navigate(dest);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-[#FAF8F5] font-sans">
      <div className="w-full max-w-[420px] bg-white p-[40px] border border-[#E5DED7] shadow-sm space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-1">
          <h2 className="font-serif text-3xl font-normal text-[#252525]">
            WELCOME BACK
          </h2>
          <p className="text-xs text-[#77716B]">
            Sign in to your Banahatti Weaves account.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-medium border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="block uppercase font-bold text-[#252525] mb-1">
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-[48px] px-4 border border-[#DED8D1] focus:outline-none focus:border-[#9A6863] text-xs text-[#252525]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="uppercase font-bold text-[#252525]">
                Password
              </label>
              <button 
                type="button"
                onClick={() => alert('Password reset link sent to your email.')}
                className="text-[11px] text-[#9A6863] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-[48px] px-4 border border-[#DED8D1] focus:outline-none focus:border-[#9A6863] text-xs text-[#252525]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] bg-[#252525] hover:bg-[#9A6863] text-white font-bold uppercase tracking-[1.5px] text-xs transition-colors"
          >
            {isLoading ? 'SIGNING IN...' : 'LOGIN'}
          </button>

          {/* Quick Demo Customer Button */}
          <button
            type="button"
            onClick={handleDemoCustomer}
            className="w-full h-[40px] bg-[#FAF8F5] hover:bg-[#E5DED7] text-[#252525] font-semibold text-xs border border-[#E5DED7] transition-colors uppercase tracking-[1px] flex items-center justify-center gap-1.5"
          >
            <UserCheck className="w-4 h-4 text-[#9A6863]" /> 1-Click Demo Customer Login
          </button>

        </form>

        <div className="pt-4 border-t border-gray-100 text-center space-y-3 text-xs">
          <p className="text-[#77716B]">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#252525] hover:text-[#9A6863] underline">
              REGISTER
            </Link>
          </p>

          <div className="pt-2">
            <Link 
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-[11px] text-[#77716B] hover:text-[#9A6863] font-bold underline"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
