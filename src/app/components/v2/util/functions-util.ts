import {PeriodeDeLocationDTO} from "../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";

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
}
