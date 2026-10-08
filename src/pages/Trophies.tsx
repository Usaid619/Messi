import React from 'react';
import { PageTransition } from '../components/transitions/PageTransition';
import { SplitText } from '../components/typography/SplitText';
import { TrophyRoom } from '../components/trophies/TrophyRoom';
import { Counter } from '../components/animations/Counter';
import { NextChapter } from '../components/ui/NextChapter';
import { otherHonours, trophyRoom } from '../data/trophies';

export function Trophies() {
  const catalogue = [...trophyRoom, ...otherHonours];
  const teamHonours = catalogue.filter((t) => t.team !== 'Individual').reduce((s, t) => s + t.count, 0);

  return (
    <PageTransition>
      <header className="relative bg-[#04060b] px-5 pb-10 pt-32 md:px-10 md:pt-40">
        <p className="text-[11px] uppercase tracking-[0.26em] text-silver">Hall I · The permanent collection</p>
        <SplitText
          as="h1"
          by="char"
          text="The Trophy Room"
          start
          delay={0.55}
          stagger={0.035}
          className="mt-3 font-display text-[17vw] uppercase leading-[0.82] md:text-[12vw]" />
        
        <p className="mt-6 max-w-md font-serif text-2xl italic leading-snug text-bone/80">
          Lights low. Voices lower. Everything here was won.
        </p>
      </header>

      <TrophyRoom />

      <section aria-labelledby="catalogue-title" className="bg-ink px-5 py-28 md:px-10 md:py-36">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <h2 id="catalogue-title" className="font-display text-[14vw] uppercase leading-[0.86] md:text-[7vw]">
            The catalogue
          </h2>
          <dl className="flex gap-12">
            <div>
              <dd className="font-display text-7xl leading-none md:text-8xl"><Counter to={teamHonours} /></dd>
              <dt className="mt-2 text-[11px] uppercase tracking-[0.22em] text-silver">Team honours</dt>
            </div>
            <div>
              <dd className="font-display text-7xl leading-none text-gold md:text-8xl"><Counter to={8} /></dd>
              <dt className="mt-2 text-[11px] uppercase tracking-[0.22em] text-silver">Ballons d’Or</dt>
            </div>
          </dl>
        </div>

        <div className="mt-16 overflow-x-auto no-scrollbar" data-lenis-prevent>
          <table className="w-full min-w-[640px] text-left">
            <caption className="sr-only">Complete list of honours</caption>
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.24em] text-silver">
                <th scope="col" className="pb-4 font-normal">Honour</th>
                <th scope="col" className="pb-4 font-normal">Team</th>
                <th scope="col" className="pb-4 text-right font-normal">Count</th>
                <th scope="col" className="pb-4 pl-10 font-normal">Years</th>
              </tr>
            </thead>
            <tbody>
              {catalogue.map((t) =>
              <tr key={t.id} className="border-t border-bone/10 align-baseline">
                  <th scope="row" className="py-4 pr-6 font-display text-2xl font-normal uppercase">{t.name}</th>
                  <td className="py-4 pr-6 text-sm text-bone/75">{t.team}</td>
                  <td className="py-4 text-right font-display text-2xl tabular-nums">{t.count}</td>
                  <td className="py-4 pl-10 text-sm tabular-nums text-silver">{t.years.join(' · ')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <NextChapter />
    </PageTransition>);

}