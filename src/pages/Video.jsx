import React from "react";
import videos from '../constants'
import { Navbar } from "../components";

const video = []


const Video = () => {
  return (
    <>
    <Navbar />
    <section className="pt-20 px-6 sm:px-16 pb-10 bg-[#131313] text-white min-h-screen">
      {/* Section Title */}
      <div className="w-full py-3 px-10 flex items-center justify-center">
        <h1 className="text-4xl lg:text-6xl bebas text-white font-medium">
          Visuals
        </h1>
      </div>

      {/* Video List */}
      <div className="w-full flex flex-wrap justify-center gap-8 lg:gap-12">
        {videos.map((video, index) => (
          <div key={index} className="flex flex-col items-center w-full md:w-[45%] xl:w-[29%]">
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-2 lg:text-2xl font-medium sf">{video.title}</p>
          </div>
        ))}
      </div>
    </section>
  </>
  );
};

export default Video;
