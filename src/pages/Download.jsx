import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { Download as DownloadIcon, FolderDown, Music, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components';

const dummyFiles = [
  { id: 1, name: '01_Intro_The_Awakening.wav', size: '45 MB' },
  { id: 2, name: '02_Vultures_feat_Mapema.wav', size: '52 MB' },
  { id: 3, name: '03_Street_Gospel.wav', size: '48 MB' },
  { id: 4, name: 'Identity_Crisis_Digital_Booklet.pdf', size: '12 MB' },
];

const Download = () => {
  const location = useLocation();
  const { email, product } = location.state || {};

  // Protect route: if no email passed, send them back to shop
  if (!email) {
    return <Navigate to="/shop" />;
  }

  const handleDownloadAll = () => {
    // In production, this would trigger a zip file download from your server/AWS/Cloudinary
    alert("Starting download for the full IDENTITY CRISIS ZIP folder...");
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
                  <h2 className="jakarta text-xl font-bold uppercase text-white">Identity Crisis (Digital Album)</h2>
                  <p className="text-sm text-white/40 mt-1">High-Quality WAV Audio + Artwork</p>
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
              
              {dummyFiles.map((file, index) => (
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
                      <button className="text-white/50 hover:text-white group-hover:scale-110 transition-all p-2">
                        <DownloadIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-white/5" />
                </div>
              ))}
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