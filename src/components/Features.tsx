import React from 'react';
import { FEATURES } from '../data/chaptersData';
import { Cpu, Wrench, Globe, CheckCircle, Sparkles } from 'lucide-react';

export const Features: React.FC = () => {
  // Function to render icon dynamically
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-[#166534]" />;
      case 'Wrench':
        return <Wrench className="w-7 h-7 text-[#15803d]" />;
      case 'Globe':
        return <Globe className="w-7 h-7 text-emerald-600" />;
      default:
        return <Sparkles className="w-7 h-7 text-[#166534]" />;
    }
  };

  return (
    <section id="features" className="py-20 bg-slate-50/92 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#166534]/10 text-[#166534] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Басты басымдықтар</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Оқу құралының басты ерекшеліктері
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Заманауи педагогикалық модельдер мен практикалық-бағдарланған білім беру стандартының бірегей синтезі.
          </p>
        </div>

        {/* 3 Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-6">
                
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-slate-100/80 flex items-center justify-center group-hover:bg-[#166534]/10 transition-colors">
                    {renderIcon(feature.iconName)}
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {feature.badge}
                  </span>
                </div>

                {/* Card Title & Description */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#166534] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  {feature.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
