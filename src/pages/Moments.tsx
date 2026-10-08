import React, { useCallback, useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { PageTransition } from '../components/transitions/PageTransition';
import { SplitText } from '../components/typography/SplitText';
import { MomentCard } from '../components/moments/MomentCard';
import { MomentDetail } from '../components/moments/MomentDetail';
import { NextChapter } from '../components/ui/NextChapter';
import { moments } from '../data/moments';

// An editorial rhythm — never two frames the same shape side by side.
const layout = [
'md:col-span-7 aspect-[4/3]',
'md:col-span-5 aspect-[3/4] md:mt-32',
'md:col-span-4 aspect-[3/4]',
'md:col-span-8 aspect-[16/10] md:mt-20',
'md:col-span-6 md:col-start-2 aspect-[4/3]',
'md:col-span-5 aspect-[3/4] md:-mt-16',
'md:col-span-5 aspect-[4/5]',
'md:col-span-7 aspect-[16/11] md:mt-28',
'md:col-span-8 aspect-[16/10]',
'md:col-span-4 aspect-[3/4] md:mt-24',
'md:col-span-10 md:col-start-2 aspect-[21/9]'];


export function Moments() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => i === null ? i : (i + dir + moments.length) % moments.length),
    []
  );

  return (
    <PageTransition>
      <header className="bg-ink px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <p className="text-[11px] uppercase tracking-[0.26em] text-silver">Eleven frames</p>
        <SplitText
          as="h1"
          by="char"
          text="Moments"
          start
          delay={0.55}
          className="mt-3 font-display text-[26vw] uppercase leading-[0.8] md:text-[19vw]" />
        
        <p className="mt-6 max-w-lg font-serif text-2xl italic leading-snug text-bone/80 md:text-3xl">
          The nights when time stopped — and the world watched a single player decide how it would start again.
        </p>
      </header>

      <LayoutGroup>
        <section aria-label="Iconic moments" className="bg-ink px-5 pb-32 md:px-10">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {moments.map((m, i) =>
            <MomentCard key={m.id} moment={m} index={i} className={layout[i % layout.length]} onOpen={() => setOpen(i)} />
            )}
          </ul>
        </section>

        <AnimatePresence>
          {open !== null &&
          <MomentDetail
            key="detail"
            moment={moments[open]}
            index={open}
            total={moments.length}
            onClose={close}
            onStep={step} />

          }
        </AnimatePresence>
      </LayoutGroup>

      <NextChapter />
    </PageTransition>);

}