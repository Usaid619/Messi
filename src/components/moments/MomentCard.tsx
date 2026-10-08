import React from 'react';
import { motion } from 'framer-motion';
import { Photo } from '../ui/Photo';
import { easeOut } from '../../utils/motion';
import type { Moment } from '../../types/content';

interface MomentCardProps {
  moment: Moment;
  index: number;
  className: string;
  onOpen: () => void;
}

export function MomentCard({ moment, index, className, onOpen }: MomentCardProps) {
  return (
    <motion.li
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.8, ease: easeOut }}>
      
      <button
        type="button"
        onClick={onOpen}
        data-cursor="View"
        aria-label={`${moment.title}, ${moment.year} — open`}
        className="group relative block h-full w-full overflow-hidden text-left">
        
        <motion.div layoutId={`moment-img-${moment.id}`} className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.06]">
            <Photo image={moment.image} alt="" mono />
          </div>
          <div className="absolute inset-0 bg-ink/35 transition-colors duration-300 group-hover:bg-ink/15" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/90 to-transparent" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-5">
          <span className="text-[10px] tracking-[0.24em] text-bone/70">{String(index + 1).padStart(2, '0')}</span>
          <span className="font-display text-2xl leading-none md:text-3xl">{moment.year}</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
          <div className="overflow-hidden">
            <p className="translate-y-full text-[10px] uppercase tracking-[0.22em] text-sky opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {moment.competition} · vs {moment.opponent}
            </p>
          </div>
          <h3 className="mt-2 font-display text-4xl uppercase leading-[0.9] md:text-5xl">{moment.title}</h3>
        </div>
        <span className="absolute right-4 top-12 border border-bone/20 bg-ink/70 px-2 py-0.5 text-[8px] uppercase tracking-[0.18em] text-bone/60 md:right-5">
          Placeholder
        </span>
      </button>
    </motion.li>);

}