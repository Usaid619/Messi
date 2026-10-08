import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Photo } from '../ui/Photo';
import { SplitText } from '../typography/SplitText';
import { useFinePointer } from '../../hooks/useFinePointer';
import { easeOut } from '../../utils/motion';

interface HeroProps {
  ready: boolean;
}

export function Hero({ ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const k = reduce ? 0 : 1;
  const leftX = useTransform(scrollYProgress, [0, 1], ['0%', `${-24 * k}%`]);
  const rightX = useTransform(scrollYProgress, [0, 1], ['0%', `${20 * k}%`]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.2 * k]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', `${10 * k}%`]);
  const beamX = useTransform(scrollYProgress, [0, 1], ['0vw', `${18 * k}vw`]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 70, damping: 20 });
  const smy = useSpring(my, { stiffness: 70, damping: 20 });
  const detailX = useTransform(smx, (v) => v * 16);
  const detailY = useTransform(smy, (v) => v * 10);
  const portraitPX = useTransform(smx, (v) => v * -12);

  const onMove = (e: React.PointerEvent) => {
    if (!fine || reduce) return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    my.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      aria-label="Lionel Messi"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink">
      
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 0.32 : 0 }}
        transition={{ duration: 2.4, ease: easeOut }}>
        
        <div className="absolute inset-0 animate-kenburns">
          <Photo image="stadium" alt="" eager />
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x: beamX, opacity: beamOpacity }}
        className="pointer-events-none absolute -top-10 left-[18%] h-[120%] w-[34vw] origin-top -rotate-12 bg-gradient-to-b from-bone/[0.07] to-transparent [clip-path:polygon(42%_0,58%_0,100%_100%,0_100%)]" />
      

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ scale: portraitScale, y: portraitY, x: portraitPX }}
          className="relative h-[62vh] w-[min(44vh,74vw)] md:h-[70vh] md:w-[min(50vh,40vw)]">
          
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
            transition={{ duration: 2.2, ease: easeOut }}>
            
            <Photo
              image="silhouette"
              alt="A footballer walking out of the tunnel into floodlight"
              placeholder="Hero portrait of Lionel Messi"
              eager />
            
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />
          </motion.div>
        </motion.div>
      </div>

      <motion.h1
        aria-label="Lionel Messi"
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-[13vh] pt-[15vh] font-display uppercase leading-[0.8] text-bone md:pb-[9vh] md:pt-[12vh]">
        
        <motion.span style={{ x: leftX }} className="block pl-[3vw] text-[27vw] md:text-[19vw]">
          <SplitText text="LIONEL" by="char" start={ready} delay={0.7} stagger={0.05} duration={1.1} />
        </motion.span>
        <motion.span style={{ x: rightX }} className="block pr-[3vw] text-right text-[27vw] md:text-[19vw]">
          <SplitText text="MESSI" by="char" start={ready} delay={0.95} stagger={0.05} duration={1.1} />
        </motion.span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute inset-0">
        
        <motion.p
          style={{ x: detailX, y: detailY }}
          className="absolute left-5 top-[45%] hidden max-w-[12rem] text-[11px] uppercase leading-relaxed tracking-[0.24em] text-silver md:left-10 md:block">
          
          N° 10
          <br />
          Rosario
          <br />
          24 · 06 · 1987
        </motion.p>
        <motion.p
          style={{ x: detailX, y: detailY }}
          className="absolute right-5 top-[43%] hidden max-w-[15rem] text-right font-serif text-2xl italic leading-snug text-bone/85 md:right-10 md:block">
          
          More than a player. A story written in motion.
        </motion.p>

        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 md:bottom-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-silver">Scroll to enter the story ↓</span>
          <span className="relative block h-10 w-px overflow-hidden bg-bone/15">
            <motion.span
              className="absolute inset-x-0 top-0 h-full origin-top bg-bone"
              animate={reduce ? undefined : { y: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }} />
            
          </span>
        </div>
      </motion.div>
    </section>);

}