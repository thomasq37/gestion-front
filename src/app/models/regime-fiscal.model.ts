// regime-fiscal.model.ts
export interface RegimeFiscalRule {
  description: string;
  abattement?: number;
}

export const regimesFiscaux: { [key: string]: RegimeFiscalRule } = {
  reel: { description: 'Réel' },
  microFoncier: { description: 'Micro Foncier', abattement: 30 },
  microBIC: { description: 'Micro BIC', abattement: 50 },
  abbatementDixPourCents: { description: 'Abattement 10%', abattement: 10 },
};

export const typesDeductible: { [key: string]: RegimeFiscalRule } = {
  reel: { description: 'Réel' },
  microFoncier: { description: 'Micro Foncier', abattement: 30 },
  microBIC: { description: 'Micro BIC', abattement: 50 },
  abbatementDixPourCents: { description: 'Abattement 10%', abattement: 10 },
};
