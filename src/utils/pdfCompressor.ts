import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { CompressionResult, CompressionStatus, PdfCompressionMode, ProcessingStage } from '../types';
import { formatFileSize } from './imageCompressor';

// Configure PDF.js worker
if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  } catch {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CompressionProfile {
  name: string;
  dpi: number;
  scale: number;
  quality: number;
}

// Bounded profiles for Maximum Compression mode from high fidelity down to lowest legible threshold
export const PDF_PROFILES: CompressionProfile[] = [
  { name: '144 DPI (High Fidelity)', dpi: 144, scale: 2.0, quality: 0.82 },
  { name: '120 DPI (Balanced High)', dpi: 120, scale: 1.66, quality: 0.76 },
  { name: '100 DPI (Standard)', dpi: 100, scale: 1.38, quality: 0.70 },
  { name: '90 DPI (Medium)', dpi: 90, scale: 1.25, quality: 0.65 },
  { name: '75 DPI (Compact)', dpi: 75, scale: 1.04, quality: 0.55 },
  { name: '72 DPI (Standard Web)', dpi: 72, scale: 1.0, quality: 0.48 },
  { name: '65 DPI (Maximum Savings)', dpi: 65, scale: 0.90, quality: 0.42 },
  { name: '55 DPI (Minimum Legible)', dpi: 55, scale: 0.76, quality: 0.36 },
];

/**
 * Main entry point for browser-side PDF compression.
 * Dispatches to Balanced mode (metadata & object stream deflating) or
 * Maximum mode (canvas page rendering, JPEG stream optimization, and PDF reconstruction).
 */
export async function compressPdfToTarget(
  file: File,
  targetBytes: number,
  mode: PdfCompressionMode = 'maximum',
  onStageChange?: (stage: ProcessingStage, info?: string) => void
): Promise<CompressionResult> {
  if (mode === 'balanced') {
    return compressPdfBalanced(file, targetBytes, onStageChange);
  } else {
    return compressPdfMaximum(file, targetBytes, onStageChange);
  }
}

/**
 * 1. BALANCED COMPRESSION
 * - Preserves selectable text, vectors, hyperlinks, and document structure.
 * - Cleans redundant metadata headers and unused object dictionaries.
 * - Packs indirect objects into compressed Flate streams (PDF 1.5 object streams).
 */
async function compressPdfBalanced(
  file: File,
  targetBytes: number,
  onStageChange?: (stage: ProcessingStage, info?: string) => void
): Promise<CompressionResult> {
  const startTime = performance.now();

  onStageChange?.('analyzing', 'Analyzing PDF structure and streams');
  await sleep(150);

  const arrayBuffer = await file.arrayBuffer();

  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      updateMetadata: false,
    });

    const pageCount = pdfDoc.getPageCount();

    onStageChange?.('optimizing', 'Optimizing metadata & object streams');
    await sleep(180);

    // Minimize metadata safely
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('ExactSize Balanced Engine');
    pdfDoc.setCreator('ExactSize');

    onStageChange?.('building', 'Packing compressed object streams');
    await sleep(150);

    // Save with maximum object streams and compact stream serialization
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      objectsPerTick: 40,
    });

    onStageChange?.('checking', 'Verifying target size');
    await sleep(120);

    let finalBlob = new Blob([compressedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    let finalSize = finalBlob.size;

    // Never output a file larger than the original
    if (finalSize >= file.size) {
      finalBlob = file;
      finalSize = file.size;
    }

    const isUnderTarget = finalSize <= targetBytes;
    const rawSavings = ((file.size - finalSize) / file.size) * 100;
    const savedPercent = file.size > finalSize ? Math.max(0, rawSavings) : 0;

    let status: CompressionStatus;
    let statusTitle: string;
    let statusMessage: string;

    const targetLabelSimple =
      targetBytes >= 1024 * 1024
        ? `${Number((targetBytes / (1024 * 1024)).toFixed(2))}MB`
        : `${Math.round(targetBytes / 1024)}KB`;

    if (isUnderTarget) {
      status = 'success';
      statusTitle = 'Target reached';
      statusMessage = `Verified output is ${formatFileSize(finalSize)}, meeting your limit of ${formatFileSize(targetBytes)} while preserving all selectable text and vector layers.`;
    } else {
      status = savedPercent >= 1.0 ? 'partial' : 'no_reduction';
      statusTitle = 'Target not reached';
      statusMessage = `Preserving selectable text and vector layers limited reduction to ${formatFileSize(finalSize)}. To reach ${targetLabelSimple}, switch to Maximum Compression to rasterize and compress page images.`;
    }

    onStageChange?.('finalizing', 'Finalizing file');
    await sleep(80);
    onStageChange?.('complete');

    const downloadUrl = URL.createObjectURL(finalBlob);
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const outFileName = `${baseName}_balanced_${targetLabelSimple}.pdf`;

    return {
      originalFile: file,
      originalSize: file.size,
      compressedSize: finalSize,
      targetSize: targetBytes,
      compressedBlob: finalBlob,
      downloadUrl,
      fileName: outFileName,
      durationMs: Math.round(performance.now() - startTime),
      savedPercent,
      isUnderTarget,
      status,
      statusTitle,
      statusMessage,
      compressionMode: 'balanced',
      profileDetails: 'Selectable Text & Vectors Preserved',
      canTryStrongerPdf: !isUnderTarget,
      pageCount,
    };
  } catch (err: unknown) {
    console.error('Balanced PDF compression error:', err);
    onStageChange?.('complete');

    const isUnderTarget = file.size <= targetBytes;
    const targetLabelSimple =
      targetBytes >= 1024 * 1024
        ? `${Number((targetBytes / (1024 * 1024)).toFixed(2))}MB`
        : `${Math.round(targetBytes / 1024)}KB`;

    return {
      originalFile: file,
      originalSize: file.size,
      compressedSize: file.size,
      targetSize: targetBytes,
      compressedBlob: file,
      downloadUrl: URL.createObjectURL(file),
      fileName: file.name,
      durationMs: Math.round(performance.now() - startTime),
      savedPercent: 0,
      isUnderTarget,
      status: isUnderTarget ? 'success' : 'no_reduction',
      statusTitle: isUnderTarget ? 'Target reached' : 'Target not reached',
      statusMessage: isUnderTarget
        ? `Original file is already ${formatFileSize(file.size)}, which is within your limit of ${formatFileSize(targetBytes)}.`
        : `This PDF could not be reduced to ${targetLabelSimple} in Balanced mode. Try Maximum Compression.`,
      compressionMode: 'balanced',
      profileDetails: 'Vector & Text Preserved',
      canTryStrongerPdf: true,
    };
  }
}

