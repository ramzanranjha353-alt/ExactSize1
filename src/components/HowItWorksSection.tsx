import React from 'react';
import { Sliders, Cpu, CheckCircle2, Lock, Sparkles, Check } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Pick Exact Target & Drag File',
      description:
        'Select common requirements like 50KB, 100KB, 200KB or enter a custom byte target. Drop your JPG, PNG, WebP or PDF file into the drop zone.',
      icon: <Sliders className="w-6 h-6 text-blue-500" />,
      features: ['Common portal presets', 'Custom KB & MB inputs', 'Drag & drop support'],
    },
    {
      number: '02',
      title: 'Local Binary Search Calibration',
      description:
        'ExactSize runs an iterative binary-search compression loop in your browser. It calculates the optimal quality matrix and scaling factor to hit your target without exceeding it.',
      icon: <Cpu className="w-6 h-6 text-indigo-500" />,
      features: ['Sub-second processing', 'HTML5 Canvas & PDF streams', 'Maximum visual fidelity'],
    },
    {
      number: '03',
      title: 'Instant Download with Zero Uploads',
      description:
        'Your finished file is generated immediately in memory. Inspect before-and-after fidelity and download with a single click. No data ever touches a remote server.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
      features: ['Zero server logs', 'Exact file naming', 'Immediate local save'],
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-16 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3 border border-blue-200/60 dark:border-blue-900/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The ExactSize Workflow</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          How It Works
        </h2>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Engineered for users who need files to meet strict portal upload caps without compromising privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 brand-soft-shadow flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-800 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-slate-200 dark:text-slate-700 font-mono">
                  {step.number}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {step.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              {step.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
