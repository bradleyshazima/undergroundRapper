import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, CheckCircle2, Loader2 } from 'lucide-react';

const CheckoutModal = ({ product, onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    county: '',
    constituency: '',
    street: '',
    estate: '',
    description: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── Handle Payment Trigger & Verification ──
// ── Handle Payment Trigger & Verification ──
  const handlePayment = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);
    setStatusText('Opening Paystack payment portal...');

    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://192.168.88.253:5000';

    if (!paystackKey) {
      setErrorMessage('Paystack Public Key is missing. Check your .env file and restart Vite.');
      setIsProcessing(false);
      return;
    }

    if (!window.PaystackPop) {
      setErrorMessage('Paystack SDK failed to load. Please check your network or ad blocker.');
      setIsProcessing(false);
      return;
    }

    // 1. Standard non-async success handler function (works with Paystack validator)
    const handleSuccess = function (response) {
      setStatusText('Verifying payment and generating receipt...');

      // Execute async backend verification inside IIFE
      (async () => {
        try {
          const res = await fetch(`${backendUrl}/api/payments/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reference: response.reference,
              email: formData.email,
              product,
              shippingDetails: {
                county: formData.county,
                constituency: formData.constituency,
                street: formData.street,
                estate: formData.estate,
                description: formData.description,
              },
            }),
          });

          const data = await res.json();

          if (data.success) {
            setIsSuccess(true);
            setIsProcessing(false);

            if (product.type === 'digital') {
              setTimeout(() => {
                navigate('/download', { state: { email: formData.email, product } });
              }, 2500);
            }
          } else {
            throw new Error(data.message || 'Verification failed');
          }
        } catch (error) {
          console.error('Payment Verification Failed:', error);
          setErrorMessage(error.message || 'Payment verification failed. Please contact support.');
          setIsProcessing(false);
        }
      })();
    };

    // 2. Standard non-async close handler function
    const handleClose = function () {
      setIsProcessing(false);
      setStatusText('');
    };

    // 3. Initialize Paystack setup with dual v1/v2 compatibility hooks
    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email: formData.email,
      amount: Math.round(product.price * 100), // Ensures clean subunit integer
      currency: 'KES',
      ref: 'ACENSE_' + Math.floor(Math.random() * 1000000000 + 1),
      
      // Dual mapping to guarantee execution across Paystack versions
      callback: handleSuccess,
      onSuccess: handleSuccess,
      onClose: handleClose,
      onCancel: handleClose,
    });

    // Open popup
    handler.openIframe();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <div className="bg-[#111] border border-white/10 max-w-lg w-full relative overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="border-b border-white/10 p-6 flex justify-between items-center bg-[#0a0a0a]">
          <h3 className="jakarta font-bold uppercase tracking-widest text-white text-sm">Checkout</h3>
          <button 
            onClick={onClose} 
            className="text-white/50 hover:text-white transition-colors" 
            disabled={isProcessing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="jakarta text-2xl font-black uppercase mb-2 text-[#d24700]">Payment Verified</h2>
              
              {product.type === 'digital' ? (
                <p className="text-white/60 text-sm">
                  Confirmation email sent to <strong>{formData.email}</strong>.<br />
                  Redirecting to your secure download vault...
                </p>
              ) : (
                <>
                  <p className="text-white/60 text-sm mb-6">
                    A delivery confirmation email has been sent to <strong>{formData.email}</strong>.<br />
                    Your item will be delivered to <strong>{formData.estate}, {formData.county}</strong> within 3 working days.
                  </p>
                  <button 
                    onClick={onClose} 
                    className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#d24700] hover:text-white transition-colors w-full"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Product Summary */}
              <div className="flex gap-4 mb-6 border-b border-white/10 pb-6">
                <img src={product.image} alt={product.title} className="w-20 h-20 object-cover" />
                <div className="flex flex-col justify-center">
                  <h4 className="jakarta font-bold uppercase text-sm text-white">{product.title}</h4>
                  <span className="text-xs text-white/40 uppercase tracking-widest mt-0.5">{product.type} item</span>
                  <p className="text-[#d24700] font-bold mt-1 text-base">KES {product.price.toLocaleString()}</p>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 text-red-400 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handlePayment} className="space-y-4">
                
                {/* Basic Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Email Address *</label>
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="user@example.com"
                      className="w-full bg-black border border-white/20 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#d24700]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Phone Number *</label>
                    <input 
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="07XXXXXXXX"
                      className="w-full bg-black border border-white/20 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#d24700]"
                    />
                  </div>
                </div>

                {/* Physical Product Delivery Fields */}
                {product.type === 'physical' && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-[#d24700]">Delivery Address Details</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">County *</label>
                        <input 
                          type="text"
                          name="county"
                          required
                          value={formData.county}
                          onChange={handleChange}
                          placeholder="e.g. Nairobi"
                          className="w-full bg-black border border-white/20 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#d24700]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Constituency / Sub-County *</label>
                        <input 
                          type="text"
                          name="constituency"
                          required
                          value={formData.constituency}
                          onChange={handleChange}
                          placeholder="e.g. Westlands"
                          className="w-full bg-black border border-white/20 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#d24700]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Street *</label>
                        <input 
                          type="text"
                          name="street"
                          required
                          value={formData.street}
                          onChange={handleChange}
                          placeholder="e.g. Ring Road"
                          className="w-full bg-black border border-white/20 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#d24700]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Estate / Neighborhood *</label>
                        <input 
                          type="text"
                          name="estate"
                          required
                          value={formData.estate}
                          onChange={handleChange}
                          placeholder="e.g. Parklands"
                          className="w-full bg-black border border-white/20 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#d24700]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Landmark / Description *</label>
                      <textarea 
                        name="description"
                        rows="2"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="e.g. opposite dyspring sec school, black gate next to the bakery"
                        className="w-full bg-black border border-white/20 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#d24700]"
                      />
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full mt-6 bg-[#d24700] hover:bg-[#ff5500] text-white py-4 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> {statusText || 'Processing...'}
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Pay KES {product.price.toLocaleString()} with Paystack
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;