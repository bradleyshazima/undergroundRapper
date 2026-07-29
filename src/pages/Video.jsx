import React from "react";
import videos from '../video-data';
import { Navbar } from "../components";

const Video = () => {
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
          {videos.map((video, index) => (
            <React.Fragment key={index}>
              <div
                className="
                  grid items-center gap-x-4 sm:gap-x-8 py-4 sm:py-5
                  grid-cols-[2rem_1fr_auto_4rem]
                  sm:grid-cols-[3rem_1fr_auto_8rem]
                "
              >
                <span className="text-[11px] text-white/35 geomanist tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Track title */}
                <span className="text-[11px] sm:text-[13px] font-semibold tracking-[0.2em] uppercase truncate">
                  {video.title}
                </span>

                {/* Play video */}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-[9px] sm:text-[11px] tracking-[0.18em] uppercase
                    text-white/70 hover:text-white transition-colors duration-200
                    whitespace-nowrap xl:mr-80 jakarta
                  "
                >
                  PLAY VIDEO
                </a>

                <div className="w-full aspect-video overflow-hidden bg-white/5 flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Row divider */}
              <div className="border-t border-white/10" />
            </React.Fragment>
          ))}
        </div>

      </section>
    </>
  );
};

export default Video;