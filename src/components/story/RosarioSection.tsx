import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../typography/SectionHeading';
import { SplitText } from '../typography/SplitText';
import { ParallaxImage } from '../animations/ParallaxImage';
import { RosarioMap } from './RosarioMap';
import { rosarioMilestones } from '../../data/story';
import { easeOut } from '../../utils/motion';

export function RosarioSection() {
  return (
    <section aria-labelledby="the-boy" className="relative bg-ink px-5 py-28 md:px-10 md:py-40">
      <div id="the-boy">
        <SectionHeading index="01" label="The Boy" title="Rosario, Argentina" titleClassName="text-[15vw] md:text-[10vw]" />
      </div>
      <SplitText
        as="p"
        text="Every legend starts somewhere."
        className="mt-8 font-serif text-3xl italic text-bone/85 md:text-5xl"
        delay={0.3} />
      

      <div className="mt-20 grid gap-8 md:grid-cols-12 md:gap-10">
        <ParallaxImage
          image="rosario"
          alt="A neighbourhood football pitch at dusk"
          placeholder="Childhood photograph, Rosario"
          className="aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[560px]" />
        
        <div className="md:col-span-5">
          <RosarioMap />
        </div>
      </div>

      <ol className="relative mt-24 grid gap-10 pt-10 md:grid-cols-4 md:gap-8">
        <motion.span
          aria-hidden
          className="absolute left-0 top-0 h-px w-full origin-left bg-bone/25"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: easeOut }} />
        
        {rosarioMilestones.map((m, i) =>
        <motion.li
          key={m.year}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: easeOut }}
          className="relative">
          
            <span aria-hidden className="absolute -top-[2.85rem] left-0 h-2 w-2 rounded-full bg-sky" />
            <p className="font-display text-6xl leading-none">{m.year}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-silver">
              {m.date ? `${m.date} · ` : ''}
              {m.title}
            </p>
            <p className="mt-3 max-w-xs font-serif text-lg leading-snug text-bone/80">{m.body}</p>
          </motion.li>
        )}
      </ol>
    </section>);

}