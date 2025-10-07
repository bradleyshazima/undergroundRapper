import React, { useState, useMemo } from "react";
import songsData from "../data";
import { Link } from "react-router-dom";

const Discography = () => {
  const [search, setSearch] = useState("");

  // Sort and filter songs
  const filteredSongs = useMemo(() => {
    return songsData
      .slice()
      .sort((a, b) => new Date(b.releaseYear) - new Date(a.releaseYear)) // latest first
      .filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase())
      );
  }, [search]);

  return (
    <section className="pt-[100px] px-10 sm:px-4 pb-10 bg-[#131313] text-white min-h-screen">
      <div className="w-full h-[280px] px-10 flex items-center justify-center">
        <h1 className="text-[96px] italic text-transparent font-[900] bebas font-outline-2">MUSIC</h1>
      </div>

      {/* Search Input */}
      <div className="w-full pb-10 flex justify-center gap-4 mb-6 px-20">
        <input
          className="h-12 w-1/3 rounded-full outline-none text-[#131313] bebas px-8"
          type="search"
          placeholder="Type to search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 place-items-center">
        {filteredSongs.map((song, index) => (
          <div key={index} className="relative group w-60 h-60 overflow-hidden mb-16">
            <img
              src={song.cover}
              alt={song.title}
              className="w-full h-full object-cover group-hover:grayscale group-hover:opacity-20 transition-all duration-300"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-semibold text-white">{song.title}</h3>
              <div className="flex gap-4 mt-2">
                <Link to={song.spotifyLink} className="text-white underline" target="_blank">Spotify</Link>
                <Link to={song.appleMusicLink} className="text-white underline" target="_blank">Apple Music</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Discography;
