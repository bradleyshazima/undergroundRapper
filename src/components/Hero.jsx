import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../context/AudioContext";
import musicData from "../data/index";
import { Play, Pause } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying, audioRef } = useAudio();

  // Get latest song (most recent release date)
  const latestSong = [...musicData.released].sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
  )[0];

  const handlePlayPause = (e) => {
    e.stopPropagation();
    
    if (!currentTrack || currentTrack.id !== latestSong.id) {
      setCurrentTrack(latestSong);
      setTimeout(() => {
        audioRef.current.src = latestSong.audioUrl;
        audioRef.current.play().catch(err => console.log('Play error:', err));
        setIsPlaying(true);
      }, 100);
    } else {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(err => console.log('Play error:', err));
        setIsPlaying(true);
      }
    }
  };

  const handleNavigateToMusic = () => {
    navigate('/music');
  };

  return (
    <section
      id="hero"
      className="w-full h-dvh flex items-center xl:px-28 lg:px-24 md:px-16 sm:px-16 xs:px-4 relative"
    >
      <div className="flex-1 h-full flex flex-col items-center md:items-start justify-center -mt-[240px] md:-mt-[40px]">
        <div className="flex xs:hidden text-white">
          <h3 className="z-10 deutsch text-[100px] lg:text-[200px] font-bold leading-none txt-shadow">
            SOUND
          </h3>
          <h4 className="z-10 mellissa text-4xl lg:text-7xl -ml-8 mt-16 lg:mt-24 txt-shadow">
            of the
          </h4>
        </div>
        <h3 className="z-10 text-red-700 bebas font-[900] italic text-7xl lg:text-[140px] -ml-4 -mt-4 leading-none xs:hidden flex txt-shadow">
          UNDERGROUND
        </h3>
        <p className="text-white sf font-medium text-center md:text-start md:w-80 lg:w-[440px] text-base lg:text-xl mt-4 txt-shadow">
          They call me Acense. A Rapper, Songwriter and Recording Artist from Nairobi, Kenya.
        </p>
      </div>

      {/* Mini Player */}
      <div
        onClick={handleNavigateToMusic}
        className="absolute flex bottom-8 right-1/2 translate-x-1/2 w-4/5 md:w-[240px] lg:right-64 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-4 cursor-pointer hover:bg-black/90 transition-all hover:scale-105 group"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={latestSong.cover}
              alt={latestSong.title}
              className="w-16 h-16 rounded object-cover"
            />

          </div>
          <div>
            <p className="text-gray-400 text-xs sf uppercase">New Song Out Now</p>
            <h4 className="text-white font-semibold sf text-sm">{latestSong.title}</h4>
            <p className="text-gray-400 text-xs sf">{latestSong.artist}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;