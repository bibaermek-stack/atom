import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, User, HelpCircle, BookOpen, MapPin, Building2, Clock } from 'lucide-react';
import { CHAPTERS, BOOK_METADATA } from '../data/chaptersData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    chapter: 'Жалпы сұрақ',
    message: '',
  });

  const [submitted, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      chapter: 'Жалпы сұрақ',
      message: '',
    });
    setSubscribed(false);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50/50 backdrop-blur-[2px] border-b border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#166534]/10 text-[#166534] text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Кері байланыс</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Авторлармен және редакциямен байланыс
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Оқу құралының мазмұны, формулалары немесе есептері бойынша сұрақтарыңыз болса, төмендегі форма арқылы бізге хабарласыңыз.
          </p>
        </div>

        {/* Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-[#166534] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#15803d]" />
                Байланыс ақпараты
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <BookOpen className="w-5 h-5 text-[#166534] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase block">Оқу басылымы</span>
                    <p className="font-semibold text-slate-900">{BOOK_METADATA.title}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Building2 className="w-5 h-5 text-[#166534] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase block">Университет</span>
                    <p className="font-semibold text-slate-900">{BOOK_METADATA.university}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{BOOK_METADATA.department}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-5 h-5 text-[#166534] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase block">Мекенжайы</span>
                    <p className="font-semibold text-slate-900">Қазақстан Республикасы, Түркістан қ., Б.Саттарханов даңғылы 29</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase block">Жауап беру уақыты</span>
                    <p className="font-semibold text-slate-900">1–2 жұмыс күні ішінде</p>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-xs text-green-900 leading-relaxed font-medium">
                <strong>Ескерту:</strong> Оқытушылар мен студенттер оқу құралына енгізілетін ұсыныстары мен түзетулерін де жібере алады.
              </div>
            </div>
          </div>

          {/* Right Feedback Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
                    Сұрақ қою немесе пікір қалдыру
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Аты-жөніңіз <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Асан Әлиев"
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-[#166534] focus:ring-1 focus:ring-[#166534] bg-slate-50/50 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Электрондық пошта <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="student@example.kz"
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-[#166534] focus:ring-1 focus:ring-[#166534] bg-slate-50/50 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Chapter/Topic Select */}
                  <div className="space-y-2">
                    <label htmlFor="contact-chapter" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Оқу құралының бөлімі
                    </label>
                    <div className="relative">
                      <HelpCircle className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        id="contact-chapter"
                        value={formData.chapter}
                        onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-[#166534] focus:ring-1 focus:ring-[#166534] bg-slate-50/50 focus:bg-white transition-all appearance-none"
                      >
                        <option value="Жалпы сұрақ">Жалпы сұрақ немесе пікір</option>
                        {CHAPTERS.map((ch) => (
                          <option key={ch.id} value={`${ch.number}: ${ch.title}`}>
                            {ch.number} — {ch.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Сұрағыңыздың мазмұны <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Мысалы: 2-бөлімдегі Де Бройль толқын ұзындығының формуласы бойынша есеп шығару әдісі туралы..."
                      className="w-full px-4 py-3 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-[#166534] focus:ring-1 focus:ring-[#166534] bg-slate-50/50 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#166534] hover:bg-[#15803d] text-white font-bold text-base shadow-md shadow-[#166534]/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Жіберілуде...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Сұрақты жіберу</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl font-black text-slate-900">
                      Сұрағыңыз қабылданды!
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Рахмет, <strong className="text-slate-800">{formData.name}</strong>. Сіздің сұрағыңыз кафедра оқытушыларына жіберілді. Жауап <span className="text-[#166534] font-semibold">{formData.email}</span> поштасы бойынша жіберіледі.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
                  >
                    Жаңа сұрақ қою
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
