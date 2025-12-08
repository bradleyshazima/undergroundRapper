import React, { useState, useEffect } from 'react';
import { URlogo } from '../assets/images';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for sidenav

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle sidenav visibility
  };

  return (
    <>
      <nav
        id="navbar"
        className={`w-full flex h-auto fixed z-[999] top-0 left-0 transition-all duration-300 bg-[#131313] ${
          scrolled ? 'scrolled' : ''
        }`}
      >
        {/* Main Navbar for larger screens */}
        <div className="w-full hidden md:flex justify-between h-auto px-20 sm:px-4 py-2">
          <ul className="flex w-1/3 items-center justify-center gap-8">
            <li>
              <Link
                className="nav-link bebas text-xl md:text-lg sm:text-base cursor-pointer"
                to="/"
                smooth={true}
                duration={500}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link className="nav-link bebas text-xl md:text-lg sm:text-base" to="/music">
                MUSIC
              </Link>
            </li>
            <li>
              <Link className="nav-link bebas text-xl md:text-lg sm:text-base" to="/videos">
                VISUALS
              </Link>
            </li>
          </ul>
          <div>
            <img src={URlogo} alt="Logo" className="h-12 md:h-16" />
          </div>
          <ul className="flex w-1/3 items-center justify-center gap-8">
            <li>
              <Link className="nav-link bebas text-xl md:text-lg sm:text-base" to="/gallery">
                GALLERY
              </Link>
            </li>

            <li>
              <Link
                className="nav-link bebas text-xl md:text-lg sm:text-base cursor-pointer"
                to="/shows&tours"
                smooth={true}
                duration={500}
              >
                SHOWS & TOURS
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Navbar for extra small screens */}
        <div className="w-full flex items-center justify-between py-4 md:hidden">
          <div className="flex-1 flex justify-center">
            <img src={URlogo} alt="Logo" className="h-10" />
          </div>

          <div className="absolute right-6 z-20" onClick={toggleMenu}>
            <i className="fa-solid fa-bars text-white text-2xl cursor-pointer"></i>
          </div>
        </div>
      </nav>

      {/* Sidenav for mobile view */}
      <div
        className={`fixed z-[9999] top-0 right-0 h-full bg-[#131313] w-screen transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-500 ease-in-out z-50`}
      >
        <div className="w-full flex justify-end items-center py-4 px-8">
          <i className="fa-solid fa-times text-white text-2xl cursor-pointer" onClick={toggleMenu}></i>
        </div>
        <ul className="flex flex-col items-center p-6 gap-6">
          <li>
            <Link
              className="text-white text-4xl cursor-pointer bebas nav-link"
              to="/"
              smooth={true}
              duration={500}
              onClick={toggleMenu} // Close menu on click
            >
              HOME
            </Link>
          </li>
          <li>
            <Link className="text-white text-4xl bebas nav-link" to="/music" onClick={toggleMenu}>
              MUSIC
            </Link>
          </li>
          <li>
            <Link className="text-white text-4xl bebas nav-link" to="/videos" onClick={toggleMenu}>
              VISUALS
            </Link>
          </li>
          <li>
            <Link className="text-white text-4xl bebas nav-link" to="/gallery" onClick={toggleMenu}>
              GALLERY
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-4xl cursor-pointer bebas nav-link"
              to="/shows&tours"
              smooth={true}
              duration={500}
              onClick={toggleMenu}
            >
              SHOWS & TOURS
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
