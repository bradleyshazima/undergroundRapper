import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, CheckCircle2 } from 'lucide-react';

const CheckoutModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Payment API (e.g. Paystack) delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      if (product.type === 'digital') {
        // Wait 2 seconds so they see success, then route to downloads
        setTimeout(() => {
          navigate('/download', { state: { email: formData.email, product } });
        }, 2000);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <div className="bg-[#111] border border-white/10 max-w-md w-full relative overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-white/10 p-6 flex justify-between items-center bg-[#0a0a0a]">
          <h3 className="jakarta font-bold uppercase tracking-widest text-white">Checkout</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors" disabled={isProcessing}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="jakarta text-2xl font-black uppercase mb-2 text-[--orange]">Payment Successful</h2>
              
              {product.type === 'digital' ? (
                <p className="text-white/60 text-sm">Redirecting to your secure download vault...</p>
              ) : (
                <>
                  <p className="text-white/60 text-sm mb-6">
                    A receipt has been sent to <strong>{formData.email}</strong>. 
                    Your {product.title.toLowerCase()} will be delivered within 3 working days.
                  </p>
                  <button onClick={onClose} className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-gray-200 w-full">
                    Close
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Product Summary */}
              <div className="flex gap-4 mb-8">
                <img src={product.image} alt={product.title} className="w-20 h-20 object-cover" />
                <div className="flex flex-col justify-center">
                  <h4 className="jakarta font-bold uppercase text-sm text-white">{product.title}</h4>
                  <p className="text-[#d24700] font-bold mt-1">KES {product.price}</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Email Address</label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#d24700]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Phone Number</label>
                  <input 
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#d24700]"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full mt-6 bg-[#d24700] hover:bg-[#ff5500] text-white py-4 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Pay KES {product.price}
                    </>
                  )}
                </button>
                <p className="text-center text-[9px] text-white/30 uppercase tracking-widest mt-4">Secure payment processing will go here (Paystack)</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;