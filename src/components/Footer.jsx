import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-20 sm:px-8 xs:px-4 py-5 flex flex-col gap-4">
      <p className='w-full flex items-center justify-center text-white md:text-sm sm:text-sm xs:text-xs text-center'>© {currentYear} Acense is a trademark of Underground Rapper Label</p>
      <div className='flex justify-center items-center text-white gap-8'>
        <Link className='md:text-sm sm:text-sm text-base xs:text-xs'>Privacy Policy</Link>
        <Link className='md:text-sm sm:text-sm text-base xs:text-xs'>Terms of Service</Link>
      </div>
    </footer>
  )
}

export default Footer;
