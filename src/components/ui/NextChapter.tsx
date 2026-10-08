import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNextRoute, getRouteIndex } from '../../utils/routes';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';
import { allRoutes } from '../../data/navigation';

interface NextChapterProps {
  /** Override the default next route in the film's order. */
  to?: string;
}

export function NextChapter({ to }: NextChapterProps) {
  const { pathname } = useLocation();
  const next = to && allRoutes.find((r) => r.to === to) || getNextRoute(pathname);
  const { lenis } = useSmoothScroll();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });else
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-bone/10 bg-ink text-bone">
      <Link
        to={next.to}
        data-cursor="Enter"
        className="group block px-5 pb-10 pt-20 md:px-10 md:pt-28">
        
        <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.24em] text-silver">
          <span>Next chapter — {getRouteIndex(next.to)}</span>
          <span className="font-serif text-base normal-case italic tracking-normal">{next.chapter}</span>
        </div>
        <div className="relative mt-6 overflow-hidden">
          <span className="block font-display text-[19vw] uppercase leading-[0.86] text-outline-bone md:text-[15vw]">
            {next.label}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 block font-display text-[19vw] uppercase leading-[0.86] text-bone transition-[clip-path] duration-300 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)] md:text-[15vw]">
            
            {next.label}
          </span>
        </div>
      </Link>
      <div className="flex flex-col gap-4 border-t border-bone/10 px-5 py-6 text-[11px] uppercase tracking-[0.2em] text-silver md:flex-row md:items-center md:justify-between md:px-10">
        <span className="font-display text-sm tracking-[0.14em] text-bone">MESSI / 10</span>
        <p className="max-w-xl normal-case tracking-normal text-silver/80">
          An independent, unofficial tribute. Frames marked “placeholder” are reserved for licensed photography.
        </p>
        <button type="button" onClick={toTop} className="self-start uppercase text-bone transition-colors duration-200 hover:text-sky md:self-auto">
          Back to top ↑
        </button>
      </div>
    </footer>);

}