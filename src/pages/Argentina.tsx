import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/transitions/PageTransition';
import { SplitText } from '../components/typography/SplitText';
import { ParallaxImage } from '../components/animations/ParallaxImage';
import { ChapterEntry } from '../components/argentina/ChapterEntry';
import { Heartbreaks } from '../components/argentina/Heartbreaks';
import { WorldCupExperience } from '../components/argentina/WorldCupExperience';
import { MagneticButton } from '../components/ui/MagneticButton';
import { NextChapter } from '../components/ui/NextChapter';
import { earlyTriumphs, redemption } from '../data/argentina';
import { easeOut } from '../utils/motion';

export function Argentina() {
  return (
    <PageTransition>
      <header className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-bone px-5 pt-24 text-night md:px-10">
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-[18%] h-[9vh] origin-left bg-sky"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1.1, ease: easeOut }} />
        
        <motion.span
          aria-hidden
          className="absolute inset-x-0 bottom-[18%] h-[9vh] origin-right bg-sky"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.65, duration: 1.1, ease: easeOut }} />
        
        <div className="relative">
          <p className="text-[11px] uppercase tracking-[0.26em] text-night/60">La Selección · 2005 —</p>
          <SplitText
            as="h1"
            by="char"
            text="Argentina"
            start
            delay={0.6}
            stagger={0.045}
            className="mt-3 font-display text-[21vw] uppercase leading-[0.82] md:text-[19vw]" />
          
          <SplitText
            as="p"
            text="The story was never complete."
            start
            delay={1.2}
            className="mt-4 font-serif text-3xl italic text-night/80 md:text-5xl" />
          
        </div>
      </header>

      <section aria-label="Early triumphs" className="bg-bone px-5 pb-20 text-night md:px-10">
        {earlyTriumphs.map((c) =>
        <ChapterEntry key={c.year} chapter={c} />
        )}
        <ParallaxImage
          image="crowd"
          alt="Sky blue and white flags in a stadium at night"
          placeholder="Messi in the Argentina shirt"
          className="mt-6 aspect-[16/9] w-full md:aspect-[21/9]" />
        
      </section>

      <Heartbreaks />

      <section aria-labelledby="redemption-title" className="bg-sky px-5 py-28 text-night md:px-10 md:py-40">
        <p className="text-[11px] uppercase tracking-[0.26em] text-night/70">Redemption</p>
        <h2 id="redemption-title" className="mt-4 max-w-4xl font-serif text-4xl italic leading-tight md:text-6xl">
          Then, finally, the shirt began to feel lighter.
        </h2>
        <div className="mt-12">
          {redemption.map((c) =>
          <ChapterEntry key={c.year} chapter={c} tone="sky" />
          )}
        </div>
      </section>

      <WorldCupExperience />

      <section aria-label="Epilogue" className="flex min-h-[90svh] flex-col items-center justify-center bg-ink px-5 py-32 text-center">
        <SplitText
          as="h2"
          text="The dream was complete."
          className="font-display text-[12vw] uppercase leading-[0.9] md:text-[8vw]" />
        
        <p className="mt-6 max-w-lg font-serif text-2xl italic leading-snug text-silver">
          Seven goals, the Golden Ball, and the only trophy that had ever been missing.
        </p>
        <div className="mt-12">
          <MagneticButton
            to="/legacy"
            className="inline-flex items-center gap-3 border border-bone/40 px-8 py-4 text-[11px] uppercase tracking-[0.26em] transition-colors duration-200 hover:bg-bone hover:text-ink">
            
            Continue to Legacy →
          </MagneticButton>
        </div>
      </section>

      <NextChapter />
    </PageTransition>);

}