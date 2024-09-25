import React from 'react'

const Hero = () => {
  return (
    <section id='hero' className='w-full h-screen flex flex-col xs:items-center justify-center xl:px-32 lg:px-24 md:px-16 sm:px-16 xs:px-4'>
      <div className='flex xs:hidden text-white'>
        <h3 className='deutsch xl:text-[180px] lg:text-[120px] md:text-8xl sm:text-8xl font-bold leading-none'>SOUND</h3>
        <h4 className='mellissa xl:text-[160px] lg:text-7xl lg:mt-8 md:mt-8 sm:mt-8 xs:mt-7 md:text-5xl xs:text-2xl sm:text-4xl'>of the</h4>
      </div>
      <h3 className='text-red-700 grinds xl:text-[100px] lg:text-[70px] md:text-6xl sm:text-5xl xs:text-2xl leading-none xs:hidden flex'>UNDERGROUND</h3>

      <h3 className='text-7xl xs:flex hidden deutsch text-white'>SOUND</h3>
      <h4 className='text-4xl xs:flex hidden text-white mellissa -mt-4'>of the</h4>
      <h3 className='text-5xl xs:flex hidden text-red-700 grinds my-4'>UNDER</h3>
      <h3 className='text-5xl xs:flex hidden text-red-700 grinds'>GROUND</h3>
    </section>
)
}

export default Hero