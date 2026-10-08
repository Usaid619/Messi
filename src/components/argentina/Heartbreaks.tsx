import React from 'react';
import { motion } from 'framer-motion';
import { heartbreaks } from '../../data/argentina';
import { easeOut } from '../../utils/motion';

// Four finals, four defeats. Each row is struck through as it enters — a ledger of what was lost.
export function Heartbreaks() {
  return (
    <section aria-labelledby="heartbreak-title" className="bg-night px-5 py-28 text-bone md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.26em] text-silver">2007 — 2016</p>
          <h2 id="heartbreak-title" className="mt-4 font-display text-[14vw] uppercase leading-[0.86] text-bone/90 md:text-[6vw]">
            The weight
          </h2>
          <p className="mt-6 max-w-sm font-serif text-2xl italic leading-snug text-silver">
            Four finals. Four defeats. After the last, in New Jersey, he said he was done with the national team. Weeks later, he came back.
          </p>
        </div>
        <ol className="md:col-span-7 md:col-start-6">
          {heartbreaks.map((h, i) =>
          <motion.li
            key={h.year}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="relative grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-t border-bone/10 py-7 md:grid-cols-[7rem_1fr_auto]">
            
              <span className="font-display text-4xl text-bone/50 md:text-5xl">{h.year}</span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-silver">{h.title}</span>
                <span className="mt-1 block font-serif text-2xl text-bone/70">vs {h.opponent}</span>
              </span>
              <span className="col-start-2 font-display text-2xl tabular-nums text-bone/60 md:col-start-auto md:text-3xl">{h.score}</span>
              <motion.span
              aria-hidden
              className="absolute left-0 right-0 top-1/2 h-px origin-left bg-bone/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: easeOut }} />
            
            </motion.li>
          )}
        </ol>
      </div>
    </section>);

}