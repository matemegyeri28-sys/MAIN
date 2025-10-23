import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnalyticsPlaceholder } from '@/components/AnalyticsPlaceholder';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display'
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yourbrandhere.example.com'),
  title: {
    default: '<Your Brand Here> · Neurobiology of Stress, Simplified',
    template: '%s · <Your Brand Here>'
  },
  description:
    'Learn the neuroscience of stress, dopamine, and resilience through evidence-based lessons, interactive tools, and a premium masterclass.',
  openGraph: {
    title: '<Your Brand Here> · Neurobiology of Stress',
    description:
      'Master stress regulation with actionable neuroscience. Join guided tools, deep-dive articles, and a high-touch course.',
    url: 'https://yourbrandhere.example.com',
    siteName: '<Your Brand Here>',
    images: [
      {
        url: 'https://placehold.co/1200x630/0b1c26/ffffff?text=%3CYour+Brand+Here%3E',
        width: 1200,
        height: 630,
        alt: '<Your Brand Here> preview card'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '<Your Brand Here> · Neurobiology of Stress',
    description:
      'Premium, science-backed education on stress physiology, dopamine balance, and recovery habits.',
    images: ['https://placehold.co/1200x630/0b1c26/ffffff?text=%3CYour+Brand+Here%3E']
  },
  keywords: [
    'stress neuroscience',
    'dopamine regulation',
    'cortisol education',
    'neurobiology course',
    'stress recovery habits'
  ],
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-transparent text-brand-dark">
        <a
          href="#main-content"
          className="focus-ring absolute left-4 top-4 z-[60] -translate-y-20 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand-dark transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="aurora floating-shape absolute -left-24 top-[-15%] h-[38rem] w-[38rem]" aria-hidden />
          <div className="aurora floating-shape absolute bottom-[-25%] right-[-20%] h-[36rem] w-[36rem]" aria-hidden />
          <div className="aurora floating-shape absolute left-1/2 top-[15%] h-[28rem] w-[28rem] -translate-x-1/2" aria-hidden />
          <div className="grid-overlay absolute inset-0 opacity-[0.25]" aria-hidden />
        </div>
        <AnalyticsPlaceholder />
        <Navbar />
        <main id="main-content" className="relative z-10 min-h-screen pt-28 md:pt-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
