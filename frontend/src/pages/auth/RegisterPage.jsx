import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Check, Lock, Mail, User, Phone, AlertCircle, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';
import { useAuth } from '../../context/AuthContext';
import { useAuthPrompt } from '../../context/AuthPromptContext';
import BrandLogo from '../../components/common/BrandLogo';

export const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const { executePendingIntent } = useAuthPrompt();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || location.state?.from || '/';

  useEffect(() => {
    if (isAuthenticated) {
      const intentResult = executePendingIntent();
      if (intentResult && intentResult.redirect) {
        navigate(intentResult.redirect, { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, navigate, from, executePendingIntent]);

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

    if (!form.confirmPassword) {
      errs.confirmPassword = 'Confirmation password is required.';
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
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

      const intentResult = executePendingIntent();
      if (intentResult && intentResult.redirect) {
        navigate(intentResult.redirect, { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setApiError(err.message || 'Failed to create membership account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-fog text-ink flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <BrandLogo variant="nav" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink uppercase tracking-tight mb-2">
          Create Membership
        </h1>
        <p className="text-xs text-muted max-w-sm mx-auto">
          Join the inner circle for private vault reservations, seamless order tracking, and customized carry.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-paper border border-border shadow-subtle p-8 sm:p-10 rounded-xs">

          {/* Error banner */}
          {apiError && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xs flex items-start gap-2.5 text-red-700 text-xs leading-relaxed animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{apiError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label className="form-label">Full Name *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="e.g. Priyanshu Sharma"
                  className={`input pl-10 text-xs ${errors.name ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.name && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email Address *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="name@example.com"
                  className={`input pl-10 text-xs ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="form-label">Contact Number (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="+91 98765 43210"
                  className={`input pl-10 text-xs ${errors.phone ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={update('password')}
                  placeholder="Minimum 8 characters"
                  className={`input pl-10 pr-10 text-xs ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-ink transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength meter */}
              {form.password && (
                <div className="mt-2 space-y-1.5">
                  <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrengthScore === 100
                          ? 'bg-accent-mid'
                          : passwordStrengthScore >= 50
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${passwordStrengthScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted">
                    <span>Criteria: 8+ chars, upper, lower, number</span>
                    <span className="font-bold text-ink">{passwordStrengthScore}%</span>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="form-label">Confirm Password *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={update('confirmPassword')}
                  placeholder="Re-enter password"
                  className={`input pl-10 pr-10 text-xs ${errors.confirmPassword ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full mt-2 py-4 text-xs font-black tracking-widest"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  <span>CREATING ACCOUNT...</span>
                </>
              ) : (
                <>
                  <span>CREATE ACCOUNT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>

        <p className="text-center text-xs text-muted mt-6">
          Already have an atelier account?{' '}
          <Link
            to="/login"
            state={location.state}
            className="text-ink font-bold underline hover:text-accent-mid transition-colors ml-1 uppercase"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
