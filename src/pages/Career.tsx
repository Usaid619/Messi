import React from 'react';
import { PageTransition } from '../components/transitions/PageTransition';
import { SplitText } from '../components/typography/SplitText';
import { CareerBands } from '../components/career/CareerBands';
import { CareerSpan } from '../components/career/CareerSpan';
import { NextChapter } from '../components/ui/NextChapter';

export function Career() {
  return (
    <PageTransition>
      <header className="bg-ink px-5 pb-14 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SplitText
            as="h1"
            by="char"
            text="Career"
            start
            delay={0.55}
            className="font-display text-[30vw] uppercase leading-[0.8] md:text-[20vw]" />
          
          <p className="max-w-sm font-serif text-2xl italic leading-snug text-bone/80 md:pb-6 md:text-3xl">
            Four shirts. Two continents became three. One way of playing the game.
          </p>
        </div>
      </header>

      <section aria-label="Teams" className="bg-ink px-5 md:px-10">
        <CareerBands />
      </section>

      <section aria-labelledby="span-title" className="bg-ink px-5 py-28 md:px-10 md:py-40">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="span-title" className="font-display text-[12vw] uppercase leading-[0.88] md:text-[6vw]">
            Twenty-two years,<br />end to end
          </h2>
          <p className="max-w-xs font-serif text-xl italic leading-snug text-silver">
            Argentina runs beneath everything — the only line that never breaks.
          </p>
        </div>
        <CareerSpan />
      </section>

      <NextChapter />
    </PageTransition>);

}