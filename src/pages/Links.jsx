import React, { useState } from 'react';
import { Music, Video, ShoppingBag, Calendar, Mail, Instagram, Twitter, Youtube, } from 'lucide-react';
import { FaTiktok, FaSpotify } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5";

const Links = () => {
  const [email, setEmail] = useState('');

  const links = [
    {
      id: 1,
      title: "YOUTUBE",
      subtitle: "Subscribe to my channel",
      icon: Youtube,
      href: "https://www.youtube.com/@acens.e?sub_confirmation=1",
      size: "large",
      color: "from-red-900 to-red-700",
    },
    {
      id: 2,
      title: "Spotify",
      subtitle: "Follow on Spotify",
      icon: FaSpotify,
      href: "https://open.spotify.com/artist/7c2Bm7qKetW9SousKvrQ6y",
      size: "large",
      color: "from-green-900 to-green-700",
    },
    {
      id: 3,
      title: "Merch Store",
      subtitle: "Get your exclusive merchandise!",
      icon: ShoppingBag,
      href: "https://underground-dept.xyz",
      size: "large",
      color: "from-slate-900 to-slate-700"
    },
    {
      id: 5,
      title: "Bookings & Collaborations",
      subtitle: "Contact management for bookings and collaborations.",
      icon: Calendar,
      href: "mailto:itsacense@gmail.com",
      size: "medium",
      color: "from-blue-900 to-blue-700"
    },
    {
      id: 6,
      title: "Newsletter",
      subtitle: "Join 300+ fans for exclusive content and updates.",
      icon: Mail,
      href: "#newsletter",
      size: "medium",
      color: "from-orange-900 to-orange-700"
    },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/acens.e', color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: FaXTwitter, href: 'https://x.com/acense135', color: 'hover:text-blue-400' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@acens.e', color: 'hover:text-red-500' },
    { name: 'TikTok', icon: FaTiktok, href: 'https://tiktok.com/@acens.e', color: 'hover:text-cyan-400' },
    { name: 'Website', icon: IoGlobeOutline, href: 'https://acense.xyz', color: 'hover:text-indigo-500' }
  ];

  const streamingLinks = [
    { name: 'Spotify', logo: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png', href: 'https://open.spotify.com/artist/7c2Bm7qKetW9SousKvrQ6y' },
    { name: 'Apple Music', logo: 'https://res.cloudinary.com/bradley-cdn/image/upload/v1786191059/apple-music-logo-svgrepo-com_hfgudb.svg', href: 'https://music.apple.com/us/artist/acense/1623561571' },
  ];

  const getSizeClass = (size) => {
    switch(size) {
      case 'large':
        return 'col-span-2 row-span-1';
      case 'medium':
        return 'col-span-1 row-span-2';
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 bg-slate-500 h-[50vh] relative flex flex-col items-center overflow-hidden">
          <img 
            src="https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1786186880/IMG_5035_1_tbeyn2.jpg"
            alt="Acense"
            className="w-full h-full  mx-auto mb-4 object-cover scale-125"
          />
          <div className='absolute z-40 bottom-0 left-0 w-full h-1/3 flex flex-col items-start px-8'>
            <h1 className="jakarta font-bold text-4xl md:text-6xl mb-2 ">ACENSE</h1>
            <p className="jakarta text-sm md:text-base text-gray-400">&#x1F1F0;&#x1F1EA; Rapper | Performing Artist | Songwriter</p>
              {/* Social Links */}
              <div className="flex justify-center gap-4 md:gap-6 my-4 ">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <div
                      key={social.name}
                      onClick={() => window.open(social.href, '_blank')}
                      className={`w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 ${social.color} transition-all hover:scale-110 cursor-pointer`}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  );
                })}
              </div>
          </div>

          <div className='w-full absolute z-20 bg-gradient-to-b from-[#0a0a0a]/0 via-[#0a0a0a]/50 via-30% to-[#0a0a0a] flex h-1/2 bottom-0'></div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4 mb-8 auto-rows-[80px] md:auto-rows-[100px] px-3">
          {links.map((link) => {
            const Icon = link.icon;
            
            return (
              <div
                key={link.id}
                onClick={() => handleLinkClick(link.href)}
                className={`${getSizeClass(link.size)} bg-gradient-to-br ${link.color} rounded-2xl p-4 md:p-6 flex flex-col justify-between hover:scale-[1.02] transition-all group cursor-pointer border-[1.4px] border-white/10 overflow-hidden`}
              >
                <div className='flex items-center w-full gap-2'>
                  <Icon className="min-w-6 min-h-6 md:w-8 md:h-8 group-hover:scale-110 transition-tranjakartaorm" />
                  <h3 className="bebas text-xl md:text-2xl mb-1 leading-none mt-1">{link.title}</h3>
                </div>
                <div>
                  {link.subtitle && (
                    <p className="jakarta text-xs md:text-sm text-white/70">{link.subtitle}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Streaming Platforms */}
        <div className="mb-8 px-3">
          <h3 className="bebas text-xl md:text-2xl mb-4 text-center text-gray-400">Stream Everywhere</h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {streamingLinks.map((platform) => (
              <div
                key={platform.name}
                onClick={() => window.open(platform.href, '_blank')}
                className="bg-white/5 rounded-xl p-4 md:p-6 flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 group cursor-pointer h-16"
              >
                <img 
                  src={platform.logo} 
                  alt={platform.name}
                  className="w-20 md:w-10 md:h-10 group-hover:scale-110 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>



        {/* Newsletter Signup */}
        <div className="bg-gradient-to-br from-orange-900/20 to-orange-700/20 rounded-2xl p-6 md:p-8 border border-orange-700/30 mx-3">
          <h3 className="bebas text-2xl md:text-3xl mb-2 text-center">Join the Inner Circle</h3>
          <p className="jakarta text-xs md:text-sm text-gray-300 text-center mb-4 md:mb-6">
            Get exclusive unreleased tracks, early access to merch, and behind-the-scenes content
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-orange-700 focus:outline-none jakarta text-sm md:text-base"
            />
            <button
              onClick={handleNewsletterSubmit}
              className="px-6 py-3 bg-orange-700 hover:bg-orange-800 rounded-lg transition-all bebas text-base md:text-lg whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
          <p className="jakarta text-xs text-gray-400 text-center mt-3">
            Join 300+ real fans supporting the movement
          </p>
        </div>

        {/* Footer */}
        <div className="text-center my-8 md:mt-12">
          <p className="jakarta text-xs md:text-sm text-gray-500">
            © 2026 Acense. Underground District Records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Links;