import Link from 'next/link';

const footerLinks = [
  {
    heading: 'Explore',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Learn', href: '/learn' },
      { label: 'Interactive', href: '/interactive' }
    ]
  },
  {
    heading: 'Programs',
    items: [
      { label: 'Course', href: '/course' },
      { label: 'Newsletter', href: '#newsletter' }
    ]
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '#privacy' }
    ]
  }
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'ri-linkedin-line' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'ri-youtube-line' },
  { label: 'Podcast', href: 'https://spotify.com', icon: 'ri-mic-line' }
];

export function Footer() {
  return (
    <footer className="mt-28 bg-gradient-to-b from-transparent via-white/70 to-white/90">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 rounded-[32px] border border-white/60 bg-white/70 p-10 shadow-soft backdrop-blur-2xl md:grid-cols-4">
          <div className="space-y-6">
            <p className="font-display text-2xl font-semibold text-brand-dark md:text-3xl">&lt;Your Brand Here&gt;</p>
            <p className="text-sm text-brand-dark/70">
              Evidence-based guidance to help ambitious humans understand, regulate, and transform stress into sustainable
              momentum.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/60 text-brand-dark transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <span className="sr-only">{social.label}</span>
                  <span aria-hidden className="text-base font-semibold">●</span>
                </Link>
              ))}
            </div>
          </div>
          {footerLinks.map((column) => (
            <div key={column.heading} className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark/60">{column.heading}</h3>
              <ul className="space-y-3 text-sm text-brand-dark/70">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="focus-ring hover:text-brand-dark">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 text-xs text-brand-dark/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} &lt;Your Brand Here&gt;. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#privacy" className="focus-ring hover:text-brand-dark">
              Privacy & data use
            </Link>
            <Link href="/contact" className="focus-ring hover:text-brand-dark">
              Support
            </Link>
            <Link href="/about#references" className="focus-ring hover:text-brand-dark">
              References
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