/**
 * 2. MAXIMUM COMPRESSION
 * - Real rasterization and re-encoding pipeline.
 * - Renders each PDF page in the browser using PDF.js at a calibrated DPI.
 * - Converts rendered pages to compressed JPEG images via HTML5 Canvas.
 * - Reconstructs a clean, optimized PDF from the encoded page images using pdf-lib.
 * - Iteratively searches profiles until output bytes <= targetBytes or minimum acceptable quality is reached.
 */
async function compressPdfMaximum(
  file: File,
  targetBytes: number,
  onStageChange?: (stage: ProcessingStage, info?: string) => void
): Promise<CompressionResult> {
  const startTime = performance.now();

  onStageChange?.('analyzing', 'Reading document pages & dimensions');
  await sleep(100);

  const arrayBuffer = await file.arrayBuffer();

  try {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
      cMapPacked: true,
    });

    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;

    if (numPages === 0) {
      throw new Error('PDF has 0 pages.');
    }

    // Step 1: Calculate target bytes per page and select starting profile
    const targetPerPage = targetBytes / numPages;
    let profileIndex = 0;

    if (targetPerPage >= 250 * 1024) {
      profileIndex = 0; // 144 DPI
    } else if (targetPerPage >= 140 * 1024) {
      profileIndex = 1; // 120 DPI
    } else if (targetPerPage >= 80 * 1024) {
      profileIndex = 2; // 100 DPI
    } else if (targetPerPage >= 50 * 1024) {
      profileIndex = 3; // 90 DPI
    } else if (targetPerPage >= 30 * 1024) {
      profileIndex = 4; // 75 DPI
    } else if (targetPerPage >= 18 * 1024) {
      profileIndex = 5; // 72 DPI
    } else {
      profileIndex = 6; // 65 DPI
    }

    let bestPdfBytes: Uint8Array | null = null;
    let bestProfile: CompressionProfile = PDF_PROFILES[profileIndex];
    let smallestSizeFound = Infinity;
    let smallestPdfBytes: Uint8Array | null = null;
    let smallestProfile = PDF_PROFILES[PDF_PROFILES.length - 1];

    // Search loop: Try profiles progressively until resultBytes <= targetBytes or minimum quality reached
    while (profileIndex < PDF_PROFILES.length) {
      const currentProfile = PDF_PROFILES[profileIndex];

      onStageChange?.(
        'rendering',
        `Rendering ${numPages} page${numPages > 1 ? 's' : ''} at ${currentProfile.dpi} DPI`
      );

      // Render each page to compressed JPEG image
      interface PageImageRecord {
        jpegBytes: Uint8Array;
        widthPt: number;
        heightPt: number;
      }
      const pageRecords: PageImageRecord[] = [];

      for (let p = 1; p <= numPages; p++) {
        const page = await pdfDoc.getPage(p);
        const baseViewport = page.getViewport({ scale: 1.0 });
        const renderViewport = page.getViewport({ scale: currentProfile.scale });

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.floor(renderViewport.width));
        canvas.height = Math.max(1, Math.floor(renderViewport.height));

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) throw new Error('Canvas 2D context unavailable');

        // Fill background white
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({
          canvasContext: ctx,
          viewport: renderViewport,
        }).promise;

        onStageChange?.(
          'optimizing',
          `Optimizing page ${p} of ${numPages} (Quality: ${Math.round(currentProfile.quality * 100)}%)`
        );

        // Convert canvas to JPEG blob
        const jpegBlob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error('Canvas toBlob failed'));
            },
            'image/jpeg',
            currentProfile.quality
          );
        });

        const jpegBuf = await jpegBlob.arrayBuffer();
        pageRecords.push({
          jpegBytes: new Uint8Array(jpegBuf),
          widthPt: baseViewport.width,
          heightPt: baseViewport.height,
        });

        // Clean canvas
        canvas.width = 0;
        canvas.height = 0;
      }

      onStageChange?.('building', 'Rebuilding optimized PDF document');

      // Rebuild PDF from page images using pdf-lib
      const newPdf = await PDFDocument.create();
      for (const record of pageRecords) {
        const embeddedJpg = await newPdf.embedJpg(record.jpegBytes);
        const newPage = newPdf.addPage([record.widthPt, record.heightPt]);
        newPage.drawImage(embeddedJpg, {
          x: 0,
          y: 0,
          width: record.widthPt,
          height: record.heightPt,
        });
      }

      onStageChange?.('checking', 'Checking file size against target limit');

      const outBytes = await newPdf.save({ useObjectStreams: true });
      const currentSize = outBytes.byteLength;

      if (currentSize < smallestSizeFound) {
        smallestSizeFound = currentSize;
        smallestPdfBytes = outBytes;
        smallestProfile = currentProfile;
      }

      // Check if target is achieved
      if (currentSize <= targetBytes) {
        bestPdfBytes = outBytes;
        bestProfile = currentProfile;
        break; // Target successfully met!
      }

      // Target not yet met: Try stepping down to the next profile
      profileIndex++;
    }

    onStageChange?.('finalizing', 'Finalizing file');
    await sleep(100);

    const chosenBytes = bestPdfBytes || smallestPdfBytes || new Uint8Array(arrayBuffer);
    const chosenProfile = bestPdfBytes ? bestProfile : smallestProfile;

    const finalBlob = new Blob([chosenBytes as unknown as BlobPart], { type: 'application/pdf' });
    const finalSize = finalBlob.size;

    const isUnderTarget = finalSize <= targetBytes;
    const rawSavings = ((file.size - finalSize) / file.size) * 100;
    const savedPercent = file.size > finalSize ? Math.max(0, rawSavings) : 0;

    let status: CompressionStatus;
    let statusTitle: string;
    let statusMessage: string;

    const targetLabelSimple =
      targetBytes >= 1024 * 1024
        ? `${Number((targetBytes / (1024 * 1024)).toFixed(2))}MB`
        : `${Math.round(targetBytes / 1024)}KB`;

    if (isUnderTarget) {
      status = 'success';
      statusTitle = 'Target reached';
      statusMessage = `Verified output is ${formatFileSize(finalSize)}, meeting your limit of ${formatFileSize(targetBytes)}. Optimized at ${chosenProfile.dpi} DPI (Quality ${Math.round(chosenProfile.quality * 100)}%).`;
    } else {
      status = savedPercent >= 1.0 ? 'partial' : 'no_reduction';
      statusTitle = 'Target not reached';
      statusMessage = `The smallest result we could produce without unacceptable quality loss was ${formatFileSize(finalSize)}.`;
    }

    onStageChange?.('complete');

    const downloadUrl = URL.createObjectURL(finalBlob);
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const outFileName = `${baseName}_maximum_${targetLabelSimple}.pdf`;

    return {
      originalFile: file,
      originalSize: file.size,
      compressedSize: finalSize,
      targetSize: targetBytes,
      compressedBlob: finalBlob,
      downloadUrl,
      fileName: outFileName,
      durationMs: Math.round(performance.now() - startTime),
      savedPercent,
      isUnderTarget,
      status,
      statusTitle,
      statusMessage,
      compressionMode: 'maximum',
      profileDetails: `${chosenProfile.dpi} DPI • Quality ${Math.round(chosenProfile.quality * 100)}%`,
      canTryStrongerPdf: false,
      pageCount: numPages,
    };
  } catch (err: unknown) {
    console.error('Maximum PDF compression error:', err);
    onStageChange?.('complete');

    // Fallback to balanced if canvas/pdfjs fails
    return compressPdfBalanced(file, targetBytes, onStageChange);
  }
}
