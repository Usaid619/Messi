import React from 'react';
import { motion } from 'framer-motion';
import { easeOut } from '../../utils/motion';

const START = 2004;
const END = 2026;
const rows = [
{ name: 'FC Barcelona', from: 2004, to: 2021, color: '#8a2443' },
{ name: 'Paris Saint-Germain', from: 2021, to: 2023, color: '#2f4b8f' },
{ name: 'Inter Miami', from: 2023, to: END, color: '#d9a3b8', ongoing: true },
{ name: 'Argentina', from: 2005, to: END, color: '#75aadb', ongoing: true }];

const ticks = [2004, 2008, 2012, 2016, 2020, 2024];

// Every shirt on a single axis — overlapping years read at a glance.
export function CareerSpan() {
  const pct = (y: number) => (y - START) / (END - START) * 100;

  return (
    <figure aria-label="Career span by team, 2004 to present">
      <div className="space-y-6">
        {rows.map((r, i) =>
        <div key={r.name} className="grid grid-cols-[8.5rem_1fr] items-center gap-4 md:grid-cols-[12rem_1fr]">
            <span className="text-[11px] uppercase tracking-[0.2em] text-silver">{r.name}</span>
            <div className="relative h-6">
              <span className="absolute inset-y-1/2 left-0 right-0 h-px bg-bone/10" />
              <motion.span
              className="absolute top-1/2 h-[6px] -translate-y-1/2 origin-left"
              style={{ left: `${pct(r.from)}%`, width: `${pct(r.to) - pct(r.from)}%`, backgroundColor: r.color }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1.1, delay: i * 0.15, ease: easeOut }} />
            
              <span
              className="absolute top-full mt-1 text-[10px] tabular-nums text-silver"
              style={{ left: `${pct(r.from)}%` }}>
              
                {r.from} — {r.ongoing ? 'now' : r.to}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 grid grid-cols-[8.5rem_1fr] gap-4 md:grid-cols-[12rem_1fr]">
        <span />
        <div className="relative h-4 border-t border-bone/15">
          {ticks.map((t) =>
          <span key={t} className="absolute top-2 -translate-x-1/2 text-[10px] tabular-nums text-silver" style={{ left: `${pct(t)}%` }}>
              {t}
            </span>
          )}
        </div>
      </div>
    </figure>);

}