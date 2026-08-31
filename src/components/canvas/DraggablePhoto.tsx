import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CardPhoto } from '../../types/card';

interface DraggablePhotoProps {
  photo: CardPhoto;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (partial: Partial<CardPhoto>) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  isExporting?: boolean;
}

export const DraggablePhoto: React.FC<DraggablePhotoProps> = ({
  photo,
  isSelected,
  onSelect,
  onUpdate,
  containerRef,
  isExporting = false,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ clientX: 0, clientY: 0, startX: 0, startY: 0 });

  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ clientX: 0, clientY: 0, startW: 0, startH: 0 });

  // Move Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    if (!containerRef.current) return;

    setIsDragging(true);
    setDragStart({
      clientX: e.clientX,
      clientY: e.clientY,
      startX: photo.x,
      startY: photo.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    onSelect();
    if (!containerRef.current || e.touches.length === 0) return;

    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      clientX: touch.clientX,
      clientY: touch.clientY,
      startX: photo.x,
      startY: photo.y,
    });
  };

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();

    const deltaX = clientX - dragStart.clientX;
    const deltaY = clientY - dragStart.clientY;
    const deltaXPercent = (deltaX / rect.width) * 100;
    const deltaYPercent = (deltaY / rect.height) * 100;

    onUpdate({
      x: Math.max(0, Math.min(100 - photo.width, dragStart.startX + deltaXPercent)),
      y: Math.max(0, Math.min(100 - photo.height, dragStart.startY + deltaYPercent)),
    });
  }, [isDragging, dragStart, onUpdate, containerRef, photo.width, photo.height]);

  // Resize Handlers
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      clientX: e.clientX,
      clientY: e.clientY,
      startW: photo.width,
      startH: photo.height,
    });
  };

  const handleResizeTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    setIsResizing(true);
    setResizeStart({
      clientX: touch.clientX,
      clientY: touch.clientY,
      startW: photo.width,
      startH: photo.height,
    });
  };

  const updateSize = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current || !isResizing) return;
    const rect = containerRef.current.getBoundingClientRect();

    const deltaX = clientX - resizeStart.clientX;
    const deltaY = clientY - resizeStart.clientY;
    const deltaWPercent = (deltaX / rect.width) * 100;
    const deltaHPercent = (deltaY / rect.height) * 100;

    const newW = Math.max(12, Math.min(80, resizeStart.startW + deltaWPercent));
    const newH = Math.max(15, Math.min(85, resizeStart.startH + deltaHPercent));

    onUpdate({
      width: Math.round(newW * 10) / 10,
      height: Math.round(newH * 10) / 10,
    });
  }, [isResizing, resizeStart, onUpdate, containerRef]);

  // Global event listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) updatePosition(e.clientX, e.clientY);
      if (isResizing) updateSize(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, updatePosition, updateSize]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      if (isDragging) {
        if (e.cancelable) e.preventDefault();
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
      if (isResizing) {
        if (e.cancelable) e.preventDefault();
        updateSize(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('touchcancel', handleTouchEnd);
      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchEnd);
      };
    }
  }, [isDragging, isResizing, updatePosition, updateSize]);

  if (photo.visible === false) return null;

  return (
    <div
      ref={elementRef}
      onMouseDown={!isExporting ? handleMouseDown : undefined}
      onTouchStart={!isExporting ? handleTouchStart : undefined}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`absolute select-none transition-shadow ${
        !isExporting ? 'cursor-move touch-none pointer-events-auto' : 'pointer-events-none'
      } ${
        isSelected && !isExporting
          ? 'z-30 ring-2 ring-[#3C3E4A] ring-offset-2 ring-offset-transparent shadow-lg'
          : 'z-20 hover:ring-1 hover:ring-[#3C3E4A]/40'
      }`}
      style={{
        left: `${photo.x}%`,
        top: `${photo.y}%`,
        width: `${photo.width * 5.4}px`,
        height: `${photo.height * 3.4}px`,
        borderRadius: `${photo.borderRadius}px`,
        border: photo.showBorder ? `${photo.borderWidth}px solid ${photo.borderColor}` : 'none',
        overflow: 'hidden',
        backgroundColor: '#E2E8F0',
      }}
      title="Click to edit, drag to reposition, drag corner to resize"
    >
      <img
        src={photo.url}
        alt="Card Portrait"
        className="w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Resize Handle at Bottom-Right */}
      {isSelected && !isExporting && (
        <div
          onMouseDown={handleResizeMouseDown}
          onTouchStart={handleResizeTouchStart}
          className="absolute bottom-0 right-0 w-5 h-5 bg-[#3C3E4A] border-2 border-white rounded-tl cursor-nwse-resize shadow-md flex items-center justify-center z-40"
          title="Drag to resize photo"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      )}
    </div>
  );
};
