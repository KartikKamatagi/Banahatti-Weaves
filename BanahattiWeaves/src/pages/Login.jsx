import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, returnUrl, setReturnUrl } = useAuth();
  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const completeLogin = async (loginEmail, loginPassword) => {
    setIsLoading(true);
    setErrorMsg('');
    const res = await login(loginEmail, loginPassword);
    setIsLoading(false);
    if (res.success) {
      const destination = returnUrl || '/collections';
      setReturnUrl(null);
      navigate(destination);
    } else {
      setErrorMsg(res.error || 'We could not sign you in. Please check your details.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    completeLogin(email, password);
  };

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <p className="auth-eyebrow">Banahatti Weaves</p>
        <h1>Welcome back</h1>
        <p className="auth-intro">Sign in to follow your orders and keep your favourites close.</p>
        {errorMsg && <p className="form-alert" role="alert">{errorMsg}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label><span>Email address</span><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" autoComplete="email" /></label>
          <label><span className="field-label-row">Password <button type="button" onClick={() => alert('Password reset link sent to your email.')}>Forgot password?</button></span><input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" autoComplete="current-password" /></label>
          <button className="form-submit" type="submit" disabled={isLoading}>{isLoading ? 'Signing in…' : 'Sign in'}</button>
          <button className="demo-login" type="button" onClick={() => completeLogin('customer@example.com', 'password123')} disabled={isLoading}><UserCheck size={17} aria-hidden="true" /> Use demo customer account</button>
        </form>
        <div className="auth-footer"><p>New to Banahatti Weaves? <Link to="/register">Create an account</Link></p><Link className="admin-link" to="/admin/login"><ShieldCheck size={15} aria-hidden="true" /> Admin portal</Link></div>
      </div>
    </section>
  );
}
