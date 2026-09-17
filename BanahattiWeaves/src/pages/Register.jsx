import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register, returnUrl, setReturnUrl } = useAuth();
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const updateField = (field) => (event) => setFormData({ ...formData, [field]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) { setErrorMsg('The passwords do not match.'); return; }
    setIsLoading(true);
    setErrorMsg('');
    const res = await register(formData);
    setIsLoading(false);
    if (res.success) { const destination = returnUrl || '/collections'; setReturnUrl(null); navigate(destination); }
    else setErrorMsg(res.error || 'We could not create your account.');
  };

  return (
    <section className="auth-page register-page">
      <div className="auth-panel register-panel">
        <p className="auth-eyebrow">Become part of the story</p>
        <h1>Create your account</h1>
        <p className="auth-intro">Create an account for a more personal handloom shopping experience.</p>
        {errorMsg && <p className="form-alert" role="alert">{errorMsg}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label><span>Full name</span><input type="text" required value={formData.fullName} onChange={updateField('fullName')} placeholder="Your full name" autoComplete="name" /></label>
            <label><span>Phone number</span><input type="tel" required value={formData.phone} onChange={updateField('phone')} placeholder="+91 98765 43210" autoComplete="tel" /></label>
          </div>
          <label><span>Email address</span><input type="email" required value={formData.email} onChange={updateField('email')} placeholder="name@example.com" autoComplete="email" /></label>
          <div className="form-grid">
            <label><span>Password</span><input type="password" required value={formData.password} onChange={updateField('password')} placeholder="At least 8 characters" autoComplete="new-password" /></label>
            <label><span>Confirm password</span><input type="password" required value={formData.confirmPassword} onChange={updateField('confirmPassword')} placeholder="Repeat your password" autoComplete="new-password" /></label>
          </div>
          <button className="form-submit" type="submit" disabled={isLoading}>{isLoading ? 'Creating account…' : <>Create account <ArrowRight size={17} aria-hidden="true" /></>}</button>
        </form>
        <div className="auth-footer"><p>Already have an account? <Link to="/login">Sign in</Link></p></div>
      </div>
    </section>
  );
}
