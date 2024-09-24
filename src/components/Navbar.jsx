import React, { useState, useEffect } from 'react'; // Ensure hooks are imported
import { URlogo } from '../assets/images';
import { Link } from 'react-router-dom';

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
          <Link className="bebas text-xl text-white" to="#">
            About
          </Link>
        </li>
        <li>
          <Link className="bebas text-xl text-white" to="#">
            Gallery
          </Link>
        </li>
      </ul>
      <div>
        <img src={URlogo} alt="Logo" className="h-16" />
      </div>
      <ul className="flex w-1/3 items-center justify-center gap-8">
        <li>
          <Link className="bebas text-xl text-white" to="#">
            Discography
          </Link>
        </li>
        <li>
          <Link className="bebas text-xl text-white" to="#">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
