import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { clubSeasons, countryYears } from '../../data/statistics';
import { easeOut } from '../../utils/motion';

type Scope = 'club' | 'country';
type Metric = 'goals' | 'assists';

export function SeasonChart() {
  const [scope, setScope] = useState<Scope>('club');
  const [metric, setMetric] = useState<Metric>('goals');
  const data = scope === 'club' ? clubSeasons : countryYears;
  const activeMetric: Metric = scope === 'country' ? 'goals' : metric;
  const value = (i: number) => activeMetric === 'goals' ? data[i].goals : data[i].assists ?? 0;
  const max = useMemo(() => Math.max(...data.map((d) => activeMetric === 'goals' ? d.goals : d.assists ?? 0)), [data, activeMetric]);
  const peak = data.findIndex((d) => (activeMetric === 'goals' ? d.goals : d.assists ?? 0) === max);
  const [selected, setSelected] = useState<number | null>(null);
  const sel = selected !== null && selected < data.length ? selected : peak;
  const season = data[sel];
  const ceiling = Math.ceil(max / 20) * 20;
  const total = data.reduce((s, d) => s + (activeMetric === 'goals' ? d.goals : d.assists ?? 0), 0);

  const toggle = (active: boolean) =>
  `px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors duration-200 ${
  active ? 'bg-bone text-ink' : 'text-silver hover:text-bone'}`;


  return (
    <section aria-labelledby="season-title" className="bg-ink px-5 py-28 md:px-10 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <h2 id="season-title" className="font-display text-[13vw] uppercase leading-[0.86] md:text-[6vw]">
            Season by season
          </h2>
          <p className="mt-3 max-w-md font-serif text-xl italic text-silver">
            {scope === 'club' ? 'Barcelona and Paris Saint-Germain, all competitions.' : 'Argentina, by calendar year.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex border border-bone/20" role="group" aria-label="Team">
            <button type="button" aria-pressed={scope === 'club'} onClick={() => {setScope('club');setSelected(null);}} className={toggle(scope === 'club')}>Club</button>
            <button type="button" aria-pressed={scope === 'country'} onClick={() => {setScope('country');setSelected(null);}} className={toggle(scope === 'country')}>Country</button>
          </div>
          <div className="flex border border-bone/20" role="group" aria-label="Metric">
            <button type="button" aria-pressed={activeMetric === 'goals'} onClick={() => setMetric('goals')} className={toggle(activeMetric === 'goals')}>Goals</button>
            <button type="button" aria-pressed={activeMetric === 'assists'} disabled={scope === 'country'} onClick={() => setMetric('assists')} className={`${toggle(activeMetric === 'assists')} disabled:opacity-30`}>Assists</button>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[18rem_1fr]">
        <div aria-live="polite" className="lg:border-r lg:border-bone/10 lg:pr-10">
          <AnimatePresence mode="wait">
            <motion.div key={`${scope}-${activeMetric}-${sel}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2, ease: easeOut }}>
              <p className="text-[11px] uppercase tracking-[0.24em] text-silver">{season.team} · {season.label}</p>
              <p className="mt-2 font-display text-[28vw] leading-[0.82] tabular-nums lg:text-[8rem]">{value(sel)}</p>
              <p className="font-display text-2xl uppercase">{activeMetric}</p>
              {season.assists !== undefined && activeMetric === 'goals' &&
              <p className="mt-3 text-sm text-silver">{season.assists} assists</p>
              }
              {season.note && <p className="mt-3 font-serif text-xl italic text-sky">{season.note}</p>}
            </motion.div>
          </AnimatePresence>
          <p className="mt-8 border-t border-bone/10 pt-4 text-[11px] uppercase tracking-[0.22em] text-silver">
            Total shown · <span className="text-bone">{total}</span>
          </p>
        </div>

        <div className="relative">
          <div className="relative h-[46vh] min-h-[300px]">
            {[0, 0.5, 1].map((f) =>
            <div key={f} className="absolute inset-x-0 border-t border-bone/10" style={{ bottom: `${f * 100}%` }}>
                <span className="absolute -top-5 right-0 text-[10px] tabular-nums text-silver">{Math.round(ceiling * f)}</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-end gap-[3px] md:gap-1.5" role="list" aria-label={`${activeMetric} per ${scope === 'club' ? 'season' : 'year'}`}>
              {data.map((d, i) => {
                const v = value(i);
                const isSel = i === sel;
                const isPsg = d.team === 'PSG';
                return (
                  <button
                    key={`${scope}-${d.label}`}
                    type="button"
                    role="listitem"
                    aria-label={`${d.label}: ${v} ${activeMetric}`}
                    onMouseEnter={() => setSelected(i)}
                    onFocus={() => setSelected(i)}
                    onClick={() => setSelected(i)}
                    className="group relative flex h-full flex-1 items-end">
                    
                    <motion.span
                      className={`block w-full origin-bottom transition-colors duration-200 ${isSel ? 'bg-sky' : isPsg ? 'bg-silver/50 group-hover:bg-silver' : 'bg-bone/70 group-hover:bg-bone'}`}
                      initial={{ height: '0%' }}
                      animate={{ height: `${v / ceiling * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.025, ease: easeOut }} />
                    
                  </button>);

              })}
            </div>
          </div>
          <div className="mt-3 flex gap-[3px] md:gap-1.5" aria-hidden>
            {data.map((d, i) =>
            <span key={d.label} className={`flex-1 text-center text-[9px] tabular-nums ${i === sel ? 'text-bone' : 'text-silver/70'} ${i % 2 === 1 ? 'hidden md:block' : ''}`}>
                {d.label}
              </span>
            )}
          </div>
          {scope === 'club' &&
          <div className="mt-6 flex gap-6 text-[10px] uppercase tracking-[0.22em] text-silver">
              <span className="flex items-center gap-2"><span className="h-2 w-2 bg-bone/70" />Barcelona</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 bg-silver/50" />Paris</span>
            </div>
          }
        </div>
      </div>
    </section>);

}