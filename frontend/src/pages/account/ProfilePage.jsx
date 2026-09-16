import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, Shield, KeyRound, ShoppingBag, LogOut,
  CheckCircle2, AlertCircle, Sparkles, Clock, Calendar
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
      setProfileMessage({ type: 'success', text: 'Your personal information was updated successfully.' });
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
      setSecurityMessage({ type: 'success', text: 'Password has been changed successfully.' });
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
    <div className="bg-[#FAF7F2] min-h-screen text-[#1A1612] py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7F5E38] mb-1">
            Private Atelier Account
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1612]">
              Welcome, {user?.name?.split(' ')[0] || 'Patron'}
            </h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#EDE6DC] bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-xs font-semibold tracking-wider uppercase transition-colors self-start sm:self-auto"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Patron Identity Card & Quick Nav */}
          <div className="space-y-6">
            <div className="bg-white border border-[#EDE6DC] p-6 sm:p-7 shadow-subtle rounded-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#1A1612] text-[#E6C687] font-serif text-xl flex items-center justify-center font-semibold shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'K'}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#1A1612]">
                    {user?.name || 'Member'}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-[#FAF7F2] border border-[#EDE6DC] text-[#7F5E38] mt-1">
                    <Sparkles className="w-3 h-3 text-[#B89B74]" />
                    {user?.role === 'admin' ? 'Atelier Administrator' : 'Artisan Circle Member'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#554C42] border-t border-[#EDE6DC] pt-5">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  <span>{user?.phone || 'No phone registered'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  <span>Patron since {formatDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="bg-white border border-[#EDE6DC] p-4 shadow-subtle divide-y divide-[#EDE6DC] rounded-sm">
              <Link
                to="/cart"
                className="flex items-center justify-between p-3 hover:bg-[#FAF7F2] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-[#7F5E38]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1612]">
                    Shopping Bag
                  </span>
                </div>
                <span className="text-xs font-bold text-[#7F5E38] bg-[#FAF7F2] px-2 py-0.5 border border-[#EDE6DC] rounded-full">
                  {cartCount} items
                </span>
              </Link>
              <Link
                to="/products"
                className="flex items-center justify-between p-3 hover:bg-[#FAF7F2] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#7F5E38]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1612]">
                    Explore Catalogue
                  </span>
                </div>
                <span className="text-xs text-stone-400">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Settings Tabs & Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#EDE6DC] shadow-subtle rounded-sm">
              
              {/* Tab Navigation */}
              <div className="flex border-b border-[#EDE6DC]">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 py-4 px-6 text-xs font-semibold tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'profile'
                      ? 'border-b-2 border-[#1A1612] text-[#1A1612] bg-[#FAF7F2]/40'
                      : 'text-stone-400 hover:text-[#1A1612]'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Profile Details
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex-1 py-4 px-6 text-xs font-semibold tracking-[0.16em] uppercase transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'security'
                      ? 'border-b-2 border-[#1A1612] text-[#1A1612] bg-[#FAF7F2]/40'
                      : 'text-stone-400 hover:text-[#1A1612]'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  Security & Password
                </button>
              </div>

              {/* Tab Content: Profile Form */}
              {activeTab === 'profile' && (
                <div className="p-6 sm:p-8">
                  <h2 className="font-serif text-xl font-normal text-[#1A1612] mb-1">
                    Personal Information
                  </h2>
                  <p className="text-xs text-[#7F5E38] mb-6">
                    Manage your identity details for expedited dispatch and communications.
                  </p>

                  {profileMessage.text && (
                    <div
                      className={`mb-6 p-4 rounded-sm flex items-start gap-2.5 text-xs ${
                        profileMessage.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {profileMessage.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
                      )}
                      <span>{profileMessage.text}</span>
                    </div>
                  )}

                  <form onSubmit={handleProfileSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3D352E] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#EDE6DC] text-sm text-[#1A1612] focus:outline-none focus:bg-white focus:border-[#1A1612] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3D352E] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        disabled
                        value={user?.email || ''}
                        className="w-full px-4 py-3 bg-stone-100 border border-[#EDE6DC] text-sm text-stone-500 cursor-not-allowed select-none"
                      />
                      <p className="text-[10px] text-stone-400 mt-1">
                        Email address is tied to your cryptographic authentication records and cannot be directly modified.
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3D352E] mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#EDE6DC] text-sm text-[#1A1612] focus:outline-none focus:bg-white focus:border-[#1A1612] transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="px-8 py-3.5 bg-[#1A1612] text-white text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#2C241E] transition-colors disabled:opacity-50"
                      >
                        {isUpdating ? 'Updating Records...' : 'Save Profile Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Tab Content: Security & Password */}
              {activeTab === 'security' && (
                <div className="p-6 sm:p-8">
                  <h2 className="font-serif text-xl font-normal text-[#1A1612] mb-1">
                    Security Credentials
                  </h2>
                  <p className="text-xs text-[#7F5E38] mb-6">
                    Update your account password. All passwords are automatically salted and hashed via Bcrypt.
                  </p>

                  {securityMessage.text && (
                    <div
                      className={`mb-6 p-4 rounded-sm flex items-start gap-2.5 text-xs ${
                        securityMessage.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {securityMessage.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
                      )}
                      <span>{securityMessage.text}</span>
                    </div>
                  )}

                  <form onSubmit={handleSecuritySubmit} className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3D352E] mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={securityForm.currentPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#EDE6DC] text-sm text-[#1A1612] focus:outline-none focus:bg-white focus:border-[#1A1612] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3D352E] mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={securityForm.newPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                        placeholder="Minimum 8 characters"
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#EDE6DC] text-sm text-[#1A1612] focus:outline-none focus:bg-white focus:border-[#1A1612] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3D352E] mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={securityForm.confirmPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                        placeholder="Re-enter new password"
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#EDE6DC] text-sm text-[#1A1612] focus:outline-none focus:bg-white focus:border-[#1A1612] transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="px-8 py-3.5 bg-[#1A1612] text-white text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#2C241E] transition-colors disabled:opacity-50"
                      >
                        {isUpdating ? 'Changing Password...' : 'Update Password'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
