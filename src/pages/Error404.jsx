import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <section className='w-screen h-screen flex flex-col items-center justify-center gap-12'>
        <h1 className='text-white text-7xl bebas'>404 NOT FOUND</h1>
        <Link to='/' className='px-4 py-2 bg-white text-[#1e1e1e] bebas flex items-center justify-center'>GO BACK TO HOMEPAGE</Link>
    </section>
  )
}

export default Error404