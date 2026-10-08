import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { Photo } from '../ui/Photo';
import { SectionHeading } from '../typography/SectionHeading';
import { chapters } from '../../data/chapters';
import { useFinePointer } from '../../hooks/useFinePointer';
import { easeOut } from '../../utils/motion';

export function ChapterList() {
  const fine = useFinePointer();
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  return (
    <section
      aria-labelledby="journey-title"
      className="relative bg-ink px-5 py-28 md:px-10 md:py-40"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}>
      
      <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
        <div id="journey-title">
          <SectionHeading index="I" label="Eight chapters" title="The Journey" titleClassName="text-[19vw] md:text-[9vw]" />
        </div>
        <p className="max-w-sm font-serif text-xl italic leading-snug text-silver md:text-2xl">
          From a dirt pitch in Rosario to the top of the world. Read in order — or begin anywhere.
        </p>
      </div>

      <ol className="border-b border-bone/10">
        {chapters.map((c, i) =>
        <li key={c.index} className="border-t border-bone/10">
            <Link
            to={c.to}
            data-cursor="Enter"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className="group grid grid-cols-[2.25rem_1fr] items-baseline gap-x-4 gap-y-2 py-5 md:grid-cols-[5rem_1fr_18rem_8rem] md:py-6">
            
              <span className="text-[11px] tracking-[0.24em] text-silver">{c.index}</span>
              <span className="font-display text-[10.5vw] uppercase leading-[0.92] transition-[color,transform] duration-300 ease-out group-hover:translate-x-4 group-hover:text-sky md:text-[5.6vw]">
                {c.title}
              </span>
              <span className="col-start-2 font-serif text-lg italic leading-snug text-silver md:col-start-auto">
                {c.line}
              </span>
              <span className="col-start-2 text-[11px] tracking-[0.24em] text-silver md:col-start-auto md:text-right">
                {c.years}
              </span>
            </Link>
          </li>
        )}
      </ol>

      {fine &&
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 -ml-[120px] -mt-[160px] h-[320px] w-[240px]"
        style={{ x: sx, y: sy }}>
        
          <AnimatePresence>
            {active !== null &&
          <motion.div
            key={active}
            className="absolute inset-0 overflow-hidden"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.3, ease: easeOut }}>
            
                <Photo image={chapters[active].image} alt="" />
              </motion.div>
          }
          </AnimatePresence>
        </motion.div>
      }
    </section>);

}