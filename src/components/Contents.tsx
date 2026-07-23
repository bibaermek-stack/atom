import React from 'react';
import { CHAPTERS } from '../data/chaptersData';
import { Chapter } from '../types';
import { Atom, Waves, Orbit, CircleDot, Radio, Zap, BookOpen, ChevronRight, Layers } from 'lucide-react';

interface ContentsProps {
  onSelectChapter: (chapter: Chapter) => void;
}

export const Contents: React.FC<ContentsProps> = ({ onSelectChapter }) => {
  // Helper for rendering chapter icon
  const renderChapterIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-[#1B4F72]";
    switch (iconName) {
      case 'Atom':
        return <Atom className={iconClass} />;
      case 'Waves':
        return <Waves className={iconClass} />;
      case 'Orbit':
        return <Orbit className={iconClass} />;
      case 'CircleDot':
        return <CircleDot className={iconClass} />;
      case 'Radiation':
        return <Radio className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      default:
        return <Layers className={iconClass} />;
    }
  };

  return (
    <section id="contents" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4F72]/10 text-[#1B4F72] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Мазмұнға шолу</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Оқу құралының негізгі 6 бөлімі
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Әрбір бөлім тақырыптық теориялар, кванттық теңдеулер, графиктік диаграммалар мен зертханалық тапсырмалармен толықтырылған.
          </p>
        </div>

        {/* 6 Chapter Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CHAPTERS.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => onSelectChapter(chapter)}
              className="group cursor-pointer bg-white rounded-2xl p-7 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#1B4F72]/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#1B4F72] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-5">
                
                {/* Header: Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase px-3 py-1 bg-[#1B4F72]/10 text-[#1B4F72] rounded-full">
                    {chapter.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-slate-100/90 group-hover:bg-[#1B4F72]/10 flex items-center justify-center transition-colors">
                    {renderChapterIcon(chapter.iconName)}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1.5">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#1B4F72] transition-colors leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#2874A6]">
                    {chapter.subtitle}
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {chapter.description}
                </p>

                {/* Topic Pills preview */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {chapter.topics.slice(0, 3).map((topic, idx) => (
                    <span key={idx} className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200/60 truncate max-w-[200px]">
                      • {topic}
                    </span>
                  ))}
                  {chapter.topics.length > 3 && (
                    <span className="text-[11px] font-bold text-[#1B4F72] px-1 py-0.5">
                      +{chapter.topics.length - 3} тақырып
                    </span>
                  )}
                </div>

              </div>

              {/* Bottom Action Link */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1B4F72] group-hover:text-[#2874A6]">
                <span>Тақырыптар тізімі мен формулалар</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
