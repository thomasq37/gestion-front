export interface Appartement {
  id:number;
  dateAchat: string;
  numero: number;
  adresse: string;
  codePostal: string;
  contacts: Contact[]
  ville: string;
  nombrePieces: number;
  surface: number;
  balcon: boolean;
  prix: number;
  fraisNotaireEtNegociation:number;
  estimation: number;
  dpe: string;
  lastDPEUrl: string;
  pays: Pays;
  revenusNets: number;
  depensesNettes: number;
  rentabiliteNette: number;
  tauxVacanceLocative: number;
  moyenneBeneficesNetParMois: number;
  totalFraisGestion: number;
  totalHonorairesDeLoc: number;
  totalTravaux: number;
  totalChargesFixesHorsFrais:number;
  fraisFixe: Frais[];
  images: string[];
  periodLocation: PeriodLocation[];
  appUser: AppUser
  selected: boolean
}
export interface AppartementCCDTO {
  appartementId: number;
  prixAchat: number;
  estimation: number;
  fraisNotaireEtNegociation: number;
  revenusNets: number;
  depensesNettes: number;
  rentabiliteNette: number;
  tauxVacanceLocative: number;
  moyenneBeneficesNetParMois: number;
  totalTravaux: number;
  totalFraisGestion: number;
  totalHonorairesDeLoc: number;
  totalChargesFixesHorsFrais: number;
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

export interface TypeFrais {
  id: number;
  nom?: string;
}

export interface PeriodLocation {
  id:number;
  prix: number;
  locataire: string;
  estEntree: string;
  estSortie: string | null;
  frais: Frais[];
  locVac: boolean;
  appartementId: number;
}
export interface Frais {
  id?: number;
  montant: number;
  nom: string | null;
  datePaiement: string | null;
  frequence: 'MENSUELLE' | 'TRIMESTRIELLE' | 'ANNUELLE' | 'PONCTUELLE';
  appartement?: Appartement;
  periodLocation?: PeriodLocation;
  typeFrais: TypeFrais;
}
export interface Pays{
  id: number;
  name: string;
}

