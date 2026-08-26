import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#F3F1EC]">
      {/* Aesthetic Graph Grid Paper Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #B6B8A8 1px, transparent 1px),
            linear-gradient(to bottom, #B6B8A8 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />
      {/* Major Sub-grid Lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3C3E4A 1.5px, transparent 1.5px),
            linear-gradient(to bottom, #3C3E4A 1.5px, transparent 1.5px)
          `,
          backgroundSize: '140px 140px',
        }}
      />
    </div>
  );
};
