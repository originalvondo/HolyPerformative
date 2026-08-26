import { CardTemplate } from '../types/card';

const PLACEHOLDER_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23F3E8FF"/><circle cx="150" cy="140" r="55" fill="%23A855F7"/><path d="M50 330c0-55 45-100 100-100s100 45 100 100z" fill="%23A855F7"/></svg>`;

export const lavenderTemplate: CardTemplate = {
  id: 'lavender-exes',
  name: 'Theme #8',
  description: 'Calligraphy script VIP card with twin heart stamps and admission pass.',
  state: {
    id: 'lavender-exes-state',
    templateId: 'lavender-exes',
    name: 'VIP Club Pass',
    cardRadius: 22,
    backgroundColor: '#FAF5FF',
    
    brandLogo: {
      text: 'All & His Exes',
      subtext: 'MEMBERSHIP CARD',
      fontFamily: 'Playball',
      color: '#7c3aed',
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
      x: 14,
      y: 28,
      width: 24,
      height: 44,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: '#c084fc',
      showBorder: true,
      visible: true,
    },

    fields: {
      cardType: 'MEMBERSHIP CARD',
      cardNumber: 'ID #: HP-VIP-2026',
      name: 'YOUR NAME',
      dob: '01/01/2000',
      roleOrTitle: 'VIP MEMBER',
      issueDate: 'Jan 01, 2026',
      signature: 'Your Signature',
      disclaimer: '* VALID ADMISSION TO THE EXCLUSIVE CLUB GALA *',
    },

    typography: {
      primaryFont: 'Space Mono',
      headerFont: 'Playball',
      metaFont: 'Space Mono',
      primaryColor: '#581c87',
      accentColor: '#dc2626',
      secondaryColor: '#6b21a8',
    },

    stickers: [
      {
        id: 'st-lavender-heart-l',
        type: 'svg-sticker',
        content: 'heart-stamp-seal',
        x: 24,
        y: 12,
        scale: 0.8,
        rotation: 0,
        color: '#a855f7',
        opacity: 0.9,
        side: 'front',
      },
      {
        id: 'st-lavender-heart-r',
        type: 'svg-sticker',
        content: 'heart-stamp-seal',
        x: 76,
        y: 12,
        scale: 0.8,
        rotation: 0,
        color: '#dc2626',
        opacity: 0.9,
        side: 'front',
      }
    ],

    back: {
      title: 'ALL & HIS EXES',
      subtitle: 'COMMITTEE',
      quote: '“I KNOW YOU LOVE ME, AND I KNOW IT’S CRAZY!”',
      bigLogoText: 'All & His Exes',
      bigLogoFont: 'Playball',
      bigLogoColor: '#9333ea',
      accentColor: '#7c3aed',
      backgroundColor: '#faf5ff',
      showHologramSeal: false,
      showBarcode: true,
      showGrid: false,
    }
  }
};
