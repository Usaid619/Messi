import React, { useRef } from 'react';
import { motion, MotionValue, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { TrophyIcon } from './TrophyIcon';
import { easeOut } from '../../utils/motion';
import type { Trophy } from '../../types/content';

interface TrophyObjectProps {
  trophy: Trophy;
  metal: 'gold' | 'silver';
  size: 'lg' | 'md' | 'sm';
  depth: number;
  active: boolean;
  dimmed: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
  onActivate: () => void;
  onDeactivate: () => void;
  floatDelay: number;
}

const sizes = { lg: 'h-56 md:h-72', md: 'h-44 md:h-56', sm: 'h-36 md:h-44' };

export function TrophyObject({
  trophy,
  metal,
  size,
  depth,
  active,
  dimmed,
  px,
  py,
  onActivate,
  onDeactivate,
  floatDelay
}: TrophyObjectProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const x = useTransform(px, (v) => v * depth * 26);
  const y = useTransform(py, (v) => v * depth * 16);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rx = useSpring(tiltX, { stiffness: 200, damping: 20 });
  const ry = useSpring(tiltY, { stiffness: 200, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const reset = () => {
    tiltX.set(0);
    tiltY.set(0);
    onDeactivate();
  };

  return (
    <motion.div style={{ x, y }} className="relative flex flex-col items-center">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[140%] w-40 -translate-x-1/2 bg-gradient-to-b from-bone/0 via-bone/[0.07] to-bone/0 [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)]"
        animate={{ opacity: active ? 1 : 0.25 }}
        transition={{ duration: 0.3 }} />
      
      <button
        ref={ref}
        type="button"
        onPointerEnter={onActivate}
        onPointerMove={onMove}
        onPointerLeave={reset}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onClick={onActivate}
        aria-label={`${trophy.name}, ${trophy.count} time${trophy.count > 1 ? 's' : ''}, ${trophy.team}`}
        className="relative [perspective:800px]">
        
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6 + depth * 2, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}>
          
          <motion.div
            style={{ rotateX: rx, rotateY: ry }}
            animate={{ opacity: dimmed ? 0.35 : 1, scale: active ? 1.04 : 1 }}
            transition={{ duration: 0.25, ease: easeOut }}>
            
            <TrophyIcon shape={trophy.shape} metal={metal} className={`${sizes[size]} w-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]`} />
          </motion.div>
        </motion.div>
      </button>
      <span aria-hidden className="mt-3 h-1.5 w-20 rounded-[50%] bg-black/70" />
      <span className={`mt-3 font-display text-lg tracking-[0.08em] transition-colors duration-200 ${active ? 'text-gold' : 'text-silver'}`}>
        ×{trophy.count}
      </span>
    </motion.div>);

}