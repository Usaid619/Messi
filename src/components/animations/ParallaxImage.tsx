import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Photo } from '../ui/Photo';
import type { ImageKey } from '../../types/content';

interface ParallaxImageProps {
  image: ImageKey;
  alt: string;
  placeholder?: string;
  className?: string;
  amount?: number;
  mono?: boolean;
}

export function ParallaxImage({ image, alt, placeholder, className = '', amount = 10, mono }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -bottom-[14%] -top-[14%] will-change-transform">
        <Photo image={image} alt={alt} mono={mono} />
      </motion.div>
      {placeholder &&
      <span className="absolute bottom-3 left-3 max-w-[85%] border border-bone/20 bg-ink/75 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-bone/70">
          Placeholder · {placeholder}
        </span>
      }
    </div>);

}