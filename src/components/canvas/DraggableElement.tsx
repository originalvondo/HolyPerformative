import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StickerElement } from '../../types/card';
import { STICKER_LIBRARY } from '../../assets/stickers';
import { Trash2 } from 'lucide-react';

interface DraggableElementProps {
  sticker: StickerElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (partial: Partial<StickerElement>) => void;
  onDelete: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  sticker,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  containerRef,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ clientX: 0, clientY: 0, startXPercent: 0, startYPercent: 0 });

  // Mouse Drag Start
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    if (!containerRef.current) return;

    setIsDragging(true);
    setDragStart({
      clientX: e.clientX,
      clientY: e.clientY,
      startXPercent: sticker.x,
      startYPercent: sticker.y,
    });
  };

  // Touch Drag Start (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    onSelect();
    if (!containerRef.current || e.touches.length === 0) return;

    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      clientX: touch.clientX,
      clientY: touch.clientY,
      startXPercent: sticker.x,
      startYPercent: sticker.y,
    });
  };

  // Move Handler
  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();

    const deltaX = clientX - dragStart.clientX;
    const deltaY = clientY - dragStart.clientY;
    const deltaXPercent = (deltaX / rect.width) * 100;
    const deltaYPercent = (deltaY / rect.height) * 100;

    onUpdate({
      x: Math.max(0, Math.min(100, dragStart.startXPercent + deltaXPercent)),
      y: Math.max(0, Math.min(100, dragStart.startYPercent + deltaYPercent)),
    });
  }, [isDragging, dragStart, onUpdate, containerRef]);

  // Window listeners for mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updatePosition(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, updatePosition]);

  // Window listeners for touch (Mobile)
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        if (e.cancelable) e.preventDefault();
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('touchcancel', handleTouchEnd);
      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchEnd);
      };
    }
  }, [isDragging, updatePosition]);

  const stickerDef = STICKER_LIBRARY.find(s => s.id === sticker.content);

  return (
    <div
      ref={elementRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
      className={`absolute select-none cursor-move group transition-shadow touch-none ${
        isSelected ? 'z-30 ring-2 ring-[#3C3E4A] ring-offset-1 ring-offset-transparent' : 'z-20 hover:ring-1 hover:ring-[#3C3E4A]/40'
      }`}
      style={{
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
        transform: `translate(-50%, -50%) scale(${sticker.scale})`,
        transformOrigin: 'center center',
        color: sticker.color || 'currentColor',
        opacity: sticker.opacity ?? 1,
      }}
    >
      {sticker.type === 'custom-text' ? (
        <div
          style={{
            fontFamily: sticker.fontFamily || 'Inter',
            color: sticker.color || 'currentColor',
            fontSize: '14px',
            whiteSpace: 'nowrap',
          }}
          className="font-bold px-1.5 py-0.5 pointer-events-none select-none"
        >
          {sticker.content}
        </div>
      ) : (
        <div className="w-16 h-16 flex items-center justify-center pointer-events-none">
          {sticker.type === 'qr-code' ? (
            <div
              className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
              style={{ color: sticker.color || 'currentColor' }}
              dangerouslySetInnerHTML={{ __html: sticker.content }}
            />
          ) : stickerDef ? (
            <div
              className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
              dangerouslySetInnerHTML={{ __html: stickerDef.svg }}
            />
          ) : sticker.type === 'custom-image' ? (
            <img src={sticker.content} alt="custom sticker" className="w-full h-full object-contain" />
          ) : (
            <div className="text-xs font-mono font-bold">{sticker.content}</div>
          )}
        </div>
      )}

      {/* Delete button when selected */}
      {isSelected && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center bg-[#3C3E4A] border border-[#B6B8A8] px-2 py-1 rounded-md shadow-xl z-40"
        >
          <button
            title="Delete Sticker"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:text-red-300 text-[#F3F1EC] transition-colors flex items-center gap-1 text-[10px] font-mono"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};
