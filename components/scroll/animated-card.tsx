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

  // Add random jitter (±20ms) for subtle organic feel
  const jitter = (Math.random() - 0.5) * 0.04; // ±20ms in seconds
  const baseDelay = delay + index * 0.05; // Base stagger (reduced)
  const totalDelay = baseDelay + jitter;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 16 }
      }
      transition={{
        duration: 0.45,
        delay: Math.max(0, totalDelay),
        ease: [0.16, 1, 0.3, 1],
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
            staggerChildren: 0.05,
            delayChildren: 0.05,
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

  // Add subtle organic jitter
  const jitter = (Math.random() - 0.5) * 0.04;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            delay: jitter,
            ease: [0.16, 1, 0.3, 1],
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

