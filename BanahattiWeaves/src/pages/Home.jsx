import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SareeCard from '../components/SareeCard';
import { ArrowRight, Headphones, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { sarees } = useCart();
  const latestSarees = sarees.filter((s) => s.isLatest || s.category === 'COTTON').slice(0, 4);
  const bestSellerSarees = sarees.filter((s) => s.isBestSeller || s.rating >= 4.8).slice(0, 4);

  return (
    <div className="home-page">
      <section className="hero-section container-custom">
        <div className="hero-card">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> Made by hand in Banahatti</div>
            <p className="hero-season">The festive edit · 2026</p>
            <h1>Woven with <em>stories</em><br />to be worn for life.</h1>
            <p className="hero-description">Exceptional handloom sarees, shaped patiently by artisans and finished in the colours of Karnataka.</p>
            <div className="hero-actions">
              <button onClick={() => navigate('/collections')} className="button-primary">Explore the collection <ArrowRight size={16} /></button>
              <button onClick={() => document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' })} className="button-text">Our craft <span>↓</span></button>
            </div>
            <div className="hero-proof">
              <div><strong>30+</strong><span>years of weaving</span></div>
              <div><strong>100%</strong><span>handloom made</span></div>
              <div><strong>4.9/5</strong><span>loved by customers</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <img src={sarees[0]?.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'} alt="Banahatti handloom saree" />
            <div className="hero-stamp"><span>Authentically</span><strong>HANDWOVEN</strong><span>in Banahatti</span></div>
            <div className="hero-caption"><span>01</span> The heirloom collection</div>
          </div>
        </div>
      </section>

      <section className="collection-section container-custom">
        <div className="section-heading">
          <div><p className="eyebrow">Fresh from the loom</p><h2>New season, old soul.</h2></div>
          <button onClick={() => navigate('/collections')} className="button-text desktop-only">View all sarees <ArrowRight size={15} /></button>
        </div>
        <div className="product-grid">{latestSarees.map((saree) => <SareeCard key={saree.id} saree={saree} />)}</div>
        <button onClick={() => navigate('/collections')} className="button-outline mobile-only">View all sarees <ArrowRight size={15} /></button>
      </section>

      <section id="craft" className="craft-section">
        <div className="container-custom craft-grid">
          <div className="craft-image"><img src={sarees[1]?.images[0] || sarees[0]?.images[0]} alt="Detail of a handwoven Banahatti saree" /><span className="craft-number">01</span></div>
          <div className="craft-copy"><p className="eyebrow">A slower kind of luxury</p><h2>Every thread has a pair of hands behind it.</h2><p>Our sarees come directly from Banahatti’s pit looms—where craft knowledge is passed between generations and a single weave can take days to become whole.</p><button onClick={() => navigate('/about')} className="button-outline">Meet our weavers <ArrowRight size={16} /></button></div>
          <div className="craft-note"><span>Made in small batches</span><strong>Thoughtfully<br />woven.</strong></div>
        </div>
      </section>

      <section className="collection-section container-custom bestsellers-section">
        <div className="section-heading"><div><p className="eyebrow">Chosen again and again</p><h2>Most loved pieces.</h2></div><p className="section-aside">Heirloom-quality weaves that keep finding their way into your celebrations.</p></div>
        <div className="product-grid">{bestSellerSarees.map((saree) => <SareeCard key={saree.id} saree={saree} />)}</div>
      </section>

      <section className="assurance-section"><div className="container-custom assurance-grid">
        <div><ShieldCheck /><div><h3>Genuine handloom</h3><p>Directly sourced from Banahatti artisans.</p></div></div>
        <div><ShoppingBag /><div><h3>Careful delivery</h3><p>Beautifully packed and sent with care.</p></div></div>
        <div><Headphones /><div><h3>Here to help</h3><p>Personal support whenever you need it.</p></div></div>
      </div></section>

      <section className="newsletter-section container-custom"><div className="newsletter-card">
        <div><p className="eyebrow">Letters from the loom</p><h2>A little beauty,<br /><em>in your inbox.</em></h2></div>
        <div className="newsletter-form-wrap"><p>New arrivals, weaving stories, and private invitations—sent occasionally.</p><form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Banahatti Weaves!'); }}><input type="email" required placeholder="Your email address" aria-label="Email address" /><button type="submit" aria-label="Subscribe"><ArrowRight size={20} /></button></form></div>
      </div></section>
    </div>
  );
}
