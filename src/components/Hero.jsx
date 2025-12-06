import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navLinks } from "../constants";

const Hero = () => {
  return (
      <section
        id="hero"
        className={`w-full h-screen flex items-center xl:px-28 lg:px-24 md:px-16 sm:px-16 xs:px-4 `}
      >
        <div className="flex-1 h-full flex flex-col xs:items-center justify-center">
          <div className="flex xs:hidden text-white">
            <h3 className="z-10 deutsch xl:text-[100px] lg:text-[120px] md:text-8xl sm:text-8xl font-bold leading-none">
              SOUND
            </h3>
            <h4 className="z-10 mellissa xl:text-[80px] lg:text-7xl lg:mt-8 md:mt-8 sm:mt-8 xs:mt-7 md:text-5xl xs:text-2xl sm:text-4xl">
              of the
            </h4>
          </div>
          <h3 className="z-10 text-red-700 bebas font-[900] italic xl:text-[120px] lg:text-[70px] md:text-6xl sm:text-5xl xs:text-2xl leading-none xs:hidden flex">
            UNDERGROUND
          </h3>

          <h3 className="z-10 text-7xl xs:flex hidden deutsch text-white">SOUND</h3>
          <h4 className="z-10 drop-shadow-sm text-4xl xs:flex hidden text-white mellissa -mt-4">of the</h4>
          <h3 className="z-10 text-5xl xs:flex hidden text-red-700 my-4 bebas font-[900] italic">UNDER</h3>
          <h3 className="z-10 text-5xl xs:flex hidden text-red-700 bebas font-[900] italic">GROUND</h3>
        </div>

      </section>
  );
};

export default Hero;
