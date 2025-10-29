'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { QuizAnswers } from '@/lib/quiz-logic';

const quizQuestions = [
  {
    id: 'crunch',
    options: ['light', 'big', 'extraPuffy'] as const,
  },
  {
    id: 'heat',
    options: ['mild', 'medium', 'fire'] as const,
  },
  {
    id: 'mood',
    options: ['movieNight', 'studyFuel', 'onTheGo', 'party'] as const,
  },
];

export default function QuizPage() {
  const t = useTranslations('quiz');
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = quizQuestions[currentStep];
  const isLastStep = currentStep === quizQuestions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // Quiz complete - redirect to results
      const params = new URLSearchParams();
      Object.entries(answers).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      router.push(`quiz/results?${params.toString()}`);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const currentAnswer = answers[currentQuestion.id as keyof QuizAnswers];
  const canProceed = !!currentAnswer;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-flame/10 text-flame rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            {t('title')}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-ink">
            {t('subtitle')}
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Question {currentStep + 1} of {quizQuestions.length}
            </span>
            <span>{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-flame via-zesty to-corn"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ink text-center">
              {t(`questions.${currentQuestion.id}.title`)}
            </h2>

            <div className="grid gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer === option;
                return (
                  <Card
                    key={option}
                    className={`cursor-pointer transition-all hover:border-flame ${
                      isSelected
                        ? 'border-flame border-2 bg-flame/5'
                        : 'border-border'
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">
                          {t(`questions.${currentQuestion.id}.options.${option}`)}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-flame bg-flame'
                              : 'border-muted-foreground'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-3 h-3 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="min-w-[120px]"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            {t('cta.previous')}
          </Button>
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="min-w-[120px] bg-flame hover:bg-flame/90"
          >
            {isLastStep ? (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                {t('cta.submit')}
              </>
            ) : (
              <>
                {t('cta.next')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

