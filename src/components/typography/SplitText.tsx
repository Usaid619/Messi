import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { easeOut } from '../../utils/motion';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

interface SplitTextProps {
  text: string;
  as?: Tag;
  className?: string;
  by?: 'char' | 'word';
  delay?: number;
  stagger?: number;
  duration?: number;
  /** When provided, overrides in-view triggering. */
  start?: boolean;
}

// Each character/word rises out of its own mask. Screen readers get the full string.
export function SplitText({
  text,
  as = 'span',
  className = '',
  by = 'word',
  delay = 0,
  stagger,
  duration = 0.8,
  start
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const play = start ?? inView;
  const step = stagger ?? (by === 'char' ? 0.03 : 0.06);
  let unit = 0;

  const renderUnit = (content: string, key: string) => {
    const i = unit++;
    return (
      <span key={key} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
        <motion.span
          className="inline-block will-change-transform"
          initial={{ y: reduce ? '0%' : '110%' }}
          animate={{ y: play || reduce ? '0%' : '110%' }}
          transition={{ duration, ease: easeOut, delay: delay + i * step }}>
          
          {content}
        </motion.span>
      </span>);

  };

  const words = text.split(' ');
  const children = words.map((word, wi) =>
  <React.Fragment key={wi}>
      <span className="inline-block whitespace-nowrap" aria-hidden>
        {by === 'char' ? word.split('').map((c, ci) => renderUnit(c, `${wi}-${ci}`)) : renderUnit(word, `${wi}`)}
      </span>
      {wi < words.length - 1 ? ' ' : null}
    </React.Fragment>
  );

  return React.createElement(as, { ref, className, 'aria-label': text }, children);
}