import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  FileCheck,
  Cpu,
  Layers,
  Award,
} from 'lucide-react';
import { SEOPageData } from '../data/seoPagesData';
import { Breadcrumbs } from './Breadcrumbs';
import { CompressorCard } from './CompressorCard';
import { HeroVisualComparison } from './HeroVisualComparison';
import { BrowserSecurityBanner } from './BrowserSecurityBanner';
import { FileType, TargetPreset } from '../types';

interface ToolLandingPageProps {
  pageData: SEOPageData;
  onNavigateHome: () => void;
  onNavigateSlug: (slug: string) => void;
  onNavigateCategory: (type: FileType) => void;
}

export const ToolLandingPage: React.FC<ToolLandingPageProps> = ({
  pageData,
  onNavigateHome,
  onNavigateSlug,
  onNavigateCategory,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [currentType, setCurrentType] = useState<FileType>(pageData.fileType);
  const [currentPreset, setCurrentPreset] = useState<TargetPreset>(pageData.targetPreset);

  return (
    <div className="w-full">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs
        fileType={pageData.fileType}
        currentPageTitle={pageData.h1}
        onNavigateHome={onNavigateHome}
        onNavigateCategory={onNavigateCategory}
      />

      {/* 2. Hero Section with Tool */}
      <section className="w-full pt-2 pb-10">
        {/* Kicker Badge */}
        <div className="mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
            <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{pageData.badgeLabel}</span>
          </div>
        </div>

        {/* H1 Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl leading-[1.12]">
          {pageData.h1}{' '}
          <span className="brand-gradient-text">Online</span>
        </h1>

        {/* Supporting Context Copy */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          {pageData.tagline}
        </p>

        <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          {pageData.contextLead}
        </p>

        {/* Two-Column Hero Grid: Compressor + Visual Benefits */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <CompressorCard
              currentType={currentType}
              currentPreset={currentPreset}
              onTypeChange={(t) => setCurrentType(t)}
              onPresetChange={(p) => setCurrentPreset(p)}
            />
          </div>

          <div className="lg:col-span-5 w-full">
            <HeroVisualComparison />
          </div>
        </div>
      </section>

      {/* 3. Deep Editorial Guide: Why This Specific Target Size Matters */}
      <section className="w-full py-12 border-t border-slate-200/70 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
              <FileCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>Target Size Context</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              {pageData.useCaseOverview.heading}
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {pageData.useCaseOverview.description}
            </p>

            {/* What Happens Under the Hood */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 brand-soft-shadow">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>What Happens During Compression to {pageData.targetPreset}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {pageData.compressionDetails.whatHappens}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <strong>Recommended Dimensions:</strong> {pageData.compressionDetails.dimensionAdvice}
              </div>
            </div>
          </div>

          {/* Common Portals Box */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 p-6 sm:p-7">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Frequently Enforced Upload Limits
            </h3>
            <ul className="space-y-3">
              {pageData.useCaseOverview.commonPortals.map((portal, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{portal}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              ExactSize verifies byte capacity locally before download, preventing portal rejection errors.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Practical Instructions & Tips */}
      <section className="w-full py-12">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optimization Best Practices</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tips for Compressing to {pageData.targetPreset}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pageData.tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 brand-soft-shadow flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  0{idx + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  {tip.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tip.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 100% Browser-Based Security Banner */}
      <BrowserSecurityBanner />

      {/* 6. Contextual FAQ Accordion */}
      <section className="w-full py-12 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Questions About Compressing to {pageData.targetPreset}
          </h2>
        </div>

        <div className="space-y-3">
          {pageData.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden brand-soft-shadow transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Related Tools Navigation Cluster */}
      <section className="w-full py-12 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-2xl mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Topical Cluster</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Related Compression Target Sizes
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Need a slightly different file limit? Explore our nearby pre-calibrated tools:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pageData.relatedSizes.map((rel) => (
            <button
              key={rel.slug}
              type="button"
              onClick={() => onNavigateSlug(rel.slug)}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 brand-soft-shadow text-left transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {rel.label}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {rel.description}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
