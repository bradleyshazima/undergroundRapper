import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, Heart, Shuffle, SkipBack, SkipForward, Repeat, Volume2, Mic2, Share2 } from 'lucide-react';
import { Navbar } from '../components'
import musicData from '../data/index'
import { Spotify, Apple } from '../assets/images';

const Music = () => {
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying, currentTime, setCurrentTime, duration, setDuration, audioRef } = useAudio();
  const [volume, setVolume] = useState(1);
  const [showLyrics, setShowLyrics] = useState(true);
  const [selectedTab, setSelectedTab] = useState('released');
  const [likedSongs, setLikedSongs] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('all');
  

  const allTracks = [...musicData.released, ...musicData.unreleased];

  // Set first track as active on mount
  useEffect(() => {
    const firstTrack = selectedTab === 'released' ? musicData.released[0] : musicData.unreleased[0];
    if (firstTrack && !currentTrack) {
      setCurrentTrack(firstTrack);
    }
  }, []);
  
  useEffect(() => {
    // When tab switches, check if current track exists in new tab
    const trackList = selectedTab === 'released' ? musicData.released : musicData.unreleased;
    const trackExists = trackList.some(t => t.id === currentTrack?.id);
    
    if (currentTrack && !trackExists) {
      // Current track not in this tab, stop highlighting it
      // but keep it playing
    }
  }, [selectedTab]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // Set the audio source when track changes
    if (audio.src !== currentTrack.audioUrl) {
      audio.src = currentTrack.audioUrl;
    }

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNextTrack();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, repeat, shuffle, selectedTab]);

  const playTrack = (track) => {
  if (currentTrack?.id === track.id) {
    togglePlay();
  } else {
    if (isPlaying) {
      audioRef.current?.pause();
    }
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current?.play().catch(err => console.log('Play error:', err));
      setIsPlaying(true);
    }, 100);
  }
};

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * audio.duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentLyric = () => {
    if (!currentTrack?.lyrics) return null;
    for (let i = currentTrack.lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= currentTrack.lyrics[i].time) {
        return currentTrack.lyrics[i];
      }
    }
    return currentTrack.lyrics[0];
  };

  const toggleLike = (trackId) => {
    setLikedSongs(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const getCurrentTrackList = () => {
    return selectedTab === 'released' ? musicData.released : musicData.unreleased;
  };

  const playNextTrack = () => {
    const trackList = getCurrentTrackList();
    if (!currentTrack || trackList.length === 0) return;

    let nextTrack;
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * trackList.length);
      nextTrack = trackList[randomIndex];
    } else {
      const currentIndex = trackList.findIndex(t => t.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % trackList.length;
      nextTrack = trackList[nextIndex];
      
      if (repeat === 'off' && nextIndex === 0) {
        setIsPlaying(false);
        return;
      }
    }

    setCurrentTrack(nextTrack);
    setCurrentTime(0);
    setTimeout(() => {
      audioRef.current?.play().catch(err => console.log('Play error:', err));
      setIsPlaying(true);
    }, 100);
  };

  const playPreviousTrack = () => {
    const trackList = getCurrentTrackList();
    if (!currentTrack || trackList.length === 0) return;

    const currentIndex = trackList.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? trackList.length - 1 : currentIndex - 1;
    const prevTrack = trackList[prevIndex];

    setCurrentTrack(prevTrack);
    setCurrentTime(0);
    setTimeout(() => {
      audioRef.current?.play().catch(err => console.log('Play error:', err));
      setIsPlaying(true);
    }, 100);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const toggleRepeat = () => {
    if (repeat === 'off') setRepeat('all');
    else if (repeat === 'all') setRepeat('one');
    else setRepeat('off');
  };

const TracksDisplay = ({ tracks, category }) => {
    const sortedTracks = [...tracks].sort((a, b) => 
      new Date(b.releaseDate) - new Date(a.releaseDate)
    );
    
    return (
      <div className="grid grid-cols-1 gap-2 h-full xl:h-auto md:mb-20">
        {sortedTracks.map((track) => (
          <div
            key={track.id}
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors duration-150 ${
              currentTrack?.id === track.id && isPlaying ? 'bg-gray-800/50' : 'hover:bg-gray-800/30'
            }`}
            onClick={() => playTrack(track)}
          >
            <div className="relative w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0">
              <img
                src={track.cover}
                alt={track.title}
                className="w-full h-full object-cover rounded border border-white/10"
              />
              {currentTrack?.id === track.id && isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                  <Pause className="w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded">
                  <Play className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white sf font-medium truncate">{track.title}</h3>
                {track.explicit && (
                  <span className="w-4 h-4 flex items-center justify-center bg-gray-600 text-white border border-white/20 font-medium pt-[1px] sf text-xs rounded">E</span>
                )}
              </div>
              <p className="text-gray-400 sf text-sm truncate">{track.artist}</p>
            </div>

            <div className="flex items-center gap-3">
              {currentTrack?.id === track.id && (
                <span className="text-gray-400 sf text-sm">{formatTime(duration)}</span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(track.id);
                }}
                className="hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-5 h-5 ${
                    likedSongs.includes(track.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  }`}
                />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(`${window.location.origin}/track/${track.id}`);
                }}
                className="hover:scale-110 transition-transform"
              >
                <Share2 className="w-5 h-5 text-gray-400" />
              </button>

            </div>          
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
    <Navbar />
    <div className="w-screen overflow-x-hidden overflow-y-scroll h-dvh text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between py-4 px-4 border-b border-gray-800 mt-20 md:px-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className=" text-lg lg:text-3xl sf font-semibold">Discography</h1>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTab('released')}
            className={`px-2 lg:px-6 py-1 lg:py-2 transition-all bebas text-base ${
              selectedTab === 'released'
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Released
          </button>
          <button
            onClick={() => setSelectedTab('unreleased')}
            className={`px-2 lg:px-6 py-1 lg:py-2 transition-all bebas text-base ${
              selectedTab === 'unreleased'
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Unreleased
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:flex-1 flex flex-col md:flex-row overflow-hidden pb-24">
        {/* Tracks List */}
        <div className="w-full md:w-3/5 lg:w-[40%] lg:flex-1 overflow-y-scroll p-4 lg:p-6 h-[80vh]">
          <h2 className="text-lg lg:text-2xl mb-2 lg:mb-6 sf">
            {selectedTab === 'released' ? 'Released Tracks' : 'Unreleased & Exclusives'}
          </h2>
          <TracksDisplay 
            tracks={selectedTab === 'released' ? musicData.released : musicData.unreleased}
            category={selectedTab}
          />
        </div>

        {/* Lyrics Panel */}
        {currentTrack && (
          <div className="w-full h-[80vh] lg:w-[30%] lg:max-w-80 border-l border-gray-800 hidden lg:flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Mic2 className="w-5 h-5 text-gray-400" />
                <h4 className="text-lg sf font-semibold">Lyrics</h4>
              </div>
            </div>
              {currentTrack.lyrics && currentTrack.lyrics.length > 0 ? (
                <div className="w-ful h-full lg:flex-1 relative overflow-hidden">
                  <div 
                    className="absolute inset-x-0 px-6 py-8 transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateY(${
                        (() => {
                          const currentIndex = currentTrack.lyrics.findIndex(
                            l => l.text === getCurrentLyric()?.text
                          );
                          const panelHeight = 800; // approximate height of lyrics container
                          const lineHeight = 64; // approximate height per line
                          const centerOffset = panelHeight / 2 - lineHeight / 2;
                          
                          // Keep lyrics at top until current line would be centered
                          if (currentIndex * lineHeight < centerOffset) {
                            return 0;
                          }
                          // Move lyrics up to keep current line centered
                          return -(currentIndex * lineHeight - centerOffset);
                        })()
                      }px`
                    }}
                  >
                  {currentTrack.lyrics.map((lyric, index) => {
                    const currentLyricIndex = currentTrack.lyrics.findIndex(
                      l => l.text === getCurrentLyric()?.text
                    );
                    const isCurrent = getCurrentLyric()?.text === lyric.text;
                    const isPast = index < currentLyricIndex;
                    
                    return (
                      <p
                        key={index}
                        className={`transition-all ease-in-out duration-300 sf mb-4 capitalize text-base ${
                          isCurrent
                            ? 'text-white font-medium scale-105'
                            : isPast
                            ? 'text-white scale-100'
                            : 'text-gray-500 scale-100'
                        }`}
                      >
                        {lyric.text.toLowerCase()}
                      </p>
                    );
                  })}
                </div>
              </div>
            ) : currentTrack.fullLyrics ? (
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <pre className="text-gray-400 text-sm whitespace-pre-wrap sf capitalize">
                  {currentTrack.fullLyrics.toLowerCase()}
                </pre>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center px-6">
                <p className="text-gray-500 text-sm sf italic">
                  Lyrics not available for this track
                </p>
              </div>
            )}
          </div>
        )}

        {/* Right Panel - Track Info */}
        {currentTrack && (
          <div className="w-full md:w-2/5 lg:w-[30%] xl:w-96 bg-[#121212] border-l border-gray-800 hidden md:flex flex-col overflow-y-auto">
            {/* Track Cover */}
            <div className="p-6">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-full aspect-square object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Track Info */}
            <div className="px-6 pb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 sf">
                    {currentTrack.title}
                  </h3>
                  <p className="text-gray-400 text-sm sf">{currentTrack.artist}</p>
                  {currentTrack.producer && (
                    <p className="text-gray-500 text-xs mt-1 sf">
                      Produced by {currentTrack.producer}
                    </p>
                  )}
                </div>
                {currentTrack.explicit && (
                  <span className="px-2 py-1 bg-gray-700 text-white text-xs sf rounded">
                    EXPLICIT
                  </span>
                )}
              </div>

              {/* Description */}
              {currentTrack.description && (
                <p className="text-gray-400 text-sm mt-4 leading-relaxed sf">
                  {currentTrack.description}
                </p>
              )}

              {/* Streaming Links */}
              {currentTrack.links && (
                <div className="mt-4 flex gap-2">
                  {currentTrack.links.spotify && (
                    <a
                      href={currentTrack.links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='flex-1'
                    >
                      <img src={Spotify} alt="Spotify" className='h-[65px]' />
                    </a>
                  )}
                  {currentTrack.links.appleMusic && (
                    <a
                      href={currentTrack.links.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='flex-1'
                    >
                      <img src={Apple} className='h-[64px] mt-[2px]'  alt="Apple Music" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Player Controls */}
      {currentTrack && (
        <div className="bg-[#181818] border-t border-white/10 py-4 px-6 lg:px-16 flex w-full lg:gap-8 items-center absolute z-[999] bottom-0">
          <div className="flex items-center gap-4 overflow-hidden w-full md:w-fit md:max-w-80">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-14 h-14 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium sf truncate">{currentTrack.title}</h4>
              <p className="text-gray-400 text-sm sf truncate hidden lg:flex">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row-reverse gap-2 md:flex-1">
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={playPreviousTrack}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-black" />
                ) : (
                  <Play className="w-5 h-5 text-black ml-0.5" />
                )}
              </button>
              <button 
                onClick={playNextTrack}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <button 
                onClick={toggleRepeat}
                className={`hidden lg:flex transition-colors relative ${repeat === 'off' ? 'text-gray-600' : 'text-green-500'}`}
              >
                <Repeat className="w-5 h-5" />
                {repeat === 'one' && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[7px] bg-green-500 h-3 w-3 rounded-full border border-[#1e1e1e] text-[#1e1e1e] flex items-center justify-center sf font-bold">1</span>
                )}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="hidden md:flex items-center justify-between gap-3 flex-1">
              <span className="text-xs sf text-gray-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <div
                className="flex-1 w-full h-1 bg-gray-700 rounded-full cursor-pointer group"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-white rounded-full relative"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <span className="text-xs sf text-gray-400 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <button
            onClick={() => toggleLike(currentTrack.id)}
            className="hover:scale-110 transition-transform hidden md:flex ml-8"
          >
            <Heart
              className={`w-5 h-5 ${
                likedSongs.includes(currentTrack.id)
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Music;