import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, UserPlus, LogIn, ShoppingBag, Heart, Zap } from 'lucide-react';
import { useAuthPrompt } from '../../context/AuthPromptContext';
import { BRAND_CONFIG } from '../../constants/config';

export const AuthPromptModal = () => {
  const { isOpen, intent, closeAuthPrompt } = useAuthPrompt();
  const navigate = useNavigate();

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAuthPrompt();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeAuthPrompt]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !intent) return null;

  const { action, product, returnUrl } = intent;

  // Text tailored precisely per requirement
  let title = 'Sign in to continue';
  let description =
    'Create an account or sign in to add items to your bag and keep your shopping experience personalized.';
  let iconBadge = <ShoppingBag className="w-4 h-4 text-accent" />;

  if (action === 'BUY_NOW') {
    title = 'Sign in to continue with your purchase';
    description =
      'Create an account or sign in to complete your order and secure your handcrafted piece.';
    iconBadge = <Zap className="w-4 h-4 text-accent" />;
  } else if (action === 'WISHLIST') {
    title = 'Create an account to save your favorites';
    description =
      'Create an account or sign in to save this piece to your private atelier vault and access it from any device.';
    iconBadge = <Heart className="w-4 h-4 text-red-400 fill-red-400" />;
  }

  const handleCreateAccount = () => {
    closeAuthPrompt();
    navigate('/register', {
      state: {
        from: returnUrl,
        pendingIntent: intent,
      },
    });
  };

  const handleSignIn = () => {
    closeAuthPrompt();
    navigate('/login', {
      state: {
        from: returnUrl,
        pendingIntent: intent,
      },
    });
  };

  const mainImg =
    Array.isArray(product?.images) && product.images[0]
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={closeAuthPrompt}
        className="fixed inset-0 bg-ink/70 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog (Bottom sheet on mobile, centered card on desktop) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-prompt-title"
        className="relative w-full sm:max-w-md bg-paper border border-border shadow-elevated rounded-t-lg sm:rounded-xs z-10 overflow-hidden flex flex-col animate-slide-up sm:animate-fade-up max-h-[92vh] sm:max-h-auto"
      >
        {/* Header Strip with Dismiss Button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-fog/80">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-xs bg-ink flex items-center justify-center">
              {iconBadge}
            </span>
            <span className="text-[10.5px] uppercase font-black tracking-widest text-ink">
              Authentication Required
            </span>
          </div>

          <button
            type="button"
            onClick={closeAuthPrompt}
            className="w-8 h-8 rounded-xs flex items-center justify-center text-muted hover:text-ink hover:bg-border/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5 overflow-y-auto">
          {/* Selected Product Context Preview */}
          {product && (
            <div className="flex items-center gap-3.5 p-3 bg-fog border border-border rounded-xs">
              <img
                src={mainImg}
                alt={product.name}
                className="w-14 h-16 sm:w-16 sm:h-20 object-cover rounded-xs border border-border flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[9.5px] uppercase tracking-widest text-accent-mid font-extrabold truncate">
                  {product.gender || 'Unisex'} · {product.category || 'Leather'}
                </p>
                <h4 className="font-sans text-xs sm:text-sm font-extrabold text-ink truncate mt-0.5">
                  {product.name}
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs font-black text-ink">
                    {BRAND_CONFIG.currency}{product.price?.toLocaleString('en-IN')}
                  </span>
                  {product.compareAtPrice > product.price && (
                    <span className="text-[10.5px] text-muted line-through">
                      {BRAND_CONFIG.currency}{product.compareAtPrice?.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Heading and Explanatory Text */}
          <div className="text-center sm:text-left space-y-2">
            <h2
              id="auth-prompt-title"
              className="font-display text-3xl sm:text-4xl font-bold text-ink uppercase tracking-tight leading-none"
            >
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Call to Actions */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleCreateAccount}
              className="btn-primary w-full py-4 text-xs font-black tracking-widest flex items-center justify-center gap-2 shadow-sm hover:shadow-glow"
            >
              <UserPlus className="w-4 h-4" />
              <span>CREATE ACCOUNT</span>
            </button>

            <button
              type="button"
              onClick={handleSignIn}
              className="btn-outline w-full py-4 text-xs font-black tracking-widest flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>SIGN IN</span>
            </button>
          </div>

          {/* Guarantee Note */}
          <p className="text-[10px] text-center text-muted uppercase tracking-wider font-semibold">
            Your selection is saved. You will continue directly after sign in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPromptModal;
