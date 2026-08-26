import { toCanvas } from 'html-to-image';

export async function downloadDualPrintSheet(
  frontElement: HTMLElement,
  backElement: HTMLElement,
  cardName: string
): Promise<void> {
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const renderOptions = {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: 'transparent',
    };

    const [frontCanvas, backCanvas] = await Promise.all([
      toCanvas(frontElement, renderOptions),
      toCanvas(backElement, renderOptions),
    ]);

    if (!frontCanvas || !backCanvas || frontCanvas.width === 0 || backCanvas.width === 0) {
      throw new Error('Canvas rendering produced empty output');
    }

    const cardW = frontCanvas.width;
    const cardH = frontCanvas.height;
    const padding = 80;
    const gap = 50;

    const sheetCanvas = document.createElement('canvas');
    sheetCanvas.width = cardW * 2 + padding * 2 + gap;
    sheetCanvas.height = cardH + padding * 2 + 70;

    const ctx = sheetCanvas.getContext('2d');
    if (!ctx) throw new Error('Could not obtain 2D canvas context');

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);

    ctx.fillStyle = '#212121';
    ctx.font = 'bold 26px "Space Mono", monospace, sans-serif';
    ctx.fillText(`HOLYPERFORMATIVE // ${cardName.toUpperCase()}`, padding, 50);

    ctx.font = '14px "Space Mono", monospace, sans-serif';
    ctx.fillStyle = '#616161';
    ctx.fillText('CR80 Standard (85.60 × 53.98 mm) • High-Res Dual Cutout', padding, 74);

    const frontX = padding;
    const frontY = padding + 20;
    const backX = padding + cardW + gap;
    const backY = padding + 20;

    ctx.drawImage(frontCanvas, frontX, frontY);
    ctx.drawImage(backCanvas, backX, backY);

    ctx.strokeStyle = '#616161';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(frontX - 2, frontY - 2, cardW + 4, cardH + 4);
    ctx.strokeRect(backX - 2, backY - 2, cardW + 4, cardH + 4);

    ctx.setLineDash([]);
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
        link.download = `${cardName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_print_sheet.png`;
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
