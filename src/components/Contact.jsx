import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <section id='contact' className='w-full flex flex-col px-40 md:px-36 sm:px-8 sm:py-16 py-20 xs:py-8 xs:px-4'>
      <div className='w-full flex xs:flex-col gap-8 xs:gap-4 h-full'>
        <div className='w-1/2 xs:w-full'>
          <h3 className='bebas xl:text-8xl lg:text-7xl md:text-5xl sm:text-4xl xs:text-4xl text-white'>FOR BOOKINGS & GIGS,</h3>
          <h3 className='bebas xl:text-8xl lg:text-7xl md:text-5xl sm:text-4xl xs:text-4xl text-white'>REACH OUT</h3>
        </div>
        <div className='flex flex-col w-1/2 xs:w-full gap-4'>
          <p className='text-white xl:text-lg lg:text-base md:text-sm sm:text-sm xs:text-xs tracking-wide'>Looking to book Acense for your next event? Get in touch for performances, collaborations, or inquiries. Let’s make it happen!</p>
          <Link to='mailto:itsacense@gmail.com' className='flex md:hidden sm:hidden'>
            <div className='w-full flex items-center gap-4 px-8 py-4 border-2 border-white'>
              <i class="fa-sharp fa-regular fa-envelope text-white"></i>
              <p className='text-white bebas'>itsacense@gmail.com</p>
            </div>
          </Link>
          <Link to='https://wa.me/254797423287' className='flex md:hidden sm:hidden'>
            <div className='w-full flex items-center gap-4 px-8 py-4 border-2 border-white'>
            <i class="fa-brands fa-whatsapp text-white"></i>
              <p className='text-white bebas'>+254 79 742 3287</p>
            </div>
          </Link>
        </div>
      </div>
      
      <div className='w-full hidden items-center md:flex sm:flex gap-8 mt-8'>
        <Link to='mailto:itsacense@gmail.com' className='w-1/2'>
          <div className='w-full flex items-center gap-4 px-8 py-4 border-2 border-white'>
            <i class="fa-sharp fa-regular fa-envelope text-white"></i>
            <p className='text-white bebas'>itsacense@gmail.com</p>
          </div>
        </Link>
        <Link to='https://wa.me/254797423287' className='w-1/2'>
          <div className='w-full flex items-center gap-4 px-8 py-4 border-2 border-white'>
          <i class="fa-brands fa-whatsapp text-white"></i>
            <p className='text-white bebas'>+254 79 742 3287</p>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Contact