import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// A soft, generated stadium hum (filtered brown noise). Never autoplays.
export function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const ensureAudio = () => {
    if (ctxRef.current) return;
    const Ctor =
    window.AudioContext ||
    (window as unknown as {webkitAudioContext: typeof AudioContext;}).webkitAudioContext;
    const ctx = new Ctor();
    const length = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 380;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    ctxRef.current = ctx;
    gainRef.current = gain;
  };

  const toggle = () => {
    ensureAudio();
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    void ctx.resume();
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setTargetAtTime(on ? 0 : 0.05, now, 0.5);
    setOn(!on);
  };

  useEffect(() => () => void ctxRef.current?.close(), []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Play ambient stadium sound'}
      className="flex h-8 w-8 items-center justify-center gap-[3px]">
      
      {[0, 1, 2, 3].map((i) =>
      <motion.span
        key={i}
        className="block h-3.5 w-px origin-bottom bg-white"
        animate={on ? { scaleY: [0.3, 1, 0.45, 0.8, 0.3] } : { scaleY: 0.25 }}
        transition={
        on ?
        { duration: 1.1 + i * 0.17, repeat: Infinity, ease: 'linear' } :
        { duration: 0.2 }
        } />

      )}
    </button>);

}