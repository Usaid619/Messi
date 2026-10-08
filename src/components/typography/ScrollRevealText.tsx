import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { ScrollWord } from './ScrollWord';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

// Words light up one by one as the paragraph travels through the viewport.
export function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const s = i / words.length;
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[s, s + 1 / words.length]}>
            {w}
          </ScrollWord>);

      })}
    </p>);

}