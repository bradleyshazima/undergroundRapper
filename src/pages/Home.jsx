import React from 'react'
import { Navbar, Hero} from '../components'

const Home = () => {
  return (
    <>
      <Navbar />
      <section className='w-full h-full'>
        <Hero />
      </section>
    </>
  )
}

export default Home