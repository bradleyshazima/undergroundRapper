import React from 'react'
import { Link } from 'react-router-dom'
import { Spotify, Apple, Vinyl } from '../assets/images'

const NewRelease = () => {
  return (
    <section id="newRelease" className='w-full flex justify-center py-20 px-40 bg-gray-100 gap-8'>
          <div className='w-1/2'>
            <p className='font-semibold'>Available now</p>
            <h3 className='text-3xl font-bold'>NEW EP OUT NOW</h3>

            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/track/6oSdqny52dt5PmCDTZDCH3?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className='my-8'>
            </iframe>

            <p className='font-semibold'>Written & Performed by: Acense & Dice Mane</p>
            <p className='font-semibold'>Produced by: Lemario</p>

            <div>
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
          <div className='w-1/2'>
            <img src={Vinyl} alt="EP Vinyl" />
          </div>
    </section>
)
}

export default NewRelease