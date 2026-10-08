import React from 'react';
import { Counter } from '../animations/Counter';
import { MagneticButton } from '../ui/MagneticButton';

const supporting = [
{ value: 800, suffix: '+', label: 'Career goals' },
{ value: 4, label: 'Champions Leagues' },
{ value: 1, label: 'World Cup' }];


export function NumbersTeaser() {
  return (
    <section aria-labelledby="numbers-teaser" className="bg-ink px-5 py-28 md:px-10 md:py-40">
      <div className="grid items-end gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 id="numbers-teaser" className="text-[11px] uppercase tracking-[0.26em] text-silver">
            Ballon d’Or
          </h2>
          <div className="font-display leading-[0.78] text-gold text-[62vw] md:text-[32vw]">
            <Counter to={8} duration={1.4} />
          </div>
          <p className="mt-4 max-w-md font-serif text-2xl italic leading-snug text-bone/85">
            Eight times the best player in the world. No one else has won it more than five.
          </p>
        </div>
        <div className="md:col-span-5 md:pb-6">
          <dl>
            {supporting.map((s) =>
            <div key={s.label} className="flex items-baseline justify-between border-t border-bone/10 py-5">
                <dt className="text-[11px] uppercase tracking-[0.24em] text-silver">{s.label}</dt>
                <dd className="font-display text-6xl leading-none md:text-7xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </dd>
              </div>
            )}
          </dl>
          <div className="mt-10">
            <MagneticButton
              to="/statistics"
              className="inline-flex items-center gap-3 border border-bone/30 px-7 py-4 text-[11px] uppercase tracking-[0.26em] transition-colors duration-200 hover:bg-bone hover:text-ink">
              
              All the numbers →
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>);

}