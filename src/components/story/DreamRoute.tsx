import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform } from
'framer-motion';
import { dreamFacts } from '../../data/story';

const ROUTE = 'M 260 470 C 320 260, 520 70, 740 150';

// Scroll draws the flight from Rosario to Barcelona; a point travels along the arc.
export function DreamRoute() {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const draw = useTransform(scrollYProgress, [0.1, 0.72], [0, 1]);
  const cx = useMotionValue(260);
  const cy = useMotionValue(470);
  const km = useTransform(draw, (v) => Math.round(v * 10500).toLocaleString('en-US'));
  const arriveOpacity = useTransform(scrollYProgress, [0.66, 0.76], [0, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12], [0.4, 1]);
  const factsOpacity = [
  useTransform(scrollYProgress, [0.05, 0.15], [0, 1]),
  useTransform(scrollYProgress, [0.66, 0.76], [0, 1]),
  useTransform(scrollYProgress, [0.3, 0.42], [0, 1]),
  useTransform(scrollYProgress, [0.45, 0.55], [0, 1])];


  useMotionValueEvent(draw, 'change', (v) => {
    const p = pathRef.current;
    if (!p) return;
    const pt = p.getPointAtLength(p.getTotalLength() * Math.min(Math.max(v, 0), 1));
    cx.set(pt.x);
    cy.set(pt.y);
  });

  return (
    <section ref={ref} aria-labelledby="the-dream" className="relative h-[320vh] bg-night">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden px-5 pb-8 pt-24 md:px-10 md:pt-28">
        <motion.div style={{ opacity: headingOpacity }} className="relative z-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.26em] text-silver">
              <span className="text-bone">02</span>
              <span className="block h-px w-12 bg-current" />
              The Dream
            </p>
            <h2 id="the-dream" className="mt-4 font-display text-[13vw] uppercase leading-[0.88] md:text-[7vw]">
              Argentina <span className="text-sky">→</span> Barcelona
            </h2>
          </div>
          <p className="max-w-sm font-serif text-xl italic leading-snug text-bone/80 md:text-2xl">
            A trial in September 2000. In December, a promise written on a paper napkin.
          </p>
        </motion.div>

        <div className="relative mt-4 flex-1">
          <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden>
            {Array.from({ length: 11 }).map((_, i) =>
            <line key={`v${i}`} x1={i * 100} x2={i * 100} y1="0" y2="560" stroke="rgba(242,239,232,0.05)" />
            )}
            {Array.from({ length: 6 }).map((_, i) =>
            <line key={`h${i}`} x1="0" x2="1000" y1={i * 112} y2={i * 112} stroke="rgba(242,239,232,0.05)" />
            )}
            <line x1="0" x2="1000" y1="330" y2="330" stroke="rgba(117,170,219,0.18)" strokeDasharray="4 8" />
            <text x="12" y="322" fill="rgba(117,170,219,0.5)" fontSize="10" letterSpacing="3">EQUATOR</text>
            <path d={ROUTE} fill="none" stroke="rgba(242,239,232,0.12)" strokeDasharray="2 7" />
            <motion.path ref={pathRef} d={ROUTE} fill="none" stroke="#75aadb" strokeWidth="2" style={{ pathLength: draw }} />
            <circle cx="260" cy="470" r="6" fill="#f2efe8" />
            <text x="200" y="510" fill="#f2efe8" fontSize="16" letterSpacing="4" fontFamily="Anton">ROSARIO</text>
            <motion.g style={{ opacity: arriveOpacity }}>
              <circle cx="740" cy="150" r="6" fill="#f2efe8" />
              <text x="700" y="122" fill="#f2efe8" fontSize="16" letterSpacing="4" fontFamily="Anton">BARCELONA</text>
            </motion.g>
            <motion.circle r="9" fill="none" stroke="#75aadb" cx={cx} cy={cy} />
            <motion.circle r="3.5" fill="#75aadb" cx={cx} cy={cy} />
          </svg>

          <div className="absolute bottom-0 right-0 text-right">
            <p className="text-[11px] uppercase tracking-[0.24em] text-silver">Kilometres from home</p>
            <motion.p className="font-display text-6xl tabular-nums md:text-8xl">{km}</motion.p>
          </div>
        </div>

        <dl className="relative z-10 mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-bone/10 pt-5 md:grid-cols-4">
          {dreamFacts.map((f, i) =>
          <motion.div key={f.label} style={{ opacity: factsOpacity[i] }}>
              <dt className="text-[10px] uppercase tracking-[0.24em] text-silver">{f.label}</dt>
              <dd className="mt-1 font-display text-2xl uppercase md:text-3xl">{f.value}</dd>
              <dd className="text-xs text-silver">{f.sub}</dd>
            </motion.div>
          )}
        </dl>
      </div>
    </section>);

}