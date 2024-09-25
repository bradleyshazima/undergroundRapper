import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <section id='contact' className='w-full flex px-40 py-20 gap-8'>
      <div className='w-1/2'>
        <h3 className='bebas text-8xl text-white'>FOR BOOKINGS & GIGS,</h3>
        <h3 className='bebas text-8xl text-white'>REACH OUT</h3>
      </div>
      <div className='flex flex-col w-1/2 gap-4'>
        <p className='text-white text-lg'>"Looking to book Acense for your next event? Get in touch for performances, collaborations, or inquiries. Let’s make it happen!"</p>
        <Link to='mailto:itsacense@gmail.com'>
          <div className='w-full flex items-center gap-4 px-8 py-4 border-2 border-white'>
            <i class="fa-sharp fa-regular fa-envelope text-white"></i>
            <p className='text-white bebas'>itsacense@gmail.com</p>
          </div>
        </Link>
        <Link to='https://wa.me/254797423287'>
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