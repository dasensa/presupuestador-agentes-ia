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
        <div className={`max-w-7xl mx-auto rounded-md px-4 sm:px-5 transition-all duration-300 border border-brand-mint/25 ${scrolled ? 'bg-[#071013]/94 backdrop-blur-md shadow-2xl shadow-cyan-950/20' : 'bg-[#071013]/72 backdrop-blur-sm'}`}>
          <div className="flex items-center justify-between h-14">
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
                    ? 'text-brand-mint'
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
                className="inline-flex items-center rounded px-5 py-2 bg-brand-mint text-[#041012] text-body-sm font-semibold transition-colors hover:bg-[#7dfcf2]"
              >
                Contactar
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
          <div className="md:hidden mt-2 rounded-md bg-[#071013]/98 backdrop-blur-sm border border-brand-mint/25 animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-body-sm font-sans transition-colors ${
                    router.pathname === link.href
                      ? 'text-brand-mint'
                      : 'text-base-muted hover:text-base-text'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="/contacto"
                  className="block rounded text-center px-5 py-3 bg-brand-mint text-[#041012] text-body-sm font-semibold"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
