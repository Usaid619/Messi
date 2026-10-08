import React, { useId } from 'react';
import type { TrophyShape } from '../../types/content';

interface TrophyIconProps {
  shape: TrophyShape;
  metal: 'gold' | 'silver';
  className?: string;
}

const metals = {
  gold: ['#f3dc9a', '#c9a45c', '#7a5a22'],
  silver: ['#f4f4f2', '#a9aeb7', '#4b505a']
};

// Stylised silhouettes, not replicas — enough to tell one trophy from another in the dark.
export function TrophyIcon({ shape, metal, className = '' }: TrophyIconProps) {
  const id = useId().replace(/:/g, '');
  const [hi, mid, lo] = metals[metal];
  const fill = `url(#m${id})`;
  const stroke = `url(#s${id})`;

  const base = <path d="M38 186 h44 l6 10 H32 z" fill="#1a1f2b" />;

  const shapes: Record<TrophyShape, React.ReactNode> = {
    ballon:
    <>
        <circle cx="60" cy="66" r="40" fill={fill} />
        <path d="M20 66 h80 M60 26 v80 M27 46 q33 14 66 0 M27 86 q33 -14 66 0" stroke={lo} strokeOpacity="0.5" fill="none" />
        <path d="M52 104 h16 l6 40 H46 z" fill={fill} />
        <path d="M34 144 h52 v16 H34 z" fill={fill} />
        <path d="M30 160 h60 v26 H30 z" fill="#1a1f2b" />
      </>,

    bigEars:
    <>
        <path d="M34 30 h52 q2 60 -18 82 h-16 q-20 -22 -18 -82 z" fill={fill} />
        <path d="M34 36 C 4 30, 0 84, 44 96" fill="none" stroke={stroke} strokeWidth="7" />
        <path d="M86 36 C 116 30, 120 84, 76 96" fill="none" stroke={stroke} strokeWidth="7" />
        <path d="M54 112 h12 v40 h-12 z" fill={fill} />
        <path d="M40 152 h40 l4 34 H36 z" fill={fill} />
        {base}
      </>,

    league:
    <>
        <path d="M44 20 h32 l-4 60 q-12 14 -24 0 z" fill={fill} />
        <path d="M54 84 h12 v34 h-12 z" fill={fill} />
        <path d="M32 118 h56 l-6 22 H38 z" fill={fill} />
        <path d="M28 140 h64 v46 H28 z" fill="#1a1f2b" />
        <path d="M36 150 h48" stroke={mid} strokeOpacity="0.6" />
      </>,

    cup:
    <>
        <path d="M30 40 h60 q0 54 -30 64 q-30 -10 -30 -64 z" fill={fill} />
        <path d="M30 50 q-18 6 -10 28 q6 10 16 10" fill="none" stroke={stroke} strokeWidth="5" />
        <path d="M90 50 q18 6 10 28 q-6 10 -16 10" fill="none" stroke={stroke} strokeWidth="5" />
        <path d="M54 104 h12 v44 h-12 z" fill={fill} />
        <path d="M38 148 h44 l4 38 H34 z" fill={fill} />
        {base}
      </>,

    world:
    <>
        <circle cx="60" cy="46" r="26" fill={fill} />
        <path d="M34 54 C 40 90, 30 110, 46 150 h28 C 90 110, 80 90, 86 54 C 76 74, 44 74, 34 54 z" fill={fill} />
        <path d="M46 150 h28 l8 12 H38 z" fill={fill} />
        <path d="M38 162 h44 v10 H38 z" fill="#2f5a3a" />
        <path d="M36 172 h48 l4 14 H32 z" fill={fill} />
        {base}
      </>,

    continental:
    <>
        <path d="M46 12 h28 l-4 14 H50 z" fill={fill} />
        <path d="M36 26 h48 q4 52 -24 72 q-28 -20 -24 -72 z" fill={fill} />
        <path d="M36 34 q-16 4 -12 26 q4 10 14 12" fill="none" stroke={stroke} strokeWidth="4" />
        <path d="M84 34 q16 4 12 26 q-4 10 -14 12" fill="none" stroke={stroke} strokeWidth="4" />
        <path d="M54 98 h12 v30 h-12 z" fill={fill} />
        <path d="M34 128 h52 v14 H34 z M28 142 h64 v18 H28 z M22 160 h76 v26 H22 z" fill="#1a1f2b" />
        <path d="M34 128 h52 v4 H34 z" fill={mid} />
      </>,

    medal:
    <>
        <path d="M36 0 L60 70 L84 0 h-12 L60 40 L48 0 z" fill="#75aadb" opacity="0.85" />
        <circle cx="60" cy="110" r="44" fill={fill} />
        <circle cx="60" cy="110" r="34" fill="none" stroke={lo} strokeOpacity="0.5" />
      </>,

    plate:
    <>
        <path d="M60 18 L100 40 V92 L60 114 L20 92 V40 z" fill={fill} />
        <path d="M60 32 L88 48 V84 L60 100 L32 84 V48 z" fill="none" stroke={lo} strokeOpacity="0.45" />
        <path d="M54 114 h12 v34 h-12 z" fill={fill} />
        <path d="M36 148 h48 l4 38 H32 z" fill={fill} />
        {base}
      </>

  };

  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden>
      <defs>
        <linearGradient id={`m${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={hi} />
          <stop offset="0.45" stopColor={mid} />
          <stop offset="1" stopColor={lo} />
        </linearGradient>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={hi} />
          <stop offset="1" stopColor={lo} />
        </linearGradient>
      </defs>
      {shapes[shape]}
    </svg>);

}