import { CompressionResult, CompressionStatus, ProcessingStage } from '../types';

export const PRESET_MAP: Record<string, number> = {
  '50KB': 50 * 1024,
  '100KB': 100 * 1024,
  '200KB': 200 * 1024,
  '300KB': 300 * 1024,
  '500KB': 500 * 1024,
  '1MB': 1024 * 1024,
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function parseCustomSizeToBytes(
  valueStr: string,
  unit: 'KB' | 'MB'
): { bytes: number; valid: boolean; error?: string } {
  const cleanStr = valueStr.trim().replace(/[^0-9.]/g, '');
  const num = parseFloat(cleanStr);

  if (isNaN(num) || num <= 0) {
    return { bytes: 0, valid: false, error: 'Please enter a positive number.' };
  }

  const multiplier = unit === 'MB' ? 1024 * 1024 : 1024;
  const bytes = Math.round(num * multiplier);

  if (bytes < 10 * 1024) {
    return { bytes, valid: false, error: 'Target size must be at least 10 KB.' };
  }
  if (bytes > 50 * 1024 * 1024) {
    return { bytes, valid: false, error: 'Target size cannot exceed 50 MB.' };
  }

  return { bytes, valid: true };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image into memory'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas blob generation failed'));
      },
      mimeType,
      quality
    );
  });
}

