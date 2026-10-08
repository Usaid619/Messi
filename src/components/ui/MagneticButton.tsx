import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';

interface MagneticButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  to,
  onClick,
  className = '',
  ariaLabel,
  strength = 0.3
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className="inline-block">
      {to ?
      <Link to={to} className={className} aria-label={ariaLabel}>
          {children}
        </Link> :

      <button type="button" onClick={onClick} className={className} aria-label={ariaLabel}>
          {children}
        </button>
      }
    </motion.div>);

}