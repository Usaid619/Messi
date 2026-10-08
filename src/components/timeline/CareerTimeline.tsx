import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Photo } from '../ui/Photo';
import { timelineEvents } from '../../data/timeline';

// Drag, swipe, or scroll — vertical wheel is translated into horizontal travel until either end.
export function CareerTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const progress = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let target = el.scrollLeft;
    let frame = 0;
    const tick = () => {
      const diff = target - el.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = target;
        frame = 0;
        return;
      }
      el.scrollLeft += diff * 0.14;
      frame = requestAnimationFrame(tick);
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft <= 1 && e.deltaY < 0 || el.scrollLeft >= max - 1 && e.deltaY > 0) return;
      e.preventDefault();
      if (!frame) target = el.scrollLeft;
      target = Math.max(0, Math.min(max, target + e.deltaY * 1.1));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(frame);
    };
  }, []);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    progress.set(max > 0 ? el.scrollLeft / max : 0);
    const center = el.scrollLeft + el.clientWidth * 0.35;
    let idx = 0;
    itemRefs.current.forEach((item, i) => {
      if (item && item.offsetLeft <= center) idx = i;
    });
    setActive(idx);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return;
    drag.current = { down: true, startX: e.clientX, startLeft: trackRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down || !trackRef.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) {
      d.moved = true;
      setDragging(true);
    }
    trackRef.current.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
    setDragging(false);
  };

  const jump = (i: number) => {
    const el = trackRef.current;
    const item = itemRefs.current[i];
    if (el && item) el.scrollTo({ left: item.offsetLeft - 20, behavior: 'smooth' });
  };

  return (
    <section aria-label="Career timeline" className="bg-ink pb-16">
      <div
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        data-lenis-prevent
        data-cursor="Explore"
        data-cursor-press="Drag"
        tabIndex={0}
        aria-label="Timeline track — use arrow keys or drag to explore"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') jump(Math.min(active + 1, timelineEvents.length - 1));
          if (e.key === 'ArrowLeft') jump(Math.max(active - 1, 0));
        }}
        className={`no-scrollbar flex snap-x snap-mandatory gap-0 overflow-x-auto px-5 md:snap-none md:px-10 ${dragging ? 'select-none' : ''}`}>
        
        {timelineEvents.map((ev, i) => {
          const isActive = i === active;
          return (
            <article
              key={`${ev.year}-${ev.title}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="group relative w-[82vw] shrink-0 snap-start border-l border-bone/10 pr-8 pl-5 sm:w-[60vw] md:w-[42vw] md:pl-8 lg:w-[34vw]">
              
              <p
                className={`font-display leading-[0.82] transition-colors duration-300 text-[30vw] md:text-[13vw] ${
                isActive ? 'text-bone' : 'text-outline-bone group-hover:text-bone/60'}`
                }>
                
                {ev.year}
              </p>
              <div className="relative mt-6 aspect-[4/3] overflow-hidden">
                <div
                  className={`h-full w-full transition-[transform,opacity] duration-300 ease-out ${
                  isActive ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-40 group-hover:scale-100 group-hover:opacity-90'}`
                  }>
                  
                  <Photo image={ev.image} alt="" mono={!isActive} />
                </div>
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-silver">
                <span className={isActive ? 'text-sky' : ''}>{ev.date}</span> · {ev.competition}
              </p>
              <h3 className="mt-2 font-display text-4xl uppercase leading-[0.95] md:text-5xl">{ev.title}</h3>
              <p className="mt-3 max-w-sm font-serif text-xl leading-snug text-bone/75">{ev.description}</p>
            </article>);

        })}
        <div className="w-[20vw] shrink-0" aria-hidden />
      </div>

      <div className="mt-14 px-5 md:px-10">
        <div className="relative h-px bg-bone/15">
          <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-bone" />
        </div>
        <nav aria-label="Jump to year" className="no-scrollbar mt-4 flex gap-5 overflow-x-auto">
          {timelineEvents.map((ev, i) =>
          <button
            key={`${ev.year}-nav`}
            type="button"
            onClick={() => jump(i)}
            aria-current={i === active ? 'true' : undefined}
            className={`shrink-0 font-display text-sm tracking-[0.08em] transition-colors duration-200 ${
            i === active ? 'text-bone' : 'text-silver/60 hover:text-bone'}`
            }>
            
              {ev.year}
            </button>
          )}
        </nav>
      </div>
    </section>);

}