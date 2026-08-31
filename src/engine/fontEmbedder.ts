import { CardState } from '../types/card';

const GOOGLE_FONT_URL_MAP: Record<string, string> = {
  'Cinzel Decorative': 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&display=swap',
  'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  'JetBrains Mono': 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap',
  'Noto Sans KR': 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap',
  'Outfit': 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap',
  'Playball': 'https://fonts.googleapis.com/css2?family=Playball&display=swap',
  'Press Start 2P': 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
  'Silkscreen': 'https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap',
  'Space Mono': 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
  'UnifrakturMaguntia': 'https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap',
};

const fontEmbedCache = new Map<string, string>();

async function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function fetchAndInlineFontCSS(fontFamily: string): Promise<string> {
  if (fontEmbedCache.has(fontFamily)) {
    return fontEmbedCache.get(fontFamily)!;
  }

  const url = GOOGLE_FONT_URL_MAP[fontFamily];
  if (!url) return '';

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) return '';

    let css = await res.text();
    const matches = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)];
    const fontUrls = [...new Set(matches.map(m => m[1]))];

    await Promise.all(
      fontUrls.map(async (fontUrl) => {
        try {
          const fontRes = await fetch(fontUrl);
          if (!fontRes.ok) return;
          const blob = await fontRes.blob();
          const base64DataUri = await convertBlobToBase64(blob);
          css = css.split(fontUrl).join(base64DataUri);
        } catch {
          // fallback to remote URL if individual fetch fails
        }
      })
    );

    fontEmbedCache.set(fontFamily, css);
    return css;
  } catch (err) {
    console.warn(`Failed to inline font: ${fontFamily}`, err);
    return '';
  }
}

export function extractUsedFonts(state: CardState): string[] {
  const fontSet = new Set<string>();

  fontSet.add('Space Mono');
  fontSet.add('Inter');

  if (state.typography?.primaryFont) fontSet.add(state.typography.primaryFont);
  if (state.typography?.metaFont) fontSet.add(state.typography.metaFont);
  if (state.typography?.headerFont) fontSet.add(state.typography.headerFont);
  if (state.brandLogo?.fontFamily) fontSet.add(state.brandLogo.fontFamily);
  if (state.back?.bigLogoFont) fontSet.add(state.back.bigLogoFont);

  if (state.fields?.signature) {
    fontSet.add('Playball');
  }

  if (state.stickers) {
    for (const s of state.stickers) {
      if (s.type === 'custom-text' && s.fontFamily) {
        fontSet.add(s.fontFamily);
      }
    }
  }

  return Array.from(fontSet);
}

export async function getEmbeddableFontCSS(state: CardState): Promise<string> {
  const fonts = extractUsedFonts(state);
  const cssBlocks = await Promise.all(fonts.map(font => fetchAndInlineFontCSS(font)));
  return cssBlocks.filter(Boolean).join('\n');
}

export function preloadAllCardFonts(): void {
  const allFonts = Object.keys(GOOGLE_FONT_URL_MAP);
  allFonts.forEach(font => {
    fetchAndInlineFontCSS(font).catch(() => {});
  });
}
