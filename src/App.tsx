import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutBook } from './components/AboutBook';
import { Features } from './components/Features';
import { Contents } from './components/Contents';
import { ChapterDetailModal } from './components/ChapterDetailModal';
import { DashboardCTA } from './components/DashboardCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AtomScrollBackground } from './components/AtomScrollBackground';
import { Chapter } from './types';

export default function App() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  return (
    <div className="min-h-screen bg-transparent font-sans text-slate-900 flex flex-col antialiased selection:bg-[#166534] selection:text-white relative">
      {/* 3D atom — fixed background, rotates on scroll */}
      <AtomScrollBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Hero />
          <AboutBook />
          <Features />
          <Contents onSelectChapter={(chapter) => setSelectedChapter(chapter)} />
          <DashboardCTA />
          <Contact />
        </main>

        <Footer />
      </div>

      <ChapterDetailModal
        chapter={selectedChapter}
        onClose={() => setSelectedChapter(null)}
      />
    </div>
  );
}
