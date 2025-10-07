import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Video, Home, Gallery, Discography, Links, Shows, Error404 } from './pages';

function AppLayout() {
  return (
    <>
      <main className='w-screen flex flex-col'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Discography />} />
          <Route path="/videos" element={<Video />} />
          <Route path="/shows&tours" element={<Shows />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/links" element={<Links />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
