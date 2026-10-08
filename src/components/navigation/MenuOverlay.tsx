import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Photo } from '../ui/Photo';
import { allRoutes } from '../../data/navigation';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';
import { easeInOut, easeOut } from '../../utils/motion';
import type { ImageKey } from '../../types/content';

interface MenuOverlayProps {
  onClose: () => void;
}

export function MenuOverlay({ onClose }: MenuOverlayProps) {
  const { pathname } = useLocation();
  const { lenis } = useSmoothScroll();
  const [preview, setPreview] = useState<ImageKey>(
    allRoutes.find((r) => r.to === pathname)?.image ?? 'silhouette'
  );
  const firstRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => firstRef.current?.focus(), 200);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lenis, onClose]);

  return (
    <motion.div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-40 bg-night text-bone"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.3, ease: easeInOut }}
      data-lenis-prevent>
      
      <div className="grid h-full grid-cols-1 gap-10 px-5 pb-8 pt-20 md:px-10 md:pt-24 lg:grid-cols-[1fr_minmax(0,0.75fr)]">
        <nav aria-label="All chapters" className="flex flex-col justify-center overflow-y-auto no-scrollbar">
          <ol>
            {allRoutes.map((r, i) => {
              const active = r.to === pathname;
              return (
                <li key={r.to} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: 0.14 + i * 0.035, duration: 0.3, ease: easeOut }}>
                    
                    <Link
                      ref={i === 0 ? firstRef : undefined}
                      to={r.to}
                      onClick={onClose}
                      onMouseEnter={() => setPreview(r.image)}
                      onFocus={() => setPreview(r.image)}
                      aria-current={active ? 'page' : undefined}
                      className="group flex items-baseline gap-4 py-0.5">
                      
                      <span className="w-7 shrink-0 text-[10px] tracking-[0.2em] text-silver">
                        {String(i).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-display text-[clamp(2.1rem,6.2vh,4.6rem)] uppercase leading-[1.04] transition-colors duration-200 group-hover:text-sky ${
                        active ? 'text-sky' : ''}`
                        }>
                        
                        {r.label}
                      </span>
                      <span className="hidden font-serif text-lg italic text-silver opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:inline">
                        {r.chapter}
                      </span>
                    </Link>
                  </motion.div>
                </li>);

            })}
          </ol>
        </nav>

        <div className="relative hidden overflow-hidden lg:block">
          <AnimatePresence initial={false}>
            <motion.div
              key={preview}
              className="absolute inset-0"
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}>
              
              <Photo image={preview} alt="" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="absolute bottom-6 left-5 font-serif text-base italic text-silver md:left-10">
        
        More than a player. A story written in motion.
      </motion.p>
    </motion.div>);

}