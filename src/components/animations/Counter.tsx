import React, { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { easeOut } from '../../utils/motion';

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function Counter({ to, suffix = '', duration = 1.8, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduce) {
      el.textContent = to.toLocaleString('en-US');
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: easeOut,
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString('en-US');
      }
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span className={`tabular-nums ${className}`} aria-label={`${to}${suffix}`}>
      <span ref={ref} aria-hidden>
        0
      </span>
      <span aria-hidden>{suffix}</span>
    </span>);

}