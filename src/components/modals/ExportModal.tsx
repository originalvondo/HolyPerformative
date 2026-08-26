import React, { useState } from 'react';
import { useCardStore } from '../../store/useCardStore';
import { downloadDualPrintSheet } from '../../engine/exportEngine';
import { X, Download, Printer, CheckCircle2, Loader2 } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  frontElementRef: React.RefObject<HTMLDivElement>;
  backElementRef: React.RefObject<HTMLDivElement>;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  frontElementRef,
  backElementRef,
}) => {
  const { state } = useCardStore();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportDualSheet = async () => {
    if (!frontElementRef.current || !backElementRef.current || isExporting) return;
    setIsExporting(true);
    try {
      await downloadDualPrintSheet(
        frontElementRef.current,
        backElementRef.current,
        state.name
      );
      setExportSuccess('Print Sheet Downloaded!');
      setTimeout(() => {
        setExportSuccess(null);
        onClose();
      }, 1800);
    } catch (err) {
      alert('Failed to generate print sheet.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3C3E4A]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F3F1EC] border border-[#3C3E4A]/50 rounded-xl w-full max-w-sm overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#B6B8A8]/60">
          <h2 className="text-sm font-bold font-mono text-[#3C3E4A]">EXPORT & DOWNLOAD</h2>
          <button
            onClick={onClose}
            className="text-[#3C3E4A] hover:text-black p-1 rounded-md hover:bg-[#E0DFD2] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {exportSuccess && (
            <div className="p-2.5 bg-[#E0DFD2] border border-[#B6B8A8] rounded-lg flex items-center gap-2 text-[#3C3E4A] text-xs font-mono font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{exportSuccess}</span>
            </div>
          )}

          <p className="text-xs text-[#3C3E4A]/80 font-mono leading-relaxed">
            Downloads high-resolution Front & Back side-by-side print sheet with cut guidelines.
          </p>

          {/* Solid Midnight Print Button */}
          <button
            onClick={handleExportDualSheet}
            disabled={isExporting}
            className="w-full p-4 bg-[#3C3E4A] hover:bg-[#9FA3AD] disabled:opacity-60 text-[#F3F1EC] rounded-lg flex items-center justify-between text-left transition-all active:scale-98 font-mono shadow-md font-bold"
          >
            <div className="flex items-center gap-3">
              {isExporting ? <Loader2 className="w-5 h-5 animate-spin text-[#F3F1EC]" /> : <Printer className="w-5 h-5 text-[#F3F1EC]" />}
              <div>
                <div className="font-bold text-xs">
                  {isExporting ? 'Generating Print Sheet...' : 'Download Print Sheet (Front + Back)'}
                </div>
                <div className="text-[10px] text-[#B6B8A8] font-semibold">Standard CR80 dual printout</div>
              </div>
            </div>
            <Download className="w-4 h-4 text-[#F3F1EC]" />
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#E0DFD2]/60 border-t border-[#B6B8A8]/60 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#3C3E4A]/70">HolyPerformative (HP)</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md bg-[#3C3E4A] hover:bg-[#9FA3AD] text-[#F3F1EC] text-xs font-mono transition-colors shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
