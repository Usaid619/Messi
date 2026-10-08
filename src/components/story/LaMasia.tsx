import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '../typography/SectionHeading';
import { Photo } from '../ui/Photo';
import { masiaMilestones } from '../../data/story';
import { easeOut } from '../../utils/motion';

export function LaMasia() {
  const [active, setActive] = useState(0);
  const current = masiaMilestones[active];

  return (
    <section aria-labelledby="la-masia" className="relative bg-ink px-5 py-28 md:px-10 md:py-40">
      <div id="la-masia" className="mb-16 md:mb-24">
        <SectionHeading index="03" label="La Masia" title="The Making" titleClassName="text-[18vw] md:text-[10vw]" />
        <p className="mt-6 max-w-xl font-serif text-2xl italic leading-snug text-bone/80">
          A farmhouse beside the Camp Nou. Boys from everywhere, one idea of football — and the smallest of them all.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="sticky top-24 aspect-[3/4] w-full overflow-hidden">
            <Photo image="tunnel" alt="A stadium tunnel opening onto a lit pitch" placeholder="Archive: La Masia, early 2000s" mono />
            <div className="absolute inset-0 bg-ink/30" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
              <span className="text-[10px] uppercase tracking-[0.24em] text-bone/80">Archive</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="font-display text-7xl leading-none text-bone md:text-8xl">
                  
                  {current.year}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <ol className="md:col-span-6 md:col-start-7">
          {masiaMilestones.map((m, i) =>
          <motion.li
            key={`${m.year}-${m.title}`}
            onViewportEnter={() => setActive(i)}
            viewport={{ margin: '-45% 0px -45% 0px' }}
            className="flex min-h-[46vh] flex-col justify-center border-t border-bone/10 py-10">
            
              <p className={`text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 ${active === i ? 'text-sky' : 'text-silver'}`}>
                {m.date ? `${m.date} ${m.year}` : m.year}
              </p>
              <h3 className={`mt-4 font-display text-5xl uppercase leading-[0.95] transition-opacity duration-300 md:text-7xl ${active === i ? 'opacity-100' : 'opacity-30'}`}>
                {m.title}
              </h3>
              <p className={`mt-5 max-w-md font-serif text-xl leading-snug transition-opacity duration-300 ${active === i ? 'text-bone/85' : 'text-bone/30'}`}>
                {m.body}
              </p>
            </motion.li>
          )}
        </ol>
      </div>
    </section>);

}