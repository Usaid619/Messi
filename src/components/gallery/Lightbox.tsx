import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from 'lucide-react';
import { Photo } from '../ui/Photo';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';
import { easeOut } from '../../utils/motion';
import type { GalleryItem } from '../../types/content';

interface LightboxProps {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}

const aspect: Record<GalleryItem['ratio'], string> = {
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[2/3]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]'
};

export function Lightbox({ item, index, total, onClose, onStep }: LightboxProps) {
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

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — image ${index + 1} of ${total}`}
      className="fixed inset-0 z-[65] flex flex-col bg-ink/[0.97] md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      data-lenis-prevent>
      
      <div className="relative flex flex-1 items-center justify-center p-5 pt-20 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className={`relative max-h-[62vh] w-auto md:max-h-[84vh] ${aspect[item.ratio]} h-[62vh] md:h-[84vh] max-w-full`}>
            
            <Photo image={item.image} alt={item.title} placeholder="Licensed photograph" />
          </motion.div>
        </AnimatePresence>
      </div>

      <aside className="flex flex-col justify-between gap-6 border-t border-bone/10 px-5 py-6 md:w-[26rem] md:border-l md:border-t-0 md:px-10 md:py-24">
        <AnimatePresence mode="wait">
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <p className="text-[11px] uppercase tracking-[0.24em] text-silver">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[0.9]">{item.title}</h2>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-bone/10 pt-5">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.24em] text-silver">Year</dt>
                <dd className="mt-1 text-sm">{item.year}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.24em] text-silver">Location</dt>
                <dd className="mt-1 text-sm">{item.location}</dd>
              </div>
            </dl>
            <p className="mt-5 font-serif text-xl italic leading-snug text-bone/80">{item.context}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => onStep(-1)} aria-label="Previous image" className="flex h-12 w-12 items-center justify-center border border-bone/20 transition-colors duration-200 hover:bg-bone hover:text-ink">
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => onStep(1)} aria-label="Next image" className="flex h-12 w-12 items-center justify-center border border-bone/20 transition-colors duration-200 hover:bg-bone hover:text-ink">
            <ArrowRightIcon className="h-4 w-4" />
          </button>
          <span className="ml-3 hidden text-[10px] uppercase tracking-[0.24em] text-silver md:block">← → · Esc</span>
        </div>
      </aside>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center text-bone transition-colors duration-200 hover:bg-bone hover:text-ink md:right-8 md:top-6">
        
        <XIcon className="h-5 w-5" />
      </button>
    </motion.div>);

}