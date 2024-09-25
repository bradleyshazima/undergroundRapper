import React from 'react'
import { AmazonWhite, DeezerWhite, AppleWhite, SpotifyWhite, YTWhite, } from '../assets/images'

const Stream = () => {
  return (
    <section className='w-full bg-red-950 flex flex-col gap-8 items-center py-8 sm:py-6 xs:py-4'>
      <h3 className='outline-text clevio tracking-wider md:text-3xl sm:text-2xl xs:text-2xl'>STREAM ACENSE ON</h3>
      <div className='flex xs:flex-wrap xs:justify-center items-center gap-4 mb-6'>
        <img src={SpotifyWhite} alt="Logo" className="xl:h-16 lg:h-12 md:h-10 sm:h-8 xs:h-8" />
        <img src={AppleWhite} alt="Logo" className="xl:h-16 lg:h-12 md:h-10 sm:h-8 xs:h-8" />
        <img src={YTWhite} alt="Logo" className="xl:h-16 lg:h-12 md:h-10 sm:h-8 xs:h-8" />
        <img src={AmazonWhite} alt="Logo" className="xl:h-16 lg:h-12 md:h-10 sm:h-8 xs:h-8" />
        <img src={DeezerWhite} alt="Logo" className="xl:h-16 lg:h-12 md:h-10 sm:h-8 xs:h-8" />
      </div>
    </section>
  )
}

export default Stream