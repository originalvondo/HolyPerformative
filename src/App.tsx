import React, { useRef, useState, useEffect } from 'react';
import { useCardStore } from './store/useCardStore';
import { Background } from './components/layout/Background';
import { Header } from './components/layout/Header';
import { CardViewport } from './components/canvas/CardViewport';
import { ItemEditPopup } from './components/modals/ItemEditPopup';
import { ExportModal } from './components/modals/ExportModal';

export const App: React.FC = () => {
  const { actions } = useCardStore();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeEditType, setActiveEditType] = useState<string | null>(null);

  // Hidden references for high-res PNG export
  const frontExportRef = useRef<HTMLDivElement>(null);
  const backExportRef = useRef<HTMLDivElement>(null);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        setActiveEditType(null);
        actions.setSelectedId(null);
      } else if (e.key === 'f' || e.key === 'F') {
        actions.flipCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);

  return (
    <div className="relative w-full max-w-full h-screen flex flex-col bg-[#F3F1EC] text-[#3C3E4A] overflow-hidden select-none font-sans">
      {/* Aesthetic Graph Paper Background */}
      <Background />

      {/* Clean Aesthetic Header */}
      <Header onOpenExport={() => setIsExportModalOpen(true)} />

      {/* Main Canvas Workspace */}
      <main className="flex-1 w-full max-w-full flex overflow-hidden relative">
        <CardViewport
          frontExportRef={frontExportRef}
          backExportRef={backExportRef}
          onOpenEditModal={(type) => setActiveEditType(type)}
        />
      </main>

      {/* Small Direct-Click Edit Popup */}
      <ItemEditPopup
        type={activeEditType}
        onClose={() => {
          setActiveEditType(null);
          actions.setSelectedId(null);
        }}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        frontElementRef={frontExportRef}
        backElementRef={backExportRef}
      />
    </div>
  );
};

export default App;
