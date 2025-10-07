import React from "react";
import videos from '../constants'
import { Navbar } from "../components";

const video = []


const Video = () => {
  return (
    <>
    <Navbar />
    <section className="pt-[100px] px-10 sm:px-4 pb-10 bg-[#131313] text-white min-h-screen">
      {/* Section Title */}
      <div className="w-full h-[280px] px-10 flex items-center justify-center">
        <h1 className="text-[96px] italic text-transparent font-[900] bebas font-outline-2">
          VISUALS
        </h1>
      </div>

      {/* Video List */}
      <div className="w-full flex flex-col items-center gap-16">
        {videos.map((video, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div className="w-[60%] aspect-video">
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
            <p className="mt-4 text-4xl font-semibold bebas">{video.title}</p>
          </div>
        ))}
      </div>
    </section>
  </>
  );
};

export default Video;
