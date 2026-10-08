import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';
import { easeOut } from '../../utils/motion';

export function CustomCursor() {
  const fine = useFinePointer();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 550, damping: 42, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 550, damping: 42, mass: 0.35 });
  const [label, setLabel] = useState<string | null>(null);
  const [pressLabel, setPressLabel] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || typeof t.closest !== 'function') return;
      const c = t.closest('[data-cursor]');
      setLabel(c ? c.getAttribute('data-cursor') : null);
      setInteractive(!!t.closest('a, button, [role="button"], input, select, textarea'));
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const c = t && typeof t.closest === 'function' ? t.closest('[data-cursor-press]') : null;
      setPressLabel(c ? c.getAttribute('data-cursor-press') : null);
    };
    const onUp = () => setPressLabel(null);
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    root.addEventListener('mouseleave', onLeave);
    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [fine, x, y]);

  if (!fine) return null;
  const text = pressLabel ?? label;
  const scale = text ? 1 : interactive ? 0.42 : 0.11;

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[100] ${text ? '' : 'mix-blend-difference'}`}
      style={{ x: sx, y: sy }}>
      
      <motion.div
        className="-ml-[44px] -mt-[44px] flex h-[88px] w-[88px] items-center justify-center rounded-full bg-bone"
        animate={{ scale, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: easeOut }}>
        
        <motion.span
          className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink"
          animate={{ opacity: text ? 1 : 0 }}
          transition={{ duration: 0.15 }}>
          
          {text}
        </motion.span>
      </motion.div>
    </motion.div>);

}