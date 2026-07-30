import React, { useState, useEffect } from "react";
import { supabase } from '../config/supabase';
import { Navbar } from "../components";

// Helper function to extract YouTube ID and return the max resolution thumbnail
const getYouTubeThumbnail = (url) => {
  if (!url) return null;
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  const videoId = match ? match[1] : null;
  
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Fetch videos from your Supabase table
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: true }); // Adjust ordering as needed

        if (error) throw error;
        
        if (data) setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-12 lg:pt-20 text-white px-4 lg:px-32 abstract-bg">

      {/* ── Giant headline block ── */}
      <div className="relative pb-0 overflow-hidden md:px-12">
        <h1
          className="md:py-8 jakarta text-7xl md:text-9xl xl:text-[260px] font-black uppercase leading-none tracking-tight select-none bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #0e0e0e 0%, #d24700 50%, #0e0e0e 100%)",
          }}
        >
          VIDEOS
        </h1>

        <p
          className="absolute top-6 right-8 text-[9px] sm:text-[10px] uppercase tracking-widest
                    text-right max-w-[155px] text-white/40 leading-loose hidden md:block"
        >
          NI SAWA NAJUA ME SI SLIM SHADY BUT EVERYBODY'S,
          GONNA EMINEM [HEAR MY NAME]
        </p>
      </div>

        {/* Top divider */}
        <div className="border-t border-white/20 mt-0" />

        {/* ── Video rows ── */}
        <div className="w-full md:px-12 mb-12">
          {loading ? (
            <div className="py-12 text-center text-white/50 jakarta text-sm uppercase tracking-widest">
              Loading videos...
            </div>
          ) : (
            videos.map((video, index) => {
              // Automatically fetch thumbnail if the database doesn't have a custom one
              const displayThumbnail = video.thumbnail_url || getYouTubeThumbnail(video.youtube_url);

              return (
                <React.Fragment key={video.id || index}>
                  {/* Changed from a div to an 'a' tag with the 'group' class */}
                  <a
                    href={video.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group cursor-pointer
                      grid items-center gap-x-4 sm:gap-x-8 py-4 sm:py-5
                      grid-cols-[2rem_1fr_auto_4rem]
                      sm:grid-cols-[3rem_1fr_auto_8rem]
                    "
                  >
                    <span className="text-[11px] text-white/35 geomanist tabular-nums group-hover:text-[#d24700] transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Track title */}
                    <span className="text-[11px] sm:text-[13px] font-semibold tracking-[0.2em] uppercase truncate group-hover:text-[#d24700] transition-colors duration-300">
                      {video.title}
                    </span>

                    {/* Play video text indicator */}
                    <span
                      className="
                        text-[9px] sm:text-[11px] tracking-[0.18em] uppercase
                        text-white/70 group-hover:text-white transition-colors duration-200
                        whitespace-nowrap xl:mr-80 jakarta
                      "
                    >
                      PLAY VIDEO
                    </span>

                    {/* Thumbnail Container */}
                    <div className="w-full aspect-video overflow-hidden bg-white/5 flex-shrink-0 relative">
                      <img
                        src={displayThumbnail}
                        alt={video.title}
                        // Added group-hover:grayscale-0 to sync with the row hover
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </a>

                  {/* Row divider */}
                  <div className="border-t border-white/10" />
                </React.Fragment>
              );
            })
          )}
        </div>

      </section>
    </>
  );
};

export default Video;