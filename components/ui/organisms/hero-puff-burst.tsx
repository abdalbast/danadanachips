'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface HeroPuffBurstProps {
  title: string;
  subtitle: string;
  ctaFindNearMe: string;
  ctaSample: string;
  locale: string;
}

export function HeroPuffBurst({
  title,
  subtitle,
  ctaFindNearMe,
  ctaSample,
  locale,
}: HeroPuffBurstProps) {
  // Animation variants for floating puffs
  const puffVariants = {
    initial: { scale: 0, opacity: 0, rotate: 0 },
    animate: (i: number) => ({
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0.8],
      rotate: [0, 180, 360],
      y: [0, -20, 0],
      transition: {
        duration: 2,
        delay: i * 0.1,
        repeat: Infinity,
        repeatDelay: 3,
      },
    }),
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-corn/20 via-zesty/10 to-flame/20">
      {/* Animated background puffs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={puffVariants}
            initial="initial"
            animate="animate"
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-corn to-zesty opacity-20 blur-xl"
            style={{
              left: `${(i * 8 + 10) % 90}%`,
              top: `${(i * 13 + 15) % 80}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main title with burst animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-ink leading-none tracking-tight">
              {title.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  {word}
                  {index < title.split(' ').length - 1 && ' '}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-flame hover:bg-flame/90 group"
            >
              <Link href={`/${locale}/store-locator`}>
                <MapPin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {ctaFindNearMe}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 group"
            >
              <Link href={`/${locale}/quiz`}>
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                {ctaSample}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  );
}

