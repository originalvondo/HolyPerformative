import { CardTemplate } from '../types/card';

const PLACEHOLDER_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23FFE4E6"/><circle cx="150" cy="140" r="55" fill="%23FB7185"/><path d="M50 330c0-55 45-100 100-100s100 45 100 100z" fill="%23FB7185"/></svg>`;

export const popsTemplate: CardTemplate = {
  id: 'pops-dither',
  name: 'Theme #5',
  description: 'Halftone artwork layout with hot-pink logo and crimson typography.',
  state: {
    id: 'pops-dither-state',
    templateId: 'pops-dither',
    name: 'POPS Identity Pass',
    cardRadius: 20,
    backgroundColor: '#FAF5F5',
    
    brandLogo: {
      text: 'pops',
      subtext: 'NO. 333',
      fontFamily: 'UnifrakturMaguntia',
      color: '#ff0055',
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
      borderWidth: 1,
      borderColor: '#FDA4AF',
      showBorder: true,
      visible: true,
    },

    fields: {
      cardType: 'RESIDENT PASS',
      cardNumber: 'LIC# HP-3269-PASS',
      name: 'YOUR NAME',
      nameSecondary: 'ALIAS',
      dob: '01/01/2000',
      issueDate: '01/01/2026',
      expDate: '01/01/2030',
      disclaimer: 'YOU MUST PRESENT THIS PHYSICAL PRINTOUT TO MATCH. INCLUDES YOUR PHOTO. WE CANNOT ACCEPT DIGITAL ID.',
    },

    typography: {
      primaryFont: 'Space Mono',
      headerFont: 'Cinzel Decorative',
      metaFont: 'Space Mono',
      primaryColor: '#e11d48',
      accentColor: '#be123c',
      secondaryColor: '#f43f5e',
    },

    stickers: [
      {
        id: 'st-pops-starburst',
        type: 'svg-sticker',
        content: 'stipple-sun-burst',
        x: 68,
        y: 36,
        scale: 2.2,
        rotation: 0,
        color: '#78350f',
        opacity: 0.85,
        side: 'front',
      },
      {
        id: 'st-pops-connector',
        type: 'svg-sticker',
        content: 'connector-pin-line',
        x: 52,
        y: 12,
        scale: 0.8,
        rotation: 0,
        color: '#e11d48',
        opacity: 0.9,
        side: 'front',
      }
    ],

    back: {
      title: 'POPS SYSTEM',
      subtitle: 'VERIFIED RESIDENT',
      quote: 'THE BEAT GOES ON',
      bigLogoText: 'pops',
      bigLogoFont: 'UnifrakturMaguntia',
      bigLogoColor: '#451a03',
      accentColor: '#fb7185',
      backgroundColor: '#fafaf9',
      showHologramSeal: true,
      showBarcode: true,
      showGrid: false,
    }
  }
};
