import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, RotateCcw, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSavedItems } from '../../context/SavedItemsContext';
import { useAuth } from '../../context/AuthContext';
import { useAuthPrompt } from '../../context/AuthPromptContext';
import { BRAND_CONFIG } from '../../constants/config';

export const CartPage = () => {
  const { cart, removeFromCart, updateQty, cartTotal } = useCart();
  const { addToSaved } = useSavedItems();
  const { isAuthenticated } = useAuth();
  const { interceptAction, triggerAuthPrompt } = useAuthPrompt();
  const navigate = useNavigate();

  const shipping = cartTotal >= BRAND_CONFIG.policy.freeShippingThreshold ? 0 : 149;
  const grandTotal = cartTotal + shipping;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-fog">
        <div className="w-20 h-20 rounded-xs bg-paper border border-border flex items-center justify-center mb-6 shadow-subtle">
          <ShoppingBag className="w-8 h-8 text-ink" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-3 uppercase">Your Bag is Empty</h1>
        <p className="text-xs sm:text-sm text-muted mb-8 max-w-sm">
          You haven't added any handcrafted pieces to your bag yet. Discover our latest curated drops.
        </p>
        <Link to="/products" className="btn-primary px-8 py-4 text-xs font-black tracking-widest">
          <span>EXPLORE CREATIONS</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fog py-8 sm:py-12 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 border-b border-border pb-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink uppercase tracking-tight">
            Shopping Bag
          </h1>
          <p className="text-xs uppercase font-bold tracking-widest text-muted mt-1">
            {cart.items.length} item{cart.items.length !== 1 ? 's' : ''} reserved in atelier
          </p>
        </div>

        {/* Grid: Items & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 sm:gap-4 bg-paper border border-border p-3.5 sm:p-5 rounded-xs shadow-subtle"
              >
                {/* Image */}
                <Link to={`/products/${item.slug}`} className="flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 object-cover rounded-xs border border-border"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 py-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-accent-mid font-extrabold truncate">
                        {item.gender} · {item.category}
                      </p>
                      <Link to={`/products/${item.slug}`}>
                        <h3 className="font-sans text-sm sm:text-base font-extrabold text-ink hover:text-accent-mid transition-colors mt-0.5 line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted mt-0.5 capitalize">{item.color}</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-muted hover:text-ink transition-colors flex-shrink-0"
                      aria-label="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-border bg-fog rounded-xs">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="px-2.5 py-1.5 text-ink hover:bg-paper transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-ink">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="px-2.5 py-1.5 text-ink hover:bg-paper transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price & Save */}
                    <div className="text-right">
                      <p className="font-black text-sm sm:text-base text-ink">
                        {BRAND_CONFIG.currency}{(item.price * item.qty).toLocaleString('en-IN')}
                      </p>
                      <button
                        onClick={() => {
                          interceptAction({
                            action: 'WISHLIST',
                            product: item,
                            onAuthenticated: () => {
                              addToSaved(item);
                              removeFromCart(item.id);
                            },
                          });
                        }}
                        className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-ink transition-colors mt-1 font-bold uppercase tracking-wider"
                      >
                        <Heart className="w-3 h-3 text-red-500" />
                        <span className="hidden sm:inline">Save for later</span>
                        <span className="sm:hidden">Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-4 sticky top-24">
            <div className="bg-paper border border-border p-6 rounded-xs shadow-subtle">
              <h2 className="font-display text-2xl font-bold text-ink uppercase tracking-wide mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-ink/75">
                  <span>Subtotal</span>
                  <span className="font-bold text-ink">{BRAND_CONFIG.currency}{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-ink/75">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-accent-mid font-extrabold' : 'font-bold text-ink'}>
                    {shipping === 0 ? 'FREE' : `${BRAND_CONFIG.currency}${shipping}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-[11px] text-ink bg-accent/20 px-3 py-2 border border-accent/40 rounded-xs font-semibold">
                    Add {BRAND_CONFIG.currency}{(BRAND_CONFIG.policy.freeShippingThreshold - cartTotal).toLocaleString('en-IN')} more for FREE shipping!
                  </p>
                )}

                <div className="border-t border-border pt-3.5 flex justify-between items-baseline">
                  <span className="font-black text-sm uppercase text-ink">Total</span>
                  <span className="font-black text-xl text-ink">
                    {BRAND_CONFIG.currency}{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    triggerAuthPrompt({
                      action: 'BUY_NOW',
                      product: cart.items[0],
                      returnUrl: '/checkout',
                    });
                    return;
                  }
                  navigate('/checkout');
                }}
                className="btn-primary w-full mt-6 py-4 text-xs font-black tracking-widest shadow-sm hover:shadow-glow"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/products"
                className="block text-center text-xs font-bold uppercase tracking-wider text-muted hover:text-ink mt-4 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Assurances */}
            <div className="bg-paper border border-border p-5 rounded-xs shadow-subtle space-y-3 text-xs">
              <div className="flex items-center gap-3 text-ink/80">
                <Truck className="w-4 h-4 text-accent-mid flex-shrink-0" />
                <span>Pan-India delivery in <strong>4–7 business days</strong></span>
              </div>
              <div className="flex items-center gap-3 text-ink/80">
                <RotateCcw className="w-4 h-4 text-accent-mid flex-shrink-0" />
                <span><strong>14-day</strong> hassle-free returns on all pieces</span>
              </div>
              <div className="flex items-center gap-3 text-ink/80">
                <ShieldCheck className="w-4 h-4 text-accent-mid flex-shrink-0" />
                <span><strong>1-Year</strong> craftsmanship warranty</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CartPage;
