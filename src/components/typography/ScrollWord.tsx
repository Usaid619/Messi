import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ScrollWordProps {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}

export function ScrollWord({ progress, range, children }: ScrollWordProps) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span aria-hidden style={{ opacity }}>
        {children}
      </motion.span>{' '}
    </>);

}