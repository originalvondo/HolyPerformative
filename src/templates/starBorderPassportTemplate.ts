import { CardTemplate } from '../types/card';

const PLACEHOLDER_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23E9D5FF"/><circle cx="150" cy="140" r="55" fill="%23C084FC"/><path d="M50 330c0-55 45-100 100-100s100 45 100 100z" fill="%23C084FC"/></svg>`;

export const starBorderPassportTemplate: CardTemplate = {
  id: 'star-passport',
  name: 'Theme #1',
  description: 'Editorial passport card with star perimeter border, grid fields, and signature script.',
  state: {
    id: 'star-passport-state',
    templateId: 'star-passport',
    name: 'Star Border Passport',
    cardRadius: 18,
    backgroundColor: '#FAF7EB',
    
    brandLogo: {
      text: 'LOVESHACKFANCY',
      subtext: 'OFFICIAL ID',
      fontFamily: 'Cinzel Decorative',
      color: '#38144E',
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
      borderColor: '#D8B4E2',
      showBorder: true,
      visible: true,
    },

    fields: {
      cardType: 'PASSPORT IDENTITY',
      cardNumber: 'NO. 2026-STAR-88',
      name: 'YOUR NAME',
      nameSecondary: 'ALIAS / NICKNAME',
      dob: 'OCTOBER 19, 2000',
      location: 'CITY, COUNTRY',
      roleOrTitle: 'CREATIVE DIRECTOR / ARTIST',
      signature: 'Your Signature',
      disclaimer: 'Official certified identification. Valid for admission and travel.',
    },

    typography: {
      primaryFont: 'Space Mono',
      headerFont: 'Cinzel Decorative',
      metaFont: 'Space Mono',
      primaryColor: '#38144E',
      accentColor: '#38144E',
      secondaryColor: '#6B4C82',
    },

    stickers: [
      {
        id: 'st-star-top',
        type: 'svg-sticker',
        content: 'star-row-border',
        x: 50,
        y: 6,
        scale: 1.6,
        rotation: 0,
        color: '#38144E',
        opacity: 0.85,
        side: 'front',
      },
      {
        id: 'st-star-burst-side',
        type: 'svg-sticker',
        content: 'cyber-starburst-8',
        x: 88,
        y: 20,
        scale: 1.2,
        rotation: 0,
        color: '#38144E',
        opacity: 0.9,
        side: 'front',
      },
      {
        id: 'st-star-burst-bottom',
        type: 'svg-sticker',
        content: 'cyber-starburst-8',
        x: 38,
        y: 68,
        scale: 1.0,
        rotation: 0,
        color: '#38144E',
        opacity: 0.85,
        side: 'front',
      }
    ],

    back: {
      title: 'LOVESHACKFANCY',
      subtitle: 'VERIFIED BEARER',
      quote: '“BOUNDLESS JOURNEY & CREATION”',
      bigLogoText: 'LOVESHACKFANCY',
      bigLogoFont: 'Cinzel Decorative',
      bigLogoColor: '#38144E',
      accentColor: '#6B4C82',
      backgroundColor: '#FAF7EB',
      showHologramSeal: true,
      showBarcode: true,
      showGrid: false,
    }
  }
};
