import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Footer, Navbar } from './components';
import { Video, Home, Gallery, Discography, Links, Shows, Store } from './pages';

function AppLayout() {
  const location = useLocation();

  const hideNavbar = location.pathname === '/store';
  const hideFooter = location.pathname === '/' || location.pathname === '/store';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className='w-screen flex flex-col'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Discography />} />
          <Route path="/videos" element={<Video />} />
          <Route path="/store" element={<Store />} />
          <Route path="/shows&tours" element={<Shows />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
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
