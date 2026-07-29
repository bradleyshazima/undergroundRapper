import React from 'react'
import { DonDada } from '../assets/images/posters'
import { Navbar } from '../components'

const Shows = () => {
  return (
    <>
    <Navbar />
      <section className="min-h-screen pt-12 lg:pt-20 text-white px-4 lg:px-32 abstract-bg flex flex-col">

      {/* ── Giant headline block ── */}
      <div className="relative px-6 sm:px-12 pb-0 overflow-hidden h-fit">
        <h1
          className="jakarta text-7xl md:text-9xl lg:text-[200px] xl:text-[260px] xl:max-w-4/5 font-black uppercase leading-none tracking-tight select-none bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #0e0e0e 0%, #d24700 50%, #0e0e0e 100%)",
          }}
        >
          SHOWS
        </h1>

        {/* Decorative quote — top-right, mirrors screenshot */}
        <p
          className="absolute top-6 right-8 text-[9px] sm:text-[10px] uppercase tracking-widest
                    text-right max-w-[155px] text-white/40 leading-loose hidden md:block"
        >
          NI SAWA NAJUA ME SI SLIM SHADY BUT EVERYBODY'S,
          GONNA EMINEM [HEAR MY NAME]
        </p>
      </div>

      {/* Top divider */}
      <div className="mx-6 sm:mx-12 border-t border-white/20 mt-0" />


      <div className="w-full min-h-[60vh] py-8 flex items-center justify-center">
        <h1 className="text-base lg:text-2xl jakarta text-center text-white/50">No Upcoming Shows at the moment</h1>
      </div>
    </section>
    </>
  )
}

export default Shows