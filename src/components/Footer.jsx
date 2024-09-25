import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-40 py-5 flex flex-col gap-4">
      <p className='w-full flex items-center justify-center text-white'>© {currentYear} Acense is a trademark of Underground Rapper Label</p>
      <div className='flex justify-center items-center text-white gap-8'>
        <Link>Privacy Policy</Link>
        <Link>Terms of Service</Link>
      </div>
    </footer>
  )
}

export default Footer;
