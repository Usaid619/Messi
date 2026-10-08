import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { easeInOut, easeOut } from '../../utils/motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

// Exit: the page sinks into midnight. Enter: a sky-blue line draws across, and the new page opens through it.
export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const reduce = useReducedMotion();

  return (
    <>
      <main id="main" className={`relative w-full ${className}`}>
        {children}
      </main>
      {!reduce &&
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
          <motion.div
          className="absolute inset-0 bg-night"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: easeOut }} />
        
          <motion.div
          className="absolute inset-x-0 top-0 h-1/2 bg-night"
          initial={{ y: '0%' }}
          animate={{ y: '-101%' }}
          transition={{ delay: 0.34, duration: 0.3, ease: easeInOut }} />
        
          <motion.div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-night"
          initial={{ y: '0%' }}
          animate={{ y: '101%' }}
          transition={{ delay: 0.34, duration: 0.3, ease: easeInOut }} />
        
          <motion.div
          className="absolute inset-x-0 top-1/2 h-px origin-center bg-sky"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{
            scaleX: { duration: 0.3, ease: easeOut },
            opacity: { delay: 0.4, duration: 0.2 }
          }} />
        
        </div>
      }
    </>);

}