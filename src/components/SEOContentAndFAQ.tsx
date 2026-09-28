import React, { useState } from 'react';
import { ChevronDown, HelpCircle, FileCheck, Layers, Award } from 'lucide-react';
import { FileType, TargetPreset } from '../types';

interface SEOContentAndFAQProps {
  onSelectTool: (type: FileType, preset: TargetPreset) => void;
}

export const SEOContentAndFAQ: React.FC<SEOContentAndFAQProps> = ({ onSelectTool }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does ExactSize compress images to an exact KB size?',
      a: 'Unlike generic online image compressors that only have a vague "low/medium/high" slider, ExactSize uses a client-side binary search algorithm. It repeatedly tests compression quality matrices and dimensions against your specified byte cap in memory, guaranteeing your resulting file matches or stays just below your requested size (such as 50KB, 100KB, or 200KB).',
    },
    {
      q: 'Why are my files safer when processed in the browser?',
      a: 'Most file compression websites upload your sensitive photos, IDs, tax slips, and PDF contracts to third-party cloud servers. ExactSize executes all image canvas processing and PDF stream optimization directly in your browser using Web APIs. Your files never travel across the network, making it 100% compliant with strict confidentiality and privacy standards.',
    },
    {
      q: 'What should I do if an exam or visa portal strictly requires under 100KB or 50KB?',
      a: 'Government portals (such as UPSC, SSC, US Visa DS-160, DV Lottery, and Schengen Visa systems) frequently reject uploads exceeding 50KB, 100KB, or 200KB by even a single byte. Select the corresponding 50KB or 100KB preset on ExactSize, drop your photo or signature scan, and download the pre-calibrated file instantly.',
    },
    {
      q: 'Will compressing my image reduce the visual clarity or readability?',
      a: 'ExactSize is engineered to preserve maximum perceptual clarity. It first optimizes file compression tables without resizing pixels. If your chosen target is exceptionally compact relative to the original image (e.g., taking an 8MB camera photo down to 50KB), it automatically applies smooth bicubic canvas downsampling to maintain readable text and sharp edges.',
    },
    {
      q: 'Which image and document formats are supported?',
      a: 'You can compress JPG, JPEG, PNG, and WebP raster images, as well as multi-page PDF documents. The output is formatted with clean headers and standard extensions suitable for immediate upload anywhere.',
    },
    {
      q: 'Can every PDF always be compressed to an exact target size (e.g. 100KB or 300KB)?',
      a: 'Not always. Unlike raster images which can be continuously downscaled and re-encoded at custom quality factors, PDF documents are complex containers combining text streams, embedded vector curves, font subsets, and pre-compressed images. While ExactSize strips redundant metadata and compacts internal object streams, documents with high-resolution pre-compressed scans or dense vector illustrations cannot be compressed below their native stream sizes without omitting content. ExactSize performs strict byte-for-byte validation and will explicitly inform you if a target was not reached so you can select a suitable larger target or try stronger compression.',
    },
  ];

  return (
    <section className="w-full py-16">
      {/* Informative Article & Portal Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-200/60 dark:border-indigo-900/60">
            <Award className="w-3.5 h-3.5" />
            <span>Precision Engineering</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
            Why Exact File Size Compression Matters for Portals and Applications
          </h2>

          <div className="text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
            <p>
              When applying for job openings, university admissions, passports, or state exams, upload
              forms almost universally specify rigid constraints: <strong className="text-slate-900 dark:text-white">"File size must be between 20KB and 50KB"</strong> or <strong className="text-slate-900 dark:text-white">"Maximum file size 100KB"</strong>. Submitting a file that is 101KB results in an immediate upload error, while reducing it manually in generic graphics software often turns text unreadable.
            </p>
            <p>
              ExactSize is an in-browser <strong>image compressor</strong> and <strong>PDF compressor</strong> designed to hit the exact target size you need without guess-work:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Popular Image Compression Targets
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => onSelectTool('image', '100KB')}
                    className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
                  >
                    compress image to 100KB
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => onSelectTool('image', '200KB')}
                    className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
                  >
                    compress image to 200KB
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => onSelectTool('image', '300KB')}
                    className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
                  >
                    compress image to 300KB
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40">
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Popular PDF Compression Targets
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => onSelectTool('pdf', '100KB')}
                    className="text-rose-600 dark:text-rose-400 font-semibold underline hover:text-rose-700"
                  >
                    compress PDF to 100KB
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => onSelectTool('pdf', '200KB')}
                    className="text-rose-600 dark:text-rose-400 font-semibold underline hover:text-rose-700"
                  >
                    compress PDF to 200KB
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => onSelectTool('pdf', '300KB')}
                    className="text-rose-600 dark:text-rose-400 font-semibold underline hover:text-rose-700"
                  >
                    compress PDF to 300KB
                  </button>
                </div>
              </div>
            </div>
            <p>
              Whether you need to <strong>compress image to exact size</strong> for a passport portal or use our client-side <strong>PDF compressor to exact size</strong> for academic submissions, all calculations execute locally on your device with complete confidentiality.
            </p>
          </div>
        </div>

        {/* Portal Use Cases Callout Box */}
        <div className="rounded-3xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-500" />
              Common Strict Target Standards
            </h3>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5">
              <li className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                <span>Government ID &amp; Passport</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">50KB – 100KB</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                <span>Visa Applications (DS-160)</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">&lt; 240KB</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                <span>Job Portals &amp; Resumes</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">200KB – 500KB</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                <span>Academic Journals &amp; Papers</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">1MB max</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Email Attachments</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">500KB – 1MB</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-700 text-[11px] text-slate-400">
            ExactSize performs real-time byte verification in your browser without remote server delays.
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden brand-soft-shadow transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
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
      </div>
    </section>
  );
};
