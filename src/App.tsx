/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { Header } from './components/Header';
import { CompressorCard } from './components/CompressorCard';
import { HeroVisualComparison } from './components/HeroVisualComparison';
import { PopularToolsSection } from './components/PopularToolsSection';
import { BrowserSecurityBanner } from './components/BrowserSecurityBanner';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SEOContentAndFAQ } from './components/SEOContentAndFAQ';
import { Footer } from './components/Footer';
import { InfoModal } from './components/InfoModal';
import { ToolLandingPage } from './components/ToolLandingPage';
import { NotFoundPage } from './components/NotFoundPage';
import { SEOHead } from './components/SEOHead';
import { SEO_PAGES } from './data/seoPagesData';
import { FileType, TargetPreset } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('exactsize_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const [homeType, setHomeType] = useState<FileType>('image');
  const [homePreset, setHomePreset] = useState<TargetPreset>('100KB');
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'terms' | 'contact' | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('exactsize_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('exactsize_theme', 'light');
    }
  }, [darkMode]);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const navigateTo = (path: string) => {
    if (currentPath !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateHome = () => {
    navigateTo('/');
  };

  const navigateCategory = (type: FileType) => {
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setTimeout(() => {
        const el = document.getElementById('popular-tools');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById('popular-tools');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSection = (sectionId: string) => {
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isHome = currentPath === '/' || currentPath === '';
  const currentPageData = SEO_PAGES[currentPath] || null;
  const isNotFound = !isHome && !currentPageData;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-slate-100 transition-colors duration-200">
      {/* Dynamic SEO Head with Metadata and JSON-LD Structured Data */}
      <SEOHead
        pageData={currentPageData}
        canonicalPath={currentPath}
        isNotFound={isNotFound}
      />

      {/* Top Header */}
      <Header
        darkMode={darkMode}
        currentPath={currentPath}
        onToggleDarkMode={toggleDarkMode}
        onNavigateHome={navigateHome}
        onNavigateSlug={navigateTo}
        onOpenSection={handleOpenSection}
        onOpenInfoModal={(modal) => setActiveModal(modal)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {isNotFound ? (
          /* 404 NOT FOUND EXPERIENCE */
          <NotFoundPage onNavigateHome={navigateHome} onNavigateSlug={navigateTo} />
        ) : currentPageData ? (
          /* DEDICATED SEO TOPICAL CLUSTER LANDING PAGE */
          <ToolLandingPage
            pageData={currentPageData}
            onNavigateHome={navigateHome}
            onNavigateSlug={navigateTo}
            onNavigateCategory={navigateCategory}
          />
        ) : (
          /* HOMEPAGE EXPERIENCE */
          <>
            {/* HERO SECTION */}
            <section id="hero" className="w-full pt-4 pb-12">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/70 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 text-xs font-semibold shadow-xs">
                  <Zap className="w-3.5 h-3.5 fill-cyan-500/20 text-cyan-600 dark:text-cyan-400" />
                  <span>Smart Compression Tool</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl leading-[1.12]">
                Compress Any File to the{' '}
                <span className="brand-gradient-text">Size You Need.</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Reduce images and PDFs to 50KB, 100KB, 200KB, 300KB, 500KB or your own target size — quickly, easily and privately.
              </p>

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                <div id="compressor-card-container" className="lg:col-span-7 transition-all duration-300 rounded-3xl">
                  <CompressorCard
                    currentType={homeType}
                    currentPreset={homePreset}
                    onTypeChange={(type) => setHomeType(type)}
                    onPresetChange={(preset) => setHomePreset(preset)}
                  />
                </div>

                <div className="lg:col-span-5 w-full">
                  <HeroVisualComparison />
                </div>
              </div>
            </section>

            {/* POPULAR TOOLS SECTION */}
            <PopularToolsSection
              onSelectTool={(type, preset) => {
                setHomeType(type);
                setHomePreset(preset);
                const el = document.getElementById('compressor-card-container');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              onNavigateSlug={navigateTo}
              onViewAll={(type) => {
                setHomeType(type);
                handleOpenSection('hero');
              }}
            />

            {/* 100% BROWSER-BASED PROCESSING SECTION BANNER */}
            <BrowserSecurityBanner />

            {/* HOW IT WORKS SECTION */}
            <HowItWorksSection />

            {/* SEO CONTENT & DEEP DIVE WITH FAQ ACCORDION */}
            <SEOContentAndFAQ
              onSelectTool={(type, preset) => {
                const slug = `/compress-${type}-to-${preset.toLowerCase()}`;
                navigateTo(slug);
              }}
            />
          </>
        )}
      </main>

      {/* FOOTER */}
      <Footer
        onNavigateHome={navigateHome}
        onNavigateSlug={navigateTo}
        onOpenSection={handleOpenSection}
        onOpenInfoModal={(modal) => setActiveModal(modal)}
      />

      {/* Info Modals (About, Privacy, Terms, Contact) */}
      <InfoModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
