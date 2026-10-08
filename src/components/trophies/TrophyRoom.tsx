import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { TrophyObject } from './TrophyObject';
import { trophyRoom } from '../../data/trophies';
import { useFinePointer } from '../../hooks/useFinePointer';
import { easeOut } from '../../utils/motion';

const placement: Record<string, {size: 'lg' | 'md' | 'sm';depth: number;offset: string;metal: 'gold' | 'silver';}> = {
  ballon: { size: 'lg', depth: 1, offset: 'md:mt-0', metal: 'gold' },
  worldcup: { size: 'lg', depth: 1.2, offset: 'md:mt-24', metal: 'gold' },
  ucl: { size: 'lg', depth: 0.8, offset: 'md:mt-6', metal: 'silver' },
  liga: { size: 'md', depth: 0.6, offset: 'md:mt-28', metal: 'silver' },
  copa: { size: 'md', depth: 0.9, offset: 'md:mt-10', metal: 'silver' },
  rey: { size: 'md', depth: 0.5, offset: 'md:-mt-6', metal: 'silver' },
  finalissima: { size: 'sm', depth: 0.7, offset: 'md:mt-20', metal: 'silver' },
  ligue1: { size: 'sm', depth: 0.4, offset: 'md:mt-4', metal: 'silver' },
  olympic: { size: 'sm', depth: 0.9, offset: 'md:mt-24', metal: 'gold' },
  u20: { size: 'sm', depth: 0.5, offset: 'md:mt-8', metal: 'silver' }
};

// A dark gallery. Trophies hang in the air, drift with the cursor, and tell you their story when approached.
export function TrophyRoom() {
  const fine = useFinePointer();
  const [active, setActive] = useState<string | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const current = trophyRoom.find((t) => t.id === active);

  return (
    <section
      aria-label="Trophy room"
      className="relative overflow-hidden bg-[#04060b] px-5 pb-56 pt-16 md:px-10 md:pb-64"
      onPointerMove={(e) => {
        if (!fine) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}>
      
      <div aria-hidden className="absolute inset-x-0 bottom-40 h-px bg-bone/10" />
      <ul className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-3 md:grid-cols-5 md:gap-y-20">
        {trophyRoom.map((t, i) => {
          const p = placement[t.id];
          return (
            <motion.li
              key={t.id}
              className={`flex justify-center ${p.offset}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.9, delay: i % 5 * 0.08, ease: easeOut }}>
              
              <TrophyObject
                trophy={t}
                metal={p.metal}
                size={p.size}
                depth={p.depth}
                active={active === t.id}
                dimmed={active !== null && active !== t.id}
                px={px}
                py={py}
                floatDelay={i * 0.4}
                onActivate={() => setActive(t.id)}
                onDeactivate={() => setActive((a) => a === t.id ? null : a)} />
              
            </motion.li>);

        })}
      </ul>

      <div className="pointer-events-none absolute inset-x-5 bottom-10 md:inset-x-10" aria-live="polite">
        <AnimatePresence mode="wait">
          {current ?
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="grid gap-3 border-t border-bone/15 pt-5 md:grid-cols-[1.4fr_1fr_1fr_2fr] md:gap-8">
            
              <p className="font-display text-4xl uppercase leading-none md:text-5xl">{current.name}</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-silver">
                <span className="block text-bone">{current.team}</span>
                Club / country
              </p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-silver">
                <span className="block text-bone">{current.competition}</span>
                Competition
              </p>
              <p className="font-display text-xl tracking-[0.06em] text-gold">{current.years.join(' · ')}</p>
            </motion.div> :

          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-t border-bone/10 pt-5 text-[11px] uppercase tracking-[0.26em] text-silver">
            
              {fine ? 'Move closer to a trophy' : 'Tap a trophy'} — its story will appear here
            </motion.p>
          }
        </AnimatePresence>
      </div>
    </section>);

}