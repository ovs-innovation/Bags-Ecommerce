import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';

const FAQs = [
  { q: 'How long does shipping take across India?', a: 'Standard delivery takes 4–7 business days. Express (1–2 days) is available at checkout for metro cities.' },
  { q: 'What is your return policy?', a: '14-day hassle-free returns on unused items in original packaging. We cover return shipping for quality issues.' },
  { q: 'How do I care for my leather bag?', a: 'Wipe with a dry cloth after use. Apply leather conditioner every 3–6 months. Avoid prolonged sun and moisture.' },
  { q: 'Do you offer custom or personalised orders?', a: 'Yes! We offer monogramming and custom colour commissions. Contact us directly with your requirements.' },
];

export const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const update = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-[#1A1715] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-400 font-bold mb-3">Get in Touch</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">Contact the Atelier</h1>
          <p className="text-sm text-white/50 mt-3 max-w-xl mx-auto">
            Have a question about an order, a custom commission, or leather care? We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Info Panel ── */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1A1715] mb-6">Concierge Details</h2>
              <div className="space-y-5">
                {[
                  { icon: <MapPin className="w-5 h-5" />, label: 'Atelier Workshop', val: `${BRAND_CONFIG.contact.address}` },
                  { icon: <Phone className="w-5 h-5" />, label: 'Direct Telephone', val: BRAND_CONFIG.contact.phone },
                  { icon: <Mail className="w-5 h-5" />, label: 'Electronic Mail', val: BRAND_CONFIG.contact.email },
                  { icon: <Clock className="w-5 h-5" />, label: 'Operating Hours', val: BRAND_CONFIG.contact.hours },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 text-brand-800">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-[#1A1715]">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1A1715] mb-4">Quick Answers</h3>
              <div className="space-y-2">
                {FAQs.map((faq, i) => (
                  <div key={i} className="border border-brand-200 bg-white">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-[#1A1715] flex items-start justify-between gap-2"
                    >
                      <span>{faq.q}</span>
                      <span className="text-brand-600 flex-shrink-0 text-lg leading-none">{openFaq === i ? '−' : '+'}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-sm text-stone-600 leading-relaxed border-t border-brand-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div className="lg:col-span-2 bg-white shadow-card p-8">
            <h2 className="font-serif text-2xl font-bold text-[#1A1715] mb-6">Send a Message</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1715]">Message Sent!</h3>
                <p className="text-sm text-stone-500 max-w-sm">
                  Our concierge team will respond within 24 business hours. Thank you for reaching out.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input required type="text" value={form.name} onChange={update('name')} placeholder="e.g. Aarav Sharma" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input required type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" className="form-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+91 98765 43210" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Subject</label>
                    <select value={form.subject} onChange={update('subject')} className="form-input">
                      {['General Enquiry', 'Order Status', 'Custom Commission', 'Leather Care Advice', 'Return / Exchange', 'Bulk / Corporate Order'].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">Your Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="How can our artisans assist you?"
                    className="form-input resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto px-10 py-4">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
