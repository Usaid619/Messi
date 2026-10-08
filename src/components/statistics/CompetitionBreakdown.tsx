import React from 'react';
import { motion } from 'framer-motion';
import { Counter } from '../animations/Counter';
import { barcelonaCompetitions } from '../../data/statistics';
import { easeOut } from '../../utils/motion';

const tones = ['bg-bone', 'bg-sky', 'bg-silver', 'bg-bone/50', 'bg-sky/50', 'bg-silver/50'];

export function CompetitionBreakdown() {
  const total = barcelonaCompetitions.reduce((s, c) => s + c.goals, 0);

  return (
    <section aria-labelledby="competition-title" className="bg-ink px-5 pb-28 md:px-10 md:pb-40">
      <div className="border-t border-bone/10 pt-20">
        <h2 id="competition-title" className="font-display text-[12vw] uppercase leading-[0.86] md:text-[6vw]">
          {total} goals, divided
        </h2>
        <p className="mt-3 font-serif text-xl italic text-silver">Barcelona, by competition.</p>

        <div className="mt-12 flex h-16 w-full overflow-hidden md:h-24" role="img" aria-label="Barcelona goals by competition, as proportions">
          {barcelonaCompetitions.map((c, i) =>
          <motion.span
            key={c.name}
            className={`block h-full ${tones[i]} border-r border-ink`}
            initial={{ width: '0%' }}
            whileInView={{ width: `${c.goals / total * 100}%` }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, delay: i * 0.1, ease: easeOut }} />

          )}
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-6">
          {barcelonaCompetitions.map((c, i) =>
          <div key={c.name}>
              <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-silver">
                <span className={`h-2 w-2 ${tones[i]}`} />
                {c.name}
              </dt>
              <dd className="mt-2 font-display text-5xl leading-none">
                <Counter to={c.goals} />
              </dd>
              <dd className="mt-1 text-xs tabular-nums text-silver">{(c.goals / total * 100).toFixed(1)}%</dd>
            </div>
          )}
        </dl>
      </div>
    </section>);

}