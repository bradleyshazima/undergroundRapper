import React from 'react'
import { Navbar, Hero} from '../components'

const Home = () => {
  return (
    <>
      <Navbar />
      <section className='w-full overflow-x-hidden'>
        <Hero />
        <div className='w-full px-6 md:px-24 lg:px-32 py-10 lg:py-20 flex flex-col lg:flex-row justify-between gap-8'>
          <div className='w-full lg:w-[45%]'>
            <h2 
              className='text-7xl lg:text-8xl xl:text-9xl font-black jakarta uppercase leading-none tracking-tight select-none bg-clip-text text-transparent'
              style={{
                backgroundImage: "linear-gradient(135deg, #0e0e0e 0%, #d24700 50%, #0e0e0e 100%)",
              }}
            >ACENSE</h2>
              <p className='text-white mt-4 md:mt-8 jakarta'>Acense is a fast rising hiphop sensation in the Kenyan music scene. He blends raw lyricism with smart double entendres and a grit delivery style and an emotional tweak to it to tell the stories of the underground world and the struggle of the streets to mainstream media. Spotify Bio: Never heard me before? kinda crazy right?</p>
          </div>
          <div className='w-full lg:w-1/2 overflow-hidden'>
            <img src="https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1765224260/JPG09820_l936p9.jpg" alt="Acense" className='object-cover object-center w-full lg:w-4/5 md:h-[280px] lg:h-[320px]' />
          </div>
        </div>

        <div className='w-full px-6 md:px-24 lg:px-32 py-8'>
          <h3 className='text-5xl font-black text-white jakarta w-4/5 mb-16'>RAPPER, <span className='text-5xl text-[--orange] jakarta'>SINGER, </span>SONGWRITER, PERFORMING ARTIST, ACTOR</h3>
          <div className='w-full flex flex-col lg:flex-row'>
            <div className='w-full lg:w-1/3 flex flex-col'>
              <ul className='w-full flex flex-col md:flex-row lg:flex-col md:justify-between gap-4'>
                <li className='flex flex-col py-1 lg:py-10'>
                  <span className='text-4xl lg:text-7xl font-black text-white jakarta'>9,200+</span>
                  <p className='text-white jakarta text-2xl font-medium w-full'>Instagram Followers</p>
                </li>
                <li className='flex flex-col py-1 lg:py-10'>
                  <span className='text-4xl lg:text-7xl font-black text-white jakarta'>2,300+</span>
                  <p className='text-white jakarta text-2xl font-medium'>Tiktok Followers</p>
                </li>
                <li className='flex flex-col py-1 lg:py-10'>
                  <span className='text-4xl lg:text-7xl font-black text-white jakarta'>2,200+</span>
                  <p className='text-white jakarta text-2xl font-medium'>Youtube Subscribers</p>
                </li>
              </ul>
            </div>

            <div className='flex-1 flex lg:flex-col flex-col-reverse'>
              <p className='text-white jakarta text-base font-medium mt-12'>Nairobi-based rapper, songwriter, and actor Acense (@acens.e) is a defining force in Kenya’s rising underground hip-hop movement. Operating independently under the Underground Tribe collective, Acense crafts a distinct sound: heavy, atmospheric trap-drill 808s laced with and sharp double entendres. His music seamlessly bridges the gap between raw street hustle and faith-grounded vulnerability, balancing aggressive energy with introspective soul on tracks like Vultures.
            Acense’s voice is defined by an urgent, commanding delivery and a seamless bilingual Sheng-English flow. Capturing the authentic sound of Nairobi’s youth, he translates street stories and spiritual struggles into high-energy lyricism. Earned respect and co-signs from greats like Khaligraph Jones and collaborators like Mapema and 5ive cement his standing as one of the scene's most formidable lyricists.
            Connecting a diverse audience from local drill purists and faith-driven story seekers to global drill explorers, Acense’s goal is to redefine independent artistry. He is building a lasting movement outside mainstream industry gatekeepers, transforming street realities into cohesive, conceptual projects. Through uncompromising underground pride and direct community engagement, Acense is carving a unique lane to elevate Nairobi street culture onto the world stage.</p>

            <div className='flex w-full pt-12 flex-wrap'>
              <h4 className='w-full font-black text-[--orange] jakarta text-4xl mb-12'>Collaborations & Bookings</h4>
              <ul className='w-1/2 flex flex-col gap-8'>
                <li className='flex flex-col gap-4'>
                  <p className='jakarta text-white text-xl font-semibold'>Email</p>
                  <span className='text-[--orange] jakarta font-medium text-lg'>itsacense@gmail.com</span>
                </li>
                <li className='flex flex-col gap-4'>
                  <p className='jakarta text-white text-xl font-semibold'>Phone</p>
                  <span className='text-[--orange] jakarta font-medium text-lg'>+254 711 947 736</span>
                </li>
              </ul>
              <ul className='w-1/2 flex flex-col gap-8'>
                <li className='items-end lg:items-start flex flex-col gap-4'>
                  <p className='jakarta text-white text-xl font-semibold'>Instagram</p>
                  <span className='text-[--orange] jakarta font-medium text-lg'>@acens.e</span>
                </li>
                <li className='items-end lg:items-start flex flex-col gap-4'>
                  <p className='jakarta text-white text-xl font-semibold'>Tiktok</p>
                  <span className='text-[--orange] jakarta font-medium text-lg'>@acens.e</span>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home