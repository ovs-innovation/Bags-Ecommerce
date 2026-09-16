import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Check, Lock, Mail, User, Phone, AlertCircle, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Dynamic password strength scoring
  const passwordCriteria = useMemo(() => {
    const pwd = form.password;
    return {
      hasLength: pwd.length >= 8,
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
    };
  }, [form.password]);

  const passwordStrengthScore = useMemo(() => {
    let score = 0;
    if (passwordCriteria.hasLength) score += 25;
    if (passwordCriteria.hasUpper) score += 25;
    if (passwordCriteria.hasLower) score += 25;
    if (passwordCriteria.hasNumber) score += 25;
    return score;
  }, [passwordCriteria]);

  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = 'Full name must be at least 2 characters.';
    }

    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (form.phone.trim() && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/.test(form.phone.trim())) {
      errs.phone = 'Please provide a valid contact number (10-15 digits).';
    }

    if (!form.password) {
      errs.password = 'Password is required.';
    } else if (passwordStrengthScore < 100) {
      errs.password = 'Password must be at least 8 characters with upper, lower, and numbers.';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      // AuthContext updates user state, redirecting to storefront
    } catch (err) {
      setApiError(err.message || 'Failed to create your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1612] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#E6C687]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#9B784E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link to="/" className="inline-block group">
          <span className="font-serif text-3xl font-bold tracking-[0.24em] text-[#1A1612] uppercase block">
            {BRAND_CONFIG.name}
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#7F5E38] font-medium block mt-1">
            Leather Atelier
          </span>
        </Link>
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1612] mt-8 mb-2">
          Create Your Account
        </h1>
        <p className="text-xs sm:text-sm text-[#5C534A] max-w-sm mx-auto">
          Join the KOSHA Artisan Circle for early collection drops, member privileges, and private ateliers.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 relative z-10">
        <div className="bg-white border border-[#EDE6DC] shadow-[0_8px_30px_rgb(26,22,18,0.06)] p-8 sm:p-10 rounded-sm">
          
          {/* Global Error Banner */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50/80 border border-red-200 rounded-sm flex items-start gap-3 text-red-800 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block mb-0.5">Registration Failed</span>
                <span>{apiError}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3D352E] mb-2">
                Full Name <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Aarav Sharma"
                  className={`w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border text-sm text-[#1A1612] placeholder-stone-400 focus:outline-none focus:bg-white transition-all ${
                    errors.name ? 'border-red-400 focus:border-red-600' : 'border-[#EDE6DC] focus:border-[#1A1612]'
                  }`}
                />
              </div>
              {errors.name && <p className="text-[11px] text-red-600 mt-1.5 font-medium">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3D352E] mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border text-sm text-[#1A1612] placeholder-stone-400 focus:outline-none focus:bg-white transition-all ${
                    errors.email ? 'border-red-400 focus:border-red-600' : 'border-[#EDE6DC] focus:border-[#1A1612]'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-red-600 mt-1.5 font-medium">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3D352E] mb-2">
                Phone Number <span className="text-stone-400 text-[10px] normal-case">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="+91 98765 43210"
                  className={`w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border text-sm text-[#1A1612] placeholder-stone-400 focus:outline-none focus:bg-white transition-all ${
                    errors.phone ? 'border-red-400 focus:border-red-600' : 'border-[#EDE6DC] focus:border-[#1A1612]'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[11px] text-red-600 mt-1.5 font-medium">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3D352E] mb-2">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={update('password')}
                  placeholder="At least 8 characters"
                  className={`w-full pl-10 pr-11 py-3 bg-[#FAF7F2] border text-sm text-[#1A1612] placeholder-stone-400 focus:outline-none focus:bg-white transition-all ${
                    errors.password ? 'border-red-400 focus:border-red-600' : 'border-[#EDE6DC] focus:border-[#1A1612]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-[#1A1612] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {form.password && (
                <div className="mt-2.5 space-y-2">
                  <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrengthScore <= 50
                          ? 'bg-red-500'
                          : passwordStrengthScore < 100
                          ? 'bg-amber-500'
                          : 'bg-emerald-600'
                      }`}
                      style={{ width: `${passwordStrengthScore}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[10.5px] text-[#5C534A]">
                    <span className={`flex items-center gap-1 ${passwordCriteria.hasLength ? 'text-emerald-700 font-medium' : ''}`}>
                      <Check className={`w-3 h-3 ${passwordCriteria.hasLength ? 'text-emerald-600' : 'text-stone-300'}`} />
                      8+ characters
                    </span>
                    <span className={`flex items-center gap-1 ${passwordCriteria.hasUpper && passwordCriteria.hasLower ? 'text-emerald-700 font-medium' : ''}`}>
                      <Check className={`w-3 h-3 ${passwordCriteria.hasUpper && passwordCriteria.hasLower ? 'text-emerald-600' : 'text-stone-300'}`} />
                      Upper & lowercase
                    </span>
                    <span className={`flex items-center gap-1 ${passwordCriteria.hasNumber ? 'text-emerald-700 font-medium' : ''}`}>
                      <Check className={`w-3 h-3 ${passwordCriteria.hasNumber ? 'text-emerald-600' : 'text-stone-300'}`} />
                      At least 1 number
                    </span>
                    <span className="flex items-center gap-1 text-[#7F5E38]">
                      <ShieldCheck className="w-3 h-3 text-[#B89B74]" />
                      Bcrypt Encrypted
                    </span>
                  </div>
                </div>
              )}
              {errors.password && <p className="text-[11px] text-red-600 mt-1.5 font-medium">{errors.password}</p>}
            </div>

            {/* Member Benefits Card */}
            <div className="p-3.5 bg-[#FAF7F2] border border-[#EDE6DC] rounded-sm space-y-2 mt-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7F5E38]">
                Atelier Member Privileges
              </p>
              {[
                'Handcrafted heirloom warranty with authenticity stamp',
                'Complimentary bespoke monogramming service',
                'Priority dispatch on limited numbered runs',
              ].map((b) => (
                <div key={b} className="flex items-center gap-2 text-xs text-[#4A423A]">
                  <Check className="w-3.5 h-3.5 text-[#B89B74] flex-shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 bg-[#1A1612] text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#2C241E] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footnote / Sign In CTA */}
        <p className="text-center text-xs text-[#5C534A] mt-8">
          Already have a KOSHA account?{' '}
          <Link
            to="/login"
            className="text-[#1A1612] font-semibold underline-offset-4 hover:underline hover:text-[#7F5E38] transition-colors"
          >
            Sign In
          </Link>
        </p>

        <p className="text-center mt-4">
          <Link
            to="/"
            className="text-[11px] uppercase tracking-widest text-[#7F5E38] hover:text-[#1A1612] transition-colors"
          >
            ← Return to Storefront
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
