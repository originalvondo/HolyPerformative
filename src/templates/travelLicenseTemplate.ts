import { CardTemplate } from '../types/card';

const PLACEHOLDER_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23E2E8F0"/><circle cx="150" cy="140" r="55" fill="%2394A3B8"/><path d="M50 330c0-55 45-100 100-100s100 45 100 100z" fill="%2394A3B8"/></svg>`;

export const travelLicenseTemplate: CardTemplate = {
  id: 'travel-license',
  name: 'Theme #3',
  description: 'Tyler, The Creator permanent travel license with dot leader fields, cyan travel stamp, and album art.',
  state: {
    id: 'travel-license-state',
    templateId: 'travel-license',
    name: 'Travel License',
    cardRadius: 16,
    backgroundColor: '#EFE6CA',
    
    brandLogo: {
      text: 'TRAVEL STAMPS: 2026',
      subtext: 'PERMANENT LICENSE',
      fontFamily: 'Space Mono',
      color: '#26231E',
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
      x: 10,
      y: 30,
      width: 26,
      height: 46,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#D4C9A8',
      showBorder: true,
      visible: true,
    },

    fields: {
      cardType: 'PERMANENT LICENSE OF TRAVEL',
      cardNumber: 'NO. HP-2026-TRAVEL',
      name: 'YOUR NAME',
      dob: '01/01/2000',
      location: 'CITY, COUNTRY',
      issueDate: '01/01/2026',
      signature: 'Your Signature',
      disclaimer: 'This is to Certify that the person named and described above is permitted to travel and explore freely unless detained by law.',
    },

    typography: {
      primaryFont: 'Space Mono',
      headerFont: 'Space Mono',
      metaFont: 'Space Mono',
      primaryColor: '#26231E',
      accentColor: '#0284C7',
      secondaryColor: '#57534E',
    },

    stickers: [
      {
        id: 'st-call-me',
        type: 'svg-sticker',
        content: 'call-me-stamp',
        x: 72,
        y: 48,
        scale: 1.4,
        rotation: 0,
        color: '#0284C7',
        opacity: 0.75,
        side: 'front',
      },
      {
        id: 'st-star-row-top',
        type: 'svg-sticker',
        content: 'star-row-border',
        x: 50,
        y: 6,
        scale: 1.6,
        rotation: 0,
        color: '#26231E',
        opacity: 0.85,
        side: 'front',
      }
    ],

    back: {
      title: 'CALL ME IF YOU GET LOST',
      subtitle: 'PERMANENT ARCHIVE',
      quote: '“THE HOLDER OF THIS LICENSE COMPOSED AND ARRANGED ALL SONGS”',
      bigLogoText: 'IGOR // GOBLIN',
      bigLogoFont: 'Space Mono',
      bigLogoColor: '#F472B6',
      accentColor: '#16A34A',
      backgroundColor: '#EAE0C2',
      showHologramSeal: false,
      showBarcode: true,
      showGrid: true,
    }
  }
};
