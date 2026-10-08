import React, { useCallback, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { PageTransition } from '../components/transitions/PageTransition';
import { OpeningSequence } from '../components/hero/OpeningSequence';
import { Hero } from '../components/hero/Hero';
import { ScrollRevealText } from '../components/typography/ScrollRevealText';
import { ChapterList } from '../components/home/ChapterList';
import { VelocityMarquee } from '../components/ui/VelocityMarquee';
import { ExpandingStill } from '../components/home/ExpandingStill';
import { NumbersTeaser } from '../components/home/NumbersTeaser';
import { NextChapter } from '../components/ui/NextChapter';

const INTRO_KEY = 'messi10-intro-seen';

interface HomeProps {
  showIntro: boolean;
}

export function Home({ showIntro }: HomeProps) {
  const reduce = useReducedMotion();
  const [introDone, setIntroDone] = useState(
    () => !showIntro || !!reduce || sessionStorage.getItem(INTRO_KEY) === '1'
  );
  const finish = useCallback(() => {
    sessionStorage.setItem(INTRO_KEY, '1');
    setIntroDone(true);
  }, []);

  return (
    <PageTransition>
      <AnimatePresence>{!introDone && <OpeningSequence key="intro" onComplete={finish} />}</AnimatePresence>
      <Hero ready={introDone} />

      <section aria-label="Prologue" className="bg-ink px-5 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 text-[11px] uppercase tracking-[0.26em] text-silver">Prologue</p>
          <ScrollRevealText
            className="font-serif text-[8.4vw] leading-[1.08] text-bone md:text-[4.4vw]"
            text="He was ten when the doctors said he might not grow. At thirteen he crossed an ocean. What followed was not a career — it was a long conversation between a boy and a ball, overheard by the entire world." />
          
        </div>
      </section>

      <ChapterList />

      <VelocityMarquee
        items={['Rosario', 'Barcelona', 'Paris', 'Miami', 'Maracanã', 'Lusail']}
        className="border-y border-bone/10 py-8 font-display text-[16vw] uppercase leading-none text-outline-bone md:text-[10vw]" />
      

      <ExpandingStill />
      <NumbersTeaser />
      <NextChapter />
    </PageTransition>);

}