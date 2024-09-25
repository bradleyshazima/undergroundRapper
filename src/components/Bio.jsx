import React from 'react'
import { Link } from 'react-router-dom'
import { Portrait } from '../assets/images'

const Bio = () => {
  return (
    <section id='bio' className='bg-[#131313] flex xs:flex-col w-full xl:px-40 lg:px-28 md:px-16 sm:px-8 py-20 sm:py-16 xs:py-8 gap-16 sm:gap-8 xs:gap-4'>
      <div className='w-2/5 xs:w-full xs:flex-col flex items-end md:items-start sm:items-start xs:px-4 relative'>
        <header className='hidden flex-col w-full mb-16 md:mb-8 sm:mb-4 xs:flex absolute items-center top-5'>
          <h3 className='xl:text-8xl lg:text-6xl md:text-4xl sm:text-4xl xs:text-4xl sm:z-10 deutsch text-white'><span className='text-2xl mellissa md:text-xl'>The</span>UNDERGROUND</h3>
          <h3 className='xl:text-7xl lg:text-5xl md:text-5xl sm:text-5xl xs:text-4xl grinds text-red-700 ml-8'>RAPPER </h3>
        </header>
        <div id='bioImg' className='rounded-t-full h-[600px] md:h-[420px] sm:h-[400px] xs:h-[400px] w-[420px] sm:w-[400] xs:w-full'></div>
      </div>

      <div classname='w-3/5 xs:w-full'>
        <header className='flex flex-col w-full mb-16 md:mb-8 sm:mb-4 xs:hidden'>
          <h3 className='xl:text-8xl lg:text-6xl md:text-4xl sm:text-4xl sm:z-10 deutsch text-white'><span className='text-2xl mellissa md:text-xl'>The</span>UNDERGROUND</h3>
          <h3 className='xl:text-7xl lg:text-5xl md:text-5xl sm:text-5xl grinds text-red-700 ml-8'>RAPPER </h3>
        </header>

        <p className='text-white w-4/5 sm:w-full md:w-full xs:w-full flex mb-8 md:mb-4 xs:mb-2 xl:text-lg md:text-sm sm:text-sm xs:text-xs tracking-wide xs:px-4'>Born and raised in Umoja, Nairobi, Acense brings the raw energy of Eastlands to his music, blending old-school rap influences from legends like Tupac and Nas with his own Kenyan flavor. From his high school rap crew to going solo with tracks like Babyface Savage and Chini Ya Wabling, Acense is carving his path in the underground scene. His mix of authenticity and lyrical grit has earned him respect—and there's more to come.</p>
        <Link to='/about' className='xs:w-full text-white bebas xs:px-4'>
          <button class="animated-button">
            <i class="fa-solid fa-arrow-right arr-2"></i>
            <span class="text bebas">READ MORE</span>
            <span class="circle"></span>
            <i class="fa-solid fa-arrow-right arr-1"></i>
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Bio