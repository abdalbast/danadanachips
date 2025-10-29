'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface PinnedSectionProps {
  children: ReactNode;
  className?: string;
  pinDuration?: number; // Height multiplier (e.g., 1.8 = 180vh)
  isMobile?: boolean;
}

export function PinnedSection({
  children,
  className = '',
  pinDuration = 1.8,
  isMobile = false,
}: PinnedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Reduce pin duration on mobile
  const effectiveDuration = isMobile ? Math.min(pinDuration, 1.4) : pinDuration;

  if (shouldReduceMotion) {
    return (
      <div className={className} style={{ minHeight: '100vh' }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: `${effectiveDuration * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {typeof children === 'function'
          ? children({ scrollYProgress })
          : children}
      </div>
    </div>
  );
}

interface PinnedContentProps {
  children: ReactNode;
  className?: string;
  scrollYProgress: any;
  startProgress?: number;
  endProgress?: number;
}

export function PinnedContent({
  children,
  className = '',
  scrollYProgress,
  startProgress = 0,
  endProgress = 1,
}: PinnedContentProps) {
  const opacity = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.1, endProgress - 0.1, endProgress],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [startProgress, startProgress + 0.15, endProgress - 0.15, endProgress],
    [0.95, 1, 1, 0.95]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

