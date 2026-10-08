import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';
import { easeOut } from '../../utils/motion';

interface OpeningSequenceProps {
  onComplete: () => void;
}

const TOTAL = 6.4;

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [step, setStep] = useState(0);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [lenis]);

  useEffect(() => {
    const timers = [
    window.setTimeout(() => setStep(1), 1600),
    window.setTimeout(() => setStep(2), 3500),
    window.setTimeout(onComplete, TOTAL * 1000)];

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [onComplete]);

  return (
    <motion.div
      role="dialog"
      aria-label="Opening sequence"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: easeOut }}>
      
      <AnimatePresence mode="wait">
        {step === 0 &&
        <motion.span
          key="ten"
          className="font-display text-sm tracking-[0.7em] text-silver"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}>
          
            10
          </motion.span>
        }
        {step === 1 &&
        <motion.p
          key="players"
          className="text-center font-serif text-3xl italic text-bone/75 md:text-5xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.7, ease: easeOut }}>
          
            There are players.
          </motion.p>
        }
        {step === 2 &&
        <motion.p
          key="messi"
          className="text-center font-serif text-4xl text-bone md:text-7xl"
          initial={{ opacity: 0, letterSpacing: '-0.01em', scale: 0.98 }}
          animate={{ opacity: 1, letterSpacing: '0.06em', scale: 1.04 }}
          transition={{ opacity: { duration: 0.8 }, letterSpacing: { duration: 3, ease: easeOut }, scale: { duration: 3, ease: easeOut } }}>
          
            And then there is <em className="italic">Messi.</em>
          </motion.p>
        }
      </AnimatePresence>

      <motion.span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-sky/60"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: TOTAL, ease: 'linear' }} />
      
      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-8 right-6 text-[11px] uppercase tracking-[0.24em] text-silver transition-colors duration-200 hover:text-bone md:right-10">
        
        Skip intro
      </button>
    </motion.div>);

}