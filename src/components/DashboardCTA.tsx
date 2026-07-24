import React from 'react';
import { LayoutDashboard, AlertCircle, Sparkles, ArrowRight, Construction, Clock, Laptop } from 'lucide-react';
import { DASHBOARD_URL } from './Header';

export const DashboardCTA: React.FC = () => {
  return (
    <section id="dashboard" className="py-20 bg-gradient-to-br from-slate-900 via-[#166534] to-[#15803d] text-white relative overflow-hidden">
      
      {/* Background Orbits */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Status Warning Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md">
          <AlertCircle className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Ескерту: Интерактивті платформа «Қазіргі уақытта әзірлену үстінде»</span>
        </div>

        {/* Section Heading */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Студенттер мен оқытушыларға арналған сандық Dashboard
          </h2>
          <p className="text-base sm:text-lg text-green-100 font-normal leading-relaxed">
            Интерактивті 3D атом симуляциялары, виртуалды зертханалар, онлайн тестілеу және STEM сандық ресурстары біріктірілген оқу модулі.
          </p>
        </div>

        {/* Development Progress Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/15 max-w-2xl mx-auto space-y-6 text-left shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
                <Construction className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Әзірлеу статусы</h4>
                <p className="text-xs text-green-200">Бета-нұсқаны сынақтан өткізу кезеңі</p>
              </div>
            </div>
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full border border-amber-400/30">
              85% дайын
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
              <span className="text-green-300 font-bold block flex items-center gap-1">
                <Laptop className="w-3.5 h-3.5" /> 3D Модельдер
              </span>
              <p className="text-slate-300">Бор атомы және Токамак визуалдау</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
              <span className="text-green-300 font-bold block flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Тікелей Тест
              </span>
              <p className="text-slate-300">6 бөлім бойынша онлайн білім тексеру</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
              <span className="text-green-300 font-bold block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> STEM Ресурс
              </span>
              <p className="text-slate-300">TVET зертханалық тапсырмалар жинағы</p>
            </div>
          </div>
        </div>

        {/* Large Action Button */}
        <div className="pt-2">
          <a
            id="cta-dashboard-btn"
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-green-50 text-[#166534] font-black text-lg shadow-2xl hover:scale-102 transition-all duration-200 cursor-pointer group"
          >
            <LayoutDashboard className="w-6 h-6 text-[#166534]" />
            <span>Dashboard-қа өту</span>
            <ArrowRight className="w-5 h-5 text-[#15803d] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
