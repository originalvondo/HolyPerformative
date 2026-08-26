import { useState, useEffect } from 'react';
import { CardState, FilterType, StickerElement, BackgroundSettings } from '../types/card';
import { starBorderPassportTemplate } from '../templates/starBorderPassportTemplate';
import { cloneTemplateState } from '../templates';

const STORAGE_KEY = 'hp_card_studio_state_v3';

function loadInitialState(): CardState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && parsed.fields && parsed.typography) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load card state from localStorage:', err);
  }
  return cloneTemplateState(starBorderPassportTemplate.id);
}

function persistState(state: CardState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Failed to persist card state to localStorage:', err);
  }
}

let currentState: CardState = loadInitialState();
let currentSide: 'front' | 'back' = 'front';
let currentSelectedId: string | null = null;
let currentBackground: BackgroundSettings = {
  gridColor: '#B6B8A8',
  bgColor: '#F3F1EC',
};

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  persistState(currentState);
  listeners.forEach(fn => fn());
}

export const cardStore = {
  get state() {
    return currentState;
  },
  get activeSide() {
    return currentSide;
  },
  get selectedId() {
    return currentSelectedId;
  },
  get background() {
    return currentBackground;
  },

  setSide(side: 'front' | 'back') {
    currentSide = side;
    notify();
  },

  flipCard() {
    currentSide = currentSide === 'front' ? 'back' : 'front';
    notify();
  },

  setSelectedId(id: string | null) {
    currentSelectedId = id;
    notify();
  },

  loadTemplate(templateId: string) {
    currentState = cloneTemplateState(templateId);
    currentSelectedId = null;
    notify();
  },

  resetCurrentTemplate() {
    currentState = cloneTemplateState(currentState.templateId || starBorderPassportTemplate.id);
    currentSelectedId = null;
    notify();
  },

  updateState(updater: (prev: CardState) => CardState) {
    const next = updater(JSON.parse(JSON.stringify(currentState)));
    currentState = next;
    notify();
  },

  updateField(key: keyof CardState['fields'], value: string) {
    cardStore.updateState(prev => {
      // @ts-ignore
      prev.fields[key] = value;
      return prev;
    });
  },

  deleteField(key: keyof CardState['fields']) {
    cardStore.updateState(prev => {
      // @ts-ignore
      prev.fields[key] = '';
      return prev;
    });
  },

  updatePhoto(partial: Partial<CardState['photo']>) {
    cardStore.updateState(prev => {
      prev.photo = { ...prev.photo, ...partial };
      return prev;
    });
  },

  deletePhoto() {
    cardStore.updateState(prev => {
      prev.photo.visible = false;
      return prev;
    });
  },

  restorePhoto() {
    cardStore.updateState(prev => {
      prev.photo.visible = true;
      return prev;
    });
  },

  updateBrandLogo(partial: Partial<CardState['brandLogo']>) {
    cardStore.updateState(prev => {
      prev.brandLogo = { ...prev.brandLogo, ...partial };
      return prev;
    });
  },

  deleteBrandLogo() {
    cardStore.updateState(prev => {
      prev.brandLogo.visible = false;
      return prev;
    });
  },

  restoreBrandLogo() {
    cardStore.updateState(prev => {
      prev.brandLogo.visible = true;
      return prev;
    });
  },

  updateTypography(partial: Partial<CardState['typography']>) {
    cardStore.updateState(prev => {
      prev.typography = { ...prev.typography, ...partial };
      return prev;
    });
  },

  updateBack(partial: Partial<CardState['back']>) {
    cardStore.updateState(prev => {
      prev.back = { ...prev.back, ...partial };
      return prev;
    });
  },

  setPhotoFilter(filter: FilterType) {
    cardStore.updateState(prev => {
      prev.photo.filter = filter;
      return prev;
    });
  },

  addSticker(sticker: Omit<StickerElement, 'id'>) {
    const newSticker: StickerElement = {
      ...sticker,
      side: sticker.side || currentSide,
      id: `sticker-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    cardStore.updateState(prev => {
      prev.stickers.push(newSticker);
      return prev;
    });
    currentSelectedId = newSticker.id;
    notify();
  },

  updateSticker(id: string, partial: Partial<StickerElement>) {
    cardStore.updateState(prev => {
      const idx = prev.stickers.findIndex(s => s.id === id);
      if (idx !== -1) {
        prev.stickers[idx] = { ...prev.stickers[idx], ...partial };
      }
      return prev;
    });
  },

  removeSticker(id: string) {
    cardStore.updateState(prev => {
      prev.stickers = prev.stickers.filter(s => s.id !== id);
      return prev;
    });
    if (currentSelectedId === id) {
      currentSelectedId = null;
    }
  }
};

export function useCardStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    state: cardStore.state,
    activeSide: cardStore.activeSide,
    selectedId: cardStore.selectedId,
    background: cardStore.background,
    actions: cardStore
  };
}
