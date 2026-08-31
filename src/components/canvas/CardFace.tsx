import React, { useRef } from 'react';
import { CardPhoto, CardState, StickerElement } from '../../types/card';
import { DraggableElement } from './DraggableElement';
import { DraggablePhoto } from './DraggablePhoto';
import { ShieldCheck } from 'lucide-react';
import { STICKER_LIBRARY } from '../../assets/stickers';
import pinkCreasedPaper from '../../assets/textures/pink_creased_paper.jpg';

interface CardFaceProps {
  state: CardState;
  side: 'front' | 'back';
  selectedId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdatePhoto?: (partial: Partial<CardPhoto>) => void;
  onUpdateSticker: (id: string, partial: Partial<StickerElement>) => void;
  onDeleteSticker: (id: string) => void;
  isExporting?: boolean;
}

export const CardFace = React.forwardRef<HTMLDivElement, CardFaceProps>(({
  state,
  side,
  selectedId,
  onSelectElement,
  onUpdatePhoto,
  onUpdateSticker,
  onDeleteSticker,
  isExporting = false,
}, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const combinedRef = (node: HTMLDivElement) => {
    // @ts-ignore
    cardRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  const visibleStickers = state.stickers.filter(
    s => s.side === 'both' || s.side === side
  );

  const cardBgColor = side === 'front'
    ? (state.backgroundColor || '#FAF7EB')
    : (state.back?.backgroundColor || state.backgroundColor || '#FAF7EB');

  const isTravelPassport = state.layoutVariant === 'travel-passport';

  return (
    <div
      ref={combinedRef}
      id={`card-${side}-container`}
      onClick={() => onSelectElement('cardSettings')}
      style={{
        width: '540px',
        height: '340px',
        borderRadius: `${state.cardRadius}px`,
        color: state.typography?.primaryColor || '#3C3E4A',
        backgroundColor: cardBgColor,
        background: cardBgColor,
      }}
      className="relative overflow-hidden select-none transition-all card-3d-shadow cursor-pointer"
    >
      {/* Creased Vintage Paper Texture */}
      {state.cardTexture === 'pink-creased-paper' ? (
        <div
          className="absolute inset-0 pointer-events-none z-[1] bg-cover bg-center mix-blend-multiply opacity-65 select-none"
          style={{ backgroundImage: `url(${pinkCreasedPaper})` }}
        />
      ) : (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]" />
      )}

      {/* Perimeter Stars Border Frame */}
      {state.cardFrame === 'stars-perimeter' && (
        <div className="absolute inset-0 pointer-events-none z-[5] select-none text-[#1E1E1E]">
          {/* Top row (15 stars) */}
          <div className="absolute top-2 inset-x-5 flex justify-between text-xs leading-none">
            {Array.from({ length: 15 }).map((_, i) => <span key={`top-${i}`}>★</span>)}
          </div>
          {/* Bottom row (15 stars) */}
          <div className="absolute bottom-2.5 inset-x-5 flex justify-between text-xs leading-none">
            {Array.from({ length: 15 }).map((_, i) => <span key={`bot-${i}`}>★</span>)}
          </div>
          {/* Left col (7 stars) */}
          <div className="absolute left-3.5 inset-y-8 flex flex-col justify-between text-xs leading-none">
            {Array.from({ length: 7 }).map((_, i) => <span key={`left-${i}`}>★</span>)}
          </div>
          {/* Right col (7 stars) */}
          <div className="absolute right-3.5 inset-y-8 flex flex-col justify-between text-xs leading-none">
            {Array.from({ length: 7 }).map((_, i) => <span key={`right-${i}`}>★</span>)}
          </div>
        </div>
      )}

      {/* Draggable & Resizable Photo Component */}
      {side === 'front' && state.photo.visible !== false && (
        <DraggablePhoto
          photo={state.photo}
          isSelected={selectedId === 'photo'}
          onSelect={() => onSelectElement('photo')}
          onUpdate={(partial) => onUpdatePhoto?.(partial)}
          containerRef={cardRef}
          isExporting={isExporting}
        />
      )}

      {/* ===================== FRONT FACE: TRAVEL PASSPORT LAYOUT ===================== */}
      {side === 'front' && isTravelPassport && (
        <div className="relative w-full h-full pt-6 pb-5 pl-7 pr-6 flex gap-4 z-10 pointer-events-none">
          {/* Left Column: Top Tag */}
          <div className="w-[185px] shrink-0 flex flex-col justify-between h-full pt-0.5 pb-1 pointer-events-none">
            {state.brandLogo.visible !== false && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement('brandLogo');
                }}
                style={{
                  fontFamily: state.brandLogo.fontFamily,
                  color: state.brandLogo.color,
                }}
                className="text-[10px] font-mono font-bold tracking-wider cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded px-1 mb-1 pointer-events-auto"
                title="Click to edit handle / tag"
              >
                {state.brandLogo.text}
              </div>
            )}
            <div className="flex-1" />
          </div>

          {/* Right Column: All Text Fields, Header, Body Certification, and Signature */}
          <div className="flex-1 flex flex-col justify-between h-full text-[10px] leading-tight pt-0.5 pb-1 pointer-events-none">
            {/* Header: Title & Serial Number */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement('cardHeader');
              }}
              className="text-right cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-0.5 transition-all pointer-events-auto"
              title="Click to edit card title & number"
            >
              {state.fields.cardType && (
                <div
                  style={{
                    fontFamily: state.typography.metaFont,
                    color: state.typography.primaryColor,
                  }}
                  className="text-[9.5px] font-black tracking-widest uppercase"
                >
                  {state.fields.cardType}
                </div>
              )}
              {state.fields.cardNumber && (
                <div
                  style={{
                    fontFamily: state.typography.metaFont,
                    color: state.typography.primaryColor,
                  }}
                  className="text-sm font-black tracking-wider"
                >
                  {state.fields.cardNumber}
                </div>
              )}
            </div>

            {/* Dot-Leader Metadata Fields */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement('metadata');
              }}
              style={{ fontFamily: state.typography.metaFont }}
              className="space-y-1 text-[9px] cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-1 transition-all pointer-events-auto"
              title="Click to edit fields and Issued to"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-[#3C3E4A] font-semibold shrink-0">
                  {state.fields.nameSecondary || 'Issued to'}
                </span>
                <span className="flex-1 border-b border-dotted border-black/40 mb-0.5" />
                <span className="font-bold text-[#1E1E1E] uppercase text-right shrink-0">
                  {state.fields.name}
                </span>
              </div>

              {state.fields.dob && (
                <div className="flex items-baseline gap-1">
                  <span className="text-[#3C3E4A] font-semibold shrink-0">Date of birth</span>
                  <span className="flex-1 border-b border-dotted border-black/40 mb-0.5" />
                  <span className="font-bold text-[#1E1E1E] uppercase text-right shrink-0">
                    {state.fields.dob}
                  </span>
                </div>
              )}

              {state.fields.location && (
                <div className="flex items-baseline gap-1">
                  <span className="text-[#3C3E4A] font-semibold shrink-0">Place of issue</span>
                  <span className="flex-1 border-b border-dotted border-black/40 mb-0.5" />
                  <span className="font-bold text-[#1E1E1E] uppercase text-right shrink-0">
                    {state.fields.location}
                  </span>
                </div>
              )}

              {state.fields.issueDate && (
                <div className="flex items-baseline gap-1">
                  <span className="text-[#3C3E4A] font-semibold shrink-0">Date of issue</span>
                  <span className="flex-1 border-b border-dotted border-black/40 mb-0.5" />
                  <span className="font-bold text-[#1E1E1E] uppercase text-right shrink-0">
                    {state.fields.issueDate}
                  </span>
                </div>
              )}
            </div>

            {/* Travel Certificate Paragraph & Notice */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement('disclaimer');
              }}
              className="space-y-0.5 cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-1 transition-all pointer-events-auto"
              title="Click to edit certification statement"
            >
              {state.fields.roleOrTitle && (
                <div
                  style={{ fontFamily: state.typography.metaFont }}
                  className="text-[9px] font-extrabold tracking-widest text-center uppercase text-[#1E1E1E]"
                >
                  {state.fields.roleOrTitle}
                </div>
              )}
              {state.fields.disclaimer && (
                <div
                  style={{ fontFamily: state.typography.metaFont }}
                  className="text-[7.5px] leading-[1.25] text-justify text-[#2E2E2E] font-medium"
                >
                  {state.fields.disclaimer}
                </div>
              )}
            </div>

            {/* Signature Row */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement('metadata');
              }}
              className="pt-0.5 flex flex-col items-end cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded transition-all pointer-events-auto"
              title="Click to edit signature"
            >
              <div className="w-full text-right text-[8px] text-[#4A4A4A]">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</div>
              <div className="flex items-center gap-2 -mt-1">
                <span style={{ fontFamily: 'Playball, cursive' }} className="text-sm font-bold text-[#1E1E1E]">
                  {state.fields.signature || 'Your Signature'}
                </span>
              </div>
              <div className="text-[7.5px] italic text-[#4A4A4A] font-serif">Signature of Authorized traveler</div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== FRONT FACE: STANDARD CARD LAYOUT ===================== */}
      {side === 'front' && !isTravelPassport && (
        <div className="relative w-full h-full p-5 flex flex-col justify-between z-10 pointer-events-none">
          <div className="flex items-start justify-between pointer-events-none">
            {state.brandLogo.visible !== false && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement('brandLogo');
                }}
                style={{
                  fontFamily: state.brandLogo.fontFamily,
                  color: state.brandLogo.color,
                }}
                className="cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-0.5 transition-all flex items-center gap-2 pointer-events-auto"
                title="Click to edit/delete logo"
              >
                {state.brandLogo.badgeShape === 'oval' ? (
                  <div
                    style={{ backgroundColor: state.brandLogo.badgeColor || '#E0DFD2', color: state.brandLogo.color || '#3C3E4A' }}
                    className="px-3 py-1 rounded-full font-extrabold text-base tracking-tight shadow-sm"
                  >
                    {state.brandLogo.text}
                  </div>
                ) : (
                  <div className="text-xl font-black tracking-wider uppercase drop-shadow-sm">
                    {state.brandLogo.text}
                  </div>
                )}

                {state.brandLogo.subtext && (
                  <span
                    style={{ fontFamily: state.typography.metaFont }}
                    className="text-[10px] uppercase font-bold tracking-widest text-[#616161]"
                  >
                    {state.brandLogo.subtext}
                  </span>
                )}
              </div>
            )}

            {state.brandLogo.visible === false && <div />}

            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement('cardHeader');
              }}
              className="text-right cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-0.5 transition-all pointer-events-auto"
              title="Click to edit/delete card number"
            >
              {state.fields.cardType && (
                <div
                  style={{
                    fontFamily: state.typography.metaFont,
                    color: state.typography.secondaryColor,
                  }}
                  className="text-[9px] font-bold tracking-widest uppercase"
                >
                  {state.fields.cardType}
                </div>
              )}
              {state.fields.cardNumber && (
                <div
                  style={{
                    fontFamily: state.typography.metaFont,
                    color: state.typography.accentColor,
                  }}
                  className="text-[11px] font-extrabold tracking-wider"
                >
                  {state.fields.cardNumber}
                </div>
              )}
            </div>
          </div>

          {/* Middle Row with Safe Left Margin to give breathing room from photo */}
          <div className="flex items-center my-auto pl-[175px] pointer-events-none">
            <div className="flex-1 flex flex-col gap-1 text-[11px] leading-tight pointer-events-none">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement('name');
                }}
                className="mb-1 cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-0.5 transition-all pointer-events-auto inline-block"
                title="Click to edit/delete name"
              >
                <div className="flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: state.typography.primaryFont,
                      color: state.typography.primaryColor,
                    }}
                    className="text-lg font-black tracking-tight"
                  >
                    {state.fields.name}
                  </span>
                  {state.fields.nameSecondary && (
                    <span
                      style={{
                        fontFamily: state.typography.primaryFont,
                        color: state.typography.secondaryColor,
                      }}
                      className="text-xs font-bold"
                    >
                      {state.fields.nameSecondary}
                    </span>
                  )}
                </div>
                {state.fields.roleOrTitle && (
                  <div
                    style={{
                      fontFamily: state.typography.metaFont,
                      color: state.typography.accentColor,
                    }}
                    className="text-[9px] font-medium tracking-tight uppercase"
                  >
                    {state.fields.roleOrTitle}
                  </div>
                )}
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement('metadata');
                }}
                style={{ fontFamily: state.typography.metaFont }}
                className="space-y-0.5 text-[10px] cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-0.5 transition-all pointer-events-auto"
                title="Click to edit dates/details"
              >
                {state.fields.dob && (
                  <div className="flex items-center gap-2 border-b border-black/5 pb-0.5">
                    <span className="text-[#616161] font-bold uppercase w-16 shrink-0">DOB:</span>
                    <span className="font-bold">{state.fields.dob}</span>
                  </div>
                )}

                {state.fields.issueDate && (
                  <div className="flex items-center gap-2 border-b border-black/5 pb-0.5">
                    <span className="text-[#616161] font-bold uppercase w-16 shrink-0">Issued:</span>
                    <span className="font-bold">{state.fields.issueDate}</span>
                  </div>
                )}

                {state.fields.location && (
                  <div className="flex items-center gap-2 border-b border-black/5 pb-0.5">
                    <span className="text-[#616161] font-bold uppercase w-16 shrink-0">Location:</span>
                    <span className="font-semibold">{state.fields.location}</span>
                  </div>
                )}

                {state.fields.likes && (
                  <div className="flex items-center gap-2 border-b border-black/5 pb-0.5">
                    <span className="text-[#616161] font-bold uppercase w-16 shrink-0">Likes:</span>
                    <span className="font-semibold truncate max-w-[170px]">{state.fields.likes}</span>
                  </div>
                )}

                {state.fields.membershipOf && (
                  <div className="flex items-center gap-2 border-b border-black/5 pb-0.5">
                    <span className="text-[#616161] font-bold uppercase w-16 shrink-0">Member Of:</span>
                    <span className="font-bold">{state.fields.membershipOf}</span>
                  </div>
                )}

                {state.fields.signature && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[#616161] font-bold uppercase w-16 shrink-0">Signature:</span>
                    <span style={{ fontFamily: 'Playball, cursive' }} className="text-sm font-bold text-[#3C3E4A]">
                      {state.fields.signature}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {state.fields.disclaimer && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelectElement('disclaimer');
              }}
              className="flex items-end justify-between pt-1 border-t border-black/10 text-[8px] cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded transition-all pointer-events-auto"
              title="Click to edit disclaimer"
            >
              <div
                style={{
                  fontFamily: state.typography.metaFont,
                  color: state.typography.secondaryColor,
                }}
                className="max-w-[340px] leading-tight font-medium"
              >
                {state.fields.disclaimer}
              </div>

              <div className="flex items-center gap-1 opacity-70">
                <div className="w-16 h-4 flex items-center">
                  {(() => {
                    const barcodeDef = STICKER_LIBRARY.find(s => s.id === 'classic-barcode');
                    return barcodeDef ? (
                      <div
                        className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                        dangerouslySetInnerHTML={{ __html: barcodeDef.svg }}
                      />
                    ) : null;
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== BACK FACE ===================== */}
      {side === 'back' && (
        <div className="relative w-full h-full p-6 flex flex-col justify-between z-10 pointer-events-none">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement('backHeader');
            }}
            className="flex items-center justify-between cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-1 transition-all pointer-events-auto"
            title="Click to edit back header title and subtitle"
          >
            <div
              style={{
                fontFamily: state.typography.metaFont,
                color: state.back.accentColor || state.typography.accentColor,
              }}
              className="text-[11px] font-extrabold tracking-widest uppercase"
            >
              {state.back.title || state.fields.cardType}
            </div>

            {state.back.subtitle && (
              <div
                style={{ fontFamily: state.typography.metaFont }}
                className="text-[9px] text-[#616161] font-bold uppercase tracking-wider"
              >
                {state.back.subtitle}
              </div>
            )}
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement('backLogo');
            }}
            className="my-auto text-center flex flex-col items-center justify-center cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-2 transition-all pointer-events-auto"
            title="Click to edit big logo text, font, color, and quote"
          >
            {state.back.bigLogoText && (
              <div
                style={{
                  fontFamily: state.back.bigLogoFont || state.brandLogo.fontFamily,
                  color: state.back.bigLogoColor || state.typography.primaryColor,
                }}
                className="text-4xl font-black tracking-tighter uppercase drop-shadow-sm select-none"
              >
                {state.back.bigLogoText}
              </div>
            )}

            {state.back.quote && (
              <div
                style={{ fontFamily: state.typography.metaFont }}
                className="mt-2 text-[10px] italic font-semibold text-[#616161] max-w-[360px]"
              >
                {state.back.quote}
              </div>
            )}
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement('backFooter');
            }}
            className="flex items-center justify-between pt-2 border-t border-black/10 cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-1 transition-all pointer-events-auto"
            title="Click to toggle hologram seal and barcode"
          >
            {state.back.showHologramSeal ? (
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#616161]">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-800" />
                <span style={{ fontFamily: state.typography.metaFont }}>AUTHENTICATED RECORD</span>
              </div>
            ) : (
              <div className="text-[9px] font-mono text-[#616161]">#CR80-STD</div>
            )}

            {state.back.showBarcode && (
              <div className="w-24 h-5 flex items-center opacity-80">
                {(() => {
                  const barcodeDef = STICKER_LIBRARY.find(s => s.id === 'classic-barcode');
                  return barcodeDef ? (
                    <div
                      className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: barcodeDef.svg }}
                    />
                  ) : null;
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================= DRAGGABLE STICKERS & CUSTOM TEXT ======================= */}
      {!isExporting && visibleStickers.map(sticker => (
        <DraggableElement
          key={sticker.id}
          sticker={sticker}
          isSelected={selectedId === sticker.id}
          onSelect={() => onSelectElement(sticker.id)}
          onUpdate={(partial) => onUpdateSticker(sticker.id, partial)}
          onDelete={() => onDeleteSticker(sticker.id)}
          containerRef={cardRef}
        />
      ))}

      {/* Export Static Layer with High z-index */}
      {isExporting && visibleStickers.map(sticker => {
        const stickerDef = STICKER_LIBRARY.find(s => s.id === sticker.content);
        return (
          <div
            key={sticker.id}
            className="absolute select-none pointer-events-none z-20"
            style={{
              left: `${sticker.x}%`,
              top: `${sticker.y}%`,
              transform: `translate(-50%, -50%) scale(${sticker.scale})`,
              transformOrigin: 'center center',
              color: sticker.color || 'currentColor',
              opacity: sticker.opacity ?? 1,
              zIndex: 20,
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
                className="font-bold px-1.5 py-0.5 select-none"
              >
                {sticker.content}
              </div>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center">
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
                  <img src={sticker.content} alt="sticker" className="w-full h-full object-contain" />
                ) : null}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

CardFace.displayName = 'CardFace';
