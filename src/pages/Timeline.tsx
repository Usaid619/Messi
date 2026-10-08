import React from 'react';
import { PageTransition } from '../components/transitions/PageTransition';
import { SplitText } from '../components/typography/SplitText';
import { CareerTimeline } from '../components/timeline/CareerTimeline';
import { NextChapter } from '../components/ui/NextChapter';

export function Timeline() {
  return (
    <PageTransition>
      <header className="flex flex-col justify-between gap-6 bg-ink px-5 pb-14 pt-32 md:flex-row md:items-end md:px-10 md:pb-16 md:pt-36">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-silver">2004 → Present</p>
          <SplitText
            as="h1"
            by="char"
            text="Timeline"
            start
            delay={0.55}
            className="mt-3 font-display text-[26vw] uppercase leading-[0.8] md:text-[15vw]" />
          
        </div>
        <p className="max-w-xs font-serif text-xl italic leading-snug text-silver md:pb-4">
          Drag, swipe or scroll sideways through twenty years. Every date a door.
        </p>
      </header>
      <CareerTimeline />
      <NextChapter />
    </PageTransition>);

}