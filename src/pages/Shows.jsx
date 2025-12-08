import React from 'react'
import { DonDada } from '../assets/images/posters'
import { Navbar } from '../components'

const Shows = () => {
  return (
    <>
    <Navbar />
    <section className="w-full px-10 sm:px-4 pb-10 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl bebas text-white mb-2 text-center">
        SHOWS & TOURS
      </h1>
      <div className="w-full py-8 flex items-center justify-center">
        <h1 className="text-base sf text-center text-white/50">No Upcoming Shows at the moment</h1>
      </div>
    </section>
    </>
  )
}

export default Shows