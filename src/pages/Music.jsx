import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, Heart, Shuffle, SkipBack, SkipForward, Repeat, Volume2, Mic2 } from 'lucide-react';
import { Navbar } from '../components';
import { supabase } from '../config/supabase';

const fetchItunesCover = async (title, artist) => {
  try {
    const query = encodeURIComponent(`${artist} ${title}`);
    const res = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=1`);
    const data = await res.json();
    if (data.results.length > 0) {
      return data.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
    }
  } catch (e) {
    console.error('iTunes fetch failed:', e);
  }
  return null;
};

const Music = () => {
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying, currentTime, setCurrentTime, duration, setDuration, audioRef } = useAudio();
  const [volume, setVolume] = useState(1);
  const [selectedTab, setSelectedTab] = useState('released');
  const [likedSongs, setLikedSongs] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('all');

  const [musicData, setMusicData] = useState({ released: [], unreleased: [] });

  // 1. Updated fetch logic for released vs unreleased covers
  useEffect(() => {
    const fetchTracks = async () => {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('release_date', { ascending: false });

      if (error) { 
        console.error('Error fetching tracks:', error); 
        return; 
      }

      if (!data) return;

      const releasedTracks = data.filter(t => t.released === true);
      const unreleasedTracks = data.filter(t => t.released === false);

      // If released, try fetching from iTunes API first, then fallback to stored cover
      const released = await Promise.all(
        releasedTracks.map(async (track) => {
          const itunesCover = await fetchItunesCover(track.title, track.artist);
          return {
            ...track,
            cover: itunesCover || track.cover
          };
        })
      );

      // If unreleased, strictly rely on the stored URL of the cover
      const unreleased = unreleasedTracks.map(track => ({
        ...track,
        cover: track.cover
      }));

      setMusicData({ released, unreleased });
    };

    fetchTracks();
  }, []);

  // Set first track as active on mount
  useEffect(() => {
    const firstTrack = selectedTab === 'released' ? musicData.released[0] : musicData.unreleased[0];
    if (firstTrack && !currentTrack) {
      setCurrentTrack(firstTrack);
    }
  }, [musicData]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.src !== currentTrack.audio_url) {
      audio.src = currentTrack.audio_url;
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

  // 2. Updated TracksDisplay Component
  const TracksDisplay = ({ tracks, category }) => {
    const sortedTracks = [...tracks].sort((a, b) => 
      new Date(b.release_date) - new Date(a.release_date)
    );
    
    return (
      <div className="grid grid-cols-1 gap-2 h-full xl:h-auto">
        {sortedTracks.map((track) => {
          const isCurrent = currentTrack?.id === track.id;
          return (
            <div
              key={track.id}
              className="group flex items-center gap-4 py-4 px-2 rounded-lg cursor-pointer transition-colors duration-150"
              onClick={() => playTrack(track)}
            >
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-full object-cover rounded border border-white/10"
                />
                {/* Play button visible on row hover or when active and playing */}
                <div className={`absolute inset-0 flex items-center justify-center bg-black/40 rounded transition-opacity ${isCurrent && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {isCurrent && isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white fill-white" />
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`jakarta font-medium truncate transition-colors ${isCurrent ? 'text-[#d24700]' : 'text-white group-hover:text-[#d24700]'}`}>
                    {track.title}
                  </h3>
                  {track.explicit && (
                    <span className="w-4 h-4 flex items-center justify-center bg-gray-600 text-white border border-white/20 font-medium pt-[1px] jakarta text-[10px] rounded">E</span>
                  )}
                </div>
                <p className={`jakarta text-sm truncate transition-colors ${isCurrent ? 'text-[#d24700]' : 'text-gray-400 group-hover:text-[#d24700]'}`}>
                  {track.artist}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Live orange equalizer bars when song is playing */}
                {isCurrent && isPlaying ? (
                  <div className="flex items-end gap-[3px] h-4 w-4" title="Playing">
                    <span className="w-[3px] bg-[#d24700] h-full animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                    <span className="w-[3px] bg-[#d24700] h-1/2 animate-[pulse_0.5s_ease-in-out_infinite_0.4s]"></span>
                    <span className="w-[3px] bg-[#d24700] h-3/4 animate-[pulse_0.8s_ease-in-out_infinite_0.2s]"></span>
                  </div>
                ) : (
                  <span className="text-gray-400 jakarta text-sm"></span>
                )}

                {/* Spotify Link Icon */}
                {track.spotify_link && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(track.spotify_link, '_blank');
                    }}
                    className="text-gray-400 hover:text-[#1DB954] hover:scale-110 transition-all"
                    title="Listen on Spotify"
                  >
                    <i class="fa-brands fa-spotify text-xl"></i>
                  </button>
                )}

                {/* Apple Music Link Icon */}
                {track.apple_music_link && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(track.apple_music_link, '_blank');
                    }}
                    className="text-gray-400 hover:text-[#fa243c] hover:scale-110 transition-all"
                    title="Listen on Apple Music"
                  >
                    <i class="fa-brands fa-itunes-note text-xl"></i>
                  </button>
                )}

                {/* Favorite Button */}
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
                        ? 'fill-[#d24700] text-[#d24700]'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>          
            </div>
          );
        })}
        <div className='w-full h-32'></div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <section 
        className="w-screen h-screen overflow-hidden text-white flex flex-col pt-16 lg:pt-24 abstract-bg relative"
      >
        {/* Giant headline block */}
        <div className="pb-2 bg-transparent backdrop-blur-[2px] flex lg:flex-col px-4 md:px-24 lg:px-32 justify-between">
          <div
            className="jakarta text-4xl md:text-6xl font-black uppercase leading-none tracking-tight select-none bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #0e0e0e 0%, #d24700 40%, #0e0e0e 95%)",
            }}
          >
            MUSIC
          </div>

          {/* Buttons */}
          <div className="flex gap-2 self-end mt-[-10px] md:mt-[-40px] h-full max-h-12"> 
            <button
              onClick={() => setSelectedTab('released')}
              className={`px-2 lg:px-6 py-1 lg:py-2 transition-all jakarta font-medium text-xs md:text-base rounded-md ${
                selectedTab === 'released'
                  ? 'bg-[#d24700] text-white'
                  : 'bg-[#1e1e1e]/60 text-white hover:bg-[#d24700]/50 backdrop-blur-sm'
              }`}
            >
              RELEASED
            </button>
            <button
              onClick={() => setSelectedTab('unreleased')}
              className={`px-2 lg:px-6 py-1 lg:py-2 transition-all jakarta font-medium text-xs md:text-base rounded-md ${
                selectedTab === 'unreleased'
                  ? 'bg-[#d24700] text-white'
                  : 'bg-[#1e1e1e]/60 text-white hover:bg-[#d24700]/50 backdrop-blur-sm'
              }`}
            >
              UNRELEASED
            </button>
          </div>
        </div>

        {/* Top divider */}
        <div className="border-t border-white/20 mt-2" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden items-center lg:px-32 xl:px-0">
          
          {/* Tracks List */}
          <div className="w-full md:w-3/5 lg:w-full xl:w-3/5 lg:flex-1 p-4 lg:p-6 overflow-y-auto h-full">
            <h2 className="text-lg lg:text-2xl mb-2 lg:mb-6 jakarta">
              {selectedTab === 'released' ? 'Released Tracks' : 'Unreleased & Exclusives'}
            </h2>
            <TracksDisplay 
              tracks={selectedTab === 'released' ? musicData.released : musicData.unreleased}
              category={selectedTab}
            />
          </div>
        </div>

        {/* Player Controls */}
        {currentTrack && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#311100]/50 backdrop-blur-xl border border-white/10 py-4 px-6 lg:px-16 flex w-[90%] md:w-4/5 lg:gap-8 items-center z-[999] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-4 overflow-hidden w-full md:w-fit md:max-w-80">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-14 h-14 rounded object-cover shadow-md"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium jakarta truncate">{currentTrack.title}</h4>
                <p className="text-gray-300 text-sm jakarta truncate hidden lg:flex">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row-reverse gap-2 md:flex-1">
              <div className="flex items-center justify-center gap-4">
                <button onClick={playPreviousTrack} className="text-gray-400 hover:text-white transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button onClick={togglePlay} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                  {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black ml-0.5" />}
                </button>
                <button onClick={playNextTrack} className="text-gray-400 hover:text-white transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
                <button onClick={toggleRepeat} className={`hidden lg:flex transition-colors relative ${repeat === 'off' ? 'text-gray-400' : 'text-[#d24700]'}`}>
                  <Repeat className="w-5 h-5" />
                  {repeat === 'one' && (
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[7px] bg-[#d24700] h-3 w-3 rounded-full border border-[#1e1e1e] text-white flex items-center justify-center jakarta font-bold leading-tight tracking-tight">1</span>
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="hidden md:flex items-center justify-between gap-3 flex-1">
                <span className="text-xs jakarta text-gray-300 w-10 text-right">{formatTime(currentTime)}</span>
                <div className="flex-1 w-full h-1 bg-gray-600/50 rounded-full cursor-pointer group" onClick={handleSeek}>
                  <div className="h-full bg-white rounded-full relative" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" />
                  </div>
                </div>
                <span className="text-xs jakarta text-gray-300 w-10">{formatTime(duration)}</span>
              </div>
            </div>

            <button onClick={() => toggleLike(currentTrack.id)} className="hover:scale-110 transition-transform hidden md:flex ml-8">
              <Heart className={`w-5 h-5 ${likedSongs.includes(currentTrack.id) ? 'fill-[#d24700] text-[#d24700]' : 'text-gray-400'}`} />
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Music;