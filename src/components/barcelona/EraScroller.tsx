import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { EraPanel } from './EraPanel';
import type { Era } from '../../types/content';

interface EraScrollerProps {
  eras: Era[];
}

// Vertical scroll drives a horizontal film strip of eras.
export function EraScroller({ eras }: EraScrollerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(trackRef.current.scrollWidth - window.innerWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrent(Math.min(eras.length - 1, Math.max(0, Math.round(v * (eras.length - 1)))));
  });

  return (
    <section
      ref={sectionRef}
      aria-label="Barcelona timeline, 2004 to 2021"
      className="relative bg-ink"
      style={{ height: `calc(${distance}px + 100vh)` }}
      data-cursor="Explore">
      
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex h-full w-max will-change-transform">
          {eras.map((era, i) =>
          <EraPanel key={era.year} era={era} index={i} total={eras.length} progress={scrollYProgress} />
          )}
          <div className="w-[12vw] shrink-0" aria-hidden />
        </motion.div>

        <div className="absolute inset-x-5 bottom-6 flex items-center gap-4 md:inset-x-10">
          <span className="font-display text-sm tabular-nums tracking-[0.1em]">{eras[current].year}</span>
          <div className="relative h-px flex-1 bg-bone/15">
            <motion.span style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-bone" />
          </div>
          <span className="font-display text-sm tracking-[0.1em] text-silver">{eras[eras.length - 1].year}</span>
        </div>
      </div>
    </section>);

}