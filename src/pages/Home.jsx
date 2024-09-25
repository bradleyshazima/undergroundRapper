import React from 'react'
import { Contact, Hero, NewRelease, Stream, Bio } from '../components'

const Home = () => {
  return (
    <>
    <Hero />
    <NewRelease />
    <Bio />
    <Stream />
    <Contact />
    <hr className='w-4/5 bg-white mx-auto' />
    </>
  )
}

export default Home