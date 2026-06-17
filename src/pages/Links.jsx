import React, { useState } from 'react';
import { Music, Video, ShoppingBag, Calendar, Mail, Instagram, Twitter, Youtube } from 'lucide-react';

const Links = () => {
  const [email, setEmail] = useState('');

  const links = [
    {
      id: 1,
      title: "Latest Release",
      subtitle: "Leo Ama Kesho",
      icon: Music,
      href: "https://open.spotify.com/track/your-track-id",
      size: "large",
      color: "from-red-900 to-red-700"
    },
    {
      id: 2,
      title: "Music Videos",
      icon: Video,
      href: "/videos",
      size: "medium",
      color: "from-purple-900 to-purple-700"
    },
    {
      id: 3,
      title: "Merch Store",
      icon: ShoppingBag,
      href: "/merch",
      size: "medium",
      color: "from-green-900 to-green-700"
    },
    {
      id: 4,
      title: "Book a Show",
      icon: Calendar,
      href: "mailto:itsacense@gmail.com",
      size: "medium",
      color: "from-blue-900 to-blue-700"
    },
    {
      id: 5,
      title: "Newsletter",
      subtitle: "Join 300+ fans",
      icon: Mail,
      href: "#newsletter",
      size: "medium",
      color: "from-orange-900 to-orange-700"
    },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/acense', color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/acense', color: 'hover:text-blue-400' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@acense', color: 'hover:text-red-500' },
    { name: 'TikTok', icon: Music, href: 'https://tiktok.com/@acense', color: 'hover:text-cyan-400' },
  ];

  const streamingLinks = [
    { name: 'Spotify', logo: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png', href: 'https://open.spotify.com/artist/your-id' },
    { name: 'Apple Music', logo: 'https://www.apple.com/v/apple-music/r/images/overview/icons/apple-music-logo__dmnfla45owae_large.png', href: 'https://music.apple.com/artist/your-id' },
  ];

  const getSizeClass = (size) => {
    switch(size) {
      case 'large':
        return 'col-span-2 row-span-2';
      case 'medium':
        return 'col-span-1 row-span-1';
      case 'wide':
        return 'col-span-2 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }
    // Backend integration would go here
    alert(`Thanks for subscribing! Welcome to the inner circle.`);
    setEmail('');
  };

  const handleLinkClick = (href) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      window.open(href, '_blank');
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <img 
            src="https://res.cloudinary.com/bradley-cdn/image/upload/v1765007436/brad2_ao3pac.jpg"
            alt="Acense"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 border-4 border-red-700 object-cover"
          />
          <h1 className="deutsch text-4xl md:text-6xl mb-2">ACENSE</h1>
          <p className="sf text-sm md:text-base text-gray-400">The Underground Rapper</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4 mb-8 auto-rows-[140px] md:auto-rows-[180px]">
          {links.map((link) => {
            const Icon = link.icon;
            
            return (
              <div
                key={link.id}
                onClick={() => handleLinkClick(link.href)}
                className={`${getSizeClass(link.size)} bg-gradient-to-br ${link.color} rounded-2xl p-4 md:p-6 flex flex-col justify-between hover:scale-[1.02] transition-all group cursor-pointer border border-white/10`}
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="bebas text-lg md:text-2xl mb-1">{link.title}</h3>
                  {link.subtitle && (
                    <p className="sf text-xs md:text-sm text-white/70">{link.subtitle}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Streaming Platforms */}
        <div className="mb-8">
          <h3 className="bebas text-xl md:text-2xl mb-4 text-center text-gray-400">Stream Everywhere</h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {streamingLinks.map((platform) => (
              <div
                key={platform.name}
                onClick={() => window.open(platform.href, '_blank')}
                className="bg-white/5 rounded-xl p-4 md:p-6 flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 group cursor-pointer"
              >
                <img 
                  src={platform.logo} 
                  alt={platform.name}
                  className="h-6 md:h-8 group-hover:scale-110 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 md:gap-6 mb-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <div
                key={social.name}
                onClick={() => window.open(social.href, '_blank')}
                className={`w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-full flex items-center justify-center border border-white/10 ${social.color} transition-all hover:scale-110 cursor-pointer`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            );
          })}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-br from-red-900/20 to-red-700/20 rounded-2xl p-6 md:p-8 border border-red-700/30">
          <h3 className="bebas text-2xl md:text-3xl mb-2 text-center">Join the Inner Circle</h3>
          <p className="sf text-xs md:text-sm text-gray-300 text-center mb-4 md:mb-6">
            Get exclusive unreleased tracks, early access to merch, and behind-the-scenes content
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-red-700 focus:outline-none sf text-sm md:text-base"
            />
            <button
              onClick={handleNewsletterSubmit}
              className="px-6 py-3 bg-red-700 hover:bg-red-800 rounded-lg transition-all bebas text-base md:text-lg whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
          <p className="sf text-xs text-gray-400 text-center mt-3">
            Join 300+ real fans supporting the movement
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 md:mt-12">
          <p className="sf text-xs md:text-sm text-gray-500">
            © 2026 Acense. Underground Rapper Label.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Links;