import { getTranslations } from 'next-intl/server';
import { HalalBadge } from '@/components/ui/atoms/halal-badge';
import { Award, Heart, Users, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations('about');

  const features = [
    {
      icon: Award,
      title: t('origin.title'),
      content: t('origin.content'),
    },
    {
      icon: CheckCircle2,
      title: t('quality.title'),
      content: t('quality.content'),
    },
    {
      icon: Heart,
      title: t('halal.title'),
      content: t('halal.content'),
    },
    {
      icon: Users,
      title: t('community.title'),
      content: t('community.content'),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-flame/10 via-zesty/10 to-corn/10">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-ink">
            {t('title')}
          </h1>
          <div className="flex justify-center">
            <HalalBadge size="lg" />
          </div>
        </div>
      </section>

      {/* Story Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 border rounded-2xl hover:border-flame transition-colors space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-flame/10 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-flame" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Halal Certification Section */}
      <section className="py-16 px-4 bg-mint/5">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-mint/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-mint" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-black text-ink">
            100% Halal Certified
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            All Dana Dana products are certified Halal by recognised certification
            bodies, ensuring the highest standards of quality and compliance with
            Islamic dietary laws. Enjoy every puff with complete peace of mind.
          </p>
        </div>
      </section>
    </div>
  );
}

