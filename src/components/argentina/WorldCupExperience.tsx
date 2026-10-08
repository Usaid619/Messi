import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform } from
'framer-motion';
import { Photo } from '../ui/Photo';
import { SplitText } from '../typography/SplitText';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';
import { shootout, worldCupMatches } from '../../data/argentina';
import { easeOut } from '../../utils/motion';

const finalScores = [
{ at: 0.52, arg: 2, fra: 0, note: 'Messi 23′ (pen) · Di María 36′' },
{ at: 0.565, arg: 2, fra: 2, note: 'Mbappé 80′ (pen), 81′' },
{ at: 0.61, arg: 3, fra: 2, note: 'Messi 108′' },
{ at: 0.645, arg: 3, fra: 3, note: 'Mbappé 118′ (pen)' }];


const stages: {at: number;key: string;}[] = [
{ at: 0, key: 'qatar' },
{ at: 0.08, key: 'dream' },
...worldCupMatches.map((_, i) => ({ at: 0.16 + i * 0.06, key: `m${i}` })),
...finalScores.map((s, i) => ({ at: s.at, key: `s${i}` })),
{ at: 0.68, key: 'pens' },
{ at: 0.77, key: 'champions' },
{ at: 0.83, key: 'year' },
{ at: 0.885, key: 'thedream' },
{ at: 0.94, key: 'complete' }];


const path = ['Group', 'R16', 'QF', 'SF', 'Final'];

function stageAt(v: number): string {
  let key = stages[0].key;
  for (const s of stages) if (v >= s.at) key = s.key;
  return key;
}

