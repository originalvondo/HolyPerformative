import React, { useRef, useState, useEffect } from 'react';
import { useCardStore } from '../../store/useCardStore';
import { FontChoice } from '../../types/card';
import { X, Upload, Trash2, QrCode, Sparkles, Type } from 'lucide-react';
import { STICKER_LIBRARY } from '../../assets/stickers';
import QRCode from 'qrcode';

const FONT_OPTIONS: { label: string; value: FontChoice }[] = [
  { label: 'Pixel (Y2K)', value: 'Press Start 2P' },
  { label: 'Silkscreen', value: 'Silkscreen' },
  { label: 'Medieval Gothic', value: 'UnifrakturMaguntia' },
  { label: 'Cinzel Gothic', value: 'Cinzel Decorative' },
  { label: 'Calligraphy Script', value: 'Playball' },
  { label: 'Space Mono', value: 'Space Mono' },
  { label: 'JetBrains Mono', value: 'JetBrains Mono' },
  { label: 'Outfit Clean', value: 'Outfit' },
  { label: 'Inter Sans', value: 'Inter' },
  { label: 'Noto Sans KR (한국어)', value: 'Noto Sans KR' },
];

interface ItemEditPopupProps {
  type: string | null;
  onClose: () => void;
}

export const ItemEditPopup: React.FC<ItemEditPopupProps> = ({ type, onClose }) => {
  const { state, activeSide, actions } = useCardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stickerTab, setStickerTab] = useState<'library' | 'qr'>('library');
  const [qrUrl, setQrUrl] = useState('https://instagram.com/');
  const [qrSvg, setQrSvg] = useState<string>('');
  const [qrColor, setQrColor] = useState('#3C3E4A');

  const [newTextContent, setNewTextContent] = useState('YOUR CUSTOM TEXT');
  const [newTextFont, setNewTextFont] = useState<FontChoice>('Space Mono');
  const [newTextColor, setNewTextColor] = useState('#3C3E4A');

  useEffect(() => {
    if (!qrUrl.trim()) {
      setQrSvg('');
      return;
    }
    QRCode.toString(qrUrl.trim(), {
      type: 'svg',
      margin: 1,
      color: {
        dark: qrColor || '#3C3E4A',
        light: '#0000',
      },
    })
      .then((svg) => setQrSvg(svg))
      .catch(() => setQrSvg(''));
  }, [qrUrl, qrColor]);

  if (!type) return null;

  const activeSticker = state.stickers.find(s => s.id === type);

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed bottom-0 inset-x-0 z-50 p-2 sm:p-3 flex justify-center pointer-events-none animate-in slide-in-from-bottom duration-200"
    >
      <div className="w-full max-w-md bg-[#F3F1EC] text-[#3C3E4A] border border-[#3C3E4A]/40 rounded-xl shadow-2xl p-3 pointer-events-auto max-h-[46vh] overflow-y-auto">
        
        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#B6B8A8]/60 text-xs font-mono">
          <span className="font-bold text-[#3C3E4A] uppercase tracking-wide">
            {type === 'brandLogo' && 'Header Logo'}
            {type === 'name' && 'Name & Secondary Script'}
            {type === 'cardHeader' && 'Card Title & Serial ID'}
            {type === 'photo' && 'Photo Settings'}
            {type === 'metadata' && 'Information Rows'}
            {type === 'disclaimer' && 'Footer Disclaimer'}
            {type === 'cardSettings' && 'Customize Card'}
            {type === 'addSticker' && `Add Graphics & QR (${activeSide.toUpperCase()})`}
            {type === 'addCustomText' && `Add Custom Text (${activeSide.toUpperCase()})`}
            {type === 'backHeader' && 'Back Header & Subtitle'}
            {type === 'backLogo' && 'Back Big Logo & Statement'}
            {type === 'backFooter' && 'Back Footer & Badges'}
            {activeSticker && (
              activeSticker.type === 'qr-code'
                ? 'QR Code Properties'
                : activeSticker.type === 'custom-text'
                ? 'Custom Text Properties'
                : 'Sticker Properties'
            )}
          </span>
          <button
            onClick={onClose}
            className="p-1 text-[#3C3E4A] hover:text-black bg-[#E0DFD2] rounded-md transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {type === 'brandLogo' && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Logo Text</label>
                <input
                  type="text"
                  value={state.brandLogo.text}
                  onChange={(e) => actions.updateBrandLogo({ text: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] font-bold outline-none shadow-sm"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Tag / Subtext</label>
                <input
                  type="text"
                  value={state.brandLogo.subtext || ''}
                  onChange={(e) => actions.updateBrandLogo({ subtext: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
                  placeholder="e.g. OFFICIAL ID"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Font</label>
                <select
                  value={state.brandLogo.fontFamily}
                  onChange={(e) => actions.updateBrandLogo({ fontFamily: e.target.value as FontChoice })}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
                >
                  {FONT_OPTIONS.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Badge Shape</label>
                <select
                  value={state.brandLogo.badgeShape || 'none'}
                  onChange={(e) => actions.updateBrandLogo({ badgeShape: e.target.value as any })}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
                >
                  <option value="none">None (Plain text)</option>
                  <option value="oval">Oval Badge</option>
                  <option value="pill">Pill Badge</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-1.5">
                <label className="text-[10px] text-[#3C3E4A] font-semibold">Color:</label>
                <input
                  type="color"
                  value={state.brandLogo.color}
                  onChange={(e) => actions.updateBrandLogo({ color: e.target.value })}
                  className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer"
                />
                <span className="font-mono text-[10px] text-[#3C3E4A]">{state.brandLogo.color}</span>
              </div>

              <button
                onClick={() => {
                  actions.deleteBrandLogo();
                  onClose();
                }}
                className="px-2 py-0.5 bg-[#E0DFD2] hover:bg-red-100 text-red-600 border border-[#B6B8A8] hover:border-red-400 rounded flex items-center gap-1 text-[10px] font-bold transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove Logo</span>
              </button>
            </div>
          </div>
        )}

        {type === 'name' && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Full Name</label>
                <input
                  type="text"
                  value={state.fields.name}
                  onChange={(e) => actions.updateField('name', e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] font-bold outline-none shadow-sm"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Secondary / Script</label>
                <input
                  type="text"
                  value={state.fields.nameSecondary || ''}
                  onChange={(e) => actions.updateField('nameSecondary', e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
                  placeholder="Alt script"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Role / Subtitle</label>
              <input
                type="text"
                value={state.fields.roleOrTitle || ''}
                onChange={(e) => actions.updateField('roleOrTitle', e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
                placeholder="e.g. designer"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Font</label>
                <select
                  value={state.typography.primaryFont}
                  onChange={(e) => actions.updateTypography({ primaryFont: e.target.value as FontChoice })}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
                >
                  {FONT_OPTIONS.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Color</label>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <input
                    type="color"
                    value={state.typography.primaryColor}
                    onChange={(e) => actions.updateTypography({ primaryColor: e.target.value })}
                    className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-[10px] text-[#3C3E4A]">{state.typography.primaryColor}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'cardHeader' && (
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Card Header Label</label>
              <input
                type="text"
                value={state.fields.cardType}
                onChange={(e) => actions.updateField('cardType', e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Serial / ID Number</label>
              <input
                type="text"
                value={state.fields.cardNumber}
                onChange={(e) => actions.updateField('cardNumber', e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] font-mono outline-none shadow-sm"
              />
            </div>
            <div className="pt-0.5 flex justify-end">
              <button
                onClick={() => {
                  actions.updateField('cardType', '');
                  actions.updateField('cardNumber', '');
                  onClose();
                }}
                className="px-2 py-0.5 bg-[#E0DFD2] hover:bg-red-100 text-red-600 border border-[#B6B8A8] hover:border-red-400 rounded flex items-center gap-1 text-[10px] font-bold transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear Header</span>
              </button>
            </div>
          </div>
        )}

        {type === 'photo' && (
          <div className="space-y-2.5 text-xs">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  if (typeof ev.target?.result === 'string') {
                    actions.updatePhoto({ url: ev.target.result });
                    actions.restorePhoto();
                  }
                };
                reader.readAsDataURL(file);
              }}
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 bg-[#3C3E4A] hover:bg-[#9FA3AD] text-[#F3F1EC] font-bold rounded-md flex items-center justify-center gap-2 transition-colors font-mono text-xs shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Custom Photo</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#B6B8A8]/60 shadow-sm">
                <div className="flex justify-between text-[10px] text-[#3C3E4A] mb-1 font-bold">
                  <span>Photo Width</span>
                  <span>{Math.round(state.photo.width)}%</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={70}
                  value={state.photo.width}
                  onChange={(e) => actions.updatePhoto({ width: Number(e.target.value) })}
                  className="w-full accent-[#3C3E4A] cursor-pointer h-1.5"
                />
              </div>

              <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#B6B8A8]/60 shadow-sm">
                <div className="flex justify-between text-[10px] text-[#3C3E4A] mb-1 font-bold">
                  <span>Photo Height</span>
                  <span>{Math.round(state.photo.height)}%</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={85}
                  value={state.photo.height}
                  onChange={(e) => actions.updatePhoto({ height: Number(e.target.value) })}
                  className="w-full accent-[#3C3E4A] cursor-pointer h-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#B6B8A8]/60 shadow-sm">
                <div className="flex justify-between text-[10px] text-[#3C3E4A] mb-1 font-bold">
                  <span>Border Radius</span>
                  <span>{state.photo.borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={state.photo.borderRadius}
                  onChange={(e) => actions.updatePhoto({ borderRadius: Number(e.target.value) })}
                  className="w-full accent-[#3C3E4A] cursor-pointer h-1.5"
                />
              </div>

              <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#B6B8A8]/60 shadow-sm flex items-center justify-between">
                <div>
                  <label className="text-[10px] text-[#3C3E4A] font-bold block">Photo Border</label>
                  <input
                    type="color"
                    value={state.photo.borderColor}
                    onChange={(e) => actions.updatePhoto({ borderColor: e.target.value, showBorder: true })}
                    className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer mt-0.5"
                  />
                </div>
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-[#3C3E4A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.photo.showBorder}
                    onChange={(e) => actions.updatePhoto({ showBorder: e.target.checked })}
                    className="accent-[#3C3E4A]"
                  />
                  <span>Show</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[10px] text-[#3C3E4A]/70 font-mono">Drag on canvas to move & resize</span>
              <button
                onClick={() => {
                  actions.deletePhoto();
                  onClose();
                }}
                className="px-2 py-0.5 bg-[#E0DFD2] hover:bg-red-100 text-red-600 border border-[#B6B8A8] hover:border-red-400 rounded flex items-center gap-1 text-[10px] font-bold transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove Photo</span>
              </button>
            </div>
          </div>
        )}

        {type === 'metadata' && (
          <div className="space-y-1.5 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Name / Bearer</label>
                <input
                  type="text"
                  value={state.fields.name || ''}
                  onChange={(e) => actions.updateField('name', e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-0.5 text-[#3C3E4A] font-bold outline-none shadow-sm text-xs"
                  placeholder="YOUR NAME"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Label / Issued To</label>
                <input
                  type="text"
                  value={state.fields.nameSecondary || ''}
                  onChange={(e) => actions.updateField('nameSecondary', e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-0.5 text-[#3C3E4A] outline-none shadow-sm text-xs"
                  placeholder="e.g. Issued to"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Date of Issue</label>
                <input
                  type="text"
                  value={state.fields.issueDate || ''}
                  onChange={(e) => actions.updateField('issueDate', e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-0.5 text-[#3C3E4A] outline-none shadow-sm text-xs"
                  placeholder="2026-01-01"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Date of Birth</label>
                <input
                  type="text"
                  value={state.fields.dob || ''}
                  onChange={(e) => actions.updateField('dob', e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-0.5 text-[#3C3E4A] outline-none shadow-sm text-xs"
                  placeholder="2000-01-01"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Place of Issue / Location</label>
                <input
                  type="text"
                  value={state.fields.location || ''}
                  onChange={(e) => actions.updateField('location', e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-0.5 text-[#3C3E4A] outline-none shadow-sm text-xs"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Member Of</label>
                <input
                  type="text"
                  value={state.fields.membershipOf || ''}
                  onChange={(e) => actions.updateField('membershipOf', e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-0.5 text-[#3C3E4A] outline-none shadow-sm text-xs"
                  placeholder="Club"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Likes / Favorites</label>
              <input
                type="text"
                value={state.fields.likes || ''}
                onChange={(e) => actions.updateField('likes', e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-0.5 text-[#3C3E4A] outline-none shadow-sm text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Signature</label>
              <input
                type="text"
                value={state.fields.signature || ''}
                onChange={(e) => actions.updateField('signature', e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-0.5 text-[#3C3E4A] outline-none shadow-sm text-xs"
              />
            </div>
          </div>
        )}

        {type === 'disclaimer' && (
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Section Title / Header</label>
              <input
                type="text"
                value={state.fields.roleOrTitle || ''}
                onChange={(e) => actions.updateField('roleOrTitle', e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm font-bold"
                placeholder="e.g. LICENSE OF TRAVEL"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Statement / Certification Text</label>
              <textarea
                rows={3}
                value={state.fields.disclaimer || ''}
                onChange={(e) => actions.updateField('disclaimer', e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded p-1.5 text-[#3C3E4A] text-[11px] outline-none shadow-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  actions.updateField('disclaimer', '');
                  onClose();
                }}
                className="px-2 py-0.5 bg-[#E0DFD2] hover:bg-red-100 text-red-600 border border-[#B6B8A8] hover:border-red-400 rounded flex items-center gap-1 text-[10px] font-bold transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear Statement</span>
              </button>
            </div>
          </div>
        )}

        {type === 'cardSettings' && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#B6B8A8]/60 shadow-sm">
                <label className="text-[10px] text-[#3C3E4A] block mb-1 font-bold truncate">Card BG</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={state.backgroundColor || '#ffffff'}
                    onChange={(e) => actions.updateState(prev => { prev.backgroundColor = e.target.value; return prev; })}
                    className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer shrink-0"
                  />
                  <input
                    type="text"
                    value={state.backgroundColor || '#ffffff'}
                    onChange={(e) => actions.updateState(prev => { prev.backgroundColor = e.target.value; return prev; })}
                    className="w-full bg-[#F3F1EC] border border-[#B6B8A8]/60 focus:border-[#3C3E4A] rounded px-1.5 py-0.5 text-[#3C3E4A] font-mono text-[10px] outline-none"
                  />
                </div>
              </div>

              <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#B6B8A8]/60 shadow-sm">
                <label className="text-[10px] text-[#3C3E4A] block mb-1 font-bold truncate">Text Color</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={state.typography.primaryColor}
                    onChange={(e) => actions.updateTypography({ primaryColor: e.target.value })}
                    className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer shrink-0"
                  />
                  <input
                    type="text"
                    value={state.typography.primaryColor}
                    onChange={(e) => actions.updateTypography({ primaryColor: e.target.value })}
                    className="w-full bg-[#F3F1EC] border border-[#B6B8A8]/60 focus:border-[#3C3E4A] rounded px-1.5 py-0.5 text-[#3C3E4A] font-mono text-[10px] outline-none"
                  />
                </div>
              </div>

              <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#B6B8A8]/60 shadow-sm col-span-2 sm:col-span-1">
                <label className="text-[10px] text-[#3C3E4A] block mb-1 font-bold truncate">Accent Color</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={state.typography.accentColor}
                    onChange={(e) => actions.updateTypography({ accentColor: e.target.value })}
                    className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer shrink-0"
                  />
                  <input
                    type="text"
                    value={state.typography.accentColor}
                    onChange={(e) => actions.updateTypography({ accentColor: e.target.value })}
                    className="w-full bg-[#F3F1EC] border border-[#B6B8A8]/60 focus:border-[#3C3E4A] rounded px-1.5 py-0.5 text-[#3C3E4A] font-mono text-[10px] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#B6B8A8]/60 shadow-sm">
              <div className="flex justify-between text-[10px] text-[#3C3E4A] mb-1 font-bold">
                <span>Corner Radius</span>
                <span>{state.cardRadius}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={state.cardRadius}
                onChange={(e) => actions.updateState(prev => { prev.cardRadius = Number(e.target.value); return prev; })}
                className="w-full accent-[#3C3E4A] cursor-pointer h-1.5"
              />
            </div>

            <div className="space-y-1.5 pt-0.5">
              {(state.brandLogo.visible === false || state.photo.visible === false) && (
                <div className="flex gap-2">
                  {state.brandLogo.visible === false && (
                    <button
                      onClick={() => actions.restoreBrandLogo()}
                      className="flex-1 py-1 bg-[#E0DFD2] hover:bg-[#B6B8A8] text-[#3C3E4A] border border-[#B6B8A8] rounded-md text-[10px] font-bold transition-colors shadow-sm"
                    >
                      + Restore Logo
                    </button>
                  )}

                  {state.photo.visible === false && (
                    <button
                      onClick={() => actions.restorePhoto()}
                      className="flex-1 py-1 bg-[#E0DFD2] hover:bg-[#B6B8A8] text-[#3C3E4A] border border-[#B6B8A8] rounded-md text-[10px] font-bold transition-colors shadow-sm"
                    >
                      + Restore Photo
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={() => {
                  if (confirm('Reset this card to its original template defaults?')) {
                    actions.resetCurrentTemplate();
                    onClose();
                  }
                }}
                className="w-full py-1 bg-[#F3F1EC] hover:bg-red-50 text-red-600 border border-[#B6B8A8]/60 hover:border-red-300 rounded-md text-[10px] font-mono font-bold transition-colors"
              >
                ↺ Reset to Template Defaults
              </button>
            </div>
          </div>
        )}

        {type === 'addSticker' && (
          <div className="space-y-2.5 text-xs">
            <div className="flex border-b border-[#B6B8A8]/60 pb-1.5 gap-2">
              <button
                onClick={() => setStickerTab('library')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-colors ${
                  stickerTab === 'library'
                    ? 'bg-[#3C3E4A] text-[#F3F1EC]'
                    : 'bg-[#E0DFD2] text-[#3C3E4A] hover:bg-[#B6B8A8]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Stickers & Badges</span>
              </button>

              <button
                onClick={() => setStickerTab('qr')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-colors ${
                  stickerTab === 'qr'
                    ? 'bg-[#3C3E4A] text-[#F3F1EC]'
                    : 'bg-[#E0DFD2] text-[#3C3E4A] hover:bg-[#B6B8A8]'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Custom QR Code</span>
              </button>
            </div>

            {stickerTab === 'library' && (
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#3C3E4A] block font-semibold">
                  Tap to add to <span className="text-[#3C3E4A] font-bold uppercase">{activeSide}</span> side:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 max-h-36 overflow-y-auto">
                  {STICKER_LIBRARY.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        actions.addSticker({
                          type: 'svg-sticker',
                          content: item.id,
                          x: 50,
                          y: 50,
                          scale: 1,
                          rotation: 0,
                          color: item.defaultColor || state.typography.accentColor,
                          side: activeSide,
                        });
                        onClose();
                      }}
                      className="p-2 bg-[#FFFFFF] hover:bg-[#E0DFD2] border border-[#B6B8A8] hover:border-[#3C3E4A] rounded-md flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-sm"
                    >
                      <div
                        className="w-6 h-6 flex items-center justify-center"
                        style={{ color: item.defaultColor || '#3C3E4A' }}
                        dangerouslySetInnerHTML={{ __html: item.svg }}
                      />
                      <span className="text-[8px] truncate w-full text-center text-[#3C3E4A]">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {stickerTab === 'qr' && (
              <div className="space-y-2.5">
                <div>
                  <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">
                    Link / URL (Instagram, Spotify, Portfolio, etc.):
                  </label>
                  <input
                    type="text"
                    value={qrUrl}
                    onChange={(e) => setQrUrl(e.target.value)}
                    placeholder="https://instagram.com/username"
                    className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2.5 py-1 text-[#3C3E4A] font-mono text-xs outline-none shadow-sm"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] text-[#3C3E4A] font-semibold">QR Color:</label>
                    <input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer shrink-0"
                    />
                    <span className="font-mono text-[10px] text-[#3C3E4A]">{qrColor}</span>
                  </div>

                  {qrSvg && (
                    <div
                      className="w-9 h-9 p-0.5 bg-white border border-[#B6B8A8] rounded shadow-sm [&>svg]:w-full [&>svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: qrSvg }}
                    />
                  )}
                </div>

                <button
                  disabled={!qrSvg}
                  onClick={() => {
                    if (!qrSvg) return;
                    actions.addSticker({
                      type: 'qr-code',
                      content: qrSvg,
                      x: 50,
                      y: 50,
                      scale: 1,
                      rotation: 0,
                      color: qrColor,
                      side: activeSide,
                      qrUrl: qrUrl,
                    });
                    onClose();
                  }}
                  className="w-full py-1.5 bg-[#3C3E4A] hover:bg-[#9FA3AD] disabled:opacity-50 text-[#F3F1EC] font-bold rounded-md flex items-center justify-center gap-2 font-mono text-xs transition-colors shadow-sm active:scale-98"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Add QR Code to {activeSide.toUpperCase()} Side</span>
                </button>
              </div>
            )}
          </div>
        )}

        {type === 'addCustomText' && (
          <div className="space-y-2.5 text-xs">
            <div>
              <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Custom Text Content:</label>
              <input
                type="text"
                value={newTextContent}
                onChange={(e) => setNewTextContent(e.target.value)}
                placeholder="Type your custom text here..."
                className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2.5 py-1 text-[#3C3E4A] font-bold outline-none shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Font</label>
                <select
                  value={newTextFont}
                  onChange={(e) => setNewTextFont(e.target.value as FontChoice)}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
                >
                  {FONT_OPTIONS.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Text Color</label>
                <div className="flex items-center gap-2 mt-0.5">
                  <input
                    type="color"
                    value={newTextColor}
                    onChange={(e) => setNewTextColor(e.target.value)}
                    className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer shrink-0"
                  />
                  <span className="font-mono text-[10px] text-[#3C3E4A]">{newTextColor}</span>
                </div>
              </div>
            </div>

            <button
              disabled={!newTextContent.trim()}
              onClick={() => {
                if (!newTextContent.trim()) return;
                actions.addSticker({
                  type: 'custom-text',
                  content: newTextContent.trim(),
                  x: 50,
                  y: 50,
                  scale: 1,
                  rotation: 0,
                  color: newTextColor,
                  side: activeSide,
                  fontFamily: newTextFont,
                });
                onClose();
              }}
              className="w-full py-1.5 bg-[#3C3E4A] hover:bg-[#9FA3AD] disabled:opacity-50 text-[#F3F1EC] font-bold rounded-md flex items-center justify-center gap-2 font-mono text-xs transition-colors shadow-sm active:scale-98"
            >
              <Type className="w-3.5 h-3.5" />
              <span>Add Text to {activeSide.toUpperCase()} Side</span>
            </button>
          </div>
        )}

        {type === 'backHeader' && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Back Card Title</label>
                <input
                  type="text"
                  value={state.back.title || ''}
                  onChange={(e) => actions.updateBack({ title: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] font-bold outline-none shadow-sm"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Back Subtitle</label>
                <input
                  type="text"
                  value={state.back.subtitle || ''}
                  onChange={(e) => actions.updateBack({ subtitle: e.target.value })}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <label className="text-[10px] text-[#3C3E4A] font-semibold">Accent Color:</label>
              <input
                type="color"
                value={state.back.accentColor || state.typography.accentColor}
                onChange={(e) => actions.updateBack({ accentColor: e.target.value })}
                className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer"
              />
              <span className="font-mono text-[10px] text-[#3C3E4A]">{state.back.accentColor || state.typography.accentColor}</span>
            </div>
          </div>
        )}

        {type === 'backLogo' && (
          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Big Center Logo Text</label>
              <input
                type="text"
                value={state.back.bigLogoText || ''}
                onChange={(e) => actions.updateBack({ bigLogoText: e.target.value })}
                className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] font-bold outline-none shadow-sm text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Big Logo Font</label>
                <select
                  value={state.back.bigLogoFont || state.brandLogo.fontFamily}
                  onChange={(e) => actions.updateBack({ bigLogoFont: e.target.value as FontChoice })}
                  className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
                >
                  {FONT_OPTIONS.map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Logo Color</label>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <input
                    type="color"
                    value={state.back.bigLogoColor || state.typography.primaryColor}
                    onChange={(e) => actions.updateBack({ bigLogoColor: e.target.value })}
                    className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-[10px] text-[#3C3E4A]">{state.back.bigLogoColor || state.typography.primaryColor}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Quote / Statement</label>
              <textarea
                rows={2}
                value={state.back.quote || ''}
                onChange={(e) => actions.updateBack({ quote: e.target.value })}
                className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded p-1.5 text-[#3C3E4A] text-[11px] outline-none shadow-sm"
              />
            </div>
          </div>
        )}

        {type === 'backFooter' && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 p-2 bg-[#FFFFFF] border border-[#B6B8A8] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.back.showHologramSeal ?? false}
                  onChange={(e) => actions.updateBack({ showHologramSeal: e.target.checked })}
                  className="accent-[#3C3E4A]"
                />
                <span className="font-semibold text-[11px]">Hologram Seal</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-[#FFFFFF] border border-[#B6B8A8] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.back.showBarcode ?? true}
                  onChange={(e) => actions.updateBack({ showBarcode: e.target.checked })}
                  className="accent-[#3C3E4A]"
                />
                <span className="font-semibold text-[11px]">Barcode</span>
              </label>
            </div>
          </div>
        )}

        {activeSticker && (
          <div className="space-y-2 text-xs">
            {activeSticker.type === 'qr-code' && activeSticker.qrUrl && (
              <div className="p-1.5 bg-[#E0DFD2] border border-[#B6B8A8] rounded font-mono text-[10px] truncate text-[#3C3E4A]">
                <span className="font-bold">Target Link:</span> {activeSticker.qrUrl}
              </div>
            )}

            {activeSticker.type === 'custom-text' && (
              <div className="space-y-1.5">
                <div>
                  <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Text Content:</label>
                  <input
                    type="text"
                    value={activeSticker.content}
                    onChange={(e) => actions.updateSticker(activeSticker.id, { content: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] font-bold outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#3C3E4A] block mb-0.5 font-semibold">Font</label>
                  <select
                    value={activeSticker.fontFamily || 'Inter'}
                    onChange={(e) => actions.updateSticker(activeSticker.id, { fontFamily: e.target.value as FontChoice })}
                    className="w-full bg-[#FFFFFF] border border-[#B6B8A8] focus:border-[#3C3E4A] rounded px-2 py-1 text-[#3C3E4A] outline-none shadow-sm"
                  >
                    {FONT_OPTIONS.map(f => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between text-[10px] text-[#3C3E4A] mb-0.5 font-semibold">
                <span>Scale / Size</span>
                <span className="text-[#3C3E4A] font-bold">{activeSticker.scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={0.3}
                max={3.0}
                step={0.1}
                value={activeSticker.scale}
                onChange={(e) => actions.updateSticker(activeSticker.id, { scale: Number(e.target.value) })}
                className="w-full accent-[#3C3E4A] cursor-pointer h-1.5"
              />
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-1.5">
                <label className="text-[10px] text-[#3C3E4A] font-semibold">Color:</label>
                <input
                  type="color"
                  value={activeSticker.color || '#3C3E4A'}
                  onChange={(e) => {
                    const newColor = e.target.value;
                    if (activeSticker.type === 'qr-code' && activeSticker.qrUrl) {
                      QRCode.toString(activeSticker.qrUrl, {
                        type: 'svg',
                        margin: 1,
                        color: { dark: newColor, light: '#0000' }
                      }).then(svg => {
                        actions.updateSticker(activeSticker.id, { color: newColor, content: svg });
                      });
                    } else {
                      actions.updateSticker(activeSticker.id, { color: newColor });
                    }
                  }}
                  className="w-6 h-6 rounded border border-[#B6B8A8] bg-transparent cursor-pointer shrink-0"
                />
                <span className="font-mono text-[10px] text-[#3C3E4A]">{activeSticker.color || '#3C3E4A'}</span>
              </div>

              <button
                onClick={() => {
                  actions.removeSticker(activeSticker.id);
                  onClose();
                }}
                className="px-2 py-0.5 bg-[#E0DFD2] hover:bg-red-100 text-red-600 border border-[#B6B8A8] hover:border-red-400 rounded flex items-center gap-1 text-[10px] font-bold transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete Element</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
