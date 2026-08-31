import { CardTemplate } from '../types/card';

const PLACEHOLDER_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23FCE7F3"/><circle cx="150" cy="140" r="55" fill="%23FF2D78"/><path d="M50 330c0-55 45-100 100-100s100 45 100 100z" fill="%23FF2D78"/></svg>`;

export const barbTemplate: CardTemplate = {
  id: 'cyber-barb',
  name: 'Theme #4',
  description: 'Graphic identity card with pixel typography and starburst graphics.',
  state: {
    id: 'cyber-barb-state',
    templateId: 'cyber-barb',
    name: 'Studio ID Card',
    cardRadius: 18,
    backgroundColor: '#ffffff',
    
    brandLogo: {
      text: 'BARB',
      subtext: 'designer',
      fontFamily: 'UnifrakturMaguntia',
      color: '#ff2d78',
      badgeColor: 'transparent',
      badgeShape: 'none',
      visible: true,
    },

    photo: {
      url: PLACEHOLDER_AVATAR,
      filter: 'none',
      ditherScale: 2,
      brightness: 0,
      contrast: 0,
      x: 6,
      y: 26,
      width: 24,
      height: 48,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#ff2d78',
      showBorder: true,
      visible: true,
    },

    fields: {
      cardType: '137',
      cardNumber: 'HP-137',
      name: 'YOUR NAME',
      nameSecondary: 'CREATIVE',
      roleOrTitle: 'designer, visual art, typography, creative style',
      location: 'STUDIO // GLOBAL',
      disclaimer: 'Official creative pass. Tap any text or graphic element to edit.',
    },

    typography: {
      primaryFont: 'Press Start 2P',
      headerFont: 'Press Start 2P',
      metaFont: 'Space Mono',
      primaryColor: '#111827',
      accentColor: '#ff2d78',
      secondaryColor: '#4b5563',
    },

    stickers: [
      {
        id: 'st-barb-bgstar',
        type: 'svg-sticker',
        content: 'cyber-starburst-8',
        x: 62,
        y: 48,
        scale: 2.8,
        rotation: 0,
        color: '#d1fae5',
        opacity: 0.75,
        side: 'front',
      },
      {
        id: 'st-barb-connector',
        type: 'svg-sticker',
        content: 'connector-pin-line',
        x: 52,
        y: 14,
        scale: 0.9,
        rotation: 0,
        color: '#ff2d78',
        opacity: 0.9,
        side: 'front',
      }
    ],

    back: {
      title: '137',
      subtitle: 'GGbissa Archive',
      quote: 'CREATE WITHOUT LIMITS',
      bigLogoText: 'BARB',
      bigLogoFont: 'Press Start 2P',
      bigLogoColor: '#374151',
      accentColor: '#ff2d78',
      backgroundColor: '#f5f5f4',
      showHologramSeal: false,
      showBarcode: true,
      showGrid: true,
    }
  }
};
