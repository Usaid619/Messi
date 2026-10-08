import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Photo } from '../ui/Photo';
import { easeInOut, easeOut } from '../../utils/motion';
import type { ImageKey } from '../../types/content';

interface RevealImageProps {
  image: ImageKey;
  alt: string;
  placeholder?: string;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left';
  mono?: boolean;
}

// Image wipes in through a mask while settling from 1.12 → 1.
export function RevealImage({
  image,
  alt,
  placeholder,
  className = '',
  delay = 0,
  direction = 'up',
  mono
}: RevealImageProps) {
  const reduce = useReducedMotion();
  const hidden = direction === 'up' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)';

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: reduce ? 'inset(0% 0% 0% 0%)' : hidden }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: easeInOut, delay }}
      data-cursor="View">
      
      <motion.div
        className="h-full w-full"
        initial={{ scale: reduce ? 1 : 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 1.2, ease: easeOut, delay }}>
        
        <Photo image={image} alt={alt} placeholder={placeholder} mono={mono} />
      </motion.div>
    </motion.div>);

}