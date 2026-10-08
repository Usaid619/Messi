import React from 'react';
import { motion } from 'framer-motion';
import { SplitText } from './SplitText';
import { easeOut } from '../../utils/motion';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({ index, label, title, className = '', titleClassName = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.26em] text-silver">
        <span className="text-bone">{index}</span>
        <motion.span
          className="block h-px w-12 origin-left bg-current"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }} />
        
        <span>{label}</span>
      </div>
      <SplitText
        as="h2"
        by="char"
        text={title}
        className={`mt-5 font-display uppercase leading-[0.88] ${titleClassName || 'text-[16vw] md:text-[11vw]'}`} />
      
    </div>);

}