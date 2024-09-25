import React from 'react'
import { Link } from 'react-router-dom'
import { Portrait } from '../assets/images'

const Bio = () => {
  return (
    <section id='bio' className='bg-[#131313] flex w-full px-40 py-20 gap-16'>
      <div className='w-2/5'>
        <div id='bioImg' className='rounded-t-full h-[600px] w-[420px]'></div>
      </div>
      <div classname='w-3/5'>
        <header className='flex flex-col w-full mb-16'>
          <h3 className='text-8xl deutsch text-white'><span className='text-2xl mellissa'>The</span>UNDERGROUND</h3>
          <h3 className='text-7xl grinds text-red-700 ml-8'>RAPPER </h3>
        </header>
        <p className='text-white w-4/5 flex mb-8 text-lg'>Born and raised in Umoja, Nairobi, Acense brings the raw energy of Eastlands to his music, blending old-school rap influences from legends like Tupac and Nas with his own Kenyan flavor. From his high school rap crew to going solo with tracks like Babyface Savage and Chini Ya Wabling, Acense is carving his path in the underground scene. His mix of authenticity and lyrical grit has earned him respect—and there's more to come.</p>
        <Link to='/about' className='text-white bebas'>
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