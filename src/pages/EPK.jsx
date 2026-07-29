import React, { useState } from 'react';
import { Download, Mail, Phone, MapPin, Music, Video, FileText } from 'lucide-react';
import { Navbar } from '../components';

const EPK = () => {
  const [activeSection, setActiveSection] = useState('bio');

  const epkData = {
    bio: {
      fullName: "Acense",
      stageName: "Acense",
      location: "Umoja, Nairobi, Kenya",
      genre: "Hip Hop / Rap",
      yearsActive: "2020 - Present",
      description: "Born and raised in Umoja, Nairobi, Acense brings the raw energy of Eastlands to his music, blending old-school rap influences from legends like Tupac and Nas with his own Kenyan flavor. From his high school rap crew to going solo with tracks like Babyface Savage and Chini Ya Wabling, Acense is carving his path in the underground scene."
    },
    contact: {
      email: "itsacense@gmail.com",
      phone: "+254 79 742 3287",
      booking: "itsacense@gmail.com",
      management: "itsacense@gmail.com"
    },
    stats: {
      totalStreams: "100K+",
      monthlyListeners: "10K+",
      releases: "12",
      musicVideos: "11"
    },
    press: [
      "Featured in local Kenyan hip-hop playlists",
      "Underground scene recognition",
      "Growing fanbase in Eastlands"
    ],
    assets: [
      { type: 'Photos', count: 8 },
      { type: 'Music Videos', count: 11 },
      { type: 'Released Tracks', count: 12 },
      { type: 'Press Release', count: 1 }
    ]
  };

  const downloadEPK = () => {
    alert('EPK Download functionality - Connect to your backend to generate PDF');
  };

  const getAssetIcon = (type) => {
    switch(type) {
      case 'Photos': return '📸';
      case 'Music Videos': return '🎬';
      case 'Released Tracks': return '🎵';
      case 'Press Release': return '📄';
      default: return '📁';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] text-white pb-20 pt-20">
        {/* Header */}
        <div className="relative h-[40vh] md:h-[50vh] bg-gradient-to-b from-red-950/20 to-[#0a0a0a]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: 'url(https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765007432/brad_hfmihl.jpg)' }}
          />
          <div className="relative h-full flex flex-col items-center justify-center px-4">
            <h1 className="deutsch text-5xl md:text-7xl lg:text-9xl mb-4">ACENSE</h1>
            <p className="jakarta text-base md:text-xl lg:text-2xl text-gray-400">Electronic Press Kit</p>
            <button 
              onClick={downloadEPK}
              className="mt-6 md:mt-8 bg-red-700 hover:bg-red-800 px-6 md:px-8 py-2 md:py-3 rounded-lg flex items-center gap-2 transition-colors bebas text-base md:text-lg"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              Download Full EPK
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="sticky top-16 md:top-20 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 z-40">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex gap-2 md:gap-8 overflow-x-auto py-3 md:py-4 scrollbar-hide">
              {['bio', 'stats', 'press', 'assets', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`bebas text-base md:text-lg lg:text-xl px-3 md:px-4 py-2 whitespace-nowrap transition-colors ${
                    activeSection === section 
                      ? 'text-white border-b-2 border-red-700' 
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {section.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Bio Section */}
          {activeSection === 'bio' && (
            <div className="space-y-6 md:space-y-8">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <img 
                    src="https://res.cloudinary.com/bradley-cdn/image/upload/v1765007436/brad2_ao3pac.jpg"
                    alt="Acense"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="bebas text-2xl md:text-3xl text-red-700 mb-2">ARTIST BIO</h3>
                    <p className="jakarta text-sm md:text-base text-gray-300 leading-relaxed">{epkData.bio.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <p className="jakarta text-gray-500 text-xs md:text-sm">Stage Name</p>
                      <p className="jakarta font-semibold text-sm md:text-base">{epkData.bio.stageName}</p>
                    </div>
                    <div>
                      <p className="jakarta text-gray-500 text-xs md:text-sm">Genre</p>
                      <p className="jakarta font-semibold text-sm md:text-base">{epkData.bio.genre}</p>
                    </div>
                    <div>
                      <p className="jakarta text-gray-500 text-xs md:text-sm">Location</p>
                      <p className="jakarta font-semibold text-sm md:text-base">{epkData.bio.location}</p>
                    </div>
                    <div>
                      <p className="jakarta text-gray-500 text-xs md:text-sm">Years Active</p>
                      <p className="jakarta font-semibold text-sm md:text-base">{epkData.bio.yearsActive}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Section */}
          {activeSection === 'stats' && (
            <div className="space-y-6 md:space-y-8">
              <h3 className="bebas text-3xl md:text-4xl text-red-700 mb-6 md:mb-8">CAREER STATS</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {Object.entries(epkData.stats).map(([key, value]) => (
                  <div key={key} className="bg-white/5 p-4 md:p-6 rounded-lg border border-white/10 hover:border-red-700 transition-colors">
                    <p className="jakarta text-3xl md:text-4xl lg:text-5xl font-bold text-red-700 mb-2">{value}</p>
                    <p className="jakarta text-xs md:text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Press Section */}
          {activeSection === 'press' && (
            <div className="space-y-6 md:space-y-8">
              <h3 className="bebas text-3xl md:text-4xl text-red-700 mb-6 md:mb-8">PRESS & RECOGNITION</h3>
              <div className="space-y-4">
                {epkData.press.map((item, index) => (
                  <div key={index} className="bg-white/5 p-4 md:p-6 rounded-lg border-l-4 border-red-700">
                    <p className="jakarta text-sm md:text-base text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assets Section */}
          {activeSection === 'assets' && (
            <div className="space-y-6 md:space-y-8">
              <h3 className="bebas text-3xl md:text-4xl text-red-700 mb-6 md:mb-8">DOWNLOADABLE ASSETS</h3>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {epkData.assets.map((asset, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 p-6 md:p-8 rounded-lg border border-white/10 hover:border-red-700 transition-all cursor-pointer group"
                  >
                    <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-tranjakartaorm">
                      {getAssetIcon(asset.type)}
                    </div>
                    <h4 className="bebas text-xl md:text-2xl mb-2">{asset.type}</h4>
                    <p className="jakarta text-sm md:text-base text-gray-400">{asset.count} files available</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <div className="space-y-6 md:space-y-8">
              <h3 className="bebas text-3xl md:text-4xl text-red-700 mb-6 md:mb-8">CONTACT INFORMATION</h3>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white/5 p-4 md:p-6 rounded-lg border border-white/10 flex items-start gap-3 md:gap-4">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-red-700 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="jakarta font-semibold mb-1 text-sm md:text-base">General Inquiries</p>
                    <a href={`mailto:${epkData.contact.email}`} className="jakarta text-xs md:text-sm text-gray-400 hover:text-red-700 break-all">
                      {epkData.contact.email}
                    </a>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 md:p-6 rounded-lg border border-white/10 flex items-start gap-3 md:gap-4">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-red-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="jakarta font-semibold mb-1 text-sm md:text-base">Phone</p>
                    <p className="jakarta text-xs md:text-sm text-gray-400">{epkData.contact.phone}</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 md:p-6 rounded-lg border border-white/10 flex items-start gap-3 md:gap-4">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-red-700 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="jakarta font-semibold mb-1 text-sm md:text-base">Booking</p>
                    <a href={`mailto:${epkData.contact.booking}`} className="jakarta text-xs md:text-sm text-gray-400 hover:text-red-700 break-all">
                      {epkData.contact.booking}
                    </a>
                  </div>
                </div>

                <div className="bg-white/5 p-4 md:p-6 rounded-lg border border-white/10 flex items-start gap-3 md:gap-4">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-red-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="jakarta font-semibold mb-1 text-sm md:text-base">Based In</p>
                    <p className="jakarta text-xs md:text-sm text-gray-400">{epkData.bio.location}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EPK;