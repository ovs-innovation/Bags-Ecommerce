import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, RotateCcw, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSavedItems } from '../../context/SavedItemsContext';
import { BRAND_CONFIG } from '../../constants/config';

export const CartPage = () => {
  const { cart, removeFromCart, updateQty, cartTotal } = useCart();
  const { addToSaved } = useSavedItems();
  const navigate = useNavigate();

  const shipping = cartTotal >= BRAND_CONFIG.policy.freeShippingThreshold ? 0 : 149;
  const grandTotal = cartTotal + shipping;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-brand-700" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1A1715] mb-3">Your Bag is Empty</h1>
        <p className="text-sm text-stone-500 mb-8 max-w-sm">
          You haven't added anything to your bag yet. Discover our heirloom leather collections.
        </p>
        <Link to="/products" className="btn-primary px-8 py-4">
          Explore Collections <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715] mb-2">
          Your Shopping Bag
        </h1>
        <p className="text-sm text-stone-500 mb-10">
          {cart.items.length} item{cart.items.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 shadow-subtle">
                {/* Image */}
                <Link to={`/products/${item.slug}`} className="flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-24 h-28 sm:w-28 sm:h-32 object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand-600 font-bold">
                        {item.gender} · {item.category}
                      </p>
                      <Link to={`/products/${item.slug}`}>
                        <h3 className="font-serif text-base font-bold text-[#1A1715] hover:text-brand-800 transition-colors mt-0.5">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-stone-500 mt-0.5">{item.color}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-stone-400 hover:text-cognac-600 transition-colors flex-shrink-0"
                      aria-label="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Qty controls */}
                    <div className="flex items-center border border-brand-200 bg-[#FAF8F5]">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="px-2.5 py-1.5 text-stone-700 hover:bg-brand-100 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-[#1A1715]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="px-2.5 py-1.5 text-stone-700 hover:bg-brand-100 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price & Save for later */}
                    <div className="text-right">
                      <p className="font-bold text-[#1A1612]">
                        {BRAND_CONFIG.currency}{(item.price * item.qty).toLocaleString('en-IN')}
                      </p>
                      <button
                        onClick={() => {
                          addToSaved(item);
                          removeFromCart(item.id);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] text-[#7F5E38] hover:text-[#1A1612] transition-colors mt-1 font-medium"
                      >
                        <Heart className="w-3 h-3" />
                        <span>Save for later</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white p-6 shadow-subtle">
              <h2 className="font-serif text-xl font-bold text-[#1A1715] mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-semibold">{BRAND_CONFIG.currency}{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-600 font-semibold' : 'font-semibold'}>
                    {shipping === 0 ? 'FREE' : `${BRAND_CONFIG.currency}${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-brand-700 bg-brand-50 px-3 py-2 border border-brand-200">
                    Add {BRAND_CONFIG.currency}{(BRAND_CONFIG.policy.freeShippingThreshold - cartTotal).toLocaleString('en-IN')} more for FREE shipping!
                  </p>
                )}
                <div className="border-t border-brand-100 pt-3 flex justify-between">
                  <span className="font-bold text-[#1A1715]">Total</span>
                  <span className="font-bold text-lg text-[#1A1715]">{BRAND_CONFIG.currency}{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full mt-6 py-4 text-base"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <Link to="/products" className="block text-center text-xs text-stone-500 hover:text-brand-800 mt-4 transition-colors">
                ← Continue Shopping
              </Link>
            </div>

            {/* Assurances */}
            <div className="bg-white p-5 shadow-subtle space-y-3">
              <div className="flex items-center gap-3 text-xs text-stone-700">
                <Truck className="w-4 h-4 text-brand-700 flex-shrink-0" />
                <span>Delivered within <strong>4–7 business days</strong> across India</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-700">
                <RotateCcw className="w-4 h-4 text-brand-700 flex-shrink-0" />
                <span>14-day hassle-free returns on all orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
