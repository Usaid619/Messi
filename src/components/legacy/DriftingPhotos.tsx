import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Photo } from '../ui/Photo';
import type { ImageKey } from '../../types/content';

const rowA: ImageKey[] = ['rosario', 'tunnel', 'stadium', 'ball', 'crowd'];
const rowB: ImageKey[] = ['flashes', 'grass', 'silhouette', 'barcelona', 'trophy'];

// Two rows of photographs drifting past each other — slowly, like memory.
export function DriftingPhotos() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const xA = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-22%']);
  const xB = useTransform(scrollYProgress, [0, 1], reduce ? ['-10%', '-10%'] : ['-22%', '0%']);

  return (
    <section ref={ref} aria-label="Photographs" className="overflow-hidden bg-ink py-24 md:py-36">
      <motion.div style={{ x: xA }} className="flex w-max gap-5 md:gap-8">
        {rowA.map((img) =>
        <div key={img} className="aspect-[4/3] w-[64vw] shrink-0 opacity-70 md:w-[30vw]">
            <Photo image={img} alt="" mono />
          </div>
        )}
      </motion.div>
      <motion.div style={{ x: xB }} className="mt-5 flex w-max gap-5 md:mt-8 md:gap-8">
        {rowB.map((img) =>
        <div key={img} className="aspect-[3/2] w-[54vw] shrink-0 opacity-60 md:w-[24vw]">
            <Photo image={img} alt="" mono />
          </div>
        )}
      </motion.div>
    </section>);

}