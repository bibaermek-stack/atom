import React from 'react';
import { Atom, GraduationCap, Mail, MapPin, ExternalLink } from 'lucide-react';
import { BOOK_METADATA } from '../data/chaptersData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand & University Info (Col 1: 6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B4F72] text-white flex items-center justify-center font-bold shadow-md">
                <Atom className="w-6 h-6 text-sky-300 animate-spin-slow" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Атом физикасы
              </span>
            </div>

            <p className="text-sm font-medium text-slate-400 max-w-md leading-relaxed">
              «{BOOK_METADATA.title}» — STEM және TVET бағдарламалары бойынша әзірленген оқу басылымы.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-[#2874A6] shrink-0 mt-0.5" />
                <span className="font-bold text-slate-200">{BOOK_METADATA.university}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Қазақстан Республикасы, Түркістан қаласы</span>
              </div>
            </div>
          </div>

          {/* Quick Links (Col 2: 3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Сайт навигациясы
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#about" className="hover:text-white transition-colors">Кітап туралы</a>
              </li>
              <li>
                <a href="#contents" className="hover:text-white transition-colors">Мазмұны (6 бөлім)</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">STEM & TVET Ерекшеліктері</a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-white transition-colors">Dashboard модулі</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Байланыс</a>
              </li>
            </ul>
          </div>

          {/* Educational Standards & Contacts (Col 3: 3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Оқу басылымы
            </h4>
            <div className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
              <p><strong className="text-slate-200">Авторлары:</strong> {BOOK_METADATA.authors}</p>
              <p><strong className="text-slate-200">Кафедра:</strong> {BOOK_METADATA.department}</p>
              <p><strong className="text-slate-200">Бағыты:</strong> Физика және ядролық физика</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} «Атом физикасы және атом ядросының физикасы». БАРЛЫҚ ҚҰҚЫҚТАР ҚОРҒАЛҒАН.
          </p>
          <p className="text-slate-400 font-medium">
            {BOOK_METADATA.university}
          </p>
        </div>

      </div>
    </footer>
  );
};
