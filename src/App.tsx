import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutBook } from './components/AboutBook';
import { Features } from './components/Features';
import { Contents } from './components/Contents';
import { ChapterDetailModal } from './components/ChapterDetailModal';
import { DashboardCTA } from './components/DashboardCTA';
import { Contact } from './components/Contact';
import { DashboardModal } from './components/DashboardModal';
import { Footer } from './components/Footer';
import { Chapter } from './types';

export default function App() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col antialiased selection:bg-[#1B4F72] selection:text-white">
      {/* Header Bar */}
      <Header onOpenDashboard={() => setIsDashboardModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenDashboard={() => setIsDashboardModalOpen(true)} />

        {/* About Book Section */}
        <AboutBook />

        {/* Features Section (STEM, TVET, Kazakhstan) */}
        <Features />

        {/* Table of Contents Section (6 Chapters Cards) */}
        <Contents onSelectChapter={(chapter) => setSelectedChapter(chapter)} />

        {/* Dashboard Call To Action Section */}
        <DashboardCTA onOpenDashboard={() => setIsDashboardModalOpen(true)} />

        {/* Contact & Feedback Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chapter Detail Modal */}
      <ChapterDetailModal
        chapter={selectedChapter}
        onClose={() => setSelectedChapter(null)}
      />

      {/* Dashboard Status Modal */}
      <DashboardModal
        isOpen={isDashboardModalOpen}
        onClose={() => setIsDashboardModalOpen(false)}
      />
    </div>
  );
}
