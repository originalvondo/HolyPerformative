import { CardTemplate } from '../types/card';
import { starBorderPassportTemplate } from './starBorderPassportTemplate';
import { creativeLicenseTemplate } from './creativeLicenseTemplate';
import { cyberNctTemplate } from './cyberNctTemplate';
import { barbTemplate } from './barbTemplate';
import { popsTemplate } from './popsTemplate';
import { pinkTravelPassportTemplate } from './pinkTravelPassportTemplate';

export const TEMPLATES: CardTemplate[] = [
  starBorderPassportTemplate,// Theme #1 (Default)
  creativeLicenseTemplate,   // Theme #2
  cyberNctTemplate,          // Theme #3
  barbTemplate,              // Theme #4
  popsTemplate,              // Theme #5
  pinkTravelPassportTemplate,// Theme #6
];

export function getTemplateById(id: string): CardTemplate {
  const found = TEMPLATES.find(t => t.id === id);
  return found || starBorderPassportTemplate;
}

export function cloneTemplateState(templateId: string) {
  const template = getTemplateById(templateId);
  return JSON.parse(JSON.stringify(template.state));
}
