export type FileType = 'image' | 'pdf';

export type TargetPreset = '50KB' | '100KB' | '200KB' | '300KB' | '500KB' | '1MB' | 'custom';

export type PdfCompressionMode = 'balanced' | 'maximum';

export type ProcessingStage =
  | 'idle'
  | 'analyzing'
  | 'rendering'
  | 'optimizing'
  | 'building'
  | 'checking'
  | 'finalizing'
  | 'complete'
  | 'preparing'
  | 'verifying';

export type CompressionStatus = 'success' | 'partial' | 'no_reduction' | 'error';

export interface CompressionResult {
  originalFile: File;
  originalSize: number;       // in exact bytes
  compressedSize: number;     // in exact bytes
  targetSize: number;         // in exact bytes
  compressedBlob: Blob;
  downloadUrl: string;
  fileName: string;
  previewUrl?: string;
  durationMs: number;
  savedPercent: number;       // 0 to 100, strictly 0 if result >= original
  isUnderTarget: boolean;     // true if compressedSize <= targetSize
  status: CompressionStatus;  // 'success' | 'partial' | 'no_reduction' | 'error'
  statusTitle: string;
  statusMessage: string;
  compressionMode?: PdfCompressionMode;
  profileDetails?: string;    // e.g. "100 DPI • Quality 70%" or "Vector & Text Preserved"
  canTryStrongerPdf?: boolean;
  isStrongModeApplied?: boolean;
  pageCount?: number;
  originalDimensions?: { width: number; height: number };
  compressedDimensions?: { width: number; height: number };
}
