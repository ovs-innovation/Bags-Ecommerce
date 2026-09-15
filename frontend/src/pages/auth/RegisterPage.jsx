import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';

export const RegisterPage = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/">
            <span className="font-serif text-3xl font-bold tracking-[0.12em] text-[#1A1715]">{BRAND_CONFIG.name}</span>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-brand-600 mt-0.5">Leather Atelier</span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#1A1715] mt-6 mb-1">Create Account</h1>
          <p className="text-sm text-stone-500">Join the KOSHA Artisan Circle</p>
        </div>

        <div className="bg-white shadow-card p-8 space-y-5">
          <div>
            <label className="form-label">Full Name</label>
            <input type="text" value={form.name} onChange={update('name')} placeholder="Aarav Sharma" className="form-input" />
          </div>
          <div>
            <label className="form-label">Email Address</label>
            <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" className="form-input" />
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+91 98765 43210" className="form-input" />
          </div>
          <div>
            <label className="form-label">Create Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={form.password}
                onChange={update('password')}
                placeholder="Minimum 8 characters"
                className="form-input pr-10"
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-brand-50 border border-brand-200 p-3 space-y-1.5">
            {['Early access to new collections', 'Exclusive members-only discounts', 'Track orders with full history'].map((b) => (
              <div key={b} className="flex items-center gap-2 text-xs text-brand-800">
                <Check className="w-3.5 h-3.5 text-brand-700" />
                {b}
              </div>
            ))}
          </div>

          <button onClick={() => navigate('/')} className="btn-primary w-full py-4 text-sm">
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center text-sm text-stone-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-800 font-semibold hover:text-[#1A1715]">Sign In</Link>
        </p>
        <p className="text-center mt-4">
          <Link to="/" className="text-xs text-stone-400 hover:text-stone-700">← Back to Store</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
