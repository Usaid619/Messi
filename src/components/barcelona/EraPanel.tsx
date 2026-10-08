import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Photo } from '../ui/Photo';
import type { Era } from '../../types/content';

interface EraPanelProps {
  era: Era;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

export function EraPanel({ era, index, total, progress }: EraPanelProps) {
  const center = index / Math.max(total - 1, 1);
  const span = 1 / Math.max(total - 1, 1);
  const range = [center - span, center, center + span];
  const imgX = useTransform(progress, range, ['14%', '0%', '-14%']);
  const imgScale = useTransform(progress, range, [1.25, 1.05, 1.25]);
  const clip = useTransform(progress, range, [
  'inset(12% 0% 12% 40%)',
  'inset(0% 0% 0% 0%)',
  'inset(12% 40% 12% 0%)']
  );
  const yearY = useTransform(progress, range, ['20%', '0%', '-12%']);
  const isLegendary = era.year === '2019';

  return (
    <article
      aria-label={`${era.year} — ${era.title}`}
      className="relative h-full w-[88vw] shrink-0 px-5 pb-16 pt-24 md:w-[78vw] md:px-10 md:pb-20 md:pt-28">
      
      <span aria-hidden className="absolute bottom-20 left-0 top-28 w-px bg-garnet/70" />

      <motion.div
        style={{ clipPath: clip }}
        className="absolute bottom-[22vh] right-5 top-[16vh] w-[72%] overflow-hidden md:bottom-[14vh] md:right-10 md:w-[52%]">
        
        <motion.div style={{ x: imgX, scale: imgScale }} className="h-full w-full">
          <Photo image={era.image} alt="" mono />
        </motion.div>
        <div className="absolute inset-0 bg-night/35" />
        <span className="absolute bottom-3 left-3 border border-bone/20 bg-ink/75 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-bone/70">
          Placeholder · {era.placeholder}
        </span>
      </motion.div>

      <motion.p
        aria-hidden
        style={{ y: yearY }}
        className="pointer-events-none relative z-10 font-display text-[34vw] leading-[0.78] text-bone mix-blend-difference md:text-[30vh]">
        
        {era.year}
      </motion.p>

      <div className="absolute bottom-16 left-5 z-10 max-w-[78vw] md:bottom-20 md:left-10 md:max-w-sm">
        <p className="text-[11px] uppercase tracking-[0.24em] text-silver">{era.subtitle}</p>
        <h3 className="mt-3 font-display text-5xl uppercase leading-[0.92] md:text-6xl">{era.title}</h3>
        <p className="mt-4 hidden font-serif text-xl leading-snug text-bone/80 sm:block">{era.body}</p>
        <div className="mt-6 flex items-baseline gap-3 border-t border-bone/15 pt-4">
          <span className={`font-display text-4xl ${isLegendary ? 'text-gold' : 'text-bone'}`}>{era.stat.value}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-silver">{era.stat.label}</span>
        </div>
      </div>
    </article>);

}