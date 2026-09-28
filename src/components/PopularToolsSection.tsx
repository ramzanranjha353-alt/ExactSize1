import React from 'react';
import { Sparkles, ArrowRight, Image as ImageIcon, FileText } from 'lucide-react';
import { FileType, TargetPreset } from '../types';
import sampleLandscape from '../assets/images/sample_mountain_landscape_1790606564465.jpg';
import pdfPreview from '../assets/images/pdf_document_preview_1790606575728.jpg';

interface PopularToolsSectionProps {
  onSelectTool: (type: FileType, preset: TargetPreset) => void;
  onNavigateSlug: (slug: string) => void;
  onViewAll: (type: FileType) => void;
}

export const PopularToolsSection: React.FC<PopularToolsSectionProps> = ({
  onSelectTool,
  onNavigateSlug,
  onViewAll,
}) => {
  const imagePresets: { preset: TargetPreset; label: string; slug: string }[] = [
    { preset: '50KB', label: '50KB', slug: '/compress-image-to-50kb' },
    { preset: '100KB', label: '100KB', slug: '/compress-image-to-100kb' },
    { preset: '200KB', label: '200KB', slug: '/compress-image-to-200kb' },
    { preset: '300KB', label: '300KB', slug: '/compress-image-to-300kb' },
    { preset: '500KB', label: '500KB', slug: '/compress-image-to-500kb' },
    { preset: '1MB', label: '1MB', slug: '/compress-image-to-1mb' },
  ];

  const pdfPresets: { preset: TargetPreset; label: string; slug: string }[] = [
    { preset: '100KB', label: '100KB', slug: '/compress-pdf-to-100kb' },
    { preset: '200KB', label: '200KB', slug: '/compress-pdf-to-200kb' },
    { preset: '300KB', label: '300KB', slug: '/compress-pdf-to-300kb' },
    { preset: '500KB', label: '500KB', slug: '/compress-pdf-to-500kb' },
    { preset: '1MB', label: '1MB', slug: '/compress-pdf-to-1mb' },
  ];

  return (
    <section id="popular-tools" className="w-full py-12 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
          <Sparkles className="w-4 h-4 fill-amber-500" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Popular Tools
        </h2>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Quick access to our most used compression tools.
      </p>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1: Image Compression */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 brand-soft-shadow transition-all hover:border-blue-300 dark:hover:border-blue-800">
          {/* Card Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Image Compression
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Compress images to your desired size.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateSlug('/compress-image-to-100kb')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 group py-1 focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Quick Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10 max-w-md">
            {imagePresets.map((item) => (
              <button
                key={item.preset}
                type="button"
                onClick={() => onNavigateSlug(item.slug)}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-800 transition-all text-left focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">Image</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>

          {/* Decorative Corner Thumbnail Graphic (Matching reference image) */}
          <div className="hidden sm:block absolute -bottom-2 right-4 w-36 h-28 pointer-events-none select-none">
            <div className="relative w-full h-full rotate-6 transform translate-y-3">
              <div className="w-32 h-20 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-700 bg-slate-100">
                <img
                  src={sampleLandscape}
                  alt="Landscape artwork preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 -left-2 px-2 py-0.5 rounded-md bg-emerald-500 text-white font-bold text-[10px] shadow-sm">
                100 KB
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: PDF Compression */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 brand-soft-shadow transition-all hover:border-rose-300 dark:hover:border-rose-800">
          {/* Card Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  PDF Compression
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Compress PDF files to your desired size.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateSlug('/compress-pdf-to-300kb')}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1 group py-1 focus-visible:ring-2 focus-visible:ring-rose-500 rounded"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Quick Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10 max-w-md">
            {pdfPresets.map((item) => (
              <button
                key={item.preset}
                type="button"
                onClick={() => onNavigateSlug(item.slug)}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-rose-300 dark:hover:border-rose-800 transition-all text-left focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">PDF</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>

          {/* Decorative Corner Thumbnail Graphic (PDF Sheet artwork) */}
          <div className="hidden sm:block absolute -bottom-2 right-4 w-36 h-28 pointer-events-none select-none">
            <div className="relative w-full h-full -rotate-6 transform translate-y-3">
              <div className="w-28 h-20 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-700 bg-white">
                <img
                  src={pdfPreview}
                  alt="PDF report mockup preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold text-[9px] shadow-sm">
                PDF
              </div>
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-indigo-500 text-white font-bold text-[10px] shadow-sm">
                300 KB
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
