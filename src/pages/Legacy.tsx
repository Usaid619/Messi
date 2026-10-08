import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PageTransition } from '../components/transitions/PageTransition';
import { SplitText } from '../components/typography/SplitText';
import { SequenceLine } from '../components/legacy/SequenceLine';
import { DriftingPhotos } from '../components/legacy/DriftingPhotos';
import { SunOfMay } from '../components/legacy/SunOfMay';
import { NextChapter } from '../components/ui/NextChapter';
import { easeOut } from '../utils/motion';

export function Legacy() {
  const statementRef = useRef<HTMLElement>(null);
  const twistRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: statement } = useScroll({ target: statementRef, offset: ['start start', 'end end'] });
  const { scrollYProgress: twist } = useScroll({ target: twistRef, offset: ['start start', 'end end'] });
  const { scrollYProgress: hero } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(hero, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(hero, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      <header ref={heroRef} className="flex h-[100svh] items-center justify-center overflow-hidden bg-ink px-5">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }}>
          <SplitText
            as="h1"
            by="char"
            text="Legacy"
            start
            delay={0.7}
            stagger={0.08}
            duration={1.2}
            className="font-display text-[30vw] uppercase leading-[0.8] md:text-[22vw]" />
          
        </motion.div>
      </header>

      <section ref={statementRef} aria-label="Reflection" className="relative h-[260vh] bg-ink">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-10 px-5 text-center">
          <SequenceLine progress={statement} start={0.1}>
            <p className="font-serif text-[8vw] leading-[1.1] text-bone/90 md:text-[4.4vw]">Numbers can measure a career.</p>
          </SequenceLine>
          <SequenceLine progress={statement} start={0.45}>
            <p className="font-serif text-[8vw] italic leading-[1.1] text-silver md:text-[4.4vw]">They cannot measure what it meant.</p>
          </SequenceLine>
        </div>
      </section>

      <DriftingPhotos />

      <section aria-label="What it meant" className="bg-ink px-5 py-32 md:px-10 md:py-48">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-3">
          {[
          ['To a city', 'A boy from Rosario who never stopped speaking with its accent.'],
          ['To a game', 'Proof that the smallest player on the pitch could be the one who decides it.'],
          ['To a country', 'Thirty-six years of waiting, ended by the man who carried the most of it.']].
          map(([title, body], i) =>
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: easeOut }}>
            
              <p className="text-[11px] uppercase tracking-[0.26em] text-silver">{title}</p>
              <p className="mt-4 font-serif text-2xl leading-snug text-bone/85">{body}</p>
            </motion.div>
          )}
        </div>
      </section>

      <section ref={twistRef} aria-label="The end of the story" className="relative h-[340vh] bg-ink">
        <div className="sticky top-0 h-screen overflow-hidden px-5">
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <SequenceLine progress={twist} start={0.08} end={0.62}>
              <p className="font-display text-[11vw] uppercase leading-[0.9] md:text-[7vw]">The end of the story?</p>
            </SequenceLine>
            <SequenceLine progress={twist} start={0.3} end={0.62}>
              <p className="mt-6 font-display text-[22vw] uppercase leading-none text-sky md:text-[14vw]">No.</p>
            </SequenceLine>
            <SequenceLine progress={twist} start={0.66} overlay>
              <p className="font-display text-[13vw] uppercase leading-[0.88] md:text-[8.5vw]">
                The story
                <br />
                became legend.
              </p>
            </SequenceLine>
          </div>
        </div>
      </section>

      <section aria-label="Lionel Messi" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-5 py-32 text-center">
        <div aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <div className="h-[6vh] bg-sky/[0.12]" />
          <div className="h-[6vh]" />
          <div className="h-[6vh] bg-sky/[0.12]" />
        </div>
        <div aria-hidden className="absolute inset-0 flex items-center justify-center opacity-40">
          <SunOfMay className="h-[46vh] w-[46vh]" />
        </div>
        <div className="relative">
          <SplitText
            as="h2"
            by="char"
            text="Lionel Messi"
            stagger={0.05}
            duration={1.1}
            className="font-display text-[15vw] uppercase leading-[0.85] md:text-[11vw]" />
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1.4 }}
            className="mt-6 font-display text-3xl tracking-[0.6em] text-silver">
            
            10
          </motion.p>
        </div>
      </section>

      <NextChapter />
    </PageTransition>);

}