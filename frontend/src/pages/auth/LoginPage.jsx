import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';

export const LoginPage = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/">
            <span className="font-serif text-3xl font-bold tracking-[0.12em] text-[#1A1715]">
              {BRAND_CONFIG.name}
            </span>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-brand-600 mt-0.5">
              Leather Atelier
            </span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#1A1715] mt-6 mb-1">Welcome Back</h1>
          <p className="text-sm text-stone-500">Sign in to your KOSHA account</p>
        </div>

        <div className="bg-white shadow-card p-8 space-y-5">
          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="form-input"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="form-label mb-0">Password</label>
              <button type="button" className="text-xs text-brand-700 hover:text-brand-900 font-medium">
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                className="form-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="btn-primary w-full py-4 text-sm"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>

          <div className="relative flex items-center gap-4">
            <div className="flex-1 h-px bg-brand-100" />
            <span className="text-xs text-stone-400">or continue with</span>
            <div className="flex-1 h-px bg-brand-100" />
          </div>

          <button className="w-full border border-brand-200 bg-[#FAF8F5] py-3 text-sm font-medium text-stone-700 hover:border-brand-400 hover:bg-brand-50 transition-colors flex items-center justify-center gap-2">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-sm text-stone-600 mt-6">
          New to KOSHA?{' '}
          <Link to="/register" className="text-brand-800 font-semibold hover:text-[#1A1715] transition-colors">
            Create an Account
          </Link>
        </p>

        <p className="text-center mt-4">
          <Link to="/" className="text-xs text-stone-400 hover:text-stone-700 transition-colors">
            ← Back to Store
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
