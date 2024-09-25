import React from 'react'
import { Link } from 'react-router-dom'
import { Spotify, Apple, Vinyl } from '../assets/images'

const NewRelease = () => {
  return (
    <section id="newRelease" className='w-full flex justify-center py-20 sm:py-12 xs:py-4 xl:px-40 lg:px-28 md:px-16 sm:px-8 xs:px-4 bg-gray-100 gap-8'>
          <div className='w-1/2 xs:w-full'>
            <p className='font-semibold xs:text-sm'>Available now</p>
            <h3 className='text-5xl sm:text-3xl xs:text-3xl font-bold bebas'>NEW EP OUT NOW</h3>

            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/track/6oSdqny52dt5PmCDTZDCH3?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className='my-8 sm:my-4 xs:hidden'>
            </iframe>

            <iframe style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/album/6LSdu5FZJ9OfsZ475hMGuX?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className='xs:flex hidden my-4'>
            </iframe>

            <p className='font-semibold sm:text-sm xs:text-xs'>Written & Performed by: Acense & Dice Mane</p>
            <p className='font-semibold sm:text-sm xs:text-xs'>Produced by: Lemario</p>

            <div className='flex flex-col md:hidden sm:hidden'>
              <p className='font-semibold mt-4 xs:text-xs'>Listen Everywhere</p>
              <div className='flex xs:w-full xs:items-center xs:justify-between'>
                <Link to='https://open.spotify.com/album/6LSdu5FZJ9OfsZ475hMGuX?si=ZztcKr5vSbuf8-0xdDiO7w' target='_blank'>
                  <img src={Spotify} alt="Spotify-logo" className='h-14 xs:h-16' border="0" />
                </Link>
                <Link to='https://music.apple.com/us/album/one-time/1766532535' target='_blank'>
                  <img src={Apple} alt="Apple-music-logo" className='h-14 xs:h-16' border="0" />
                </Link>
              </div>
            </div>
          </div>

          <div className='w-1/2 flex flex-col justify-center md:justify-between xs:hidden'>
            <img src={Vinyl} alt="EP Vinyl" />
            <div className='hidden md:flex sm:flex flex-col'>
              <p className='font-semibold mt-4'>Listen Everywhere</p>
              <div className='flex'>
                <Link to='https://open.spotify.com/album/6LSdu5FZJ9OfsZ475hMGuX?si=ZztcKr5vSbuf8-0xdDiO7w' target='_blank'>
                  <img src={Spotify} alt="Spotify-logo" className='h-14' border="0" />
                </Link>
                <Link to='https://music.apple.com/us/album/one-time/1766532535' target='_blank'>
                  <img src={Apple} alt="Apple-music-logo" className='h-14' border="0" />
                </Link>
              </div>
            </div>
          </div>
    </section>
)
}

export default NewRelease