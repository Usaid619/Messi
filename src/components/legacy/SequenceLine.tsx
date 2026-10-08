import React from 'react';
import { motion, MotionValue, useReducedMotion, useTransform } from 'framer-motion';

interface SequenceLineProps {
  progress: MotionValue<number>;
  start: number;
  end?: number;
  className?: string;
  overlay?: boolean;
  children: React.ReactNode;
}

// A line that fades up at `start` and (optionally) dissolves at `end`, driven purely by scroll.
export function SequenceLine({ progress, start, end, className = '', overlay, children }: SequenceLineProps) {
  const reduce = useReducedMotion();
  const input = end !== undefined ? [start, start + 0.08, end - 0.08, end] : [start, start + 0.08];
  const output = end !== undefined ? [0, 1, 1, 0] : [0, 1];
  const opacity = useTransform(progress, input, output);
  const y = useTransform(progress, [start, start + 0.12], [reduce ? 0 : 40, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`${overlay ? 'absolute inset-0 flex items-center justify-center' : ''} ${className}`}>
      
      {children}
    </motion.div>);

}