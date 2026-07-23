import React, { useState } from 'react';
import { X, Construction, AlertTriangle, CheckCircle2, Mail, Sparkles, LayoutDashboard } from 'lucide-react';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Banner */}
        <div className="bg-[#1B4F72] text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute right-[-10px] top-[-10px] opacity-10 text-8xl font-black select-none pointer-events-none">
            ⚛
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-sky-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Жабу"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg font-bold">
              <Construction className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-200 uppercase tracking-wider block">Платформа статусы</span>
              <h3 className="text-xl font-extrabold text-white">Dashboard модулі</h3>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Main Notice Box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              <strong className="font-extrabold block text-amber-900 text-sm mb-1">
                Қазіргі уақытта әзірлену үстінде!
              </strong>
              «Атом физикасы және атом ядросының физикасы» онлайн Dashboard жүйесі бағдарламалануда. Жақында іске қосылады.
            </div>
          </div>

          {/* Planned Features List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Болашақ Dashboard функционалы:
            </h4>
            <div className="space-y-2 text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#2874A6] shrink-0" />
                <span>3D Интерактивті Атом мен Токамак симуляциялары</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#2874A6] shrink-0" />
                <span>6 бөлім бойынша онлайн тесттер мен статистика</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#2874A6] shrink-0" />
                <span>STEM & TVET зертханалық тапсырмалар қоры</span>
              </div>
            </div>
          </div>

          {/* Email Notification Form */}
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="pt-2 border-t border-slate-100 space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Іске қосылғанда хабарлама алу үшін электронды поштаңызды қалдырыңыз:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.kz"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg text-xs sm:text-sm border border-slate-300 focus:outline-none focus:border-[#1B4F72] focus:ring-1 focus:ring-[#1B4F72]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#1B4F72] hover:bg-[#2874A6] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0"
                >
                  Жазылу
                </button>
              </div>
            </form>
          ) : (
            <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold text-center">
              Рахмет! Растау хабарламасы жіберілді. Іске қосылғанда бірінші болып хабардар боласыз.
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Жабу
          </button>
        </div>

      </div>
    </div>
  );
};
