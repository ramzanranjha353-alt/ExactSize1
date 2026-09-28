import React from 'react';
import {
  FileText,
  Image as ImageIcon,
  Shield,
  Heart,
  Mail,
  ArrowRight,
} from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateSlug: (slug: string) => void;
  onOpenSection: (sectionId: string) => void;
  onOpenInfoModal: (type: 'about' | 'privacy' | 'terms' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateSlug,
  onOpenSection,
  onOpenInfoModal,
}) => {
  const imageLinks = [
    { label: 'Compress Image to 50KB', slug: '/compress-image-to-50kb' },
    { label: 'Compress Image to 100KB', slug: '/compress-image-to-100kb' },
    { label: 'Compress Image to 200KB', slug: '/compress-image-to-200kb' },
    { label: 'Compress Image to 300KB', slug: '/compress-image-to-300kb' },
    { label: 'Compress Image to 500KB', slug: '/compress-image-to-500kb' },
    { label: 'Compress Image to 1MB', slug: '/compress-image-to-1mb' },
  ];

  const pdfLinks = [
    { label: 'Compress PDF to 100KB', slug: '/compress-pdf-to-100kb' },
    { label: 'Compress PDF to 200KB', slug: '/compress-pdf-to-200kb' },
    { label: 'Compress PDF to 300KB', slug: '/compress-pdf-to-300kb' },
    { label: 'Compress PDF to 500KB', slug: '/compress-pdf-to-500kb' },
    { label: 'Compress PDF to 1MB', slug: '/compress-pdf-to-1mb' },
  ];

  return (
    <footer className="w-full bg-[#0A101D] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Column (spans 2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl brand-gradient-bg p-0.5 shadow-md shadow-blue-500/10">
                <div className="w-full h-full bg-[#0A101D] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-400 text-xl">
                    E
                  </span>
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-white tracking-tight">
                  Exact<span className="text-blue-400">Size</span>
                </div>
                <div className="text-xs text-slate-400">
                  Get your files to the size you need.
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              ExactSize is a browser-based exact file size compression utility. Optimize images and PDFs to precise byte caps without uploading to external servers.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-emerald-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Side In-Browser Processing</span>
            </div>
          </div>

          {/* Column 2: Image Tools Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>Image Compression</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {imageLinks.map((item) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => onNavigateSlug(item.slug)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: PDF Tools Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-rose-400" />
              <span>PDF Compression</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {pdfLinks.map((item) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => onNavigateSlug(item.slug)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Platform & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Platform &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenSection('how-it-works')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('about')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  About ExactSize
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('privacy')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('terms')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal('contact')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ExactSize. All rights reserved. 100% Client-Side In-Browser Processing.
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-1"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-1"
              aria-label="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-1"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-1"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
