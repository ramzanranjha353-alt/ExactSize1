import React, { useState } from 'react';
import { X, ShieldCheck, Mail, CheckCircle2, FileText, Send } from 'lucide-react';

interface InfoModalProps {
  type: 'about' | 'privacy' | 'terms' | 'contact' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!type) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setContactSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 brand-soft-shadow border border-slate-200 dark:border-slate-800 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* About Dialog */}
        {type === 'about' && (
          <div>
            <div className="w-12 h-12 rounded-2xl brand-gradient-bg text-white flex items-center justify-center mb-4 shadow-md">
              <span className="font-extrabold text-xl font-sans">E</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              About ExactSize
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-4">
              Get your files to the size you need.
            </p>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              <p>
                ExactSize was built to solve a universal pain point: government portals, job boards,
                and application systems that enforce strict file size caps like 50KB or 100KB, while
                traditional compressors leave you guessing with vague percentage sliders.
              </p>
              <p>
                Our philosophy is simple: <strong className="text-slate-900 dark:text-white">Precision &amp; Privacy</strong>. We believe you should never have to upload personal identity cards, passports, resumes, or financial PDFs to unknown cloud servers just to resize them.
              </p>
              <p>
                ExactSize executes the entire compression and binary calibration loop locally in your
                browser using HTML5 Canvas and WebAssembly stream filters.
              </p>
            </div>
          </div>
        )}

        {/* Privacy Dialog */}
        {type === 'privacy' && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Privacy Architecture &amp; Guarantee
            </h3>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-medium text-xs">
                Zero Server Uploads: All operations occur within your browser sandbox.
              </div>
              <p>
                <strong>No Cloud Storage:</strong> When you drag or select a file, it is read into your browser's local memory via the JavaScript FileReader API. We operate no file intake servers or cloud buckets for compression.
              </p>
              <p>
                <strong>No Tracking or Telemetry:</strong> We do not track document contents, image pixels, or user-identifying data.
              </p>
              <p>
                <strong>Confidential Documents Safe:</strong> You can safely compress passport scans, medical records, tax slips, and legal agreements with full confidence that they never leave your device.
              </p>
            </div>
          </div>
        )}

        {/* Terms Dialog */}
        {type === 'terms' && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Terms of Service
            </h3>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              <p>
                <strong>Free and Open Access:</strong> ExactSize is provided free of charge for both individual and commercial use. No subscription, sign-up, or payment is required.
              </p>
              <p>
                <strong>Client-Side Processing:</strong> ExactSize provides client-side compression tools &quot;as is&quot; without warranties of any kind. You are responsible for inspecting the compressed output before submitting it to third-party institutions.
              </p>
              <p>
                <strong>Acceptable Use:</strong> You may use ExactSize to compress any files for which you hold appropriate rights.
              </p>
            </div>
          </div>
        )}

        {/* Contact Dialog */}
        {type === 'contact' && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Contact ExactSize
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Have a feature request or need support? Send us a quick message.
            </p>

            {contactSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <div className="font-bold">Thank you for reaching out!</div>
                <p>We received your note and will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist with your compression needs?"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl brand-gradient-bg text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
