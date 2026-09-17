import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';

const contactDetails = [
  { icon: MapPin, title: 'Visit our weaving centre', value: 'Handloom Weavers Colony, Main Road, Banahatti, Bagalkot, Karnataka — 587311' },
  { icon: Phone, title: 'Call us', value: '+91 98765 43210  ·  +91 8353 220194' },
  { icon: Mail, title: 'Write to us', value: 'support@banahattiweaves.com' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const updateField = (field) => (event) => setFormData({ ...formData, [field]: event.target.value });
  const handleSubmit = (event) => { event.preventDefault(); setSubmitted(true); setFormData({ name: '', email: '', message: '' }); setTimeout(() => setSubmitted(false), 4000); };

  return (
    <section className="contact-page container-custom">
      <header className="contact-heading"><p className="auth-eyebrow">We are here to help</p><h1>Let's start a conversation.</h1><p>Questions about a saree, a custom order, or the craft? We would love to hear from you.</p></header>
      <div className="contact-layout">
        <aside className="contact-details"><div><p className="contact-kicker">From Banahatti, with care</p><h2>Get in touch</h2><p>Our small team is happy to guide you to the weave that feels like yours.</p></div><div className="contact-list">{contactDetails.map(({ icon: Icon, title, value }) => <div className="contact-item" key={title}><Icon size={21} aria-hidden="true" /><div><h3>{title}</h3><p>{value}</p></div></div>)}</div></aside>
        <div className="contact-form-card"><h2>Send a message</h2><p className="contact-form-intro">Tell us what you are looking for, and we will get back to you shortly.</p>{submitted && <p className="form-success" role="status"><CheckCircle2 size={18} aria-hidden="true" /> Thank you — your message is on its way.</p>}
          <form className="contact-form" onSubmit={handleSubmit}><div className="form-grid"><label><span>Your name</span><input type="text" required value={formData.name} onChange={updateField('name')} placeholder="Your full name" /></label><label><span>Email address</span><input type="email" required value={formData.email} onChange={updateField('email')} placeholder="name@example.com" /></label></div><label><span>Your message</span><textarea required rows="6" value={formData.message} onChange={updateField('message')} placeholder="How can we help?" /></label><button className="form-submit contact-submit" type="submit">Send message <Send size={16} aria-hidden="true" /></button></form>
        </div>
      </div>
    </section>
  );
}
