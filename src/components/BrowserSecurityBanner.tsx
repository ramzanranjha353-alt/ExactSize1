import React from 'react';
import { ShieldCheck, MonitorCheck } from 'lucide-react';

export const BrowserSecurityBanner: React.FC = () => {
  return (
    <section className="w-full my-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/70 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-900/80 border border-blue-100/80 dark:border-slate-700/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 brand-soft-shadow">
        {/* Left Side: Browser Icon + Copy */}
        <div className="flex items-center gap-4 sm:gap-5 text-left w-full md:w-auto">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm border border-blue-100 dark:border-slate-600">
            <MonitorCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              100% Browser-Based Processing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Everything happens in your browser. No uploads, no tracking, no worries.
            </p>
          </div>
        </div>

        {/* Right Side: Handwritten annotation + Security Badge */}
        <div className="flex items-center gap-3 sm:gap-5 self-end md:self-center">
          {/* Handwritten "Your privacy matters" annotation */}
          <div className="flex items-center gap-1 select-none pointer-events-none">
            <span className="font-handwriting text-base sm:text-lg font-bold text-slate-600 dark:text-slate-300 rotate-[-4deg] whitespace-nowrap">
              Your privacy matters
            </span>
            {/* Arrow SVG pointing to the shield */}
            <svg
              className="w-10 h-7 text-slate-400 dark:text-slate-500 rotate-12"
              viewBox="0 0 45 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 5 18 C 18 18, 30 14, 38 7" />
              <path d="M 30 6 L 38 7 L 36 15" />
            </svg>
          </div>

          {/* Green Shield Badge */}
          <div className="w-12 h-12 rounded-2xl bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-300/80 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6 fill-emerald-500/20" />
          </div>
        </div>
      </div>
    </section>
  );
};
