import React from 'react';
import { Download } from 'lucide-react';
import labubuLogo from '../../assets/labubu.png';

interface HeaderProps {
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenExport }) => {
  return (
    <header className="h-14 w-full bg-[#F3F1EC]/90 border-b border-[#B6B8A8]/60 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <img
          src={labubuLogo}
          alt="Labubu Logo"
          className="w-8 h-8 object-contain rounded drop-shadow-sm select-none"
        />
        <span className="font-bold text-sm sm:text-base font-mono text-[#3C3E4A] tracking-tight">
          HolyPerformative
        </span>
      </div>

      <button
        onClick={onOpenExport}
        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#3C3E4A] hover:bg-[#9FA3AD] text-[#F3F1EC] font-bold text-xs rounded-md transition-all active:scale-95 font-mono shadow-sm"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Export</span>
      </button>
    </header>
  );
};
