import React from 'react';
import { motion } from 'framer-motion';
import { SplitText } from '../typography/SplitText';
import { easeOut } from '../../utils/motion';
import type { ArgentinaChapter } from '../../types/content';

interface ChapterEntryProps {
  chapter: ArgentinaChapter;
  tone?: 'light' | 'sky';
}

export function ChapterEntry({ chapter, tone = 'light' }: ChapterEntryProps) {
  const muted = tone === 'sky' ? 'text-night/70' : 'text-night/60';
  return (
    <article className="grid items-end gap-6 border-t border-night/15 py-14 md:grid-cols-12 md:gap-10 md:py-20">
      <SplitText
        as="p"
        by="char"
        text={chapter.year}
        className="font-display text-[34vw] leading-[0.8] text-night md:col-span-6 md:text-[17vw]" />
      
      <motion.div
        className="md:col-span-5 md:col-start-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}>
        
        <p className={`text-[11px] uppercase tracking-[0.24em] ${muted}`}>{chapter.place}</p>
        <h3 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-night md:text-5xl">{chapter.title}</h3>
        <p className="mt-2 font-display text-2xl uppercase text-night/80">{chapter.result}</p>
        <p className={`mt-5 font-serif text-xl leading-snug ${tone === 'sky' ? 'text-night/85' : 'text-night/75'}`}>{chapter.body}</p>
      </motion.div>
    </article>);

}