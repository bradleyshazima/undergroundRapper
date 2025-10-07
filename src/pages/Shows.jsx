import React from 'react'
import { DonDada } from '../assets/images/posters'
import { Navbar } from '../components'

const Shows = () => {
  return (
    <>
    <Navbar />
    <section className="w-full gap-16 pt-[100px] px-10 sm:px-4 pb-10 bg-[#131313] text-white min-h-screen flex flex-col items-center justify-center">
      <div className="w-full PY-16 px-10 flex items-center justify-center">
        <h1 className="text-[72px] italic text-transparent font-[900] bebas font-outline-2">UPCOMING SHOWS</h1>
      </div>

      {/* <div className='w-full flex h-fit gap-16 justify-center'>
        <img src={DonDada} alt="Don Dada Experience" className='w-1/3 aspect-auto grayscale hover:grayscale-0 transition-all' />
        <div className='w-1/3 flex flex-col'>
          <h3 className=' bebas text-4xl italic text-[#b91c1c]'>DON DADA EXPERIENCE</h3>
          <p className='text-2xl font-semibold'>Mwiki, Kasarani</p>
          <p className='font-semibold mt-8'>31 <sup>ST</sup>, August, 2025</p>
          <p className='font-semibold'>TICKETS</p>
          <ul>
            <li>REGULAR: <span>500 BOB</span></li>
            <li>VIP: <span>1000 BOB</span></li>
          </ul>
        </div>
      </div> */}
    </section>
    </>
  )
}

export default Shows