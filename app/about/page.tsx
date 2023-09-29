import React from 'react';
import {motion} from 'framer-motion';
import PokemonCanvas from '@/components/3d/PokemonCanvas';

export default function About(): JSX.Element {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="sm:px-16 px-6 absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-secondary" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-secondary" />
        </div>
        <div>
          <h1 className="font-black lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2">
            Hi, I'm <span className="text-secondary">Jooncco</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-500 font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-white-100">
            I develop this, and that
          </p>
        </div>
      </div>

      <PokemonCanvas />
    </section>
  );
}