function hasTransparency(img: HTMLImageElement): boolean {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = Math.min(img.naturalWidth, 120);
    canvas.height = Math.min(img.naturalHeight, 120);
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 250) return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function compressImageToTarget(
  file: File,
  targetBytes: number,
  onStageChange?: (stage: ProcessingStage) => void
): Promise<CompressionResult> {
  const startTime = performance.now();

  // Stage 1: Preparing file
  onStageChange?.('preparing');
  await sleep(180);

  const img = await loadImage(file);
  const originalWidth = img.naturalWidth || img.width;
  const originalHeight = img.naturalHeight || img.height;

  // Stage 2: Analyzing content
  onStageChange?.('analyzing');
  await sleep(200);

  // If already under target size, optimize without degrading
  if (file.size <= targetBytes) {
    onStageChange?.('optimizing');
    await sleep(180);
    onStageChange?.('verifying');
    await sleep(150);
    onStageChange?.('complete');

    const url = URL.createObjectURL(file);
    return {
      originalFile: file,
      originalSize: file.size,
      compressedSize: file.size,
      targetSize: targetBytes,
      compressedBlob: file,
      downloadUrl: url,
      fileName: file.name,
      previewUrl: url,
      durationMs: Math.round(performance.now() - startTime),
      savedPercent: 0,
      isUnderTarget: true,
      status: 'success',
      statusTitle: 'Target reached',
      statusMessage: `Original file is already ${formatFileSize(file.size)}, which is below your target limit of ${formatFileSize(targetBytes)}.`,
      originalDimensions: { width: originalWidth, height: originalHeight },
      compressedDimensions: { width: originalWidth, height: originalHeight },
    };
  }

  // Stage 3: Optimizing
  onStageChange?.('optimizing');

  const isPng = file.type === 'image/png';
  const outMime =
    isPng && !hasTransparency(img)
      ? 'image/jpeg'
      : file.type === 'image/webp'
      ? 'image/webp'
      : 'image/jpeg';

  let currentWidth = originalWidth;
  let currentHeight = originalHeight;
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas 2D context not available');

  canvas.width = currentWidth;
  canvas.height = currentHeight;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // White background for converted transparent images
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, currentWidth, currentHeight);
  ctx.drawImage(img, 0, 0, currentWidth, currentHeight);

  let bestBlob: Blob | null = null;
  let minDifference = Infinity;

  // Limit minimum dimension to maintain readable quality
  const minDimension = Math.min(220, Math.min(originalWidth, originalHeight));

  for (let scaleAttempt = 0; scaleAttempt < 5; scaleAttempt++) {
    let lowQ = 0.08;
    let highQ = 0.96;
    let passBestBlob: Blob | null = null;

    // 7 iterations of binary search on quality
    for (let qIter = 0; qIter < 7; qIter++) {
      const midQ = (lowQ + highQ) / 2;
      const testBlob = await canvasToBlob(canvas, outMime, midQ);

      if (testBlob.size <= targetBytes) {
        passBestBlob = testBlob;
        const diff = targetBytes - testBlob.size;
        if (diff < minDifference) {
          minDifference = diff;
          bestBlob = testBlob;
        }
        lowQ = midQ; // Try higher quality
      } else {
        highQ = midQ; // Try lower quality
      }
    }

    if (passBestBlob && passBestBlob.size <= targetBytes) {
      bestBlob = passBestBlob;
      // If within 25% of target, stop downscaling to preserve sharpness
      if (passBestBlob.size >= targetBytes * 0.75) {
        break;
      }
    }

    // Check if we can safely downscale canvas further
    const testLow = await canvasToBlob(canvas, outMime, 0.15);
    if (testLow.size > targetBytes) {
      const ratioEstimate = Math.sqrt(targetBytes / testLow.size) * 0.94;
      const nextScale = Math.max(0.25, Math.min(0.85, ratioEstimate));
      const nextWidth = Math.round(currentWidth * nextScale);
      const nextHeight = Math.round(currentHeight * nextScale);

      // Stop downscaling if resolution would drop below acceptable legibility threshold
      if (nextWidth < minDimension || nextHeight < minDimension) {
        if (!bestBlob) {
          bestBlob = testLow;
        }
        break;
      }

      currentWidth = nextWidth;
      currentHeight = nextHeight;

      canvas = document.createElement('canvas');
      canvas.width = currentWidth;
      canvas.height = currentHeight;
      ctx = canvas.getContext('2d');
      if (!ctx) break;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, currentWidth, currentHeight);
      ctx.drawImage(img, 0, 0, currentWidth, currentHeight);
    } else {
      break;
    }
  }

  // Fallback if no under-target blob was found
  if (!bestBlob) {
    bestBlob = await canvasToBlob(canvas, outMime, 0.12);
  }

  // Stage 4: Checking target size
  onStageChange?.('verifying');
  await sleep(180);

  // Exact Byte Comparison
  const isUnderTarget = bestBlob.size <= targetBytes;

  // Accurate Saved Percentage: ((original - result) / original) * 100
  const rawSavings = ((file.size - bestBlob.size) / file.size) * 100;
  const savedPercent = file.size > bestBlob.size ? Math.max(0, rawSavings) : 0;

  let status: CompressionStatus;
  let statusTitle: string;
  let statusMessage: string;

  if (isUnderTarget) {
    status = 'success';
    statusTitle = 'Target reached';
    statusMessage = `Verified output is ${formatFileSize(bestBlob.size)}, successfully meeting your limit of ${formatFileSize(targetBytes)}.`;
  } else if (savedPercent < 1.0) {
    status = 'no_reduction';
    statusTitle = 'File could not be meaningfully compressed';
    statusMessage = `This image (${formatFileSize(file.size)}) could not be reduced to ${formatFileSize(targetBytes)} without complete loss of image clarity. Try a larger target size.`;
  } else {
    status = 'partial';
    statusTitle = 'Target size not reached';
    statusMessage = `This image was reduced from ${formatFileSize(file.size)} to ${formatFileSize(bestBlob.size)} (${savedPercent.toFixed(1)}% saved), but reaching ${formatFileSize(targetBytes)} would severely degrade visual sharpness. Try a larger target size.`;
  }

  // Stage 5: Complete
  onStageChange?.('complete');
  await sleep(120);

  const downloadUrl = URL.createObjectURL(bestBlob);
  const extension = outMime === 'image/webp' ? 'webp' : 'jpg';
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const targetLabel =
    Math.round(targetBytes / 1024) >= 1024
      ? `${(targetBytes / (1024 * 1024)).toFixed(1)}MB`
      : `${Math.round(targetBytes / 1024)}KB`;
  const outFileName = `${baseName}_compressed_${targetLabel}.${extension}`;

  return {
    originalFile: file,
    originalSize: file.size,
    compressedSize: bestBlob.size,
    targetSize: targetBytes,
    compressedBlob: bestBlob,
    downloadUrl,
    fileName: outFileName,
    previewUrl: downloadUrl,
    durationMs: Math.round(performance.now() - startTime),
    savedPercent,
    isUnderTarget,
    status,
    statusTitle,
    statusMessage,
    originalDimensions: { width: originalWidth, height: originalHeight },
    compressedDimensions: { width: currentWidth, height: currentHeight },
  };
}
