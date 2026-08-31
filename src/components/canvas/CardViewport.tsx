import React, { useRef, useState, useEffect } from 'react';
import { useCardStore } from '../../store/useCardStore';
import { CardFace } from './CardFace';
import { RotateCw, Sparkles, Sliders, Type } from 'lucide-react';
import { TEMPLATES } from '../../templates';

interface CardViewportProps {
  frontExportRef: React.RefObject<HTMLDivElement>;
  backExportRef: React.RefObject<HTMLDivElement>;
  onOpenEditModal: (type: string | null) => void;
}

export const CardViewport: React.FC<CardViewportProps> = ({
  frontExportRef,
  backExportRef,
  onOpenEditModal,
}) => {
  const { state, activeSide, selectedId, actions } = useCardStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth - 32;
      const availableHeight = containerRef.current.clientHeight - 200;
      const cardWidth = 540;
      const cardHeight = 340;

      const scaleW = availableWidth / cardWidth;
      const scaleH = availableHeight / cardHeight;
      const autoScale = Math.min(scaleW, scaleH);

      if (autoScale < 1) {
        setScale(Math.max(0.45, autoScale));
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).id === 'viewport-canvas') {
      onOpenEditModal(null);
      actions.setSelectedId(null);
    }
  };

  const cardWidthScaled = Math.round(540 * scale);
  const halfCardHeight = Math.round((340 * scale) / 2);

  return (
    <div
      ref={containerRef}
      id="viewport-canvas"
      onClick={handleBackgroundClick}
      className="relative flex-1 w-full max-w-full h-full overflow-hidden select-none"
    >
      <div className="absolute top-2.5 inset-x-0 flex items-center justify-center gap-2 z-20 pointer-events-auto">
        <label className="text-[11px] font-mono text-[#3C3E4A] font-bold">Template:</label>
        <select
          value={state.templateId}
          onChange={(e) => actions.loadTemplate(e.target.value)}
          className="bg-[#F3F1EC] border border-[#3C3E4A]/60 text-[#3C3E4A] text-xs font-mono font-bold rounded-md px-3 py-1.5 outline-none cursor-pointer hover:border-[#3C3E4A] hover:bg-[#E0DFD2] transition-colors shadow-sm"
        >
          {TEMPLATES.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-between z-20 pointer-events-auto px-1 transition-all"
        style={{
          width: `${Math.max(cardWidthScaled, 280)}px`,
          maxWidth: 'calc(100% - 24px)',
          top: `calc(40% - ${halfCardHeight}px - 44px)`,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenEditModal('cardSettings');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F3F1EC] hover:bg-[#E0DFD2] text-[#3C3E4A] border border-[#3C3E4A]/60 rounded-md text-xs font-mono font-bold shadow-sm active:scale-95 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5 text-[#3C3E4A]" />
          <span>Customize Card</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            actions.flipCard();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#3C3E4A] hover:bg-[#2A2C35] text-[#F3F1EC] border border-[#3C3E4A] rounded-md text-xs font-mono font-bold shadow-md active:scale-95 transition-all"
        >
          <RotateCw className="w-3.5 h-3.5 text-[#F3F1EC]" />
          <span>Flip: {activeSide.toUpperCase()}</span>
        </button>
      </div>

      <div
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center perspective-1000 z-10 pointer-events-auto"
        style={{
          width: `${cardWidthScaled}px`,
          height: `${Math.round(340 * scale)}px`,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute preserve-3d transition-transform duration-500 ease-in-out"
          style={{
            left: '50%',
            top: '50%',
            width: '540px',
            height: '340px',
            transform: `translate(-50%, -50%) scale(${scale}) rotateY(${activeSide === 'back' ? 180 : 0}deg)`,
            transformOrigin: 'center center',
          }}
        >
          <div
            className="absolute inset-0 backface-hidden w-[540px] h-[340px]"
            style={{
              transform: 'rotateY(0deg)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              pointerEvents: activeSide === 'front' ? 'auto' : 'none',
            }}
          >
            <CardFace
              state={state}
              side="front"
              selectedId={activeSide === 'front' ? selectedId : null}
              onSelectElement={(id) => {
                if (id) {
                  onOpenEditModal(id);
                  actions.setSelectedId(id);
                }
              }}
              onUpdatePhoto={(partial) => actions.updatePhoto(partial)}
              onUpdateSticker={(id, partial) => actions.updateSticker(id, partial)}
              onDeleteSticker={(id) => actions.removeSticker(id)}
            />
          </div>

          <div
            className="absolute inset-0 backface-hidden rotate-y-180 w-[540px] h-[340px]"
            style={{
              transform: 'rotateY(180deg)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              pointerEvents: activeSide === 'back' ? 'auto' : 'none',
            }}
          >
            <CardFace
              state={state}
              side="back"
              selectedId={activeSide === 'back' ? selectedId : null}
              onSelectElement={(id) => {
                if (id) {
                  onOpenEditModal(id);
                  actions.setSelectedId(id);
                }
              }}
              onUpdateSticker={(id, partial) => actions.updateSticker(id, partial)}
              onDeleteSticker={(id) => actions.removeSticker(id)}
            />
          </div>
        </div>
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-20 pointer-events-auto max-w-full px-2 transition-all"
        style={{
          top: `calc(40% + ${halfCardHeight}px + 12px)`,
        }}
      >
        <div className="flex flex-row flex-nowrap items-center justify-center gap-2.5 mb-1.5 whitespace-nowrap">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenEditModal('addSticker');
            }}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-[#42523C] hover:bg-[#34422E] text-[#F3F1EC] border border-[#2D3928] rounded-md text-xs font-mono font-bold shadow-sm active:scale-95 transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#86EFAC]" />
            <span>+ Add Sticker / QR</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenEditModal('addCustomText');
            }}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-[#2C384A] hover:bg-[#1F2937] text-[#F3F1EC] border border-[#1E2734] rounded-md text-xs font-mono font-bold shadow-sm active:scale-95 transition-all shrink-0"
          >
            <Type className="w-3.5 h-3.5 text-[#93C5FD]" />
            <span>+ Add Text</span>
          </button>
        </div>

        <div className="text-[10px] font-mono text-[#3C3E4A]/70 text-center font-medium">
          Tap any text, photo, or element on the card to edit
        </div>
      </div>

      <div className="fixed -left-[9999px] top-0 pointer-events-none z-[-100] select-none" aria-hidden="true">
        <CardFace
          ref={frontExportRef}
          state={state}
          side="front"
          selectedId={null}
          onSelectElement={() => {}}
          onUpdateSticker={() => {}}
          onDeleteSticker={() => {}}
          isExporting={true}
        />
        <CardFace
          ref={backExportRef}
          state={state}
          side="back"
          selectedId={null}
          onSelectElement={() => {}}
          onUpdateSticker={() => {}}
          onDeleteSticker={() => {}}
          isExporting={true}
        />
      </div>
    </div>
  );
};
