import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// A fine-line Sol de Mayo — the one ornament on the final page.
export function SunOfMay({ className = '' }: {className?: string;}) {
  const reduce = useReducedMotion();
  const rays = Array.from({ length: 32 });

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 160, repeat: Infinity, ease: 'linear' }}>
      
      <circle cx="100" cy="100" r="30" fill="none" stroke="#c9a45c" strokeWidth="1" />
      {rays.map((_, i) => {
        const a = i / rays.length * Math.PI * 2;
        const long = i % 2 === 0;
        const r1 = 38;
        const r2 = long ? 92 : 70;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * r1}
            y1={100 + Math.sin(a) * r1}
            x2={100 + Math.cos(a) * r2}
            y2={100 + Math.sin(a) * r2}
            stroke="#c9a45c"
            strokeWidth="0.75"
            strokeOpacity={long ? 0.9 : 0.5} />);


      })}
    </motion.svg>);

}