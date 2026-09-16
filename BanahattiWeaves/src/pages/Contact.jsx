import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-10 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-zari">
          WE'RE HERE TO HELP
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-deep-charcoal">
          CONTACT US
        </h1>
        <p className="text-sm text-gray-500 font-normal">
          Have questions about our sarees or custom orders? Reach out to us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 bg-deep-charcoal text-white p-8 rounded-3xl space-y-8 border border-gold-zari/30 shadow-xl">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-cream">Get In Touch</h3>
            <p className="text-xs text-gray-400">
              We welcome visits to our weaving center in Banahatti or inquiries by phone/email.
            </p>
          </div>

          <div className="space-y-6 text-xs text-gray-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl text-gold-zari">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block font-bold mb-1">Our Location</strong>
                <span>Handloom Weavers Colony, Main Road, Banahatti, Bagalkot District, Karnataka - 587311</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl text-gold-zari">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block font-bold mb-1">Phone Number</strong>
                <span>+91 98765 43210 / +91 8353 220194</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl text-gold-zari">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block font-bold mb-1">Email Address</strong>
                <span>support@banahattiweaves.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-6">
          
          <h3 className="font-serif text-2xl font-bold text-deep-charcoal">Send Us a Message</h3>

          {submitted && (
            <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-bold border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block uppercase font-bold text-deep-charcoal mb-1">Your Name *</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
            </div>

            <div>
              <label className="block uppercase font-bold text-deep-charcoal mb-1">Your Email *</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
            </div>

            <div>
              <label className="block uppercase font-bold text-deep-charcoal mb-1">Message *</label>
              <textarea 
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message or order inquiry here..."
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
              />
            </div>

            <button
              type="submit"
              className="bg-crimson hover:bg-gold-zari text-white py-3.5 px-8 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>SEND MESSAGE</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
