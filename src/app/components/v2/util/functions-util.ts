import {PeriodeDeLocationDTO} from "../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {Frequence} from "../../../models/v2/enumeration/Frequence.enum";

export class FunctionsUtil {
  static getTarifActuel(periodesDeLocation: PeriodeDeLocationDTO[]): string {
    const now = new Date();
    const periodeEnCours = periodesDeLocation.find(periode => {
      const debut = new Date(periode.dateDeDebut);
      const fin = periode.dateDeFin ? new Date(periode.dateDeFin) : null;
      return debut <= now && (!fin || now <= fin);
    });
    return periodeEnCours
      ? `${periodeEnCours.tarif.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} /mois`
      : 'Non loué';
  }

  static calculerOccurrences(frequence: Frequence, dateDeDebut: string, dateDeFin: string): number {
    if (dateDeFin === null) {
      const dateActuelle = new Date();
      dateDeFin = dateActuelle.toISOString().split('T')[0];
    }
    const jours = Math.floor((new Date(dateDeFin).getTime() - new Date(dateDeDebut).getTime()) / (1000 * 60 * 60 * 24));
    const joursParFrequence: { [key in Frequence]: number } = {
      [Frequence.MENSUELLE]: 30,
      [Frequence.BIMESTRIELLE]: 60,
      [Frequence.TRIMESTRIELLE]: 90,
      [Frequence.SEMESTRIELLE]: 180,
      [Frequence.ANNUELLE]: 365,
      [Frequence.HEBDOMADAIRE]: 7,
      [Frequence.PONCTUELLE]: Infinity, // Cas particulier
    };

    if (frequence === Frequence.PONCTUELLE) {
      return 1;
    }

    return Math.floor(jours / (joursParFrequence[frequence] || Infinity));
  }

}
