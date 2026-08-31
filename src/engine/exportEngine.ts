import { toCanvas } from 'html-to-image';
import { CardState } from '../types/card';
import { getEmbeddableFontCSS } from './fontEmbedder';

function drawRoundedImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.save();
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.rect(x, y, width, height);
  }
  ctx.clip();
  ctx.drawImage(image, x, y, width, height);
  ctx.restore();
}

export async function downloadDualPrintSheet(
  frontElement: HTMLElement,
  backElement: HTMLElement,
  state: CardState
): Promise<void> {
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const fontEmbedCSS = await getEmbeddableFontCSS(state);

    const frontBg = state.backgroundColor || '#FAF7EB';
    const backBg = state.back?.backgroundColor || state.backgroundColor || '#FAF7EB';

    const [frontCanvas, backCanvas] = await Promise.all([
      toCanvas(frontElement, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: frontBg,
        fontEmbedCSS: fontEmbedCSS || undefined,
      }),
      toCanvas(backElement, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: backBg,
        fontEmbedCSS: fontEmbedCSS || undefined,
      }),
    ]);

    if (!frontCanvas || !backCanvas || frontCanvas.width === 0 || backCanvas.width === 0) {
      throw new Error('Canvas rendering produced empty output');
    }

    const cardW = frontCanvas.width;
    const cardH = frontCanvas.height;
    const padding = 80;
    const gap = 50;
    const cornerRadius = (state.cardRadius || 16) * 2; // pixelRatio 2

    const sheetCanvas = document.createElement('canvas');
    sheetCanvas.width = cardW * 2 + padding * 2 + gap;
    sheetCanvas.height = cardH + padding * 2 + 70;

    const ctx = sheetCanvas.getContext('2d');
    if (!ctx) throw new Error('Could not obtain 2D canvas context');

    // Clean sheet paper background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);

    // Header info
    ctx.fillStyle = '#212121';
    ctx.font = 'bold 26px "Space Mono", monospace, sans-serif';
    ctx.fillText('HOLYPERFORMATIVE', padding, 50);

    ctx.font = '14px "Space Mono", monospace, sans-serif';
    ctx.fillStyle = '#616161';
    ctx.fillText('CR80 Standard (85.60 × 53.98 mm) • High-Res Dual Cutout', padding, 74);

    const frontX = padding;
    const frontY = padding + 20;
    const backX = padding + cardW + gap;
    const backY = padding + 20;

    // Draw Front & Back Cards with precise background and corner radius
    drawRoundedImage(ctx, frontCanvas, frontX, frontY, cardW, cardH, cornerRadius);
    drawRoundedImage(ctx, backCanvas, backX, backY, cardW, cardH, cornerRadius);

    // Draw Dashed Cutout Outlines
    ctx.save();
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);

    if (typeof ctx.roundRect === 'function') {
      ctx.beginPath();
      ctx.roundRect(frontX - 2, frontY - 2, cardW + 4, cardH + 4, cornerRadius + 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(backX - 2, backY - 2, cardW + 4, cardH + 4, cornerRadius + 2);
      ctx.stroke();
    } else {
      ctx.strokeRect(frontX - 2, frontY - 2, cardW + 4, cardH + 4);
      ctx.strokeRect(backX - 2, backY - 2, cardW + 4, cardH + 4);
    }
    ctx.restore();

    // Labels
    ctx.font = 'bold 16px "Space Mono", monospace, sans-serif';
    ctx.fillStyle = '#212121';
    ctx.fillText('▲ [FRONT CARD]', frontX, frontY + cardH + 32);
    ctx.fillText('▲ [BACK CARD]', backX, backY + cardH + 32);

    return new Promise((resolve, reject) => {
      sheetCanvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create sheet blob'));
          return;
        }

        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = (state.name || 'id_card').toLowerCase().replace(/[^a-z0-9]/g, '_');
        link.download = `${filename}_print_sheet.png`;
        link.href = objectUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
        resolve();
      }, 'image/png', 1.0);
    });
  } catch (err) {
    console.error('Error generating print sheet:', err);
    throw err;
  }
}
