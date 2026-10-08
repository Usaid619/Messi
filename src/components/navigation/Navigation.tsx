import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { MenuOverlay } from './MenuOverlay';
import { SoundToggle } from '../ui/SoundToggle';
import { allRoutes, primaryNav } from '../../data/navigation';
import { easeOut } from '../../utils/motion';

export function Navigation() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 240);
  });

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  const current = allRoutes.find((r) => r.to === pathname);
  const underline = hovered ?? pathname;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[110] bg-bone px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        
        Skip to content
      </a>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference"
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.25, ease: easeOut }}>
        
        <nav aria-label="Primary" className="flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
          <Link to="/" className="font-display text-lg tracking-[0.12em]" aria-label="Messi 10 — home">
            MESSI<span className="mx-1.5 font-sans font-light opacity-50">/</span>10
          </Link>

          <ul className="hidden items-center gap-8 xl:flex" onMouseLeave={() => setHovered(null)}>
            {primaryNav.map((link) =>
            <li key={link.to} className="relative">
                <Link
                to={link.to}
                onMouseEnter={() => setHovered(link.to)}
                onFocus={() => setHovered(link.to)}
                onBlur={() => setHovered(null)}
                aria-current={pathname === link.to ? 'page' : undefined}
                className="block py-2 text-[11px] font-medium uppercase tracking-[0.22em]">
                
                  {link.label}
                </Link>
                {underline === link.to &&
              <motion.span
                layoutId="nav-underline"
                className="absolute inset-x-0 bottom-0 h-px bg-white"
                transition={{ duration: 0.25, ease: easeOut }} />

              }
              </li>
            )}
          </ul>

          <div className="flex items-center gap-4 md:gap-6">
            <AnimatePresence mode="wait">
              {current &&
              <motion.span
                key={current.to}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: easeOut }}
                className="hidden whitespace-nowrap text-[11px] uppercase tracking-[0.22em] md:block xl:hidden">
                
                  {current.chapter}
                </motion.span>
              }
            </AnimatePresence>
            <SoundToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative flex h-10 w-10 items-center justify-center">
              
              <motion.span
                className="absolute block h-px w-7 bg-white"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.25, ease: easeOut }} />
              
              <motion.span
                className="absolute block h-px w-7 bg-white"
                animate={open ? { rotate: -45, y: 0, scaleX: 1 } : { rotate: 0, y: 4, scaleX: 0.6 }}
                style={{ originX: 1 }}
                transition={{ duration: 0.25, ease: easeOut }} />
              
            </button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>{open && <MenuOverlay onClose={() => setOpen(false)} />}</AnimatePresence>
    </>);

}