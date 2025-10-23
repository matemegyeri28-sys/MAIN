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
    <footer className="border-t border-brand-light/40 bg-brand-dark text-brand-light">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-semibold">&lt;Your Brand Here&gt;</p>
            <p className="mt-4 text-sm text-brand-light/80">
              Evidence-based guidance to help ambitious humans understand, regulate, and transform stress into sustainable
              momentum.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:-translate-y-0.5 hover:border-white/40"
                >
                  <span className="sr-only">{social.label}</span>
                  <span aria-hidden className="text-lg">●</span>
                </Link>
              ))}
            </div>
          </div>
          {footerLinks.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-light/70">{column.heading}</h3>
              <ul className="mt-4 space-y-3 text-sm text-brand-light/80">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="focus-ring hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-brand-light/60 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} &lt;Your Brand Here&gt;. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#privacy" className="focus-ring hover:text-white">
              Privacy & data use
            </Link>
            <Link href="/contact" className="focus-ring hover:text-white">
              Support
            </Link>
            <Link href="/about#references" className="focus-ring hover:text-white">
              References
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
