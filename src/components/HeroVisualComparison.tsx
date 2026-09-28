import React from 'react';
import { Shield, Zap, EyeOff, Heart, CheckCircle2 } from 'lucide-react';
import sampleLandscape from '../assets/images/sample_mountain_landscape_1790606564465.jpg';

export const HeroVisualComparison: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center lg:items-end w-full max-w-lg mx-auto lg:max-w-none">
      {/* Visual Before / After Card Illustration */}
      <div className="relative w-full max-w-[440px] h-[340px] sm:h-[360px] flex items-center justify-center select-none">
        {/* Soft background ambient gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-blue-300/30 via-indigo-200/30 to-purple-300/30 dark:from-blue-600/10 dark:to-purple-600/10 blur-3xl rounded-full pointer-events-none -z-10"></div>

        {/* Playful Hand-drawn Annotation: "Your file, exactly the size you need!" */}
        <div className="absolute top-0 right-2 sm:right-6 z-20 flex flex-col items-end pointer-events-none">
          <div className="font-handwriting text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-200 rotate-[8deg] leading-tight text-right drop-shadow-xs">
            Your file,<br />
            <span className="text-blue-600 dark:text-blue-400">exactly the size</span><br />
            you need!
          </div>
          {/* Hand-drawn curved arrow SVG */}
          <svg
            className="w-12 h-12 text-slate-500 dark:text-slate-400 -mt-1 mr-4 rotate-12"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 38 4 C 36 18, 30 32, 14 36" />
            <path d="M 18 28 L 13 36 L 22 40" />
          </svg>
        </div>

        {/* Card 1: Original File (2.8 MB) */}
        <div className="absolute top-4 left-2 sm:left-4 z-10 w-[200px] sm:w-[220px] bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-xl dark:shadow-slate-950/40 border border-slate-100 dark:border-slate-700 -rotate-6 transition-transform hover:-rotate-3 hover:scale-105 duration-300">
          <div className="relative w-full h-[120px] sm:h-[130px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700">
            <img
              src={sampleLandscape}
              alt="Original uncompressed landscape photo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Dark badge showing original large size */}
            <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-xs text-white font-bold text-xs tracking-wide shadow-md">
              2.8 MB
            </div>
          </div>
          {/* Skeleton lines representing file metadata */}
          <div className="mt-3 space-y-1.5 px-1">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-4/5"></div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700/60 rounded-full w-1/2"></div>
          </div>
        </div>

        {/* Curved Green Arrow connecting the cards */}
        <div className="absolute top-[135px] left-[175px] sm:left-[195px] z-15 pointer-events-none">
          <svg
            className="w-20 h-20 text-emerald-500 drop-shadow-sm"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M 15 25 C 45 10, 65 30, 70 65"
              stroke="#10B981"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="1 0"
            />
            <polygon points="70,78 60,60 80,63" fill="#10B981" />
          </svg>
        </div>

        {/* Card 2: Compressed File (100 KB) */}
        <div className="absolute bottom-4 right-2 sm:right-6 z-10 w-[200px] sm:w-[220px] bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-2xl dark:shadow-slate-950/60 border border-slate-100 dark:border-slate-700 rotate-6 transition-transform hover:rotate-3 hover:scale-105 duration-300">
          <div className="relative w-full h-[120px] sm:h-[130px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700">
            <img
              src={sampleLandscape}
              alt="Compressed landscape photo at exact 100KB"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Green target badge showing exact 100 KB */}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-md">
              <span>100 KB</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          {/* Skeleton lines representing compressed file metadata */}
          <div className="mt-3 space-y-1.5 px-1">
            <div className="h-2 bg-emerald-100 dark:bg-emerald-950/60 rounded-full w-4/5"></div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700/60 rounded-full w-3/5"></div>
          </div>
        </div>
      </div>

      {/* 4 Trust Benefits Grid - Identical to Reference */}
      <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Benefit 1: 100% Private */}
        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 shadow-xs hover:bg-white dark:hover:bg-slate-800 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 fill-blue-500/20" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Private</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              Your files never leave your browser.
            </p>
          </div>
        </div>

        {/* Benefit 2: Lightning Fast */}
        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 shadow-xs hover:bg-white dark:hover:bg-slate-800 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 fill-emerald-500/20" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Lightning Fast</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              Get results in seconds, not minutes.
            </p>
          </div>
        </div>

        {/* Benefit 3: No Storage */}
        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 shadow-xs hover:bg-white dark:hover:bg-slate-800 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <EyeOff className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">No Storage</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              We don't keep your files on our servers.
            </p>
          </div>
        </div>

        {/* Benefit 4: Free Forever */}
        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 shadow-xs hover:bg-white dark:hover:bg-slate-800 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 fill-purple-500/20" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Free Forever</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              No sign up. No hidden fees. Just simple tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