// The signature sequence: monochrome, a heartbeat, the shootout — then Argentina's blue floods in.
export function WorldCupExperience() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { lenis } = useSmoothScroll();
  const inView = useInView(ref, { margin: '-30% 0px -30% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [stage, setStage] = useState('qatar');
  const [kicks, setKicks] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setStage(stageAt(v));
    setKicks(Math.max(0, Math.min(8, Math.floor((v - 0.68) / 0.075 * 8) + 1)));
  });

  // Scrolling grows heavier inside the sequence.
  useEffect(() => {
    if (!lenis) return;
    lenis.options.lerp = inView ? 0.04 : 0.09;
    return () => {
      lenis.options.lerp = 0.09;
    };
  }, [inView, lenis]);

  const skyRise = useTransform(scrollYProgress, [0.7, 0.79], [0, 1]);
  const pulseOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.7, 0.76], [0, 1, 1, 0]);
  const pathOpacity = useTransform(scrollYProgress, [0.14, 0.18, 0.74, 0.77], [0, 1, 1, 0]);
  const imgOpacity = useTransform(scrollYProgress, [0.86, 0.9], [0, 1]);
  const imgScale = useTransform(scrollYProgress, [0.86, 0.93, 1], [0.82, 1, reduce ? 1.2 : 3]);
  const imgFilter = useTransform(scrollYProgress, [0.88, 0.97], ['grayscale(1)', 'grayscale(0)']);

  const matchIndex = stage.startsWith('m') ? Number(stage.slice(1)) : -1;
  const pathActive =
  matchIndex >= 0 ? Math.max(0, matchIndex - 2) : stage.startsWith('s') || stage === 'pens' ? 4 : -1;
  const onSky = ['champions', 'year'].includes(stage);

  const enter = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -28 },
    transition: { duration: 0.3, ease: easeOut }
  };

  const renderStage = () => {
    if (stage === 'qatar')
    return (
      <motion.div key="qatar" {...enter}>
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">November — December</p>
          <SplitText as="h2" by="char" start text="Qatar 2022" className="mt-4 font-display text-[22vw] uppercase leading-[0.82] text-neutral-200 md:text-[15vw]" stagger={0.04} />
        </motion.div>);

    if (stage === 'dream')
    return (
      <motion.p key="dream" {...enter} className="font-serif text-5xl italic text-neutral-300 md:text-8xl">
          One last dream.
        </motion.p>);

    if (matchIndex >= 0) {
      const m = worldCupMatches[matchIndex];
      return (
        <motion.div key={stage} {...enter}>
          <p className="text-[11px] uppercase tracking-[0.32em] text-neutral-500">
            {m.stage} · {m.date} 2022
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.3em] text-neutral-400 md:gap-8 md:text-sm">
            <span>Argentina</span>
            <span className="h-px w-8 bg-neutral-600" />
            <span>{m.opponent}</span>
          </div>
          <p className={`mt-2 font-display text-[24vw] leading-[0.9] tabular-nums md:text-[15vw] ${m.outcome === 'L' ? 'text-neutral-600' : 'text-neutral-100'}`}>
            {m.score.split(' · ')[0]}
          </p>
          {m.score.includes('·') &&
          <p className="font-display text-xl uppercase tracking-[0.1em] text-neutral-300">{m.score.split(' · ')[1]}</p>
          }
          <p className="mx-auto mt-6 max-w-md font-serif text-xl italic leading-snug text-neutral-400 md:text-2xl">{m.note}</p>
        </motion.div>);

    }
    if (stage.startsWith('s')) {
      const s = finalScores[Number(stage.slice(1))];
      return (
        <motion.div key="final" {...enter} className="w-full">
          <p className="text-[11px] uppercase tracking-[0.32em] text-neutral-500">Final · 18 December · Lusail</p>
          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-8">
            <span className="text-right font-display text-[6vw] uppercase text-neutral-300 md:text-[4vw]">Argentina</span>
            <span className="font-display text-[22vw] leading-none tabular-nums text-neutral-100 md:text-[14vw]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={`a${s.arg}`} className="inline-block" initial={{ y: '-60%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '60%', opacity: 0 }} transition={{ duration: 0.3, ease: easeOut }}>
                  {s.arg}
                </motion.span>
              </AnimatePresence>
              <span className="mx-[0.15em] text-neutral-600">—</span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={`f${s.fra}`} className="inline-block" initial={{ y: '-60%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '60%', opacity: 0 }} transition={{ duration: 0.3, ease: easeOut }}>
                  {s.fra}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-left font-display text-[6vw] uppercase text-neutral-300 md:text-[4vw]">France</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={s.note} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-6 text-sm uppercase tracking-[0.24em] text-neutral-400">
              {s.note}
            </motion.p>
          </AnimatePresence>
        </motion.div>);

    }
    if (stage === 'pens') {
      const order: {team: 'argentina' | 'france';i: number;}[] = [];
      for (let i = 0; i < 4; i++) order.push({ team: 'france', i }, { team: 'argentina', i });
      const shown = (team: 'argentina' | 'france', i: number) => order.findIndex((o) => o.team === team && o.i === i) < kicks;
      return (
        <motion.div key="pens" {...enter}>
          <h2 className="font-display text-[13vw] uppercase leading-[0.9] text-neutral-100 md:text-[8vw]">Penalty shootout</h2>
          <div className="mx-auto mt-10 w-fit space-y-5">
            {(['argentina', 'france'] as const).map((team) =>
            <div key={team} className="flex items-center gap-5">
                <span className="w-28 text-right text-[11px] uppercase tracking-[0.3em] text-neutral-400">{team}</span>
                <div className="flex gap-3">
                  {shootout[team].map((scored, i) => {
                  const visible = shown(team, i);
                  return (
                    <motion.span
                      key={i}
                      className={`flex h-7 w-7 items-center justify-center rounded-full border md:h-9 md:w-9 ${
                      visible ? scored ? 'border-neutral-100 bg-neutral-100' : 'border-neutral-600' : 'border-neutral-700'}`
                      }
                      animate={{ scale: visible ? 1 : 0.85 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                      aria-label={visible ? scored ? 'Scored' : 'Missed' : 'Not taken'}>
                      
                        {visible && !scored && <span className="text-xs text-neutral-500">✕</span>}
                      </motion.span>);

                })}
                </div>
              </div>
            )}
          </div>
          <motion.p animate={{ opacity: kicks >= 8 ? 1 : 0 }} className="mt-8 font-display text-4xl text-neutral-100">
            4 — 2
          </motion.p>
        </motion.div>);

    }
    if (stage === 'champions')
    return (
      <motion.div key="champions" {...enter}>
          <SplitText as="h2" by="char" start text="World Champions" stagger={0.03} className="font-display text-[17vw] uppercase leading-[0.84] text-night md:text-[12vw]" />
        </motion.div>);

    if (stage === 'year')
    return (
      <motion.p key="year" {...enter} className="font-display text-[46vw] leading-[0.8] text-night md:text-[40vw]">
          2022
        </motion.p>);

    if (stage === 'thedream')
    return (
      <motion.p key="thedream" {...enter} className="font-display text-[20vw] uppercase leading-none text-white mix-blend-difference md:text-[16vw]">
          The dream.
        </motion.p>);

    return (
      <motion.p key="complete" {...enter} className="font-display text-[20vw] uppercase leading-none text-white md:text-[16vw]">
        Complete.
      </motion.p>);

  };

  return (
    <section ref={ref} aria-label="Qatar 2022 — the World Cup journey" className="relative bg-[#0b0b0c]" style={{ height: '1000vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div aria-hidden style={{ scaleY: skyRise }} className="absolute inset-0 origin-bottom bg-sky" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div style={{ opacity: imgOpacity, scale: imgScale }} className="relative h-[66vh] w-[min(50vh,78vw)] will-change-transform">
            <motion.div style={{ filter: imgFilter }} className="h-full w-full">
              <Photo image="trophy" alt="A golden trophy under a single spotlight" placeholder="Messi holding the World Cup, Lusail 2022" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div aria-hidden style={{ opacity: pulseOpacity }} className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="h-[58vmin] w-[58vmin] rounded-full border border-white/15"
            animate={reduce ? undefined : { scale: [1, 1.05, 1, 1.09, 1], opacity: [0.3, 0.6, 0.3, 0.7, 0.3] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeOut', times: [0, 0.12, 0.3, 0.42, 1] }} />
          
        </motion.div>

        <div className={`relative z-10 flex h-full items-center justify-center px-5 text-center ${onSky ? 'text-night' : ''}`}>
          <AnimatePresence mode="wait">{renderStage()}</AnimatePresence>
        </div>

        <motion.div style={{ opacity: pathOpacity }} className="absolute inset-x-5 bottom-8 z-10 md:inset-x-10">
          <svg viewBox="0 0 600 40" preserveAspectRatio="none" className="mb-4 h-8 w-full" aria-hidden>
            <motion.path
              d="M0 20 H250 L262 20 L270 4 L280 36 L290 12 L298 20 H600"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1], opacity: [1, 1, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }} />
            
          </svg>
          <ol className="flex justify-between text-[10px] uppercase tracking-[0.3em] md:text-[11px]">
            {path.map((p, i) =>
            <li key={p} className={`transition-colors duration-300 ${i === pathActive ? 'text-white' : i < pathActive ? 'text-neutral-500' : 'text-neutral-700'}`}>
                {p}
              </li>
            )}
          </ol>
        </motion.div>
      </div>
    </section>);

}