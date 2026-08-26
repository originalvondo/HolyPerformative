export type FilterType = 
  | 'none'
  | 'bayer-4x4'
  | 'bayer-8x8'
  | 'floyd-steinberg'
  | 'atkinson';

export type FontChoice = 
  | 'Inter'
  | 'Press Start 2P'
  | 'Silkscreen'
  | 'Cinzel Decorative'
  | 'UnifrakturMaguntia'
  | 'Playball'
  | 'JetBrains Mono'
  | 'Space Mono'
  | 'Outfit'
  | 'Noto Sans KR';

export interface CardPhoto {
  url: string;
  filter: FilterType;
  ditherScale: number; // 1 - 4
  brightness: number; // -100 to 100
  contrast: number; // -100 to 100
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  showBorder: boolean;
  visible?: boolean;
}

export interface StickerElement {
  id: string;
  type: 'svg-sticker' | 'barcode' | 'custom-image' | 'qr-code' | 'custom-text';
  content: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color?: string;
  opacity?: number;
  side: 'front' | 'back' | 'both';
  qrUrl?: string;
  fontFamily?: FontChoice;
}

export interface CardBackDesign {
  title: string;
  subtitle?: string;
  quote?: string;
  bigLogoText?: string;
  bigLogoFont?: FontChoice;
  bigLogoColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  showHologramSeal?: boolean;
  showBarcode?: boolean;
  showGrid?: boolean;
}

export interface CardState {
  id: string;
  templateId: string;
  name: string;
  cardRadius: number; // px (e.g. 16)
  backgroundColor?: string; // Card base color
  
  // Header / Branding
  brandLogo: {
    text: string;
    subtext?: string;
    fontFamily: FontChoice;
    color: string;
    badgeColor?: string;
    badgeShape?: 'oval' | 'pill' | 'none';
    visible?: boolean;
  };

  // Main Portrait Photo
  photo: CardPhoto;

  // Primary Information Fields
  fields: {
    cardType: string;
    cardNumber: string;
    name: string;
    nameSecondary?: string;
    roleOrTitle?: string;
    dob?: string;
    issueDate?: string;
    expDate?: string;
    location?: string;
    likes?: string;
    membershipOf?: string;
    signature?: string;
    disclaimer?: string;
  };

  // Typography Settings
  typography: {
    primaryFont: FontChoice;
    headerFont: FontChoice;
    metaFont: FontChoice;
    primaryColor: string;
    accentColor: string;
    secondaryColor: string;
  };

  // Graphic stickers on card
  stickers: StickerElement[];

  // Back Face
  back: CardBackDesign;
}

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  state: CardState;
}

export interface BackgroundSettings {
  gridColor: string;
  bgColor: string;
}
