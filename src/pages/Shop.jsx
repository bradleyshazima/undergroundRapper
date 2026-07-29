import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Download, ArrowRight } from 'lucide-react';
import { Navbar, CheckoutModal } from '../components';

const dummyProducts = [
  {
    id: 1,
    title: 'IDENTITY CRISIS (DIGITAL)',
    type: 'digital',
    price: 1500, // KES for example
    image: 'https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765224260/JPG09820_l936p9.jpg', // Replace with album art
    description: 'High-quality WAV/MP3 files + Digital Booklet.',
  },
  {
    id: 2,
    title: 'IDENTITY CRISIS (VINYL)',
    type: 'physical',
    price: 4500,
    image: 'https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765222272/hero_kxk9lx.jpg',
    description: 'Limited edition 12" vinyl. Includes exclusive bonus track.',
  },
  {
    id: 3,
    title: 'IDENTITY CRISIS (FLASHDISK)',
    type: 'physical',
    price: 2500,
    image: 'https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765223796/IMG_4154_dlynzz.heic',
    description: 'Custom 16GB engraved flashdisk packed with the album and behind-the-scenes footage.',
  },
  {
    id: 4,
    title: 'UNDERGROUND TRIBE HOODIE',
    type: 'physical',
    price: 3500,
    image: 'https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765007436/brad2_ao3pac.jpg', // Replace with merch pic
    description: 'Heavyweight premium hoodie. Black on black.',
  }
];

const Shop = () => {
  const navigate = useNavigate();
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [restoreEmail, setRestoreEmail] = useState('');

  // Trigger newsletter popup shortly after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check local storage so we don't annoy users every single time
      const hasSeenNewsletter = localStorage.getItem('acense_newsletter');
      if (!hasSeenNewsletter) {
        setShowNewsletter(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const closeNewsletter = () => {
    localStorage.setItem('acense_newsletter', 'true');
    setShowNewsletter(false);
  };

  const handleRestorePurchase = (e) => {
    e.preventDefault();
    if (restoreEmail) {
      // In production, verify email via backend. For now, route directly:
      navigate('/download', { state: { email: restoreEmail } });
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-12 lg:pt-20 pb-20 text-white px-4 lg:px-32 abstract-bg">
        
        {/* ── Giant headline block ── */}
        <div className="relative pb-0 overflow-hidden md:px-12">
          <h1
            className="md:py-8 jakarta text-7xl md:text-9xl xl:text-[260px] font-black uppercase leading-none tracking-tight select-none bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #0e0e0e 0%, #d24700 50%, #0e0e0e 100%)",
            }}
          >
            STORE
          </h1>
          <p
            className="absolute top-6 right-8 text-[9px] sm:text-[10px] uppercase tracking-widest
                       text-right max-w-[155px] text-white/40 leading-loose hidden md:block"
          >
            SUPPORT THE MOVEMENT. 
            IDENTITY CRISIS OUT NOW.
            UNDERGROUND TRIBE EXCLUSIVES.
          </p>
        </div>

        <div className="border-t border-white/20 mt-0 mb-12 md:mx-12" />

        {/* ── Store Grid ── */}
        <div className="md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {dummyProducts.map((product) => (
            <div key={product.id} className="group relative blur-div hover:border-[#d24700]/50 transition-colors duration-300 rounded-md overflow-hidden flex flex-col">
              <div className="aspect-square overflow-hidden bg-black/50 relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#d24700] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  {product.type}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="jakarta text-xl font-black uppercase tracking-wide mb-2">{product.title}</h3>
                  <p className="text-sm text-white/50 mb-6">{product.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-bold text-lg">KES {product.price}</span>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 hover:bg-[#d24700] hover:text-white transition-colors duration-300 uppercase text-xs font-bold tracking-widest"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Access Past Purchases ── */}
        <div className="md:px-12">
          <div className="blur-div p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="jakarta text-3xl font-black uppercase mb-2">Lost your files?</h3>
              <p className="text-white/60 text-sm">Enter the email you used to purchase the digital album to restore your download link.</p>
            </div>
            <form onSubmit={handleRestorePurchase} className="w-full md:w-1/2 flex">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                required
                value={restoreEmail}
                onChange={(e) => setRestoreEmail(e.target.value)}
                className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d24700] uppercase text-xs tracking-widest"
              />
              <button type="submit" className="bg-[#d24700] px-6 py-3 hover:bg-white hover:text-black transition-colors flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

      </section>

      {/* ── Newsletter Popup ── */}
      {showNewsletter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#d24700]/30 max-w-lg w-full p-8 relative shadow-2xl">
            <button onClick={closeNewsletter} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="jakarta text-4xl font-black uppercase mb-4 text-[#d24700]">Join the Tribe</h2>
            <p className="text-white/70 mb-8 text-sm leading-relaxed">
              Drop your email to get early access to merch drops, exclusive underground tracks, and updates on the <strong>"IDENTITY CRISIS"</strong> album.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="flex-1 bg-black border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d24700] uppercase text-xs tracking-widest"
              />
              <button onClick={closeNewsletter} className="bg-white text-black px-6 font-bold uppercase text-xs tracking-widest hover:bg-[#d24700] hover:text-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Checkout Modal ── */}
      {selectedProduct && (
        <CheckoutModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
};

export default Shop;