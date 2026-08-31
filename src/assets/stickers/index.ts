export interface StickerDefinition {
  id: string;
  name: string;
  category: 'starbursts' | 'stamps' | 'barcodes' | 'cyber-y2k' | 'badges';
  svg: string; // SVG path or raw SVG element markup
  defaultScale?: number;
  defaultColor?: string;
}

export const STICKER_LIBRARY: StickerDefinition[] = [
  // New Vintage Stamps & License Badges (from User Ref Images)
  {
    id: 'star-perimeter-cmiyl',
    name: 'Perimeter Star Border (★)',
    category: 'badges',
    defaultColor: '#1E1E1E',
    svg: `<svg viewBox="0 0 540 340" fill="currentColor">
      <text x="35" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="70" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="105" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="140" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="175" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="210" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="245" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="280" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="315" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="350" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="385" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="420" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="455" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="490" y="24" font-size="16" text-anchor="middle">★</text>
      <text x="515" y="24" font-size="16" text-anchor="middle">★</text>

      <text x="35" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="70" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="105" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="140" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="175" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="210" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="245" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="280" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="315" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="350" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="385" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="420" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="455" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="490" y="326" font-size="16" text-anchor="middle">★</text>
      <text x="515" y="326" font-size="16" text-anchor="middle">★</text>

      <text x="24" y="60" font-size="16" text-anchor="middle">★</text>
      <text x="24" y="98" font-size="16" text-anchor="middle">★</text>
      <text x="24" y="136" font-size="16" text-anchor="middle">★</text>
      <text x="24" y="174" font-size="16" text-anchor="middle">★</text>
      <text x="24" y="212" font-size="16" text-anchor="middle">★</text>
      <text x="24" y="250" font-size="16" text-anchor="middle">★</text>
      <text x="24" y="288" font-size="16" text-anchor="middle">★</text>

      <text x="516" y="60" font-size="16" text-anchor="middle">★</text>
      <text x="516" y="98" font-size="16" text-anchor="middle">★</text>
      <text x="516" y="136" font-size="16" text-anchor="middle">★</text>
      <text x="516" y="174" font-size="16" text-anchor="middle">★</text>
      <text x="516" y="212" font-size="16" text-anchor="middle">★</text>
      <text x="516" y="250" font-size="16" text-anchor="middle">★</text>
      <text x="516" y="288" font-size="16" text-anchor="middle">★</text>
    </svg>`
  },
  {
    id: 'cmiyl-green-stamp',
    name: 'Call Me Stamp (Green)',
    category: 'stamps',
    defaultColor: '#4E8E62',
    svg: `<svg viewBox="0 0 170 85" fill="none" stroke="currentColor" stroke-width="2.5">
      <g transform="rotate(-7 85 42)">
        <ellipse cx="85" cy="42" rx="80" ry="36" stroke="currentColor" stroke-width="3" stroke-dasharray="6 3"/>
        <ellipse cx="85" cy="42" rx="74" ry="30" stroke="currentColor" stroke-width="2"/>
        <text x="85" y="38" font-size="14" font-weight="900" fill="currentColor" text-anchor="middle" font-family="'Outfit', 'Space Mono', sans-serif" letter-spacing="1">CALL ME IF</text>
        <text x="85" y="55" font-size="16" font-weight="900" fill="currentColor" text-anchor="middle" font-family="'Outfit', 'Space Mono', sans-serif" letter-spacing="1.5">YOU GET LOST</text>
      </g>
    </svg>`
  },
  {
    id: 'star-row-border',
    name: 'Row of Stars (★)',
    category: 'badges',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 180 20" fill="currentColor">
      <text x="90" y="15" font-size="14" text-anchor="middle" letter-spacing="8">★ ★ ★ ★ ★ ★ ★ ★</text>
    </svg>`
  },
  {
    id: 'fingerprint-stamp',
    name: 'Fingerprint Biometric',
    category: 'stamps',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 60 80" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
      <path d="M30 10 C20 10 12 18 12 30 C12 45 15 60 20 70"/>
      <path d="M30 16 C23 16 17 22 17 32 C17 48 20 62 25 72"/>
      <path d="M30 22 C26 22 22 26 22 34 C22 50 25 64 30 74"/>
      <path d="M30 28 C28 28 26 31 26 36 C26 48 28 58 32 68"/>
      <path d="M30 10 C40 10 48 18 48 30 C48 45 45 60 40 70"/>
      <path d="M30 16 C37 16 43 22 43 32 C43 48 40 62 35 72"/>
      <path d="M30 22 C34 22 38 26 38 34 C38 50 35 64 30 74"/>
      <path d="M30 28 C32 28 34 31 34 36 C34 48 32 58 28 68"/>
    </svg>`
  },
  {
    id: 'paperclip-pin',
    name: 'Paperclip Pin',
    category: 'badges',
    defaultColor: '#9FA3AD',
    svg: `<svg viewBox="0 0 40 80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
      <path d="M12 25 L12 60 C12 68 28 68 28 60 L28 15 C28 8 8 8 8 15 L8 65 C8 76 34 76 34 65 L34 25"/>
    </svg>`
  },
  {
    id: 'certified-round-seal',
    name: 'Certified Blue Seal',
    category: 'stamps',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5">
      <circle cx="50" cy="50" r="44" stroke-dasharray="3 3"/>
      <circle cx="50" cy="50" r="38"/>
      <text x="50" y="42" font-size="9" font-weight="900" fill="currentColor" text-anchor="middle" font-family="sans-serif">CERTIFIED</text>
      <text x="50" y="54" font-size="8" font-weight="bold" fill="currentColor" text-anchor="middle" font-family="monospace">AUTHENTIC RECORD</text>
      <text x="50" y="66" font-size="9" fill="currentColor" text-anchor="middle">★ ★ ★</text>
    </svg>`
  },
  {
    id: 'guaranteed-badge',
    name: 'Guaranteed Label',
    category: 'badges',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 140 32" fill="currentColor">
      <rect x="2" y="2" width="136" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
      <text x="70" y="16" font-size="9" font-weight="900" text-anchor="middle" font-family="monospace">GUARANTEED</text>
      <text x="70" y="24" font-size="6" font-weight="bold" text-anchor="middle" font-family="sans-serif">OFFICIAL STATUS</text>
    </svg>`
  },
  {
    id: 'call-me-stamp',
    name: 'Travel Stamp Oval',
    category: 'stamps',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 150 70" fill="none" stroke="currentColor" stroke-width="2.5">
      <ellipse cx="75" cy="35" rx="70" ry="30" stroke-dasharray="4 3"/>
      <ellipse cx="75" cy="35" rx="64" ry="25"/>
      <text x="75" y="32" font-size="9" font-weight="900" fill="currentColor" text-anchor="middle" font-family="sans-serif">CALL ME IF</text>
      <text x="75" y="45" font-size="10" font-weight="900" fill="currentColor" text-anchor="middle" font-family="sans-serif">YOU GET LOST</text>
    </svg>`
  },

  // Starbursts & Sparkles
  {
    id: 'cyber-starburst-8',
    name: 'Cyber 8-Point Star',
    category: 'starbursts',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><polygon points="50,0 62,38 100,50 62,62 50,100 38,62 0,50 38,38"/></svg>`
  },
  {
    id: 'sparkle-4',
    name: 'Y2K Sparkle',
    category: 'starbursts',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 Z"/></svg>`
  },
  {
    id: 'stipple-sun-burst',
    name: 'Stipple Sun Flare',
    category: 'starbursts',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3">
      <circle cx="50" cy="50" r="22" stroke-dasharray="4 3"/>
      <circle cx="50" cy="50" r="14"/>
      <path d="M50 5 L50 25 M50 75 L50 95 M5 50 L25 50 M75 50 L95 50 M18 18 L32 32 M68 68 L82 82 M18 82 L32 68 M68 32 L82 18"/>
    </svg>`
  },

  // Stamps & Seals
  {
    id: 'heart-stamp-seal',
    name: 'Heart Ink Stamp',
    category: 'stamps',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4">
      <path d="M50 82 C20 58 10 40 10 26 C10 14 20 8 32 8 C40 8 46 14 50 20 C54 14 60 8 68 8 C80 8 90 14 90 26 C90 40 80 58 50 82 Z" stroke-dasharray="6 3"/>
      <path d="M50 68 C30 50 24 36 24 26 C24 18 30 14 38 14 C44 14 48 18 50 22 C52 18 56 14 62 14 C70 14 76 18 76 26 C76 36 70 50 50 68 Z" fill="currentColor" fill-opacity="0.15"/>
    </svg>`
  },

  // Barcodes & ID Codes
  {
    id: 'classic-barcode',
    name: 'Code 128 Barcode',
    category: 'barcodes',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 160 50" fill="currentColor">
      <rect x="0" y="0" width="4" height="40"/>
      <rect x="7" y="0" width="2" height="40"/>
      <rect x="12" y="0" width="6" height="40"/>
      <rect x="22" y="0" width="2" height="40"/>
      <rect x="27" y="0" width="5" height="40"/>
      <rect x="36" y="0" width="3" height="40"/>
      <rect x="42" y="0" width="7" height="40"/>
      <rect x="52" y="0" width="2" height="40"/>
      <rect x="57" y="0" width="4" height="40"/>
      <rect x="65" y="0" width="8" height="40"/>
      <rect x="76" y="0" width="3" height="40"/>
      <rect x="83" y="0" width="2" height="40"/>
      <rect x="88" y="0" width="6" height="40"/>
      <rect x="98" y="0" width="4" height="40"/>
      <rect x="106" y="0" width="2" height="40"/>
      <rect x="111" y="0" width="7" height="40"/>
      <rect x="122" y="0" width="3" height="40"/>
      <rect x="128" y="0" width="5" height="40"/>
      <rect x="137" y="0" width="3" height="40"/>
      <rect x="144" y="0" width="6" height="40"/>
      <rect x="154" y="0" width="3" height="40"/>
      <text x="80" y="49" font-size="8" font-family="monospace" text-anchor="middle">2207-2204-0507</text>
    </svg>`
  },

  // Cyber Connectors
  {
    id: 'connector-pin-line',
    name: 'Connector Nodes Line',
    category: 'cyber-y2k',
    defaultColor: '#3C3E4A',
    svg: `<svg viewBox="0 0 160 24" fill="currentColor">
      <circle cx="12" cy="12" r="5"/>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <line x1="20" y1="12" x2="60" y2="12" stroke="currentColor" stroke-width="2"/>
      <circle cx="68" cy="12" r="4"/>
      <line x1="76" y1="12" x2="116" y2="12" stroke="currentColor" stroke-width="2"/>
      <circle cx="124" cy="12" r="4"/>
      <line x1="132" y1="12" x2="152" y2="12" stroke="currentColor" stroke-width="2"/>
      <circle cx="152" cy="12" r="3"/>
    </svg>`
  }
];
