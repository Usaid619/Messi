import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PageTransition } from '../components/transitions/PageTransition';
import { SplitText } from '../components/typography/SplitText';
import { ScrollRevealText } from '../components/typography/ScrollRevealText';
import { EraScroller } from '../components/barcelona/EraScroller';
import { Photo } from '../components/ui/Photo';
import { Counter } from '../components/animations/Counter';
import { NextChapter } from '../components/ui/NextChapter';
import { barcelonaEras, barcelonaRecords } from '../data/barcelona';

export function Barcelona() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      <header ref={heroRef} className="relative flex h-[100svh] min-h-[600px] flex-col justify-end overflow-hidden bg-ink px-5 pb-12 md:px-10 md:pb-16">
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <div className="absolute inset-0 animate-kenburns">
            <Photo image="barcelona" alt="Barcelona skyline at blue hour" eager />
          </div>
          <div className="absolute inset-0 bg-ink/55" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
        </motion.div>
        <motion.div style={{ scale: titleScale, opacity: titleOpacity }} className="relative origin-bottom-left">
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-silver">
            <span className="block h-px w-10 bg-garnet" />
            2004 — 2021
          </p>
          <SplitText
            as="h1"
            by="char"
            text="Barcelona"
            start
            delay={0.55}
            stagger={0.04}
            className="mt-3 font-display text-[21vw] uppercase leading-[0.8] md:text-[19vw]" />
          
          <p className="mt-6 font-serif text-2xl italic text-bone/85 md:text-4xl">The era that changed football.</p>
        </motion.div>
      </header>

      <section aria-label="Introduction" className="bg-ink px-5 py-28 md:px-10 md:py-40">
        <ScrollRevealText
          className="mx-auto max-w-5xl font-serif text-[7.6vw] leading-[1.1] md:text-[3.8vw]"
          text="Seventeen seasons. Six hundred and seventy-two goals. A style of football that the rest of the world spent a decade trying to copy — and one small number ten at the centre of all of it." />
        
      </section>

      <EraScroller eras={barcelonaEras} />

      <section aria-labelledby="records" className="bg-ink px-5 py-28 md:px-10 md:py-40">
        <h2 id="records" className="text-[11px] uppercase tracking-[0.26em] text-silver">
          Records that may never fall
        </h2>
        <dl className="mt-12 grid gap-y-14 md:grid-cols-3 md:gap-x-10">
          {barcelonaRecords.map((r, i) =>
          <div key={r.label} className={`border-t border-bone/15 pt-6 ${i === 0 ? 'md:col-span-1' : ''}`}>
              <dd className="font-display text-[28vw] leading-[0.85] md:text-[11vw]">
                <Counter to={Number(r.value)} />
              </dd>
              <dt className="mt-4 max-w-xs font-serif text-xl italic leading-snug text-bone/80">{r.label}</dt>
            </div>
          )}
        </dl>
      </section>

      <NextChapter />
    </PageTransition>);

}