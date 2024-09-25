import React, { useState, useEffect } from 'react';
import { URlogo } from '../assets/images';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className={`w-full flex items-center justify-between h-auto px-20 py-2 fixed z-[999] top-0 left-0 transition-all duration-300 bg-transparent ${
        scrolled ? 'scrolled' : ''
      }`}
    >
      <ul className="flex w-1/3 items-center justify-center gap-8">
        <li>
          <ScrollLink
            className="nav-link bebas text-xl cursor-pointer"
            to="bio"
            smooth={true} 
            duration={500}>
            About
          </ScrollLink>
        </li>
        <li>
          <Link className="nav-link bebas text-xl" to="/gallery">
            Gallery
          </Link>
        </li>
      </ul>
      <div>
        <img src={URlogo} alt="Logo" className="h-16" />
      </div>
      <ul className="flex w-1/3 items-center justify-center gap-8">
        <li>
          <Link className="nav-link bebas text-xl" to="/discography">
            Discography
          </Link>
        </li>
        <li>
          <ScrollLink
            className="nav-link bebas text-xl cursor-pointer"
            to="contact"
            smooth={true} 
            duration={500}>
            Contact
          </ScrollLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
