import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { Download as DownloadIcon, FolderDown, Music, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components';
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const Download = () => {
  const location = useLocation();
  const { email, product } = location.state || {};

  const [files, setFiles] = useState([]);
  const [zipUrl, setZipUrl] = useState(null);
  const [filesLoading, setFilesLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState(product || null);

  useEffect(() => {
    if (!email) return;

    const fetchFiles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/payments/get-files`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (!data.success) throw new Error(data.message);

        setOrderInfo(data.product);
        setZipUrl(data.zipUrl);
        setFiles(data.files);
      } catch (err) {
        console.error('Failed to fetch files:', err.message);
      } finally {
        setFilesLoading(false);
      }
    };

    fetchFiles();
  }, [email]);

  // Protect route: if no email passed, send them back to shop
  if (!email) {
    return <Navigate to="/shop" />;
  }

  const handleDownloadAll = () => {
    if (zipUrl) {
      window.open(zipUrl, '_blank');
    } else {
      alert('Full ZIP not available yet. Please download tracks individually.');
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-24 pb-12 px-4 md:px-20 abstract-bg">
        <div className="max-w-4xl mx-auto">
          
          <Link to="/shop" className="inline-flex items-center gap-2 text-white/50 hover:text-[#d24700] text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>

          <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 mb-8">
            <h1 className="jakarta text-3xl md:text-5xl font-black uppercase mb-2 text-[white]">Digital Vault</h1>
            <p className="text-white/60 mb-8">Access granted for <span className="text-[#d24700] font-bold">{email}</span></p>

            <div className="bg-[#111] border border-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-black overflow-hidden flex-shrink-0">
                  <img 
                    src="https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765224260/JPG09820_l936p9.jpg" 
                    alt="Album Cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="jakarta text-xl font-bold uppercase text-white">
                    {orderInfo?.title || 'Your Purchase'}
                  </h2>
                  <p className="text-sm text-white/40 mt-1">High-Quality Audio + Artwork</p>
                </div>
              </div>
              
              <button 
                onClick={handleDownloadAll}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#d24700] text-white px-6 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors"
              >
                <FolderDown className="w-5 h-5" /> Download Full Zip
              </button>
            </div>

            {/* Individual Files list mimicking your Videos setup */}
            <div className="w-full mt-12">
              <h3 className="text-xs text-white/40 uppercase tracking-widest font-bold mb-4">Individual Files</h3>
              <div className="border-t border-white/10" />
              
                {filesLoading ? (
                  <div className="py-8 text-center text-white/40 jakarta text-xs uppercase tracking-widest animate-pulse">
                    Loading your files...
                  </div>
                ) : files.length === 0 ? (
                  <div className="py-8 text-center text-white/40 jakarta text-xs uppercase tracking-widest">
                    No files found for this order. Contact itsacense@gmail.com
                  </div>
                ) : (
                  files.map((file, index) => (
                    <div key={file.id}>
                      <div className="flex items-center justify-between py-4 group hover:bg-white/5 px-4 transition-colors -mx-4">
                        <div className="flex items-center gap-4">
                          <Music className="w-4 h-4 text-white/30 group-hover:text-[#d24700]" />
                          <span className="text-sm font-semibold tracking-wider text-white/80 group-hover:text-white transition-colors">
                            {file.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="text-[10px] text-white/40 geomanist tabular-nums hidden sm:block">{file.size}</span>
                          <a
                            href={file.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="text-white/50 hover:text-white group-hover:scale-110 transition-all p-2"
                          >
                            <DownloadIcon className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <div className="border-t border-white/5" />
                    </div>
                  ))
                )}
            </div>

          </div>
          
          <p className="text-center text-[10px] text-white/30 uppercase tracking-widest">
            Having trouble? Contact support at itsacense@gmail.com
          </p>
        </div>
      </section>
    </>
  );
};

export default Download;