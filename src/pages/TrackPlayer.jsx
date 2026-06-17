import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import musicData from '../data/index';
import { Play, Pause, ArrowLeft, Share2 } from 'lucide-react';

const TrackPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentTrack, setCurrentTrack, isPlaying, setIsPlaying,
    currentTime, setCurrentTime, duration, setDuration, audioRef,
  } = useAudio();

  const [needsTap, setNeedsTap] = useState(false);
  const [copied, setCopied] = useState(false);

  const allTracks = [...musicData.released, ...musicData.unreleased];
  const track = allTracks.find((t) => String(t.id) === id);

  // --- NEW: LRC Parser Hook ---
  const parsedLyrics = useMemo(() => {
    if (!track?.lyrics) return [];
    
    // If it's already been parsed into an array elsewhere, just use it
    if (Array.isArray(track.lyrics)) return track.lyrics;
    
    // If it's a raw .lrc string, parse it
    if (typeof track.lyrics === 'string') {
      const lines = track.lyrics.split('\n');
      const lyricsArray = [];
      
      lines.forEach(line => {
        // Regex to extract minutes, seconds.milliseconds, and the text
        const match = line.match(/\[(\d{2}):(\d{2}(?:\.\d+)?)\](.*)/);
        if (match) {
          const minutes = parseInt(match[1], 10);
          const seconds = parseFloat(match[2]);
          lyricsArray.push({
            time: (minutes * 60) + seconds,
            text: match[3].trim()
          });
        }
      });
      return lyricsArray;
    }
    
    return [];
  }, [track?.lyrics]);

  useEffect(() => {
    if (!track) return;
    if (currentTrack?.id !== track.id) {
      setCurrentTrack(track);
      setCurrentTime(0);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = track.audioUrl;
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setNeedsTap(true));
        }
      }, 100);
    }
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [track]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setNeedsTap(true));
      setNeedsTap(false);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      audio.currentTime = percentage * duration;
      setCurrentTime(audio.currentTime);
    }
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/track/${track.id}`;
    if (navigator.share) {
      try { await navigator.share({ title: track.title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!track) {
    return (
      <section className="w-screen h-screen flex flex-col items-center justify-center gap-6 bg-[#131313]">
        <h1 className="text-white text-3xl bebas">SONG NOT FOUND</h1>
        <button onClick={() => navigate('/music')} className="px-4 py-2 bg-white text-black bebas">
          GO TO MUSIC
        </button>
      </section>
    );
  }

  // --- UPDATED: Use parsedLyrics instead of track.lyrics ---
  const currentLyric = parsedLyrics.length
    ? [...parsedLyrics].reverse().find((l) => currentTime >= l.time)
    : null;
  const currentLyricIndex = parsedLyrics.findIndex((l) => l.text === currentLyric?.text);

  return (
    <section className="w-screen h-dvh bg-gradient-to-b from-[#1e1e1e] to-[#0a0a0a] text-white flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <button onClick={() => navigate('/music')} className="flex items-center gap-2 text-gray-300 hover:text-white">
          <ArrowLeft className="w-5 h-5" /><span className="sf text-sm">Back</span>
        </button>
        <button onClick={handleShare} className="flex items-center gap-2 text-gray-300 hover:text-white">
          <Share2 className="w-5 h-5" /><span className="sf text-sm">{copied ? 'Link copied!' : 'Share'}</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-6 pb-10 overflow-y-auto">
        <div className="flex flex-col items-center w-full max-w-sm">
          <img src={track.cover} alt={track.title} className="w-full aspect-square object-cover rounded-xl shadow-2xl" />
          <div className="w-full mt-6 text-center">
            <h1 className="text-2xl sf font-bold">{track.title}</h1>
            <p className="text-gray-400 sf mt-1">{track.artist}</p>
          </div>

          <div className="w-full mt-6 flex items-center gap-3">
            <span className="text-xs sf text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group" onClick={handleSeek}>
              <div className="h-full bg-white rounded-full relative" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-xs sf text-gray-400 w-10">{formatTime(duration)}</span>
          </div>

          <button onClick={togglePlay} className="w-16 h-16 mt-6 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
            {isPlaying ? <Pause className="w-7 h-7 text-black" /> : <Play className="w-7 h-7 text-black ml-1" />}
          </button>

          {needsTap && <p className="text-gray-400 sf text-xs mt-4 text-center">Tap play to start the track</p>}
        </div>

        {/* --- UPDATED: Use parsedLyrics here too --- */}
        {parsedLyrics.length > 0 && (
          <div className="w-full max-w-md h-[50vh] lg:h-[60vh] overflow-hidden relative">
            <div className="absolute inset-x-0 transition-transform duration-500 ease-out"
                 style={{ transform: `translateY(${currentLyricIndex * -48 + 160}px)` }}>
              {parsedLyrics.map((lyric, i) => (
                <p key={i} className={`sf mb-4 capitalize text-lg transition-all duration-300 ${
                  i === currentLyricIndex ? 'text-white font-semibold scale-105'
                    : i < currentLyricIndex ? 'text-white/70' : 'text-gray-600'
                }`}>
                  {lyric.text.toLowerCase()}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrackPlayer;