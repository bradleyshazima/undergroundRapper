import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navLinks } from "../constants";

const Hero = () => {
  return (
      <section
        id="hero"
        className={`w-full h-screen flex items-center xl:px-28 lg:px-24 md:px-16 sm:px-16 xs:px-4 `}
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
          <p className="text-white sf font-medium text-center md:text-start md:w-80 lg:w-[440px] text-base lg:text-xl mt-4 txt-shadow">They call me Acense. A Rapper, Songwriter and Recording Artist from Nairobi, Kenya.</p>
        </div>

        {/* Mini player that has text that says, New song out now and when user clicks on that player it takes them to the /music page */}
        <div>

        </div>

      </section>
  );
};

export default Hero;
