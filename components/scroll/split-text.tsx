'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface SplitTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  delay?: number;
  stagger?: number;
}

export function SplitText({
  children,
  className = '',
  as: Component = 'p',
  delay = 0,
  stagger = 0.1,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-20% 0px -20% 0px',
  });
  const shouldReduceMotion = useReducedMotion();

  // Split text by lines (assuming line breaks are in the string)
  const lines = children.split('\n').filter(line => line.trim());

  if (shouldReduceMotion) {
    return (
      <Component className={className} ref={ref as any}>
        {children}
      </Component>
    );
  }

  return (
    <Component className={className} ref={ref as any}>
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className="block overflow-hidden"
          style={{ display: 'block' }}
        >
          <motion.span
            initial={{ y: 16, opacity: 0 }}
            animate={
              isInView
                ? { y: 0, opacity: 1 }
                : { y: 16, opacity: 0 }
            }
            transition={{
              duration: 0.5,
              delay: delay + lineIndex * stagger,
              ease: [0.16, 1, 0.3, 1], // Lighter easing
            }}
            style={{ display: 'block' }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

interface SplitWordsProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  delay?: number;
  stagger?: number;
}

export function SplitWords({
  children,
  className = '',
  as: Component = 'p',
  delay = 0,
  stagger = 0.03,
}: SplitWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-20% 0px -20% 0px',
  });
  const shouldReduceMotion = useReducedMotion();

  const words = children.split(' ');

  if (shouldReduceMotion) {
    return (
      <Component className={className} ref={ref as any}>
        {children}
      </Component>
    );
  }

  return (
    <Component className={className} ref={ref as any}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
          style={{ marginRight: '0.25em' }}
        >
          <motion.span
            initial={{ y: 12, opacity: 0 }}
            animate={
              isInView
                ? { y: 0, opacity: 1 }
                : { y: 12, opacity: 0 }
            }
            transition={{
              duration: 0.4,
              delay: delay + index * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

