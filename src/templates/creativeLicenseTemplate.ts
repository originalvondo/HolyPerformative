import { CardTemplate } from '../types/card';

const PLACEHOLDER_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23E2E8F0"/><circle cx="150" cy="140" r="55" fill="%2394A3B8"/><path d="M50 330c0-55 45-100 100-100s100 45 100 100z" fill="%2394A3B8"/></svg>`;

export const creativeLicenseTemplate: CardTemplate = {
  id: 'creative-license',
  name: 'Theme #2',
  description: 'Creative designer license with verified table, star row, stamps, and paperclip graphic.',
  state: {
    id: 'creative-license-state',
    templateId: 'creative-license',
    name: 'Creative License',
    cardRadius: 16,
    backgroundColor: '#FAF9F5',
    
    brandLogo: {
      text: 'CREATIVE LICENSE',
      subtext: '# OF LICENSE 0051',
      fontFamily: 'Space Mono',
      color: '#18181B',
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
      y: 28,
      width: 25,
      height: 48,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#CBD5E1',
      showBorder: true,
      visible: true,
    },

    fields: {
      cardType: 'CREATIVE LICENSE',
      cardNumber: '# 0051',
      name: 'YOUR NAME',
      roleOrTitle: 'GRAPHIC USER // 3D ARTIST & VISUAL DESIGNER',
      dob: '15/09/2000',
      location: 'GLOBAL // CREATIVE STUDIO',
      signature: 'Your Signature',
      disclaimer: 'This creative license empowers you to design without limit and unlock the full potential of your imagination.',
    },

    typography: {
      primaryFont: 'Space Mono',
      headerFont: 'Space Mono',
      metaFont: 'Space Mono',
      primaryColor: '#18181B',
      accentColor: '#DC2626',
      secondaryColor: '#64748B',
    },

    stickers: [
      {
        id: 'st-paperclip',
        type: 'svg-sticker',
        content: 'paperclip-pin',
        x: 8,
        y: 16,
        scale: 0.9,
        rotation: 0,
        color: '#64748B',
        opacity: 0.9,
        side: 'front',
      },
      {
        id: 'st-certified-seal',
        type: 'svg-sticker',
        content: 'certified-round-seal',
        x: 64,
        y: 44,
        scale: 1.3,
        rotation: 0,
        color: '#2563EB',
        opacity: 0.6,
        side: 'front',
      },
      {
        id: 'st-guaranteed',
        type: 'svg-sticker',
        content: 'guaranteed-badge',
        x: 28,
        y: 56,
        scale: 0.9,
        rotation: 0,
        color: '#16A34A',
        opacity: 0.9,
        side: 'front',
      },
      {
        id: 'st-star-row-creative',
        type: 'svg-sticker',
        content: 'star-row-border',
        x: 50,
        y: 6,
        scale: 1.5,
        rotation: 0,
        color: '#3B82F6',
        opacity: 0.8,
        side: 'front',
      }
    ],

    back: {
      title: 'CREATIVE LICENSE',
      subtitle: 'DESIGNERS WORLD COMMUNITY',
      quote: '“CREATIVITY TAKES COURAGE — HENRI MATISSE”',
      bigLogoText: 'PORTFOLIO // ID',
      bigLogoFont: 'Space Mono',
      bigLogoColor: '#18181B',
      accentColor: '#DC2626',
      backgroundColor: '#F3EFE6',
      showHologramSeal: true,
      showBarcode: true,
      showGrid: true,
    }
  }
};
