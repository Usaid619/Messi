import React from 'react';
import { motion } from 'framer-motion';
import { Counter } from '../animations/Counter';
import { headlineStats } from '../../data/statistics';
import { easeOut } from '../../utils/motion';

// One number per row, alternating sides — each given the full width it deserves.
export function BigNumbers() {
  return (
    <section aria-label="Headline numbers" className="bg-ink px-5 md:px-10">
      {headlineStats.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <div
            key={s.label}
            className={`flex flex-col gap-4 border-t border-bone/10 py-10 md:items-end md:gap-12 md:py-14 ${
            flip ? 'md:flex-row-reverse md:text-right' : 'md:flex-row'}`
            }>
            
            <p className={`font-display leading-[0.8] text-[34vw] md:text-[17vw] ${s.gold ? 'text-gold' : 'text-bone'}`}>
              <Counter to={s.value} suffix={s.suffix} duration={s.value > 100 ? 2.2 : 1.4} />
            </p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
              className="md:pb-6">
              
              <p className="font-display text-4xl uppercase leading-none md:text-5xl">{s.label}</p>
              <p className="mt-2 font-serif text-xl italic text-silver">{s.note}</p>
            </motion.div>
          </div>);

      })}
    </section>);

}