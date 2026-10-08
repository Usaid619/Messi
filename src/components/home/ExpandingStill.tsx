import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Photo } from '../ui/Photo';
import { MagneticButton } from '../ui/MagneticButton';

// A small frame that opens to fill the screen as you scroll — the city of Barcelona arriving.
export function ExpandingStill() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const clip = useTransform(
    scrollYProgress,
    [0, 0.6],
    reduce ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(24% 30% 24% 30%)', 'inset(0% 0% 0% 0%)']
  );
  const scale = useTransform(scrollYProgress, [0, 0.6], [reduce ? 1 : 1.3, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.45, 0.75], [reduce ? 0 : 60, 0]);
  const yearsOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section ref={ref} aria-label="Barcelona, 2004 to 2021" className="relative h-[240vh] bg-ink">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale }} className="h-full w-full">
            <Photo image="barcelona" alt="Barcelona at blue hour, seen from Montjuïc" />
          </motion.div>
          <div className="absolute inset-0 bg-ink/50" />
        </motion.div>

        <motion.p
          style={{ opacity: yearsOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[12%] flex justify-between px-5 font-display text-[9vw] leading-none text-bone/90 md:px-10 md:text-[6vw]">
          
          <span>2004</span>
          <span>2021</span>
        </motion.p>

        <motion.div style={{ opacity: textOpacity, y: textY }} className="relative z-10 px-5 text-center">
          <h2 className="font-display text-[17vw] uppercase leading-[0.86] md:text-[11vw]">Seventeen seasons.</h2>
          <p className="mt-6 font-serif text-2xl italic text-bone/85 md:text-4xl">One city. One shirt. One impossible standard.</p>
          <div className="mt-10">
            <MagneticButton
              to="/barcelona"
              className="inline-flex items-center gap-3 border border-bone/40 px-7 py-4 text-[11px] uppercase tracking-[0.26em] transition-colors duration-200 hover:bg-bone hover:text-ink">
              
              Enter Barcelona →
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>);

}