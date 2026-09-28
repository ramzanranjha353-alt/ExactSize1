import React from 'react';
import { Home, Image as ImageIcon, FileText, FileQuestion } from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateSlug: (slug: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onNavigateSlug,
}) => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      {/* 404 Visual Illustration */}
      <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-slate-800/80 border border-blue-200/80 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
        <FileQuestion className="w-10 h-10" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
        <span>Error 404 · File Not Found</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-md">
        Looks like this file went missing.
      </h1>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
        The tool or page you requested could not be found. Use the quick links below to jump back to our verified compression tools.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl brand-gradient-bg text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        >
          <Home className="w-4 h-4" />
          <span>Back Home</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateSlug('/compress-image-to-100kb')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 text-xs sm:text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        >
          <ImageIcon className="w-4 h-4 text-blue-500" />
          <span>Image Tools</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateSlug('/compress-pdf-to-300kb')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 text-xs sm:text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        >
          <FileText className="w-4 h-4 text-rose-500" />
          <span>PDF Tools</span>
        </button>
      </div>
    </div>
  );
};
