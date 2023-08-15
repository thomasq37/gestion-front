export interface Appartement {
  id?: number;
  numero?: number;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  nombrePieces?: number;
  surface?: number;
  balcon?: boolean;
  loue?: boolean;
  loyerMensuel?: number;
  prix?: number;
  frais: any[];
  mouvements: any[];
  images: string[]
}

export enum FrequenceFrais {
  MENSUELLE = 'MENSUELLE',
  TRIMESTRIELLE = 'TRIMESTRIELLE',
  ANNUELLE = 'ANNUELLE',
}

export interface Frais {
  id?: number;        // Optional since it will be generated on the server
  montant?: number;
  frequence?: string;  // Assuming you have an enum for "frequence" on the server
  appartement?: Appartement;
  typeFrais?: TypeFrais;
}
export interface TypeFrais {
  id: number
  nom: string;
}
