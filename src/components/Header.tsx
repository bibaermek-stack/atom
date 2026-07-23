import React, { useState } from 'react';
import { Atom, Menu, X, LayoutDashboard, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDashboard }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Кітап туралы', href: '#about' },
    { name: 'Мазмұны', href: '#contents' },
    { name: 'Ерекшеліктері', href: '#features' },
    { name: 'Байланыс', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#020806]/80 backdrop-blur-md border-b border-emerald-500/20 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Title */}
          <a href="#" id="header-logo" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#166534] flex items-center justify-center text-white shadow-md shadow-[#166534]/20 group-hover:bg-[#15803d] transition-colors duration-200">
              <Atom className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-emerald-400 leading-tight group-hover:text-emerald-300 transition-colors">
                Атом физикасы
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-wide">
                Оқу құралы
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-emerald-400 font-semibold text-sm tracking-wide transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="header-dashboard-btn"
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#166534] hover:bg-[#15803d] text-white font-semibold text-sm shadow-md shadow-[#166534]/20 hover:shadow-lg hover:shadow-[#15803d]/25 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:bg-white/10 transition-colors"
              aria-label="Навигация мәзірі"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#020806]/95 border-b border-emerald-500/20 px-4 pt-2 pb-6 space-y-3 shadow-lg backdrop-blur-md">
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:text-emerald-400 hover:bg-white/5 font-semibold text-base transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 mt-2">
              <button
                id="mobile-dashboard-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#166534] text-white font-semibold text-base shadow-sm"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
