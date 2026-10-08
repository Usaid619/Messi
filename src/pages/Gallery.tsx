import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageTransition } from '../components/transitions/PageTransition';
import { SplitText } from '../components/typography/SplitText';
import { Photo } from '../components/ui/Photo';
import { Lightbox } from '../components/gallery/Lightbox';
import { NextChapter } from '../components/ui/NextChapter';
import { galleryItems } from '../data/gallery';
import { easeOut } from '../utils/motion';
import type { GalleryItem } from '../types/content';

const aspect: Record<GalleryItem['ratio'], string> = {
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[2/3]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]'
};

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => i === null ? i : (i + dir + galleryItems.length) % galleryItems.length),
    []
  );

  return (
    <PageTransition>
      <header className="flex flex-col justify-between gap-6 bg-ink px-5 pb-14 pt-32 md:flex-row md:items-end md:px-10 md:pb-20 md:pt-40">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-silver">Frames</p>
          <SplitText
            as="h1"
            by="char"
            text="Gallery"
            start
            delay={0.55}
            className="mt-3 font-display text-[28vw] uppercase leading-[0.8] md:text-[18vw]" />
          
        </div>
        <p className="max-w-xs font-serif text-xl italic leading-snug text-silver md:pb-4">
          Atmospheric frames, each one reserved for a licensed photograph of the moment it describes.
        </p>
      </header>

      <section aria-label="Photography" className="bg-ink px-5 pb-32 md:px-10">
        <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {galleryItems.map((item, i) =>
          <motion.li
            key={item.id}
            className="mb-5 break-inside-avoid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.7, delay: i % 4 * 0.05, ease: easeOut }}>
            
              <button
              type="button"
              onClick={() => setOpen(i)}
              data-cursor="View"
              aria-label={`Open ${item.title}, ${item.location}`}
              className={`group relative block w-full overflow-hidden ${aspect[item.ratio]}`}>
              
                <div className="h-full w-full transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04]">
                  <Photo image={item.image} alt="" />
                </div>
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30" />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-4 opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="font-display text-2xl uppercase leading-none">{item.title}</span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-bone/80">{item.year}</span>
                </div>
              </button>
            </motion.li>
          )}
        </ul>
      </section>

      <AnimatePresence>
        {open !== null &&
        <Lightbox key="lightbox" item={galleryItems[open]} index={open} total={galleryItems.length} onClose={close} onStep={step} />
        }
      </AnimatePresence>

      <NextChapter />
    </PageTransition>);

}