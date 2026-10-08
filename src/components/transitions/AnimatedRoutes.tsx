import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '../../contexts/SmoothScrollContext';
import { Home } from '../../pages/Home';
import { Story } from '../../pages/Story';
import { Career } from '../../pages/Career';
import { Barcelona } from '../../pages/Barcelona';
import { Argentina } from '../../pages/Argentina';
import { Moments } from '../../pages/Moments';
import { Trophies } from '../../pages/Trophies';
import { Statistics } from '../../pages/Statistics';
import { Legacy } from '../../pages/Legacy';
import { Timeline } from '../../pages/Timeline';
import { Gallery } from '../../pages/Gallery';

interface AnimatedRoutesProps {
  showIntro: boolean;
}

export function AnimatedRoutes({ showIntro }: AnimatedRoutesProps) {
  const location = useLocation();
  const { lenis } = useSmoothScroll();

  const resetScroll = () => {
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={resetScroll}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home showIntro={showIntro} />} />
        <Route path="/story" element={<Story />} />
        <Route path="/career" element={<Career />} />
        <Route path="/barcelona" element={<Barcelona />} />
        <Route path="/argentina" element={<Argentina />} />
        <Route path="/moments" element={<Moments />} />
        <Route path="/trophies" element={<Trophies />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/legacy" element={<Legacy />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Home showIntro={false} />} />
      </Routes>
    </AnimatePresence>);

}