import React from 'react';

export interface AmbientTheme {
  bgColor: string;
  glowColor: string;
  secondaryGlow?: string;
  gridColor: string;
  majorGridColor: string;
}

export function getTemplateAmbient(templateId: string, _customBg?: string): AmbientTheme {
  switch (templateId) {
    case 'star-border-passport':
      return {
        bgColor: '#EAE5DB',
        glowColor: 'rgba(168, 85, 247, 0.16)',
        secondaryGlow: 'rgba(251, 191, 36, 0.10)',
        gridColor: '#C4BEAD',
        majorGridColor: '#5B4B67',
      };
    case 'creative-license':
      return {
        bgColor: '#E2E8F0',
        glowColor: 'rgba(249, 115, 22, 0.15)',
        secondaryGlow: 'rgba(59, 130, 246, 0.12)',
        gridColor: '#CBD5E1',
        majorGridColor: '#334155',
      };
    case 'cyber-nct':
      return {
        bgColor: '#D6E8F7',
        glowColor: 'rgba(6, 182, 212, 0.20)',
        secondaryGlow: 'rgba(59, 130, 246, 0.15)',
        gridColor: '#9DC4EB',
        majorGridColor: '#0369A1',
      };
    case 'cyber-barb':
      return {
        bgColor: '#FAECF3',
        glowColor: 'rgba(255, 45, 120, 0.18)',
        secondaryGlow: 'rgba(236, 72, 153, 0.12)',
        gridColor: '#F0BCD3',
        majorGridColor: '#9D174D',
      };
    case 'pops-dither':
      return {
        bgColor: '#F7E7EC',
        glowColor: 'rgba(244, 63, 94, 0.16)',
        secondaryGlow: 'rgba(251, 113, 133, 0.10)',
        gridColor: '#E4AFBC',
        majorGridColor: '#881337',
      };
    case 'pink-travel-passport':
      return {
        bgColor: '#EBDCE2',
        glowColor: 'rgba(78, 142, 98, 0.20)', // Contrasting green travel stamp glow
        secondaryGlow: 'rgba(244, 114, 182, 0.16)', // Dusty pink ambient
        gridColor: '#CBB2BD',
        majorGridColor: '#2D4432',
      };
    default:
      return {
        bgColor: '#F3F1EC',
        glowColor: 'rgba(60, 62, 74, 0.08)',
        gridColor: '#B6B8A8',
        majorGridColor: '#3C3E4A',
      };
  }
}

interface BackgroundProps {
  templateId?: string;
  backgroundColor?: string;
}

export const Background: React.FC<BackgroundProps> = ({
  templateId = 'star-border-passport',
  backgroundColor,
}) => {
  const ambient = getTemplateAmbient(templateId, backgroundColor);

  return (
    <div
      style={{ backgroundColor: ambient.bgColor }}
      className="fixed inset-0 pointer-events-none z-0 transition-colors duration-700 ease-in-out overflow-hidden"
    >
      {/* Dynamic Ambient Aura Glow Behind Card */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          background: `
            radial-gradient(circle at 50% 45%, ${ambient.glowColor} 0%, transparent 60%),
            ${ambient.secondaryGlow ? `radial-gradient(circle at 58% 52%, ${ambient.secondaryGlow} 0%, transparent 50%),` : ''}
            radial-gradient(circle at 20% 20%, ${ambient.glowColor} 0%, transparent 40%)
          `,
        }}
      />

      {/* Aesthetic Graph Grid Paper Pattern */}
      <div
        className="absolute inset-0 opacity-50 transition-all duration-700"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${ambient.gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${ambient.gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Major Sub-grid Lines */}
      <div
        className="absolute inset-0 opacity-25 transition-all duration-700"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${ambient.majorGridColor} 1.5px, transparent 1.5px),
            linear-gradient(to bottom, ${ambient.majorGridColor} 1.5px, transparent 1.5px)
          `,
          backgroundSize: '140px 140px',
        }}
      />
    </div>
  );
};
