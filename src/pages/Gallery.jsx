import React, { useState } from 'react';
import { Download, X } from 'lucide-react';
import { Navbar } from '../components';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Your Cloudinary images - just add URLs here
  const images = [
    "https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765224260/JPG09820_l936p9.jpg",
    "https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765007436/brad2_ao3pac.jpg",
    "https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765007432/brad_hfmihl.jpg",
    "https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765222202/DSC_0171_yy62yn.jpg",
    "https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765222277/DSC_0554-01_1_l6sox9.jpg",
    "https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765222272/hero_kxk9lx.jpg",
    "https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765223796/IMG_4154_dlynzz.heic",
    "https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765224257/JPG09826_hetve0.jpg",

  ];

  // Bento grid size patterns that repeat
  const sizePatterns = [
    'col-span-2 row-span-2', // large square
    'col-span-1 row-span-1', // small square
    'col-span-1 row-span-1', // small square
    'col-span-2 row-span-1', // wide rectangle
    'col-span-1 row-span-2', // tall rectangle
    'col-span-1 row-span-1', // small square
    'col-span-1 row-span-1', // small square
    'col-span-2 row-span-2', // large square
    'col-span-1 row-span-1', // small square
    'col-span-1 row-span-1', // small square
  ];

  // Function to get optimized Cloudinary URL
  const getOptimizedUrl = (url, quality = 'auto:low') => {
    // Check if it's a Cloudinary URL
    if (url.includes('cloudinary.com')) {
      // Insert quality tranjakartaormation before /upload/
      return url.replace('/upload/', `/upload/q_${quality},f_auto/`);
    }
    return url;
  };

  // Function to get high quality download URL
  const getDownloadUrl = (url) => {
    if (url.includes('cloudinary.com')) {
      // Get original quality for download
      return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  };

  const downloadImage = async (url, index) => {
    try {
      const downloadUrl = getDownloadUrl(url);
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `gallery-image-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <>
      <Navbar />
      
      <section className="min-h-screen pt-20 pb-12 px-4 md:px-20 abstract-bg">
        {/* ── Giant headline block ── */}
        <div className="relative pb-0 overflow-hidden">
          <h1
            className="jakarta text-7xl md:text-9xl lg:text-[200px] xl:text-[260px] xl:max-w-4/5 font-black uppercase leading-none tracking-tight select-none bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #0e0e0e 0%, #d24700 50%, #0e0e0e 100%)",
            }}
          >
            GALLERY
          </h1>

          <p
            className="absolute top-6 right-8 text-[9px] sm:text-[10px] uppercase tracking-widest
                       text-right max-w-[155px] text-white/40 leading-loose hidden md:block"
          >
            RAW TALENT SIJAEKEWA DIESEL AMA PETROL,
            BUT NARAP KA MACHINE [KAMA SHIN]
            AND I AIN'T TALKING CLEPTO
          </p>
        </div>

        <div className="max-w-7xl mx-auto">

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
            {images.map((image, index) => {
              const sizeClass = sizePatterns[index % sizePatterns.length];
              
              return (
                <div
                  key={index}
                  className={`${sizeClass} group relative overflow-hidden rounded-lg cursor-pointer`}
                  onClick={() => setSelectedImage(image)}
                >
                  {/* Image with low quality for preview */}
                  <img
                    src={getOptimizedUrl(image, 'auto:low')}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-tranjakartaorm duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image, index);
                      }}
                      className="bg-white text-black p-3 rounded-full hover:scale-110 transition-tranjakartaorm"
                      aria-label="Download image"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <img
            src={getOptimizedUrl(selectedImage, 'auto:good')}
            alt="Selected gallery image"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              downloadImage(selectedImage, images.indexOf(selectedImage));
            }}
            className="absolute bottom-8 bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition-tranjakartaorm flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium jakarta">Download</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;