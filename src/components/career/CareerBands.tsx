import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Photo } from '../ui/Photo';
import { careerClubs } from '../../data/career';
import { easeOut } from '../../utils/motion';

// Four vertical bands; the one you hover or focus opens like a door.
export function CareerBands() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-2 md:h-[78vh] md:flex-row" role="list">
      {careerClubs.map((club, i) => {
        const open = active === i;
        return (
          <button
            key={club.name}
            type="button"
            role="listitem"
            aria-expanded={open}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            data-cursor="View"
            className={`group relative overflow-hidden text-left transition-[flex-grow] duration-300 ease-out md:h-full ${
            open ? 'h-[70vh] md:flex-[3.4]' : 'h-24 md:flex-1'}`
            }>
            
            <div className={`absolute inset-0 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-35'}`}>
              <Photo image={club.image} alt="" mono={!open} />
              <div className="absolute inset-0 bg-ink/55" />
            </div>
            <span aria-hidden className="absolute inset-x-0 top-0 h-[2px]" style={{ backgroundColor: club.accent }} />

            <div className="relative flex h-full flex-col justify-between p-5 md:p-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.24em] text-bone/80">{club.years}</span>
                <span className="text-[11px] tracking-[0.24em] text-silver">0{i + 1}</span>
              </div>

              <AnimatePresence mode="wait">
                {open ?
                <motion.span
                  key="open"
                  className="block"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: easeOut }}>
                  
                    <span className="block font-display text-[16vw] uppercase leading-[0.85] md:text-[7vw]">{club.name}</span>
                    <span className="mt-4 block max-w-md font-serif text-2xl italic leading-snug text-bone/85">{club.line}</span>
                    <span className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-bone/20 pt-4">
                      <span className="font-display text-6xl leading-none">{club.figure}</span>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-silver">{club.figureLabel}</span>
                    </span>
                    <span className="mt-3 block text-sm text-bone/70">{club.honours}</span>
                  </motion.span> :

                <motion.span
                  key="closed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block font-display text-3xl uppercase leading-none md:origin-bottom-left md:-rotate-90 md:translate-x-8 md:whitespace-nowrap md:text-5xl">
                  
                    {club.name}
                  </motion.span>
                }
              </AnimatePresence>
            </div>
          </button>);

      })}
    </div>);

}