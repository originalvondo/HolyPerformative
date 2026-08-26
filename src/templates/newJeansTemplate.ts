import { CardTemplate } from '../types/card';

const PLACEHOLDER_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23E2E8F0"/><circle cx="150" cy="140" r="55" fill="%2394A3B8"/><path d="M50 330c0-55 45-100 100-100s100 45 100 100z" fill="%2394A3B8"/></svg>`;

export const newJeansTemplate: CardTemplate = {
  id: 'kpop-newjeans',
  name: 'Theme #5',
  description: 'Clean idol membership card with bilingual metadata table, sunshine oval badge, and coral heart seal.',
  state: {
    id: 'kpop-newjeans-state',
    templateId: 'kpop-newjeans',
    name: 'Minimal ID Card',
    cardRadius: 18,
    backgroundColor: '#ffffff',
    
    brandLogo: {
      text: 'TEAM HOLY',
      subtext: 'OFFICIAL ID',
      fontFamily: 'Outfit',
      color: '#0f172a',
      badgeColor: '#facc15',
      badgeShape: 'oval',
      visible: true,
    },

    photo: {
      url: PLACEHOLDER_AVATAR,
      filter: 'none',
      ditherScale: 2,
      brightness: 0,
      contrast: 0,
      x: 8,
      y: 48,
      width: 32,
      height: 48,
      borderRadius: 6,
      borderWidth: 0,
      borderColor: '#e2e8f0',
      showBorder: false,
      visible: true,
    },

    fields: {
      cardType: 'IDENTIFICATION CARD',
      cardNumber: 'NO. 220722040507 >',
      name: 'YOUR NAME',
      nameSecondary: '김민지 / ALIAS',
      roleOrTitle: 'Vocal / Creator',
      issueDate: '2026-07-22',
      dob: '2000-05-07',
      location: 'Seoul / 서울',
      likes: 'Choco Ice Cream, Music',
      membershipOf: 'Club Dakku (다꾸 클럽)',
      signature: 'Your Signature',
      disclaimer: 'This card certifies the bearer as an official member. Tap any text or photo to customize.',
    },

    typography: {
      primaryFont: 'Noto Sans KR',
      headerFont: 'Inter',
      metaFont: 'Space Mono',
      primaryColor: '#0f172a',
      accentColor: '#1e3a8a',
      secondaryColor: '#475569',
    },

    stickers: [
      {
        id: 'st-heart-seal',
        type: 'svg-sticker',
        content: 'heart-stamp-seal',
        x: 84,
        y: 16,
        scale: 1.3,
        rotation: 0,
        color: '#f87171',
        opacity: 0.9,
        side: 'front',
      }
    ],

    back: {
      title: 'TEAM HOLYPERFORMATIVE',
      subtitle: 'MEMBERSHIP CERTIFICATE',
      quote: 'ATTENTION! ALWAYS WITH US',
      bigLogoText: 'HOLY // HP',
      bigLogoFont: 'Outfit',
      bigLogoColor: '#0f172a',
      accentColor: '#facc15',
      backgroundColor: '#f8fafc',
      showHologramSeal: true,
      showBarcode: true,
      showGrid: false,
    }
  }
};
