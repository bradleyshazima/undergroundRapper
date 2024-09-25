import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Footer, Navbar } from './components'
import { AboutPage, Home, Gallery, Discography } from './pages'

function App() {

  return (
    <Router className='w-full'>
      <Navbar />
        <main className='w-screen flex flex-col'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/discography" element={<Discography />} />
          </Routes>
        </main>
        <Footer />
    </Router>
  )
}

export default App
