import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { HalalBadge } from '@/components/ui/atoms/halal-badge';
import { Instagram, Facebook } from 'lucide-react';
import type { Locale } from '@/i18n';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const quickLinks = [
    { href: `/${locale}/products`, label: tNav('products') },
    { href: `/${locale}/quiz`, label: tNav('quiz') },
    { href: `/${locale}/store-locator`, label: tNav('storeLocator') },
    { href: `/${locale}/about`, label: tNav('about') },
    { href: `/${locale}/contact`, label: tNav('contact') },
    { href: `/${locale}/wholesale`, label: tNav('wholesale') },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/danadanachips/',
      icon: Instagram,
    },
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
  ];

  return (
    <footer className="bg-ink text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              href={`/${locale}`}
              className="font-display text-3xl font-black text-flame hover:text-flame/80 transition-colors"
            >
              Dana Dana
            </Link>
            <p className="text-white/70 text-sm">{t('tagline')}</p>
            <HalalBadge size="md" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">
              {t('followUs')}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-flame flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {t('legal.terms')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {t('legal.cookies')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

