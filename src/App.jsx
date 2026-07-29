import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Video, Home, Gallery, Music, Links, Shows, Error404, EPK} from './pages';
import  {AudioProvider}  from './context/AudioContext';

function AppLayout() {
  return (
    <>
      <main className='w-screen flex flex-col'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/videos" element={<Video />} />
          <Route path="/shows&tours" element={<Shows />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/music" element={<Music />} />
          <Route path="/links" element={<Links />} />
          <Route path="/epk" element={<EPK />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AudioProvider>
        <AppLayout />
      </AudioProvider>
    </Router>
  );
}

export default App;
