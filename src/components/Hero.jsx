import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../context/AudioContext";
import musicData from "../music-data/index";
import { Play, Pause } from "lucide-react";
import CircularText from "./CircularText";

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
      className="w-full h-dvh flex items-center xl:px-28 lg:px-24 md:px-16 sm:px-16 xs:px-4 relative overflow-hidden"
    >
      <div className="flex-1 h-full flex flex-col items-center md:items-start justify-center -mt-[240px] md:-mt-[40px]">
        <div className="w-full flex-1 flex flex-col items-center justify-center">
        <picture className="flex justify-center w-full">
          <source
            media="(min-width: 768px)"
            srcSet="https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1785165346/Acense-text-long_oqvr5s.png"
          />
          
          {/* Fallback & base styling for square logo */}
          <img 
            src="https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1785163947/acense-text-square_uayrzw.png"
            alt="Acense" 
            className="w-4/5 xl:w-1/2 2xl:w-2/3"
          />
        </picture>
        
        <p className="text-white text-xl font-medium mt-12 jakarta">Sound of the Underground</p>
          
          <div className="absolute bottom-[-240px] left-1/2 -translate-x-1/2 flex items-center justify-center w-[300px] h-[300px] z-20">
            {/* Circular Text (Positioned on top or around) */}
            <div className="relative z-20">
              <CircularText
                text="UNDERGROUND*RAPPER*UNDERGROUND*RAPPER*"
                onHover="speedUp"
                spinDuration={20}
              />
            </div>
          </div>

          <div className="absolute bottom-[-340px] left-1/2 -translate-x-1/2 flex items-center justify-center w-[520px] h-[520px] z-40">
            {/* Globe Image */}
            <img 
              src="https://res.cloudinary.com/bradley-cdn/image/upload/q_auto/f_auto/v1785152501/globe_ynemet.png" 
              alt="globe" 
              className="absolute z-[999] object-contain pointer-events-none" 
            />
          </div>
        </div>
      </div>

      <div
        className="absolute flex flex-col items-center bottom-8 right-1/2 translate-x-1/2"
      >
        <div className="flex items-center justify-center border-2 border-white/70 rounded-lg w-6 h-10 cursor-pointer transition-all duration-300">
          <i class="fa-solid fa-arrow-down up-down text-white text-sm"></i>
        </div>
        <p className="text-white text-sm mt-2 jakarta">Scroll to Bio</p>
      </div>
    </section>
  );
};

export default Hero;