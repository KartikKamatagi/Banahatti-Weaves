import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register, returnUrl, setReturnUrl } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    const res = await register(formData);
    setIsLoading(false);

    if (res.success) {
      const dest = returnUrl || '/collections';
      setReturnUrl(null);
      navigate(dest);
    } else {
      setErrorMsg(res.error || 'Failed to create account.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-cream/30 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gold-zari/30 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold-zari">
            BANAHATTI WEAVES
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-deep-charcoal">
            CREATE ACCOUNT
          </h2>
          <p className="text-xs text-gray-500">
            Join Banahatti Weaves to order authentic handloom sarees.
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
              Full Name *
            </label>
            <div className="relative">
              <input 
                type="text" 
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Password *
            </label>
            <div className="relative">
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <input 
                type="password" 
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
            {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-crimson hover:underline">
              LOGIN
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
