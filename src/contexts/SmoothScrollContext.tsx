import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

interface SmoothScrollValue {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollValue>({ lenis: null });

export function SmoothScrollProvider({ children }: {children: React.ReactNode;}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const instance = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 });
    let frame = 0;
    const loop = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    setLenis(instance);
    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, [reduce]);

  return <SmoothScrollContext.Provider value={{ lenis }}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll(): SmoothScrollValue {
  return useContext(SmoothScrollContext);
}