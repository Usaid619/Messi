import React from 'react';
import { PageTransition } from '../components/transitions/PageTransition';
import { SplitText } from '../components/typography/SplitText';
import { BigNumbers } from '../components/statistics/BigNumbers';
import { SeasonChart } from '../components/statistics/SeasonChart';
import { CompetitionBreakdown } from '../components/statistics/CompetitionBreakdown';
import { NextChapter } from '../components/ui/NextChapter';

export function Statistics() {
  return (
    <PageTransition>
      <header className="bg-ink px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <p className="text-[11px] uppercase tracking-[0.26em] text-silver">What can be counted</p>
        <SplitText
          as="h1"
          by="char"
          text="Numbers"
          start
          delay={0.55}
          className="mt-3 font-display text-[28vw] uppercase leading-[0.8] md:text-[20vw]" />
        
        <p className="mt-6 max-w-lg font-serif text-2xl italic leading-snug text-bone/80 md:text-3xl">
          Some of them look like typing errors. None of them are.
        </p>
      </header>

      <BigNumbers />
      <SeasonChart />
      <CompetitionBreakdown />

      <p className="bg-ink px-5 pb-16 text-[11px] text-silver/70 md:px-10">
        Figures compiled from public records, all competitions; national-team totals through 2024. Verify against an official source before publication.
      </p>

      <NextChapter />
    </PageTransition>);

}