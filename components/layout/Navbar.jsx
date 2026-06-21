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
      <nav className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className={`max-w-7xl mx-auto rounded-full px-4 sm:px-5 transition-all duration-300 border border-slate-200/80 ${scrolled ? 'bg-white/88 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.10)]' : 'bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.06)]'}`}>
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-baseline gap-0">
              <span className="font-serif text-[22px] text-slate-950">AgentIA</span>
              <span className="text-brand-blue text-[10px] font-sans font-medium relative -top-2.5">®</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                className={`text-body-sm font-sans transition-colors ${
                  router.pathname === link.href
                    ? 'text-brand-blue'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Link
                href="/contacto"
                className="inline-flex items-center rounded-full px-5 py-2 bg-gradient-to-br from-brand-blue to-brand-mint text-white text-body-sm font-semibold shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition-transform hover:-translate-y-0.5"
              >
                Crear simulacion
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-slate-500 hover:text-slate-950 p-2"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-2 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-body-sm font-sans transition-colors ${
                    router.pathname === link.href
                      ? 'text-brand-blue'
                      : 'text-slate-500 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="/contacto"
                  className="block rounded-full text-center px-5 py-3 bg-gradient-to-br from-brand-blue to-brand-mint text-white text-body-sm font-semibold"
                >
                  Crear simulacion
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
