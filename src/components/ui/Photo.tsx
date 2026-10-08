import React from 'react';
import { images } from '../../data/images';
import type { ImageKey } from '../../types/content';

interface PhotoProps {
  image: ImageKey;
  alt: string;
  placeholder?: string;
  className?: string;
  imgClassName?: string;
  mono?: boolean;
  eager?: boolean;
}

export function Photo({
  image,
  alt,
  placeholder,
  className = '',
  imgClassName = '',
  mono = false,
  eager = false
}: PhotoProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-midnight ${className}`}>
      <img
        src={images[image]}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className={`h-full w-full select-none object-cover ${mono ? 'grayscale' : ''} ${imgClassName}`} />
      
      {placeholder &&
      <span className="absolute bottom-3 left-3 max-w-[85%] border border-bone/20 bg-ink/75 px-2 py-1 text-[9px] font-medium uppercase leading-snug tracking-[0.18em] text-bone/70">
          Placeholder · {placeholder}
        </span>
      }
    </div>);

}