import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity } from
'framer-motion';
import { wrap } from '../../utils/motion';

interface VelocityMarqueeProps {
  items: string[];
  baseVelocity?: number;
  className?: string;
}

// Drifts slowly on its own, then surges with the reader's scroll speed.
export function VelocityMarquee({ items, baseVelocity = -1.4, className = '' }: VelocityMarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;else
    if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const row = items.join('  ·  ');

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-label={items.join(', ')}>
      <motion.div aria-hidden className="flex w-max" style={{ x }}>
        {[0, 1, 2, 3].map((i) =>
        <span key={i} className="pr-[0.35em]">
            {row} ·
          </span>
        )}
      </motion.div>
    </div>);

}