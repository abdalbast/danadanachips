'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Multiplier for parallax effect
  direction?: 'up' | 'down';
  isMobile?: boolean;
  type?: 'foreground' | 'background';
}

export function ParallaxElement({
  children,
  className = '',
  speed = 0.1,
  direction = 'up',
  isMobile = false,
  type = 'foreground',
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Clamp parallax on mobile
  const effectiveSpeed = isMobile ? speed * 0.5 : speed;

  // Different ranges for foreground vs background
  const yRange = type === 'foreground' 
    ? [-100 * effectiveSpeed, 100 * effectiveSpeed]
    : [-150 * effectiveSpeed, 150 * effectiveSpeed];

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? yRange : [yRange[1], yRange[0]]
  );

  // Foreground elements also scale slightly
  const scale = type === 'foreground'
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98])
    : 1;

  // Disable parallax if reduced motion
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ 
        y, 
        scale,
        willChange: 'transform',
        transform: 'translateZ(0)', // GPU acceleration
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  isMobile?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.12,
  isMobile = false,
}: ParallaxImageProps) {
  return (
    <ParallaxElement speed={speed} type="foreground" isMobile={isMobile}>
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </ParallaxElement>
  );
}

interface ParallaxBackgroundProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  isMobile?: boolean;
}

export function ParallaxBackground({
  children,
  className = '',
  speed = 0.15,
  isMobile = false,
}: ParallaxBackgroundProps) {
  return (
    <ParallaxElement
      speed={speed}
      type="background"
      direction="down"
      isMobile={isMobile}
      className={className}
    >
      {children}
    </ParallaxElement>
  );
}

