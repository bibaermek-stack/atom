import React from 'react';
import { Chapter } from '../types';
import { X, BookOpen, CheckCircle, Calculator, FileText } from 'lucide-react';

interface ChapterDetailModalProps {
  chapter: Chapter | null;
  onClose: () => void;
}

export const ChapterDetailModal: React.FC<ChapterDetailModalProps> = ({ chapter, onClose }) => {
  if (!chapter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <span className="text-xs font-black uppercase px-2.5 py-1 bg-[#166534] text-white rounded-md tracking-wider">
              {chapter.number}
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              {chapter.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#15803d] mt-0.5">
              {chapter.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Жабу"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Section Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#166534]" />
              Бөлім сипаттамасы
            </h4>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {chapter.description}
            </p>
          </div>

          {/* Subtopics List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#166534]" />
              Қамтылатын негізгі тақырыптар
            </h4>
            <ul className="space-y-2">
              {chapter.topics.map((topic, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 font-medium bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Formulas */}
          {chapter.keyFormulas && chapter.keyFormulas.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-[#166534]" />
                Бөлімнің басты формулалары
              </h4>
              <div className="space-y-2">
                {chapter.keyFormulas.map((item, idx) => (
                  <div key={idx} className="bg-[#166534]/5 p-3 rounded-xl border border-[#166534]/15">
                    <span className="text-xs font-bold text-[#166534] block">{item.label}</span>
                    <code className="text-xs sm:text-sm font-mono font-bold text-slate-900 block mt-1 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                      {item.formula}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Түсінікті, жабу
          </button>
        </div>

      </div>
    </div>
  );
};
