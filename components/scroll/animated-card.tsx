'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  delay?: number;
}

export function AnimatedCard({
  children,
  className = '',
  index = 0,
  delay = 0,
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-15% 0px -15% 0px',
  });
  const shouldReduceMotion = useReducedMotion();

  // Add random jitter (±40ms) for organic feel
  const jitter = (Math.random() - 0.5) * 0.08; // ±40ms in seconds
  const baseDelay = delay + index * 0.08; // Base stagger
  const totalDelay = baseDelay + jitter;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 32 }
      }
      transition={{
        duration: 0.65,
        delay: Math.max(0, totalDelay),
        ease: [0.22, 0.61, 0.36, 1],
      }}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedGridProps {
  children: ReactNode;
  className?: string;
  columns?: number;
}

export function AnimatedGrid({
  children,
  className = '',
  columns = 3,
}: AnimatedGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-15% 0px -15% 0px',
  });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GridItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  // Add organic random jitter
  const jitter = (Math.random() - 0.5) * 0.08;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            delay: jitter,
            ease: [0.22, 0.61, 0.36, 1],
          },
        },
      }}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

