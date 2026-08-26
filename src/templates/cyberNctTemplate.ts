import { CardTemplate } from '../types/card';

const PLACEHOLDER_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23BAE6FD"/><circle cx="150" cy="140" r="55" fill="%230284C7"/><path d="M50 330c0-55 45-100 100-100s100 45 100 100z" fill="%230284C7"/></svg>`;

export const cyberNctTemplate: CardTemplate = {
  id: 'cyber-nct',
  name: 'Theme #4',
  description: 'Cyber Y2K holographic member ID with fingerprint biometric, stage name, and SM entertainment layout.',
  state: {
    id: 'cyber-nct-state',
    templateId: 'cyber-nct',
    name: 'Cyber Y2K Member ID',
    cardRadius: 18,
    backgroundColor: '#EAF5FB',
    
    brandLogo: {
      text: 'NCT DREAM',
      subtext: 'SM ENTERTAINMENT',
      fontFamily: 'Outfit',
      color: '#0F2744',
      badgeColor: '#D0E9F7',
      badgeShape: 'pill',
      visible: true,
    },

    photo: {
      url: PLACEHOLDER_AVATAR,
      filter: 'none',
      ditherScale: 2,
      brightness: 0,
      contrast: 0,
      x: 10,
      y: 28,
      width: 25,
      height: 48,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#93C5FD',
      showBorder: true,
      visible: true,
    },

    fields: {
      cardType: 'IDENTITY CARD',
      cardNumber: 'ID: HP-CYBER-001',
      name: 'YOUR NAME',
      nameSecondary: 'STAGE NAME',
      roleOrTitle: 'VOCAL / PRODUCER / ARTIST',
      dob: '01/01/2000',
      location: 'SEOUL, KR (178cm)',
      signature: 'Your Signature',
      disclaimer: 'Official verified identity pass. Hologram authenticated record.',
    },

    typography: {
      primaryFont: 'Space Mono',
      headerFont: 'Outfit',
      metaFont: 'Space Mono',
      primaryColor: '#0F2744',
      accentColor: '#0284C7',
      secondaryColor: '#475569',
    },

    stickers: [
      {
        id: 'st-fingerprint',
        type: 'svg-sticker',
        content: 'fingerprint-stamp',
        x: 48,
        y: 62,
        scale: 0.9,
        rotation: 0,
        color: '#0F172A',
        opacity: 0.9,
        side: 'front',
      },
      {
        id: 'st-y2k-sparkle',
        type: 'svg-sticker',
        content: 'sparkle-4',
        x: 86,
        y: 22,
        scale: 1.1,
        rotation: 0,
        color: '#0284C7',
        opacity: 0.85,
        side: 'front',
      }
    ],

    back: {
      title: 'SM ENTERTAINMENT',
      subtitle: 'VERIFIED ARTIST RECORD',
      quote: '“FUTURE IN MOTION • DREAM ARCHIVE”',
      bigLogoText: 'NCT DREAM',
      bigLogoFont: 'Outfit',
      bigLogoColor: '#0F2744',
      accentColor: '#0284C7',
      backgroundColor: '#E2F1F8',
      showHologramSeal: true,
      showBarcode: true,
      showGrid: true,
    }
  }
};
