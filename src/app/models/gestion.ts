export interface Appartement {
  id:number;
  numero: number;
  adresse: string;
  codePostal: string;
  ville: string;
  nombrePieces: number;
  surface: number;
  balcon: boolean;
  prix: number;
  rentabiliteNette: number;
  tauxVacanceLocative: number;
  moyenneBeneficesNetParMois: number;
  fraisFixe: Frais[];
  images: string[];
  periodLocation: PeriodLocation[];
}

export interface AdresseDTO {
  id: number;
  numero: number;
  adresse: string;
  codePostal: string;
  ville: string;
}

export interface TypeFrais {
  id: number;
  nom?: string;
}

export interface PeriodLocation {
  id:number;
  prix: number;
  estEntree: string;
  estSortie: string | null;
  frais: Frais[];
  locVac: boolean;
  appartementId: number;
}
export interface Frais {
  id?: number;
  montant: number;
  frequence: 'MENSUELLE' | 'TRIMESTRIELLE' | 'ANNUELLE' | 'PONCTUELLE';
  appartement?: Appartement;
  periodLocationId?: number;
  typeFrais: TypeFrais;
}

export enum Frequence {
  MENSUELLE = 'Mensuelle',
  TRIMESTRIELLE = 'Trimestrielle',
  ANNUELLE = 'Annuelle',
  PONCTUELLE = 'Ponctuelle'
}