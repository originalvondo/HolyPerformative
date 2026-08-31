import { CardTemplate } from '../types/card';

const PLACEHOLDER_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23FCE7EC"/><circle cx="150" cy="140" r="55" fill="%23E8B4C0"/><path d="M50 330c0-55 45-100 100-100s100 45 100 100z" fill="%23E8B4C0"/></svg>`;

export const pinkTravelPassportTemplate: CardTemplate = {
  id: 'pink-travel-passport',
  name: 'Theme #6',
  description: 'Pink Permanent License of Travel with perimeter star border, vintage creased paper texture, dot-leader fields, and Call Me stamp.',
  state: {
    id: 'pink-travel-passport-state',
    templateId: 'pink-travel-passport',
    name: 'Pink Travel License',
    cardRadius: 20,
    backgroundColor: '#F7DDE3',
    layoutVariant: 'travel-passport',
    cardTexture: 'pink-creased-paper',
    cardFrame: 'stars-perimeter',

    brandLogo: {
      text: '@min2js',
      subtext: '',
      fontFamily: 'Space Mono',
      color: '#1E1E1E',
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
      y: 18,
      width: 32,
      height: 66,
      borderRadius: 2,
      borderWidth: 1.5,
      borderColor: '#1E1E1E',
      showBorder: true,
      visible: true,
    },

    fields: {
      cardType: 'PERMANENT LICENSE OF TRAVEL',
      cardNumber: 'NO. TTC6252021',
      name: 'YOUR NAME',
      nameSecondary: 'Issued to',
      dob: 'OCTOBER 19, 2000',
      location: 'LOS ANGELES, CA',
      issueDate: 'JUNE 25, 2021',
      roleOrTitle: 'LICENSE OF TRAVEL',
      signature: 'Your Signature',
      disclaimer: 'This is to Certify that the person named and described above is permitted to travel and explore freely unless detained by law. The holder of this license wrote, composed, and arranged all songs within the attached record, unless stated otherwise.',
    },

    typography: {
      primaryFont: 'Space Mono',
      headerFont: 'Space Mono',
      metaFont: 'Space Mono',
      primaryColor: '#1E1E1E',
      accentColor: '#1E1E1E',
      secondaryColor: '#4A4A4A',
    },

    stickers: [
      {
        id: 'st-cmiyl-green-stamp',
        type: 'svg-sticker',
        content: 'cmiyl-green-stamp',
        x: 72,
        y: 65,
        scale: 1.15,
        rotation: -6,
        color: '#4E8E62',
        opacity: 0.8,
        side: 'front',
      },
    ],

    back: {
      title: 'PERMANENT LICENSE OF TRAVEL',
      subtitle: 'OFFICIAL RECORD',
      quote: '“THE HOLDER OF THIS LICENSE IS PERMITTED TO TRAVEL AND EXPLORE FREELY”',
      bigLogoText: 'CALL ME IF YOU GET LOST',
      bigLogoFont: 'Space Mono',
      bigLogoColor: '#1E1E1E',
      accentColor: '#4E8E62',
      backgroundColor: '#F7DDE3',
      showHologramSeal: true,
      showBarcode: true,
      showGrid: false,
    },
  },
};
