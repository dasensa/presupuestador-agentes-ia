import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-1" style={{ background: 'linear-gradient(to right, #0057ff, #00f0a0)' }} />
      <nav className={`fixed top-1 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-base-bg/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <Link href="/" className="flex items-baseline gap-0">
              <span className="font-serif text-[22px] text-base-text">AgentIA</span>
              <span className="text-brand-mint text-[10px] font-sans font-medium relative -top-2.5">®</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-body-sm font-sans transition-colors ${
                    router.pathname === link.href
                      ? 'text-base-text'
                      : 'text-base-muted hover:text-base-text'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Link
                href="/contacto"
                className="inline-flex items-center px-5 py-2 bg-brand-blue text-white text-body-sm font-medium transition-opacity hover:opacity-90"
              >
                Solicitar demo
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-base-muted hover:text-base-text p-2"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-base-bg/98 backdrop-blur-sm border-t border-border animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-body-sm font-sans transition-colors ${
                    router.pathname === link.href
                      ? 'text-base-text'
                      : 'text-base-muted hover:text-base-text'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="/contacto"
                  className="block text-center px-5 py-3 bg-brand-blue text-white text-body-sm font-medium"
                >
                  Solicitar demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
