import { CardTemplate } from '../types/card';
import { starBorderPassportTemplate } from './starBorderPassportTemplate';
import { creativeLicenseTemplate } from './creativeLicenseTemplate';
import { travelLicenseTemplate } from './travelLicenseTemplate';
import { cyberNctTemplate } from './cyberNctTemplate';
import { newJeansTemplate } from './newJeansTemplate';
import { barbTemplate } from './barbTemplate';
import { popsTemplate } from './popsTemplate';
import { lavenderTemplate } from './lavenderTemplate';

export const TEMPLATES: CardTemplate[] = [
  starBorderPassportTemplate,// Theme #1 (Default)
  creativeLicenseTemplate,   // Theme #2
  travelLicenseTemplate,     // Theme #3
  cyberNctTemplate,          // Theme #4
  newJeansTemplate,          // Theme #5
  barbTemplate,              // Theme #6
  popsTemplate,              // Theme #7
  lavenderTemplate,          // Theme #8
];

export function getTemplateById(id: string): CardTemplate {
  const found = TEMPLATES.find(t => t.id === id);
  return found || starBorderPassportTemplate;
}

export function cloneTemplateState(templateId: string) {
  const template = getTemplateById(templateId);
  return JSON.parse(JSON.stringify(template.state));
}
