import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  FileText,
  Settings2,
  CheckCircle2,
  Download,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
  FileCheck,
  Check,
  SlidersHorizontal,
  Info,
  Shield,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FileType, TargetPreset, CompressionResult, ProcessingStage, PdfCompressionMode } from '../types';
import {
  compressImageToTarget,
  PRESET_MAP,
  formatFileSize,
  parseCustomSizeToBytes,
} from '../utils/imageCompressor';
import { compressPdfToTarget } from '../utils/pdfCompressor';

interface CompressorCardProps {
  currentType: FileType;
  currentPreset: TargetPreset;
  onTypeChange: (type: FileType) => void;
  onPresetChange: (preset: TargetPreset) => void;
}

export const CompressorCard: React.FC<CompressorCardProps> = ({
  currentType,
  currentPreset,
  onTypeChange,
  onPresetChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number } | null>(null);
  const [pdfPageCount, setPdfPageCount] = useState<number | null>(null);

  // PDF Compression Mode ('maximum' by default for actual size targeting, or 'balanced')
  const [pdfMode, setPdfMode] = useState<PdfCompressionMode>('maximum');

  // Custom size state
  const [customValueStr, setCustomValueStr] = useState<string>('150');
  const [customUnit, setCustomUnit] = useState<'KB' | 'MB'>('KB');
  const [customError, setCustomError] = useState<string | null>(null);

  // Drag and drop states
  const [isDragging, setIsDragging] = useState(false);
  const [dropError, setDropError] = useState<{ title: string; message: string; action?: { label: string; onClick: () => void } } | null>(null);

  // Processing state & stages
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<ProcessingStage>('idle');
  const [stageDetail, setStageDetail] = useState<string>('');
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [generalError, setGeneralError] = useState<{ title: string; message: string; suggestion?: string } | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Result preview toggle
  const [previewTab, setPreviewTab] = useState<'compressed' | 'original'>('compressed');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const targetSectionRef = useRef<HTMLDivElement>(null);

  // Presets definition
  const imagePresets: TargetPreset[] = ['50KB', '100KB', '200KB', '300KB', '500KB', '1MB', 'custom'];
  const pdfPresets: TargetPreset[] = ['100KB', '200KB', '300KB', '500KB', '1MB', 'custom'];
  const activePresets = currentType === 'image' ? imagePresets : pdfPresets;

  // Resolve target bytes
  const resolveTargetBytes = (): { bytes: number; valid: boolean; label: string } => {
    if (currentPreset === 'custom') {
      const parsed = parseCustomSizeToBytes(customValueStr, customUnit);
      if (!parsed.valid) {
        return { bytes: 100 * 1024, valid: false, label: `${customValueStr} ${customUnit}` };
      }
      return { bytes: parsed.bytes, valid: true, label: `${customValueStr} ${customUnit}` };
    }
    const bytes = PRESET_MAP[currentPreset] || 100 * 1024;
    return { bytes, valid: true, label: currentPreset };
  };

  const { bytes: targetBytes, valid: isTargetValid, label: targetLabel } = resolveTargetBytes();

  // Validate custom input when typing
  useEffect(() => {
    if (currentPreset === 'custom') {
      const parsed = parseCustomSizeToBytes(customValueStr, customUnit);
      if (!parsed.valid) {
        setCustomError(parsed.error || 'Invalid size');
      } else {
        setCustomError(null);
      }
    } else {
      setCustomError(null);
    }
  }, [customValueStr, customUnit, currentPreset]);

  // Clean preview URLs when file changes
  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
      if (result?.downloadUrl) URL.revokeObjectURL(result.downloadUrl);
    };
  }, []);

  const handleFile = (file: File) => {
    setDropError(null);
    setGeneralError(null);
    setResult(null);
    setCurrentStage('idle');
    setDownloadSuccess(false);

    // Validation
    const isImg = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(file.name);
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);

    if (currentType === 'image' && !isImg) {
      if (isPdf) {
        // Auto-switch to PDF
        onTypeChange('pdf');
      } else {
        setDropError({
          title: 'Unsupported image format',
          message: 'Please choose a standard JPG, PNG, or WebP image. Other image types cannot be calibrated in-browser.',
          action: isPdf ? { label: 'Switch to PDF Tool', onClick: () => onTypeChange('pdf') } : undefined,
        });
        return;
      }
    } else if (currentType === 'pdf' && !isPdf) {
      if (isImg) {
        // Auto-switch to Image
        onTypeChange('image');
      } else {
        setDropError({
          title: 'Unsupported document format',
          message: 'Please select a standard PDF document (.pdf). Word files or archives must be saved as PDF first.',
        });
        return;
      }
    }

    // Size limit check
    const maxBytes = currentType === 'image' ? 25 * 1024 * 1024 : 80 * 1024 * 1024;
    if (file.size > maxBytes) {
      setDropError({
        title: 'File exceeds browser memory limit',
        message: `Your file is ${formatFileSize(file.size)}. In-browser processing supports up to ${formatFileSize(maxBytes)} to ensure stable performance on your device.`,
      });
      return;
    }

    setSelectedFile(file);

    // Load preview and dimensions for image
    if (isImg) {
      const url = URL.createObjectURL(file);
      setFilePreview(url);
      const img = new Image();
      img.onload = () => {
        setImageMeta({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        setGeneralError({
          title: 'Corrupted or unreadable image',
          message: 'The browser could not decode this image file. It may be damaged or exported in an unreadable color space.',
          suggestion: 'Try re-saving the image from your photo editor or camera app as standard sRGB JPEG.',
        });
      };
      img.src = url;
      setPdfPageCount(null);
    } else {
      setFilePreview(null);
      setImageMeta(null);
      setPdfPageCount(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Run Compression
  const handleCompress = async (overridePdfMode?: PdfCompressionMode) => {
    if (!selectedFile) return;
    if (!isTargetValid) {
      setGeneralError({
        title: 'Invalid target size',
        message: 'Please specify a target size between 10 KB and 50 MB.',
      });
      return;
    }

    if (overridePdfMode) {
      setPdfMode(overridePdfMode);
    }

    const effectivePdfMode = overridePdfMode || pdfMode;

    setIsProcessing(true);
    setGeneralError(null);
    setResult(null);
    setDownloadSuccess(false);
    setStageDetail('');

    try {
      let res: CompressionResult;
      if (currentType === 'image') {
        res = await compressImageToTarget(selectedFile, targetBytes, (stage) => {
          setCurrentStage(stage);
        });
      } else {
        res = await compressPdfToTarget(
          selectedFile,
          targetBytes,
          effectivePdfMode,
          (stage, info) => {
            setCurrentStage(stage);
            if (info) setStageDetail(info);
          }
        );
        if (res.pageCount) {
          setPdfPageCount(res.pageCount);
        }
      }

      setResult(res);

      // ONLY fire confetti when target size was strictly achieved!
      if (res.compressedSize <= res.targetSize) {
        confetti({
          particleCount: 50,
          spread: 65,
          origin: { y: 0.62 },
          colors: ['#3b82f6', '#10b981', '#6366f1'],
        });
      }
    } catch (err: unknown) {
      console.error(err);
      setGeneralError({
        title: 'Compression could not be completed',
        message: 'A browser memory or processing limit prevented this file from being processed.',
        suggestion: 'Try closing unused browser tabs or reducing the file dimensions before retrying.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setImageMeta(null);
    setPdfPageCount(null);
    setResult(null);
    setDropError(null);
    setGeneralError(null);
    setDownloadSuccess(false);
    setCurrentStage('idle');
    setStageDetail('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleTryDifferentSize = () => {
    setResult(null);
    setDownloadSuccess(false);
    setCurrentStage('idle');
    setStageDetail('');
    setTimeout(() => {
      targetSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  const handleTryLargerTarget = () => {
    if (result) {
      const presetsList = currentType === 'image' ? imagePresets : pdfPresets;
      // Look for the next standard preset that is strictly larger than the compressed result
      const nextPreset = presetsList.find((p) => {
        if (p === 'custom') return false;
        return (PRESET_MAP[p] || 0) > result.compressedSize;
      });

      if (nextPreset) {
        onPresetChange(nextPreset);
      } else {
        // Recommend a realistic custom target with 15% headroom
        const targetBytesSuggested = Math.ceil(result.compressedSize * 1.15);
        if (targetBytesSuggested >= 1024 * 1024) {
          const mbVal = Number((targetBytesSuggested / (1024 * 1024)).toFixed(1));
          setCustomValueStr(`${mbVal}`);
          setCustomUnit('MB');
        } else {
          const kbVal = Math.ceil(targetBytesSuggested / 1024);
          setCustomValueStr(`${kbVal}`);
          setCustomUnit('KB');
        }
        onPresetChange('custom');
      }
    }
    setResult(null);
    setDownloadSuccess(false);
    setCurrentStage('idle');
    setStageDetail('');
    setTimeout(() => {
      targetSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  const handleDownloadClick = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3500);
  };

  // Stage indicator details for PDF vs Image
  const pdfStages: { key: ProcessingStage; label: string }[] = [
    { key: 'analyzing', label: 'Analyzing PDF' },
    { key: 'rendering', label: 'Rendering pages' },
    { key: 'optimizing', label: 'Optimizing images' },
    { key: 'building', label: 'Building PDF' },
    { key: 'checking', label: 'Checking file size' },
    { key: 'finalizing', label: 'Finalizing' },
  ];

  const imageStages: { key: ProcessingStage; label: string }[] = [
    { key: 'preparing', label: 'Preparing file' },
    { key: 'analyzing', label: 'Analyzing content' },
    { key: 'optimizing', label: 'Optimizing' },
    { key: 'verifying', label: 'Checking target size' },
    { key: 'finalizing', label: 'Finalizing' },
  ];

  const stages = currentType === 'pdf' ? pdfStages : imageStages;

  const getStageIndex = (stage: ProcessingStage): number => {
    if (stage === 'complete') return stages.length;
    return stages.findIndex((s) => s.key === stage);
  };

  const currentStageIndex = getStageIndex(currentStage);

  return (
    <div
      role="region"
      aria-label="ExactSize In-Browser File Compressor"
      className="w-full bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 brand-soft-shadow border border-slate-200/80 dark:border-slate-800 transition-colors"
    >
      {/* 1. File Type Tabs (Image / PDF) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-2xl w-full max-w-xs mb-6 mx-auto sm:mx-0">
        <button
          type="button"
          onClick={() => {
            onTypeChange('image');
            if (selectedFile && currentType !== 'image') resetAll();
          }}
          disabled={isProcessing}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 min-h-[44px] text-xs sm:text-sm font-semibold rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
            currentType === 'image'
              ? 'brand-gradient-bg text-white shadow-md shadow-blue-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-selected={currentType === 'image'}
          role="tab"
        >
          <ImageIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Image</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onTypeChange('pdf');
            if (selectedFile && currentType !== 'pdf') resetAll();
          }}
          disabled={isProcessing}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 min-h-[44px] text-xs sm:text-sm font-semibold rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
            currentType === 'pdf'
              ? 'brand-gradient-bg text-white shadow-md shadow-blue-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-selected={currentType === 'pdf'}
          role="tab"
        >
          <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>PDF</span>
        </button>
      </div>

      {/* 2. Drag & Drop Uploader Area */}
      {!selectedFile ? (
        <div>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            aria-label={`Drop your ${currentType === 'image' ? 'image' : 'PDF'} here or choose file`}
            className={`relative border-2 border-dashed rounded-2xl py-10 px-6 sm:px-10 text-center transition-all cursor-pointer select-none group focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
              isDragging
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 scale-[1.01]'
                : dropError
                ? 'border-rose-300 bg-rose-50/40 dark:bg-rose-950/20'
                : 'border-blue-200 dark:border-slate-700 bg-blue-50/25 dark:bg-slate-800/30 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={currentType === 'image' ? 'image/jpeg,image/png,image/webp' : 'application/pdf'}
              className="sr-only"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            {/* Upload Icon */}
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-7 h-7" aria-hidden="true" />
            </div>

            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
              Drop your file here or
            </div>

            {/* Visual Choose File button */}
            <span className="inline-flex items-center gap-2 px-6 py-2.5 min-h-[44px] rounded-xl brand-gradient-bg text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 group-hover:shadow-lg transition-all">
              <UploadCloud className="w-4 h-4" aria-hidden="true" />
              <span>Choose File</span>
            </span>

            <div className="mt-4 text-[11px] font-medium text-slate-400 dark:text-slate-500">
              {currentType === 'image'
                ? 'JPG • PNG • WEBP • (Max 25MB)'
                : 'PDF Documents • (Max 80MB)'}
            </div>
          </div>

          {/* Validation error under dropzone */}
          {dropError && (
            <div
              role="alert"
              className="mt-3 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                <div>
                  <strong className="font-semibold block">{dropError.title}</strong>
                  <span>{dropError.message}</span>
                </div>
              </div>
              {dropError.action && (
                <button
                  type="button"
                  onClick={dropError.action.onClick}
                  className="px-3 py-1 rounded-lg bg-rose-600 text-white font-semibold text-[11px] hover:bg-rose-700 transition-colors shrink-0"
                >
                  {dropError.action.label}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        /* 3. Selected File Display Card */
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 sm:p-5 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Thumbnail / File Icon */}
              <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                {filePreview ? (
                  <img
                    src={filePreview}
                    alt={`Preview of ${selectedFile.name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileText className="w-7 h-7 text-rose-500" aria-hidden="true" />
                )}
              </div>

              {/* File Info */}
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {selectedFile.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {formatFileSize(selectedFile.size)}
                  </span>
                  <span aria-hidden="true">•</span>
                  <span className="uppercase text-[11px] font-mono tracking-wider text-slate-500">
                    {selectedFile.type.replace('image/', '').replace('application/', '') || 'FILE'}
                  </span>
                  {imageMeta && (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>{imageMeta.width}×{imageMeta.height}px</span>
                    </>
                  )}
                  {pdfPageCount && (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>{pdfPageCount} page{pdfPageCount > 1 ? 's' : ''}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Remove / Change File Button */}
            {!isProcessing && (
              <button
                type="button"
                onClick={resetAll}
                className="self-end sm:self-center flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                title="Change or remove file"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Change file</span>
              </button>
            )}
          </div>

          {/* Target Size Indicator */}
          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Target File Size:</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              ~{targetLabel}
            </span>
          </div>

          {/* 6. Processing State (Subtle, professional stage animation) */}
          {isProcessing && (
            <div
              role="status"
              aria-live="polite"
              className="mt-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/60 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Processing in browser...
                  </span>
                </div>
                <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                  Step {Math.min(stages.length, Math.max(1, currentStageIndex + 1))} of {stages.length}
                </span>
              </div>

              {/* Step indicator sequence */}
              <div className="space-y-2">
                {stages.map((stage, idx) => {
                  const isCurrent = currentStage === stage.key;
                  const isPast = currentStageIndex > idx;
                  return (
                    <div
                      key={stage.key}
                      className={`flex items-center gap-3 text-xs transition-all duration-200 ${
                        isCurrent
                          ? 'text-blue-600 dark:text-blue-400 font-bold translate-x-1'
                          : isPast
                          ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                          : 'text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                        {isPast ? (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        ) : isCurrent ? (
                          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                        )}
                      </div>
                      <span>{stage.label}</span>
                    </div>
                  );
                })}
              </div>

              {stageDetail && (
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-blue-600 dark:text-blue-400 truncate">
                  {stageDetail}
                </div>
              )}
            </div>
          )}

          {/* 8. RESULT CARD */}
          {result && !isProcessing && (() => {
            const isTargetReached = Boolean(result.isUnderTarget && result.compressedSize <= result.targetSize);

            return (
              <div
                role="region"
                aria-label="Compression Results"
                className={`mt-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm transition-all ${
                  isTargetReached
                    ? 'border-emerald-200 dark:border-emerald-900/60 shadow-emerald-500/5'
                    : 'border-amber-200 dark:border-amber-900/60 shadow-amber-500/5'
                }`}
              >
                {/* Header Title with Success or Warning State */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isTargetReached
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {isTargetReached ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <h4
                      className={`text-sm font-bold ${
                        isTargetReached
                          ? 'text-emerald-900 dark:text-emerald-200'
                          : 'text-amber-900 dark:text-amber-200'
                      }`}
                    >
                      {isTargetReached ? '✓ Target reached' : '⚠ Target not reached'}
                    </h4>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {result.durationMs}ms
                  </div>
                </div>

                {/* 4-Item Metric Grid: Original, Target, Result, Saved */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                    <div className="text-[11px] text-slate-400 font-medium">Original</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                      {formatFileSize(result.originalSize)}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                    <div className="text-[11px] text-slate-400 font-medium">Target</div>
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                      {formatFileSize(result.targetSize)}
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-xl border ${
                      isTargetReached
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200/70 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200/70 dark:border-amber-900/60 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    <div className="text-[11px] opacity-80 font-medium">Result</div>
                    <div className="text-sm font-bold font-mono mt-0.5">
                      {formatFileSize(result.compressedSize)}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                    <div className="text-[11px] text-slate-400 font-medium">Saved</div>
                    <div
                      className={`text-sm font-bold font-mono mt-0.5 ${
                        result.savedPercent > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-500'
                      }`}
                    >
                      {result.savedPercent.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Mode & Quality/DPI Specification Row */}
                {result.compressionMode && (
                  <div className="mb-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 font-medium">Mode:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                        {result.compressionMode} Compression
                      </span>
                    </div>
                    {result.profileDetails && (
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                        <span>Profile:</span>
                        <span>{result.profileDetails}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Status Notice */}
                {isTargetReached ? (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2 mb-4">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      <strong>Target reached:</strong> Output is {formatFileSize(result.compressedSize)}, meeting your limit of {formatFileSize(result.targetSize)}. Ready for download.
                    </span>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 mb-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                      <div>
                        <strong className="block font-semibold">
                          Target not reached
                        </strong>
                        <p className="mt-0.5 text-amber-800 dark:text-amber-300">
                          {result.statusMessage ||
                            `The smallest result we could produce without unacceptable quality loss was ${formatFileSize(result.compressedSize)}.`}
                        </p>
                      </div>
                    </div>

                    {/* Educational Note on Content-Type Realism (Rule 9) */}
                    <div className="pt-2 border-t border-amber-200/60 dark:border-amber-800/60 text-[11px] text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
                      <strong>Quality Protection:</strong> PDF compression depends heavily on content type. We prevent excessive downsampling so your documents remain legible and printable.
                    </div>
                  </div>
                )}

                {/* Fidelity Preview for Images */}
                {result.previewUrl && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Visual Fidelity Check:
                      </span>
                      <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                        <button
                          type="button"
                          onClick={() => setPreviewTab('compressed')}
                          className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                            previewTab === 'compressed'
                              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                              : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                          }`}
                        >
                          Compressed ({formatFileSize(result.compressedSize)})
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab('original')}
                          className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                            previewTab === 'original'
                              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                              : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                          }`}
                        >
                          Original ({formatFileSize(result.originalSize)})
                        </button>
                      </div>
                    </div>

                    <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-950/60 p-2 flex items-center justify-center max-h-48 overflow-hidden">
                      <img
                        src={previewTab === 'compressed' ? result.previewUrl : filePreview || result.previewUrl}
                        alt="Fidelity preview"
                        className="max-h-44 w-auto object-contain rounded-lg"
                      />
                      {result.compressedDimensions && (
                        <div className="absolute bottom-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-white">
                          {previewTab === 'compressed'
                            ? `${result.compressedDimensions.width}×${result.compressedDimensions.height}px`
                            : imageMeta
                            ? `${imageMeta.width}×${imageMeta.height}px`
                            : ''}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Primary Action Buttons */}
                {isTargetReached ? (
                  /* Green Success State Download */
                  <a
                    href={result.downloadUrl}
                    download={result.fileName}
                    onClick={handleDownloadClick}
                    className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-6 min-h-[48px] rounded-xl font-bold text-sm shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                      downloadSuccess
                        ? 'bg-emerald-700 text-white shadow-emerald-700/30'
                        : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-emerald-600/25'
                    }`}
                  >
                    {downloadSuccess ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
                        <span>Saved to your Downloads folder!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" aria-hidden="true" />
                        <span>Download File ({formatFileSize(result.compressedSize)})</span>
                      </>
                    )}
                  </a>
                ) : (
                  /* Amber / Warning State Actions */
                  <div className="space-y-2.5">
                    {/* If in Balanced mode, offer switching to Maximum mode immediately */}
                    {result.compressionMode === 'balanced' && (
                      <button
                        type="button"
                        onClick={() => handleCompress('maximum')}
                        className="w-full flex items-center justify-center gap-2 py-3 px-5 min-h-[46px] rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
                      >
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        <span>Switch to Maximum Compression (Rasterize &amp; Shrink)</span>
                      </button>
                    )}

                    {/* Secondary CTA: Try a Larger Target */}
                    <button
                      type="button"
                      onClick={handleTryLargerTarget}
                      className="w-full flex items-center justify-center gap-2 py-3 px-5 min-h-[46px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                    >
                      <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                      <span>Try a Larger Target</span>
                    </button>

                    {/* Download Button for Partial Output */}
                    <a
                      href={result.downloadUrl}
                      download={result.fileName}
                      onClick={handleDownloadClick}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 min-h-[42px] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 font-semibold text-xs transition-colors focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:outline-none shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                      <span>Download Optimized {currentType === 'pdf' ? 'PDF' : 'Image'} ({formatFileSize(result.compressedSize)})</span>
                    </a>
                  </div>
                )}

                {/* Secondary Bottom Actions: "Compress Another" & "Try Different Size" */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Compress Another</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTryDifferentSize}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Try Different Size</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* 5. "Compress Now" Action Button (when not yet compressed) */}
          {!result && !isProcessing && (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => handleCompress()}
                disabled={!isTargetValid}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 min-h-[48px] rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>
                  Compress Now to {targetLabel}
                  {currentType === 'pdf' ? ` (${pdfMode === 'maximum' ? 'Maximum' : 'Balanced'})` : ''}
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Global Error Banner */}
      {generalError && (
        <div
          role="alert"
          className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
            <div>
              <strong className="font-semibold block">{generalError.title}</strong>
              <p className="mt-0.5">{generalError.message}</p>
              {generalError.suggestion && (
                <p className="mt-1 text-slate-600 dark:text-slate-400 font-medium">
                  {generalError.suggestion}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PDF Compression Mode Selector */}
      {currentType === 'pdf' && (
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Compression Mode
            </label>
            <span className="text-[11px] text-slate-400 font-medium">
              {pdfMode === 'maximum' ? 'Rasterization Pipeline' : 'Vector & Text Preserved'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setPdfMode('balanced');
                if (result) setResult(null);
              }}
              disabled={isProcessing}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                pdfMode === 'balanced'
                  ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 shadow-xs ring-1 ring-blue-500'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${pdfMode === 'balanced' ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  Balanced
                </span>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  Vector &amp; Text
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Better quality and preserves more PDF features.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setPdfMode('maximum');
                if (result) setResult(null);
              }}
              disabled={isProcessing}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                pdfMode === 'maximum'
                  ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 shadow-xs ring-1 ring-indigo-500'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${pdfMode === 'maximum' ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  Maximum
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  Target-Sized
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Smaller files. Pages may be converted to images.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* 4. Target Size Selector & Presets */}
      <div ref={targetSectionRef} className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 scroll-mt-12">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Target Size
          </label>
          <span className="text-[11px] text-slate-400">
            Target: <strong className="text-blue-600 dark:text-blue-400">{targetLabel}</strong>
          </span>
        </div>

        {/* Preset Button Row */}
        <div className="flex flex-wrap items-center gap-2">
          {activePresets.map((preset) => {
            const isActive = currentPreset === preset;
            const isCustom = preset === 'custom';

            return (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  onPresetChange(preset);
                  if (result) setResult(null); // allow re-running on new preset
                }}
                disabled={isProcessing}
                className={`py-2 px-3.5 sm:px-4 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                  isActive
                    ? 'brand-gradient-bg text-white shadow-md shadow-blue-500/25 scale-102'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                }`}
              >
                {isCustom && <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />}
                <span>{isCustom ? 'Custom' : preset}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Target Size Input (KB / MB with validation) */}
        {currentPreset === 'custom' && (
          <div className="mt-3 p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="custom-target-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Enter target size:
              </label>

              <div className="flex items-center gap-2">
                <input
                  id="custom-target-input"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 150"
                  value={customValueStr}
                  onChange={(e) => {
                    setCustomValueStr(e.target.value);
                    if (result) setResult(null);
                  }}
                  className="w-24 px-3 py-1.5 min-h-[40px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomUnit('KB');
                      if (result) setResult(null);
                    }}
                    className={`px-3 py-1.5 min-h-[40px] transition-colors ${
                      customUnit === 'KB'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    KB
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomUnit('MB');
                      if (result) setResult(null);
                    }}
                    className={`px-3 py-1.5 min-h-[40px] transition-colors ${
                      customUnit === 'MB'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    MB
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Common sizes: 75KB, 150KB, 850KB, 2MB
              </div>
            </div>

            {customError && (
              <div className="mt-2 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{customError}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Honest Local Browser Security Notice */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
          <Shield className="w-3.5 h-3.5" />
          <span>Your files are processed in your browser.</span>
        </span>
        <span className="hidden sm:inline">No server uploads or storage.</span>
      </div>
    </div>
  );
};
