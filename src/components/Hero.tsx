import React from 'react';
import { BookOpen, LayoutDashboard, ArrowRight, ShieldCheck, GraduationCap, Sparkles } from 'lucide-react';
import { BOOK_METADATA } from '../data/chaptersData';

interface HeroProps {
  onOpenDashboard: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDashboard }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/55 via-white/30 to-white/40 pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-100/60">
      {/* Soft orbs keep text readable without hiding the 3D atom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-100/25 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[400px] h-[400px] bg-green-100/20 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* STEM / TVET Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#166534]/10 text-[#166534] text-xs sm:text-sm font-semibold border border-[#166534]/20 shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#15803d]" />
              <span>STEM және TVET білім беру бағдарламасы</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              <span className="block text-[#166534]">Атом физикасы</span>
              <span className="block text-slate-800 font-extrabold mt-1">
                және атом ядросының физикасы
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              STEM және TVET тәсілдерімен байытылған, техникалық және жоғары оқу орындары студенттері мен магистранттарына арналған заманауи оқу құралы.
            </p>

            {/* University Tag / Author Badge */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-md border border-slate-200 text-slate-700 shadow-2xs">
                <GraduationCap className="w-4 h-4 text-[#166534]" />
                {BOOK_METADATA.university}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-md border border-slate-200 text-slate-700 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Рецензияланған оқу басылымы
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                id="hero-about-btn"
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#166534] hover:bg-[#15803d] text-white font-semibold text-base shadow-md shadow-[#166534]/20 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <BookOpen className="w-5 h-5" />
                <span>Кітап туралы</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                id="hero-dashboard-btn"
                onClick={onOpenDashboard}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <LayoutDashboard className="w-5 h-5 text-green-400" />
                <span>Dashboard-қа өту</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Physics Illustration Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6">
              
              {/* Header Box */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#166534] text-white flex items-center justify-center font-bold text-lg">
                    ⚛
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Оқу құралы құрылымы</h3>
                    <p className="text-xs text-slate-500">6 негізгі бөлімнен тұрады</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200/80 rounded-full">
                  2026 нұсқасы
                </span>
              </div>

              {/* Orbital graphic preview */}
              <div className="relative py-6 bg-gradient-to-br from-[#166534] to-[#15803d] rounded-xl text-white p-6 overflow-hidden shadow-inner">
                <div className="absolute right-[-20px] -bottom-10 opacity-10 text-9xl font-black select-none pointer-events-none">
                  E=mc²
                </div>
                <div className="relative z-10 space-y-3">
                  <span className="text-xs font-semibold text-green-200 uppercase tracking-widest">Ғылыми негіз</span>
                  <p className="text-lg font-bold leading-snug">
                    Атомдар мен ядролар физикасын терең меңгеруге арналған
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs text-green-100">
                    <span className="flex items-center gap-1 font-medium">✓ Теория</span>
                    <span className="flex items-center gap-1 font-medium">✓ Формулалар</span>
                    <span className="flex items-center gap-1 font-medium">✓ Тәжірибе</span>
                  </div>
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="block text-2xl font-black text-[#166534]">6</span>
                  <span className="text-xs font-semibold text-slate-600">Негізгі бөлім</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="block text-2xl font-black text-[#15803d]">100%</span>
                  <span className="text-xs font-semibold text-slate-600">STEM & TVET</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
