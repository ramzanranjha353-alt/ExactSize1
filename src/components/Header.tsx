import React, { useState } from 'react';
import { ShieldCheck, Moon, Sun, ChevronDown, Menu, X, Image as ImageIcon, FileText, Check } from 'lucide-react';
import { FileType, TargetPreset } from '../types';

interface HeaderProps {
  darkMode: boolean;
  currentPath: string;
  onToggleDarkMode: () => void;
  onNavigateHome: () => void;
  onNavigateSlug: (slug: string) => void;
  onOpenSection: (sectionId: string) => void;
  onOpenInfoModal: (type: 'about' | 'privacy' | 'terms' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  currentPath,
  onToggleDarkMode,
  onNavigateHome,
  onNavigateSlug,
  onOpenSection,
  onOpenInfoModal,
}) => {
  const [imageMenuOpen, setImageMenuOpen] = useState(false);
  const [pdfMenuOpen, setPdfMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const imagePresets: { preset: TargetPreset; slug: string }[] = [
    { preset: '50KB', slug: '/compress-image-to-50kb' },
    { preset: '100KB', slug: '/compress-image-to-100kb' },
    { preset: '200KB', slug: '/compress-image-to-200kb' },
    { preset: '300KB', slug: '/compress-image-to-300kb' },
    { preset: '500KB', slug: '/compress-image-to-500kb' },
    { preset: '1MB', slug: '/compress-image-to-1mb' },
  ];

  const pdfPresets: { preset: TargetPreset; slug: string }[] = [
    { preset: '100KB', slug: '/compress-pdf-to-100kb' },
    { preset: '200KB', slug: '/compress-pdf-to-200kb' },
    { preset: '300KB', slug: '/compress-pdf-to-300kb' },
    { preset: '500KB', slug: '/compress-pdf-to-500kb' },
    { preset: '1MB', slug: '/compress-pdf-to-1mb' },
  ];

  const handleToolClick = (slug: string) => {
    setImageMenuOpen(false);
    setPdfMenuOpen(false);
    setMobileMenuOpen(false);
    onNavigateSlug(slug);
  };

  const isHome = currentPath === '/' || currentPath === '';
  const isImageCategory = currentPath.startsWith('/compress-image');
  const isPdfCategory = currentPath.startsWith('/compress-pdf');

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            >
              <div className="w-10 h-10 rounded-xl brand-gradient-bg p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600"></div>
                  <div className="relative font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-purple-600 text-xl font-sans tracking-tight">
                    E
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5">
                  Exact<span className="text-blue-600 dark:text-blue-400">Size</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:inline">
                  Get your files to the size you need.
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-600 dark:text-slate-300">
            {/* Home Link with active indicator */}
            <button
              onClick={onNavigateHome}
              className={`px-3.5 py-2 font-semibold relative transition-colors ${
                isHome
                  ? "text-blue-600 dark:text-blue-400 after:content-[''] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400"
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-lg'
              }`}
            >
              Home
            </button>

            {/* Image Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setImageMenuOpen(true)}
              onMouseLeave={() => setImageMenuOpen(false)}
            >
              <button
                onClick={() => setImageMenuOpen(!imageMenuOpen)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg transition-colors ${
                  isImageCategory
                    ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/60 dark:bg-blue-950/30'
                    : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Image Tools</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {imageMenuOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 brand-soft-shadow">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Preset Image Targets
                    </div>
                    {imagePresets.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => handleToolClick(item.slug)}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                          currentPath === item.slug
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                            : 'hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                          Compress Image to {item.preset}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">JPG/PNG</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PDF Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPdfMenuOpen(true)}
              onMouseLeave={() => setPdfMenuOpen(false)}
            >
              <button
                onClick={() => setPdfMenuOpen(!pdfMenuOpen)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg transition-colors ${
                  isPdfCategory
                    ? 'text-rose-600 dark:text-rose-400 font-bold bg-rose-50/60 dark:bg-rose-950/30'
                    : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>PDF Tools</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {pdfMenuOpen && (
                <div className="absolute top-full left-0 w-60 pt-2 z-50">
                  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 brand-soft-shadow">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Preset PDF Targets
                    </div>
                    {pdfPresets.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => handleToolClick(item.slug)}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                          currentPath === item.slug
                            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold'
                            : 'hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-rose-500" />
                          Compress PDF to {item.preset}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">PDF</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* How It Works Link */}
            <button
              onClick={() => onOpenSection('how-it-works')}
              className="px-3.5 py-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              How It Works
            </button>

            {/* About Link */}
            <button
              onClick={() => onOpenInfoModal('about')}
              className="px-3.5 py-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              About
            </button>
          </nav>

          {/* Right Zone: Theme Toggle & Fast & Secure Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs font-semibold text-emerald-700 dark:text-emerald-400 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Fast &amp; Secure</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
              }}
              className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
            >
              Home
            </button>

            <div className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Image Targets
            </div>
            <div className="grid grid-cols-2 gap-1.5 px-2">
              {imagePresets.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleToolClick(item.slug)}
                  className={`text-left px-2.5 py-1.5 rounded text-xs flex items-center gap-1.5 ${
                    currentPath === item.slug
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Check className="w-3 h-3 text-blue-500" />
                  Image to {item.preset}
                </button>
              ))}
            </div>

            <div className="pt-2 pb-1 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              PDF Targets
            </div>
            <div className="grid grid-cols-2 gap-1.5 px-2">
              {pdfPresets.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => handleToolClick(item.slug)}
                  className={`text-left px-2.5 py-1.5 rounded text-xs flex items-center gap-1.5 ${
                    currentPath === item.slug
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Check className="w-3 h-3 text-rose-500" />
                  PDF to {item.preset}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSection('how-it-works');
              }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInfoModal('about');
              }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              About ExactSize
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Private</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
