export interface Appartement {
  id:number;
  numero: number;
  adresse: string;
  codePostal: string;
  contacts: Contact[]
  ville: string;
  nombrePieces: number;
  surface: number;
  balcon: boolean;
  prix: number;
  dpe: string;
  pays: Pays;
  rentabiliteNette: number;
  tauxVacanceLocative: number;
  moyenneBeneficesNetParMois: number;
  fraisFixe: Frais[];
  images: string[];
  periodLocation: PeriodLocation[];
  appUser: AppUser
}

export interface AppUser {
  id: number;
  pseudo: string;
  userToken: string;
}
export interface AppUserDTO{
  id: number
  username: string;
  email: string;
  phoneNumber: string;
}
export interface Contact{
  id: number
  pseudo: string;
  email: string;
  phoneNumber: string;
  appartement: Appartement;
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
  periodLocation?: PeriodLocation;
  typeFrais: TypeFrais;
}
export interface Pays{
  id: number;
  name: string;
}
export enum Frequence {
  MENSUELLE = 'Mensuelle',
  TRIMESTRIELLE = 'Trimestrielle',
  ANNUELLE = 'Annuelle',
  PONCTUELLE = 'Ponctuelle'
}

export interface UserRequest {
  user: {
    username: string;
    password: string;
  };
  token: string;
}
