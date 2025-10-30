import { getTranslations } from 'next-intl/server';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Label } from '@/components/ui/label';

export const dynamic = 'force-static';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations('contact');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-ink">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('form.name')}</Label>
                  <Input id="name" type="text" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('form.email')}</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t('form.message')}</Label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-flame"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  {t('form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-flame/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-flame" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:info@danadanachips.com"
                      className="text-muted-foreground hover:text-flame transition-colors"
                    >
                      info@danadanachips.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-flame/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-flame" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+9647501234567"
                      className="text-muted-foreground hover:text-flame transition-colors"
                    >
                      +964 750 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-flame/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-flame" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Erbil, Kurdistan Region
                      <br />
                      Iraq
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-flame/10 to-zesty/10 border-flame/30">
              <CardContent className="p-6 text-center space-y-3">
                <h3 className="font-display font-bold text-xl">
                  Wholesale Enquiries?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Interested in stocking Dana Dana in your store?
                </p>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={`/${locale}/wholesale`}>Learn More</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

