import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check, ChevronDown } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';

const FAQs = [
  {
    q: 'How long does shipping take across India?',
    a: 'Standard express delivery takes 4–7 business days. We ship via premium insured couriers to ensure complete peace of mind.',
  },
  {
    q: 'What is your return & exchange policy?',
    a: 'We provide a 14-day hassle-free return window on unused pieces in their original packaging. Return logistics are completely on us for quality inquiries.',
  },
  {
    q: 'How do I care for full-grain vegetable-tanned leather?',
    a: 'Simply wipe with a clean microfiber cloth after daily carry. Condition with natural leather wax every 4–6 months. Avoid direct chemical sprays.',
  },
  {
    q: 'Can I commission custom monogramming or bespoke drops?',
    a: 'Yes! We offer discreet bespoke monogramming for personal or corporate gifts. Contact our atelier directly via the form below.',
  },
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
    <div className="min-h-screen bg-fog text-ink">

      {/* Header */}
      <div className="bg-ink text-fog py-12 sm:py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge-new text-[9px] mb-3 inline-block">Direct Concierge</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight">
            Contact the Atelier
          </h1>
          <p className="text-xs sm:text-sm text-fog/65 mt-2 max-w-lg mx-auto font-light leading-relaxed">
            Have questions about a drop, order status, leather care, or bespoke custom commissions? We are at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* ── Info Panel ── */}
          <div className="space-y-8">
            <div className="bg-paper border border-border p-6 sm:p-7 rounded-xs shadow-subtle">
              <h2 className="font-display text-2xl font-bold text-ink uppercase tracking-wide mb-6">
                Concierge Details
              </h2>
              <div className="space-y-5 text-xs">
                {[
                  { icon: <MapPin className="w-4 h-4" />, label: 'Workshop Atelier', val: BRAND_CONFIG.contact.address },
                  { icon: <Phone className="w-4 h-4" />, label: 'Telephone Support', val: BRAND_CONFIG.contact.phone },
                  { icon: <Mail className="w-4 h-4" />, label: 'Electronic Mail', val: BRAND_CONFIG.contact.email },
                  { icon: <Clock className="w-4 h-4" />, label: 'Studio Hours', val: BRAND_CONFIG.contact.hours },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xs bg-fog border border-border flex items-center justify-center flex-shrink-0 text-accent-mid shadow-xs">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted">{item.label}</p>
                      <p className="text-xs font-semibold text-ink mt-0.5">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-paper border border-border p-6 sm:p-7 rounded-xs shadow-subtle">
              <h3 className="font-display text-2xl font-bold text-ink uppercase tracking-wide mb-4">
                Quick Answers
              </h3>
              <div className="space-y-2 text-xs">
                {FAQs.map((faq, i) => (
                  <div key={i} className="border border-border rounded-xs overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-3.5 py-3 font-bold text-ink flex items-center justify-between gap-2 bg-fog hover:bg-paper transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-muted transition-transform duration-200 flex-shrink-0 ${
                          openFaq === i ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="px-3.5 pb-3.5 pt-2 text-xs text-ink/75 leading-relaxed bg-paper border-t border-border font-light">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div className="lg:col-span-2 bg-paper border border-border rounded-xs shadow-subtle p-6 sm:p-10">
            <h2 className="font-display text-3xl font-bold text-ink uppercase tracking-wide mb-2">
              Dispatch a Message
            </h2>
            <p className="text-xs text-muted mb-8 font-light">
              Fill out the particulars below and an atelier concierge will respond within 24 business hours.
            </p>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-center animate-fade-in">
                <div className="w-14 h-14 rounded-xs bg-ink text-accent flex items-center justify-center mb-2 shadow-glow">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-display text-3xl font-bold text-ink uppercase">Message Dispatched!</h3>
                <p className="text-xs text-muted max-w-sm">
                  Thank you for connecting with Avya Store. Our team has received your enquiry.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="e.g. Aryan Roy"
                      className="input text-xs"
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="your@email.com"
                      className="input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Telephone (Optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+91 98765 43210"
                      className="input text-xs"
                    />
                  </div>
                  <div>
                    <label className="form-label">Inquiry Subject</label>
                    <select
                      value={form.subject}
                      onChange={update('subject')}
                      className="input text-xs cursor-pointer"
                    >
                      <option>General Enquiry</option>
                      <option>Order & Dispatch Status</option>
                      <option>Bespoke Custom Commission</option>
                      <option>Wholesale & Press</option>
                      <option>Leather Care Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us how we may assist you..."
                    className="input text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary py-4 px-8 text-xs font-black tracking-widest inline-flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT MESSAGE</span>
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
