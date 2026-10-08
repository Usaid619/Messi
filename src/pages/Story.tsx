import React from 'react';
import { PageTransition } from '../components/transitions/PageTransition';
import { SplitText } from '../components/typography/SplitText';
import { ScrollRevealText } from '../components/typography/ScrollRevealText';
import { RosarioSection } from '../components/story/RosarioSection';
import { DreamRoute } from '../components/story/DreamRoute';
import { LaMasia } from '../components/story/LaMasia';
import { NextChapter } from '../components/ui/NextChapter';

export function Story() {
  return (
    <PageTransition>
      <header className="flex min-h-[90svh] flex-col justify-end bg-ink px-5 pb-16 pt-32 md:px-10 md:pb-24">
        <p className="text-[11px] uppercase tracking-[0.26em] text-silver">Chapters 01 — 03</p>
        <SplitText
          as="h1"
          by="char"
          text="The Story"
          start
          delay={0.55}
          className="mt-4 font-display text-[26vw] uppercase leading-[0.8] md:text-[20vw]" />
        
        <p className="mt-8 max-w-lg font-serif text-2xl italic leading-snug text-bone/80 md:text-3xl">
          Before the records, before the trophies, there was a boy who would not let the ball go.
        </p>
      </header>

      <RosarioSection />
      <DreamRoute />
      <LaMasia />

      <section aria-label="Interlude" className="bg-ink px-5 py-32 md:px-10 md:py-48">
        <ScrollRevealText
          className="mx-auto max-w-5xl text-center font-serif text-[8vw] italic leading-[1.1] md:text-[4.2vw]"
          text="He arrived as a promise on a napkin. He left as the greatest player the club had ever seen." />
        
      </section>

      <NextChapter />
    </PageTransition>);

}