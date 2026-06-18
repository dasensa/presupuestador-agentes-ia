import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../lib/constants';
import Button from '../ui/Button';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy-900/90 backdrop-blur-lg border-b border-navy-600/50 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-tight">
              <span className="text-white">Agent</span>
              <span className="text-gradient-gold">IA</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  router.pathname === link.href
                    ? 'text-gold-400 bg-gold-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-navy-700/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button href="/contacto" variant="primary" size="sm">
              Solicitar Demo
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy-900/95 backdrop-blur-lg border-t border-navy-600/50 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  router.pathname === link.href
                    ? 'text-gold-400 bg-gold-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-navy-700/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Button href="/contacto" variant="primary" size="md" className="w-full">
                Solicitar Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
