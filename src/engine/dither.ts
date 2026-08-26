import { FilterType } from '../types/card';

// 4x4 Bayer Matrix
const BAYER_4X4 = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5]
].map(row => row.map(v => (v / 16) * 255));

// 8x8 Bayer Matrix
const BAYER_8X8 = [
  [ 0, 32,  8, 40,  2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44,  4, 36, 14, 46,  6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [ 3, 35, 11, 43,  1, 33,  9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47,  7, 39, 13, 45,  5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21]
].map(row => row.map(v => (v / 64) * 255));

/**
 * Applies real-time dithering algorithms to an HTMLImageElement
 */
export function processImageWithFilter(
  image: HTMLImageElement,
  filter: FilterType,
  options: {
    brightness?: number; // -100 to 100
    contrast?: number; // -100 to 100
    ditherScale?: number; // 1, 2, 3, 4
  } = {}
): string {
  const { brightness = 0, contrast = 0, ditherScale = 2 } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return image.src;

  const maxDim = 800;
  let w = image.naturalWidth || image.width || 400;
  let h = image.naturalHeight || image.height || 500;
  
  if (w > maxDim || h > maxDim) {
    const ratio = Math.min(maxDim / w, maxDim / h);
    w = Math.round(w * ratio);
    h = Math.round(h * ratio);
  }

  canvas.width = w;
  canvas.height = h;

  ctx.drawImage(image, 0, 0, w, h);

  if (filter === 'none' && brightness === 0 && contrast === 0) {
    return canvas.toDataURL('image/png');
  }

  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  // 1. Adjust brightness & contrast
  const bFactor = brightness * 1.28;
  const cFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i] + bFactor;
    let g = data[i + 1] + bFactor;
    let b = data[i + 2] + bFactor;

    r = cFactor * (r - 128) + 128;
    g = cFactor * (g - 128) + 128;
    b = cFactor * (b - 128) + 128;

    data[i] = Math.max(0, Math.min(255, r));
    data[i + 1] = Math.max(0, Math.min(255, g));
    data[i + 2] = Math.max(0, Math.min(255, b));
  }

  // 2. Dither Filters Only
  switch (filter) {
    case 'bayer-4x4':
      applyBayerDither(data, w, h, BAYER_4X4, 4, ditherScale);
      break;

    case 'bayer-8x8':
      applyBayerDither(data, w, h, BAYER_8X8, 8, ditherScale);
      break;

    case 'floyd-steinberg':
      applyFloydSteinberg(data, w, h);
      break;

    case 'atkinson':
      applyAtkinson(data, w, h);
      break;

    default:
      break;
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL('image/png');
}

function applyBayerDither(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  matrix: number[][],
  matrixSize: number,
  scale: number
) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const mx = Math.floor((x / scale) % matrixSize);
      const my = Math.floor((y / scale) % matrixSize);
      const threshold = matrix[my][mx];
      const val = lum < threshold ? 0 : 255;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
    }
  }
}

function applyFloydSteinberg(data: Uint8ClampedArray, w: number, h: number) {
  const grayscale = new Float32Array(w * h);
  for (let i = 0; i < data.length; i += 4) {
    grayscale[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const oldVal = grayscale[idx];
      const newVal = oldVal < 128 ? 0 : 255;
      grayscale[idx] = newVal;
      const err = oldVal - newVal;

      if (x + 1 < w) grayscale[idx + 1] += (err * 7) / 16;
      if (x - 1 >= 0 && y + 1 < h) grayscale[idx + w - 1] += (err * 3) / 16;
      if (y + 1 < h) grayscale[idx + w] += (err * 5) / 16;
      if (x + 1 < w && y + 1 < h) grayscale[idx + w + 1] += (err * 1) / 16;
    }
  }

  for (let i = 0; i < grayscale.length; i++) {
    const val = Math.max(0, Math.min(255, grayscale[i]));
    const p = i * 4;
    data[p] = val;
    data[p + 1] = val;
    data[p + 2] = val;
  }
}

function applyAtkinson(data: Uint8ClampedArray, w: number, h: number) {
  const grayscale = new Float32Array(w * h);
  for (let i = 0; i < data.length; i += 4) {
    grayscale[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const oldVal = grayscale[idx];
      const newVal = oldVal < 128 ? 0 : 255;
      grayscale[idx] = newVal;
      const err = (oldVal - newVal) / 8;

      if (x + 1 < w) grayscale[idx + 1] += err;
      if (x + 2 < w) grayscale[idx + 2] += err;
      if (x - 1 >= 0 && y + 1 < h) grayscale[idx + w - 1] += err;
      if (y + 1 < h) grayscale[idx + w] += err;
      if (x + 1 < w && y + 1 < h) grayscale[idx + w + 1] += err;
      if (y + 2 < h) grayscale[idx + 2 * w] += err;
    }
  }

  for (let i = 0; i < grayscale.length; i++) {
    const val = Math.max(0, Math.min(255, grayscale[i]));
    const p = i * 4;
    data[p] = val;
    data[p + 1] = val;
    data[p + 2] = val;
  }
}
