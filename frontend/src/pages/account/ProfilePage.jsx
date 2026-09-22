import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, Shield, KeyRound, ShoppingBag, LogOut,
  CheckCircle2, AlertCircle, Sparkles, Clock, Calendar, ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security'
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [securityMessage, setSecurityMessage] = useState({ type: '', text: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMessage({ type: '', text: '' });

    if (!profileForm.name.trim()) {
      setProfileMessage({ type: 'error', text: 'Full name cannot be empty.' });
      return;
    }

    setIsUpdating(true);
    try {
      await updateProfile({
        name: profileForm.name.trim(),
        phone: profileForm.phone.trim(),
      });
      setProfileMessage({ type: 'success', text: 'Personal coordinates updated successfully.' });
    } catch (err) {
      setProfileMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    setSecurityMessage({ type: '', text: '' });

    if (!securityForm.currentPassword) {
      setSecurityMessage({ type: 'error', text: 'Current password is required to update security credentials.' });
      return;
    }

    if (securityForm.newPassword.length < 8) {
      setSecurityMessage({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityMessage({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    setIsUpdating(true);
    try {
      await updateProfile({
        currentPassword: securityForm.currentPassword,
        newPassword: securityForm.newPassword,
      });
      setSecurityMessage({ type: 'success', text: 'Security credentials updated successfully.' });
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setSecurityMessage({ type: 'error', text: err.message || 'Failed to update password.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Just recently';
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="bg-fog min-h-screen text-ink py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 border-b border-border pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="badge-new text-[9px] mb-2 inline-block">Member Account</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink uppercase tracking-tight leading-none">
              Welcome, {user?.name?.split(' ')[0] || 'Patron'}
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-border bg-paper hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-xs font-bold tracking-wider uppercase transition-colors rounded-xs self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left: Identity Card & Nav */}
          <div className="space-y-6">
            <div className="bg-paper border border-border p-6 sm:p-7 shadow-subtle rounded-xs">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xs bg-ink text-accent font-display text-2xl flex items-center justify-center font-bold shadow-xs flex-shrink-0">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="min-w-0">
                  <h3 className="font-sans text-base font-extrabold text-ink truncate">
                    {user?.name || 'Member'}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[9px] font-black tracking-widest uppercase bg-ink text-accent mt-1">
                    <Sparkles className="w-2.5 h-2.5 text-accent" />
                    {user?.role === 'admin' ? 'Administrator' : 'Circle Member'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-ink/70 border-t border-border pt-5">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-muted flex-shrink-0" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-muted flex-shrink-0" />
                  <span>{user?.phone || 'No phone registered'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-muted flex-shrink-0" />
                  <span>Member since {formatDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-paper border border-border p-2 shadow-subtle divide-y divide-border rounded-xs">
              <Link
                to="/cart"
                className="flex items-center justify-between p-3 hover:bg-fog transition-colors rounded-xs"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-accent-mid" />
                  <span className="text-xs font-bold uppercase tracking-wider text-ink">
                    Shopping Bag
                  </span>
                </div>
                <span className="text-xs font-black text-ink bg-fog px-2 py-0.5 border border-border rounded-xs">
                  {cartCount}
                </span>
              </Link>

              <Link
                to="/saved"
                className="flex items-center justify-between p-3 hover:bg-fog transition-colors rounded-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-accent-mid" />
                  <span className="text-xs font-bold uppercase tracking-wider text-ink">
                    Saved Vault
                  </span>
                </div>
                <span className="text-xs text-muted">→</span>
              </Link>
            </div>
          </div>

          {/* Right: Settings Tabs & Form */}
          <div className="lg:col-span-2 bg-paper border border-border shadow-subtle rounded-xs overflow-hidden">
            
            {/* Tabs */}
            <div className="flex border-b border-border bg-fog">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-3.5 px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-paper text-ink border-b-2 border-ink'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile Particulars</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 py-3.5 px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'security'
                    ? 'bg-paper text-ink border-b-2 border-ink'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Password & Security</span>
              </button>
            </div>

            {/* Profile Tab Panel */}
            {activeTab === 'profile' && (
              <div className="p-6 sm:p-8">
                {profileMessage.text && (
                  <div
                    className={`mb-6 p-3.5 rounded-xs flex items-center gap-2.5 text-xs font-bold animate-fade-in ${
                      profileMessage.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {profileMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    )}
                    <span>{profileMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleProfileSubmit} className="space-y-5">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="input text-xs"
                    />
                  </div>

                  <div>
                    <label className="form-label">Registered Email</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      className="input text-xs bg-fog/70 cursor-not-allowed opacity-75"
                    />
                    <p className="text-[10.5px] text-muted mt-1">
                      Email address is tied to your membership identity and cannot be altered directly.
                    </p>
                  </div>

                  <div>
                    <label className="form-label">Contact Telephone</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="input text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="btn-primary py-3.5 px-7 text-xs font-black tracking-widest"
                  >
                    {isUpdating ? 'UPDATING...' : 'SAVE MODIFICATIONS'}
                  </button>
                </form>
              </div>
            )}

            {/* Security Tab Panel */}
            {activeTab === 'security' && (
              <div className="p-6 sm:p-8">
                {securityMessage.text && (
                  <div
                    className={`mb-6 p-3.5 rounded-xs flex items-center gap-2.5 text-xs font-bold animate-fade-in ${
                      securityMessage.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {securityMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    )}
                    <span>{securityMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleSecuritySubmit} className="space-y-5">
                  <div>
                    <label className="form-label">Current Password *</label>
                    <input
                      type="password"
                      required
                      value={securityForm.currentPassword}
                      onChange={(e) =>
                        setSecurityForm({ ...securityForm, currentPassword: e.target.value })
                      }
                      placeholder="••••••••••••"
                      className="input text-xs"
                    />
                  </div>

                  <div>
                    <label className="form-label">New Password (8+ characters) *</label>
                    <input
                      type="password"
                      required
                      value={securityForm.newPassword}
                      onChange={(e) =>
                        setSecurityForm({ ...securityForm, newPassword: e.target.value })
                      }
                      placeholder="••••••••••••"
                      className="input text-xs"
                    />
                  </div>

                  <div>
                    <label className="form-label">Confirm New Password *</label>
                    <input
                      type="password"
                      required
                      value={securityForm.confirmPassword}
                      onChange={(e) =>
                        setSecurityForm({ ...securityForm, confirmPassword: e.target.value })
                      }
                      placeholder="••••••••••••"
                      className="input text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="btn-primary py-3.5 px-7 text-xs font-black tracking-widest"
                  >
                    {isUpdating ? 'UPDATING...' : 'UPDATE PASSWORD'}
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
