import React, { useRef } from 'react';
import { CardState, StickerElement } from '../../types/card';
import { DraggableElement } from './DraggableElement';
import { ShieldCheck } from 'lucide-react';
import { STICKER_LIBRARY } from '../../assets/stickers';

interface CardFaceProps {
  state: CardState;
  side: 'front' | 'back';
  selectedId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateSticker: (id: string, partial: Partial<StickerElement>) => void;
  onDeleteSticker: (id: string) => void;
  isExporting?: boolean;
}

export const CardFace = React.forwardRef<HTMLDivElement, CardFaceProps>(({
  state,
  side,
  selectedId,
  onSelectElement,
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

  return (
    <div
      ref={combinedRef}
      id={`card-${side}-container`}
      onClick={() => onSelectElement('cardSettings')}
      style={{
        width: '540px',
        height: '340px',
        borderRadius: `${state.cardRadius}px`,
        color: state.typography.primaryColor,
        backgroundColor: side === 'front' ? (state.backgroundColor || '#ffffff') : (state.back.backgroundColor || '#fafafa'),
      }}
      className="relative overflow-hidden select-none transition-all card-3d-shadow cursor-pointer"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]" />

      {side === 'front' && (
        <div className="relative w-full h-full p-5 flex flex-col justify-between z-10">
          <div className="flex items-start justify-between">
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
                className="cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-0.5 transition-all flex items-center gap-2"
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
              className="text-right cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-0.5 transition-all"
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

          <div className="flex items-center gap-5 my-auto">
            {state.photo.visible !== false && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement('photo');
                }}
                style={{
                  width: `${state.photo.width * 5.4}px`,
                  height: `${state.photo.height * 3.4}px`,
                  borderRadius: `${state.photo.borderRadius}px`,
                  border: state.photo.showBorder ? `${state.photo.borderWidth}px solid ${state.photo.borderColor}` : 'none',
                }}
                className="relative shrink-0 overflow-hidden bg-neutral-200 shadow-md cursor-pointer hover:ring-2 hover:ring-neutral-700 transition-all"
                title="Click to edit/replace photo"
              >
                <img
                  src={state.photo.url}
                  alt="Card Portrait"
                  className="w-full h-full object-cover select-none"
                />
              </div>
            )}

            <div className="flex-1 flex flex-col gap-1 text-[11px] leading-tight">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement('name');
                }}
                className="mb-1 cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-0.5 transition-all"
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
                className="space-y-0.5 text-[10px] cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-0.5 transition-all"
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
              className="flex items-end justify-between pt-1 border-t border-black/10 text-[8px] cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded transition-all"
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

      {side === 'back' && (
        <div className="relative w-full h-full p-6 flex flex-col justify-between z-10">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement('backHeader');
            }}
            className="flex items-center justify-between cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-1 transition-all"
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
            className="my-auto text-center flex flex-col items-center justify-center cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-2 transition-all"
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
            className="flex items-center justify-between pt-2 border-t border-black/10 cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-neutral-500 rounded p-1 transition-all"
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

      {isExporting && visibleStickers.map(sticker => {
        const stickerDef = STICKER_LIBRARY.find(s => s.id === sticker.content);
        return (
          <div
            key={sticker.id}
            className="absolute select-none pointer-events-none"
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
