import {TypeDeLogement} from "../../enumeration/TypeDeLogement.enum";
import {DpeLettre} from "../../enumeration/DpeLettre.enum";
import {TypeDeResidence} from "../../enumeration/TypeDeResidence.enum";

export interface CaracteristiquesDTO {
  masqueId?: string;
  dateAchat: string;
  montantAchat: number;
  montantEstimation?: number;
  montantFraisDeNotaireEtNegociation?: number;
  nombreDePieces: number;
  surfaceLogement: number;
  typeDeLogement: TypeDeLogement;
  typeDeResidence: TypeDeResidence;
  meubleeOuNon: boolean;
  balconOuTerrasse?: boolean;
  surfaceBalconOuTerrasse?: number;
  parkingOuNon: boolean;
  dpeLettre: DpeLettre;
  dpeFichier?: string;
}
