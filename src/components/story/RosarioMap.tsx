import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { easeInOut } from '../../utils/motion';

// An abstract chart of the Paraná: graticule, river, and two cities. Draws itself on entry.
export function RosarioMap() {
  const reduce = useReducedMotion();
  const draw = {
    initial: { pathLength: reduce ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '0px 0px -15% 0px' }
  };

  return (
    <figure className="relative h-full min-h-[420px] border border-bone/10 p-6">
      <svg viewBox="0 0 400 500" className="h-full w-full" role="img" aria-label="Abstract map of the Paraná river showing Rosario and Buenos Aires">
        {[80, 180, 280, 380, 480].map((y, i) =>
        <motion.line
          key={y}
          x1="0" x2="400" y1={y} y2={y}
          stroke="rgba(242,239,232,0.08)"
          strokeDasharray="2 6"
          {...draw}
          transition={{ duration: 1.2, delay: i * 0.08, ease: easeInOut }} />

        )}
        {[30, 32, 34, 36].map((lat, i) =>
        <text key={lat} x="6" y={80 + i * 100 - 6} fill="rgba(154,161,173,0.6)" fontSize="9" letterSpacing="2">
            {lat}°S
          </text>
        )}
        <motion.path
          d="M 170 0 C 150 60, 230 110, 215 170 S 240 260, 262 300 S 300 380, 330 430 S 380 480, 400 500"
          fill="none"
          stroke="#75aadb"
          strokeWidth="1.5"
          {...draw}
          transition={{ duration: 2.2, ease: easeInOut }} />
        
        <motion.path
          d="M 232 212 L 330 430"
          fill="none"
          stroke="rgba(242,239,232,0.35)"
          strokeDasharray="3 5"
          {...draw}
          transition={{ duration: 1.4, delay: 1.2, ease: easeInOut }} />
        
        <circle cx="330" cy="430" r="3" fill="#9aa1ad" />
        <text x="290" y="456" fill="#9aa1ad" fontSize="10" letterSpacing="2">BUENOS AIRES</text>

        <motion.circle
          cx="232" cy="212" r="14"
          fill="none" stroke="#75aadb"
          initial={{ scale: 0.4, opacity: 0.8 }}
          animate={reduce ? undefined : { scale: [0.4, 1.6], opacity: [0.8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
        
        <circle cx="232" cy="212" r="4.5" fill="#f2efe8" />
        <text x="250" y="208" fill="#f2efe8" fontSize="13" letterSpacing="3" fontFamily="Anton">ROSARIO</text>
        <text x="250" y="224" fill="#9aa1ad" fontSize="9" letterSpacing="1.5">32°57′S · 60°39′W</text>
        <text x="168" y="140" fill="rgba(117,170,219,0.7)" fontSize="9" letterSpacing="2" transform="rotate(-62 168 140)">RÍO PARANÁ</text>
      </svg>
      <figcaption className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.22em] text-silver">
        <span>Santa Fe Province</span>
        <span>≈ 300 km to the capital</span>
      </figcaption>
    </figure>);

}