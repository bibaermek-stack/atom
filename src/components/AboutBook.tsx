import React from 'react';
import { BOOK_METADATA, CHAPTERS } from '../data/chaptersData';
import { BookCheck, User, Building2, Target, CheckCircle2, Bookmark, Award } from 'lucide-react';

export const AboutBook: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#166534]/10 text-[#166534] text-xs font-bold uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Оқу құралы туралы</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Кітаптың мақсаты мен қамтитын мазмұны
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Атом және ядролық физиканың іргелі теориялары мен қолданбалы заңдылықтарын заманауи оқыту әдістері арқылы түсіндіру.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Overview & Description */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-slate max-w-none space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BookCheck className="w-6 h-6 text-[#166534]" />
                Оқу құралының сипаттамасы
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">
                {BOOK_METADATA.description}
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Оқу басылымы теориялық білімді тереңдетіп қана қоймай, студенттер мен ізденушілерге есептер шығару, эксперименталдық деректерді талдау, радиоактивтілік пен ядролық реакторлардың қауіпсіздік негіздерін игеруге бағытталған.
              </p>
            </div>

            {/* Quick List of Main Chapters (1-6) */}
            <div className="space-y-4 bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80">
              <h4 className="text-lg font-bold text-[#166534] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#15803d]" />
                Негізгі бөлімдердің қысқаша тізімі (1–6 бөлім):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHAPTERS.map((chap) => (
                  <div key={chap.id} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-[#166534] text-white font-bold text-xs flex items-center justify-center">
                      {chap.id}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#166534] block">{chap.number}</span>
                      <span className="text-sm font-semibold text-slate-800 leading-tight block">{chap.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Metadata Card & Target Audience */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Book Meta Box */}
            <div className="bg-[#166534] text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl font-black">
                ⚛
              </div>

              <h3 className="text-xl font-extrabold border-b border-white/15 pb-4 text-green-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-300" />
                Басылым деректері
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs text-green-200 uppercase font-semibold block">Атауы</span>
                  <p className="font-bold text-white text-base mt-0.5">{BOOK_METADATA.title}</p>
                </div>

                <div>
                  <span className="text-xs text-green-200 uppercase font-semibold block">Университет / Мекеме</span>
                  <p className="font-medium text-green-50 mt-0.5">{BOOK_METADATA.university}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div>
                    <span className="text-xs text-green-200 uppercase font-semibold block">Авторлары</span>
                    <p className="font-semibold text-white mt-0.5">{BOOK_METADATA.authors}</p>
                  </div>
                  <div>
                    <span className="text-xs text-green-200 uppercase font-semibold block">Оқыту бағыты</span>
                    <p className="font-semibold text-white mt-0.5">STEM & TVET</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Target Audience Card */}
            <div className="bg-emerald-50/60 rounded-2xl p-6 border border-emerald-200/80 space-y-3">
              <h4 className="text-emerald-900 font-bold text-base flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Кімдерге арналған?
              </h4>
              <p className="text-emerald-950 text-sm leading-relaxed font-medium">
                {BOOK_METADATA.targetAudience}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
