export interface Appartement {
  id: number;
  numero: number;
  adresse: string;
  codePostal: string;
  ville: string;
  nombrePieces: number;
  surface: number;
  balcon: boolean;
  loue: boolean;
  loyerMensuel: number;
  prix: number;
  frais: Frais[];
  images: string[]
}

export enum FrequenceFrais {
  MENSUELLE = 'MENSUELLE',
  TRIMESTRIELLE = 'TRIMESTRIELLE',
  ANNUELLE = 'ANNUELLE',
}

export interface Frais {
  id: number;
  montant: number;
  frequence: FrequenceFrais;
}
