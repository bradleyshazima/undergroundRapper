import React from 'react'
import { AmazonWhite, DeezerWhite, AppleWhite, SpotifyWhite, YTWhite, } from '../assets/images'

const Stream = () => {
  return (
    <div className='bg-red-950 flex flex-col gap-8 items-center py-8'>
      <h3 className='outline-text clevio tracking-wider'>STREAM ACENSE ON</h3>
      <div className='flex gap-4 mb-6'>
        <img src={SpotifyWhite} alt="Logo" className="h-16" />
        <img src={AppleWhite} alt="Logo" className="h-16" />
        <img src={YTWhite} alt="Logo" className="h-16" />
        <img src={AmazonWhite} alt="Logo" className="h-16" />
        <img src={DeezerWhite} alt="Logo" className="h-16" />
      </div>
    </div>
  )
}

export default Stream