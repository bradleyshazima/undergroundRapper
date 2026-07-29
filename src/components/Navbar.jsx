import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Triggers as soon as the user scrolls past 20px
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        id="navbar"
        className={`w-full flex h-auto fixed z-[999] top-0 left-0 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-[#1a0900]/50 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Main Navbar for larger screens */}
        <div className="w-full hidden md:flex justify-between h-auto px-20 sm:px-4 py-2">
          <ul className="flex w-1/3 items-center justify-center gap-8">
            <li>
              <Link
                className="nav-link jakarta font-semibold text-xl md:text-lg sm:text-base cursor-pointer"
                to="/"
                smooth={true}
                duration={500}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link className="nav-link jakarta font-semibold text-xl md:text-lg sm:text-base" to="/music">
                MUSIC
              </Link>
            </li>
            <li>
              <Link className="nav-link jakarta font-semibold text-xl md:text-lg sm:text-base" to="/videos">
                VIDEOS
              </Link>
            </li>
          </ul>

          <div>
            <img 
              src="https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1785165346/Acense-text-long_oqvr5s.png" 
              alt="Logo" 
              className="h-6 md:h-8 my-4" 
            />
          </div>

          <ul className="flex w-1/3 items-center justify-center gap-8">
            <li>
              <Link className="nav-link jakarta font-semibold text-xl md:text-lg sm:text-base" to="/gallery">
                GALLERY
              </Link>
            </li>
            <li>
              <Link
                className="nav-link jakarta font-semibold text-xl md:text-lg sm:text-base cursor-pointer"
                to="/shows&tours"
                smooth={true}
                duration={500}
              >
                SHOWS
              </Link>
            </li>
            <li>
              <Link
                className="nav-link jakarta font-semibold text-xl md:text-lg sm:text-base cursor-pointer"
                to="/shop"
                smooth={true}
                duration={500}
              >
                SHOP
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Navbar for extra small screens */}
        {/* Removed static background classes so it adapts to scroll state */}
        <div className="w-full flex items-center justify-between py-4 px-6 md:hidden">
          <div className="flex-1 flex justify-center">
            <img 
              src="https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1785165346/Acense-text-long_oqvr5s.png" 
              alt="Logo" 
              className="h-6" 
            />
          </div>

          <div className="absolute right-6 z-[999]" onClick={toggleMenu}>
            <p className="text-white text-base font-semibold cursor-pointer">MENU</p>
          </div>
        </div>
      </nav>

      {/* Sidenav for mobile view */}
      <div
        className={`fixed z-[9999] top-0 right-0 h-full bg-[#1a0900]/80 backdrop-blur-2xl w-screen transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="w-full flex justify-end items-center py-4 px-8">
          <i className="fa-solid fa-times text-white text-2xl cursor-pointer" onClick={toggleMenu}></i>
        </div>
        <ul className="flex flex-col items-center p-6 gap-6">
          <li>
            <Link
              className="text-white text-4xl cursor-pointer jakarta font-semibold nav-link"
              to="/"
              smooth={true}
              duration={500}
              onClick={toggleMenu}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link className="text-white text-4xl jakarta font-semibold nav-link" to="/music" onClick={toggleMenu}>
              MUSIC
            </Link>
          </li>
          <li>
            <Link className="text-white text-4xl jakarta font-semibold nav-link" to="/videos" onClick={toggleMenu}>
              VIDEOS
            </Link>
          </li>
          <li>
            <Link className="text-white text-4xl jakarta font-semibold nav-link" to="/gallery" onClick={toggleMenu}>
              GALLERY
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-4xl cursor-pointer jakarta font-semibold nav-link"
              to="/shows&tours"
              smooth={true}
              duration={500}
              onClick={toggleMenu}
            >
              SHOWS & TOURS
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-4xl cursor-pointer jakarta font-semibold nav-link"
              to="/shop"
              smooth={true}
              duration={500}
              onClick={toggleMenu}
            >
              SHOP
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;