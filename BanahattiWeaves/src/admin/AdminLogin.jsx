import React, { useState } from 'react';
import './admin.css';
import './AdminLogin.css';
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
    <div className="admin-login-shell">
      <div className="admin-login-card">
        
        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="admin-login-title">
            ADMIN PORTAL
          </h2>
          <p className="admin-login-subtitle">
            Banahatti Weaves Store Management System
          </p>
        </div>

        {errorMsg && (
          <div className="admin-login-alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          
          <div className="admin-login-field">
            <label>
              Admin Email
            </label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="w-4 h-4" />
            </div>
          </div>

          <div className="admin-login-field">
            <label>
              Password
            </label>
            <div className="relative">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="admin-login-button"
          >
            {isLoading ? 'VERIFYING...' : 'LOGIN TO DASHBOARD'}
            <ArrowRight className="w-4 h-4 inline ml-2" />
          </button>

        </form>

        {/* 1-Click Demo Admin Button for effortless testing */}
        <div className="admin-login-demo">
          <p className="admin-login-demo-note">Default Demo Credentials: admin@banahattiweaves.com / admin123</p>
          <button
            onClick={handleDemoAdmin}
            className="admin-login-demo-button"
          >
            ⚡ 1-Click Quick Admin Demo Login
          </button>
        </div>

      </div>
    </div>
  );
}
