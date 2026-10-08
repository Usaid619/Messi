import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from 'lucide-react';
import { Photo } from '../ui/Photo';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';
import { easeOut } from '../../utils/motion';
import type { Moment } from '../../types/content';

interface MomentDetailProps {
  moment: Moment;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}

export function MomentDetail({ moment, index, total, onClose, onStep }: MomentDetailProps) {
  const { lenis } = useSmoothScroll();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  const meta = [
  ['Date', moment.date],
  ['Competition', moment.competition],
  ['Opponent', moment.opponent],
  ['Venue', moment.venue]];


  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${moment.title}, ${moment.year}`}
      className="fixed inset-0 z-[65] overflow-y-auto bg-ink md:overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      data-lenis-prevent>
      
      <div className="grid min-h-full md:h-full md:grid-cols-[1.25fr_1fr]">
        <motion.div layoutId={`moment-img-${moment.id}`} className="relative h-[52vh] overflow-hidden md:h-full" transition={{ duration: 0.3, ease: easeOut }}>
          <Photo image={moment.image} alt="" placeholder={moment.placeholder} />
          <div className="absolute inset-0 bg-ink/25" />
          <p aria-hidden className="absolute -bottom-[0.12em] left-4 font-display text-[30vw] leading-none text-outline-bone md:text-[16vw]">
            {moment.year}
          </p>
        </motion.div>

        <div className="relative flex flex-col justify-between gap-10 px-5 pb-8 pt-8 md:px-12 md:pb-12 md:pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, delay: 0.1, ease: easeOut }}>
              
              <p className="text-[11px] uppercase tracking-[0.24em] text-silver">
                Moment {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
              <h2 className="mt-4 font-display text-[16vw] uppercase leading-[0.86] md:text-[6.5vw]">{moment.title}</h2>
              <p className="mt-6 max-w-lg font-serif text-2xl leading-snug text-bone/85">{moment.description}</p>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-bone/10 pt-6">
                {meta.map(([k, v]) =>
                <div key={k}>
                    <dt className="text-[10px] uppercase tracking-[0.24em] text-silver">{k}</dt>
                    <dd className="mt-1 text-sm text-bone">{v}</dd>
                  </div>
                )}
              </dl>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button type="button" onClick={() => onStep(-1)} aria-label="Previous moment" className="flex h-12 w-12 items-center justify-center border border-bone/20 transition-colors duration-200 hover:bg-bone hover:text-ink">
                <ArrowLeftIcon className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => onStep(1)} aria-label="Next moment" className="flex h-12 w-12 items-center justify-center border border-bone/20 transition-colors duration-200 hover:bg-bone hover:text-ink">
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
            <span className="hidden text-[10px] uppercase tracking-[0.24em] text-silver md:block">← → to browse · Esc to close</span>
          </div>
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close moment"
        className="fixed right-4 top-4 z-10 flex h-12 w-12 items-center justify-center bg-ink/70 text-bone transition-colors duration-200 hover:bg-bone hover:text-ink md:right-8 md:top-6">
        
        <XIcon className="h-5 w-5" />
      </button>
    </motion.div>);

}