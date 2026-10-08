import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SmoothScrollProvider } from './contexts/SmoothScrollContext';
import { Navigation } from './components/navigation/Navigation';
import { AnimatedRoutes } from './components/transitions/AnimatedRoutes';
import { CustomCursor } from './components/ui/CustomCursor';
import { Grain } from './components/ui/Grain';

interface AppProps {
  /** Play the "There are players…" opening sequence on the first visit of a session. */
  showIntro?: boolean;
  /** Film-grain overlay across the whole experience. */
  showGrain?: boolean;
}

export function App({ showIntro = true, showGrain = true }: AppProps) {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <div className="min-h-screen w-full bg-ink font-sans text-bone">
          <Navigation />
          <AnimatedRoutes showIntro={showIntro} />
          {showGrain && <Grain />}
          <CustomCursor />
        </div>
      </SmoothScrollProvider>
    </BrowserRouter>);

}