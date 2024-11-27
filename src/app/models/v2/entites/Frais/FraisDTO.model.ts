import {CategorieFrais} from "../../enumeration/CategorieFrais.enum";
import {Frequence} from "../../enumeration/Frequence.enum";

export interface FraisDTO {
  masqueId?: string;
  nom: string;
  montant: number;
  dateDeDebut: string;
  dateDeFin?: string;
  frequence: Frequence;
  categorieFrais: CategorieFrais;
}
